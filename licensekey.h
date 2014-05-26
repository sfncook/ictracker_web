#ifndef LICENSEKEY_H
#define LICENSEKEY_H

#include <QWidget>

class LicenseKey : public QWidget
{
    Q_OBJECT
public:
    explicit LicenseKey(QWidget *parent = 0);
    bool getOrSetLicenseKey();

signals:

public slots:

private:
    QString getLicenseKeyFromUser(bool *ok);
    bool validateLicenseKey(QString licenseKey);

};

#endif // LICENSEKEY_H
