#ifndef LICENSEKEY_H
#define LICENSEKEY_H

#include <QWidget>

class LicenseKey : public QWidget
{
    Q_OBJECT
public:
    explicit LicenseKey(QWidget *parent = 0);
    bool isLicenseKeyValid();

signals:

public slots:

private:
    bool getOrSetLicenseKey();
    QString getLicenseKeyFromUser(bool *ok);
    bool validateLicenseKey(QString licenseKey, QString *errorMsg);

};

#endif // LICENSEKEY_H
