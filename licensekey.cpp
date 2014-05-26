#include "licensekey.h"
#include <QInputDialog>
#include <QSettings>
#include <QtDebug>
#include "simplecrypt.h"

quint64 crypto_key = Q_UINT64_C(0x0c2ad4a4acb9f023);


LicenseKey::LicenseKey(QWidget *parent) :
    QWidget(parent)
{
}

bool LicenseKey::getOrSetLicenseKey() {
    bool isLicenseKeyValid = false;

    QSettings settings;
    QVariant qVarLicenseKey = settings.value("app_license_key");
    if(!qVarLicenseKey.isNull()) {
        qDebug()<<"LicenseKey::getOrSetLicenseKey() INFO - qVarLicenseKey:"<<qVarLicenseKey;
        isLicenseKeyValid = validateLicenseKey(qVarLicenseKey.toString());
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
        isLicenseKeyValid = validateLicenseKey(licenseKey);
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

bool LicenseKey::validateLicenseKey(QString licenseKey) {
    bool isLicenseKeyValid = false;

//    SimpleCrypt crypto(crypto_key);
//    QString result = crypto.encryptToString(licenseKey);
//    QString decrypted = crypto.decryptToString(result);
//    qDebug() << licenseKey << endl << result << endl << decrypted;
    SimpleCrypt crypto(crypto_key);
    QString decrypted = crypto.decryptToString(licenseKey);
    qDebug() << licenseKey << endl << decrypted;

    isLicenseKeyValid = !decrypted.isEmpty();
    qDebug()<<"LicenseKey::validateLicenseKey() INFO - isLicenseKeyValid:"<<(isLicenseKeyValid?"TRUE":"FALSE");
    return isLicenseKeyValid;
}
