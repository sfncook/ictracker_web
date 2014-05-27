#include "licensekey.h"
#include <QInputDialog>
#include <QSettings>
#include <QtDebug>
#include "simplecrypt.h"
#include <QRegExp>
#include <QDateTime>

// DON'T CHANGE THIS NUMBER
// If you must change it you will need to keep track of all these numbers and the associated
//  keys generated with the previous versions of it. :(
quint64 crypto_key = Q_UINT64_C(0x0c2ad4a4acb9f023);


LicenseKey::LicenseKey(QWidget *parent) :
    QWidget(parent)
{
}

bool LicenseKey::getOrSetLicenseKey() {
    bool isLicenseKeyValid = false;

    QSettings settings;
    QString settingPath = settings.fileName();
    qDebug()<<"LicenseKey::getOrSetLicenseKey() INFO - settings.filename:"<<settingPath;
    QVariant qVarLicenseKey = settings.value("app_license_key");
    QString errorMsg;
    if(!qVarLicenseKey.isNull()) {
        qDebug()<<"LicenseKey::getOrSetLicenseKey() INFO - qVarLicenseKey:"<<qVarLicenseKey;
        isLicenseKeyValid = validateLicenseKey(qVarLicenseKey.toString(), &errorMsg);
    } else {
        qDebug()<<"LicenseKey::getOrSetLicenseKey() INFO - qVarLicenseKey is NULL";
    }

    while(!isLicenseKeyValid) {
        bool ok;
        QString licenseKey = getLicenseKeyFromUser(&ok);
        if (!ok) {
            qDebug()<<"LicenseKey::getOrSetLicenseKey() - WARN ok=FALSE";
            return false;
        }
        qDebug()<<"LicenseKey::getOrSetLicenseKey() INFO - licenseKey:"<<licenseKey;
        isLicenseKeyValid = validateLicenseKey(licenseKey, &errorMsg);
        if(isLicenseKeyValid) {
            qDebug()<<"LicenseKey::getOrSetLicenseKey() INFO - storing new licenseKey:"<<licenseKey;
            settings.setValue("app_license_key", licenseKey);
        }
    }
    return isLicenseKeyValid;
}

QString LicenseKey::getLicenseKeyFromUser(bool *ok)
{
    QString output = QInputDialog::getText(
                this,
                "License Key",
                "Please Enter the application license key:",
                QLineEdit::Normal,
                "",
                ok);

    return output;
}

bool LicenseKey::validateLicenseKey(QString licenseKey, QString *errorMsg) {
    bool isLicenseKeyValid = false;

    SimpleCrypt crypto(crypto_key);
    QString decrypted = crypto.decryptToString(licenseKey);
    qDebug() << licenseKey << endl << decrypted;

    if(!decrypted.isEmpty()) {
        QRegExp rx("(\\d+)(.*)?");
        if(rx.indexIn(decrypted)>=0) {
            QString futureDateStr = rx.cap(1);
            QString customerId = rx.cap(2);
            customerId = customerId.trimmed();

            qDebug() << futureDateStr << endl << customerId;

            QDateTime currentDate = QDateTime::currentDateTime();
            QDateTime futureDate;
            futureDate.setTime_t(futureDateStr.toInt());
            isLicenseKeyValid = currentDate<=futureDate;
        }
    } else {
        *errorMsg = "ERROR: License Key is not valid.";
    }

    qDebug()<<"LicenseKey::validateLicenseKey() INFO - isLicenseKeyValid:"<<(isLicenseKeyValid?"TRUE":"FALSE");
    return isLicenseKeyValid;
}

//    SimpleCrypt crypto(crypto_key);
//    QString result = crypto.encryptToString(licenseKey);
//    QString decrypted = crypto.decryptToString(result);
//    qDebug() << licenseKey << endl << result << endl << decrypted;
