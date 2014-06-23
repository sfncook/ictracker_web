#include <QApplication>
#include <QtDebug>
#include <QDir>
#include "html5applicationviewer.h"
#include "licensekey.h"
#include <QCoreApplication>

int main(int argc, char *argv[])
{
    qDebug()<<"Incident Command Tracker version 1.0";
    qDebug()<<"Copyright 2014 White Helmet Technologies";
    qDebug()<<"http://www.whitehelmettech.com";

    // Prepare the application
    QApplication app(argc, argv);
    QCoreApplication::setOrganizationName("White_Helmet_Technology");
    QCoreApplication::setOrganizationDomain("whitehelmettech.com");
    QCoreApplication::setApplicationName("Incident_Command_Tracker");

    // Check for valid license key
    LicenseKey licenseKey;
    bool isLicenseKeyValid = licenseKey.isLicenseKeyValid();


    if(isLicenseKeyValid) {
        qDebug()<<"License key is valid - launching UI";
        Html5ApplicationViewer viewer;
        viewer.setOrientation(Html5ApplicationViewer::ScreenOrientationAuto);
        viewer.showExpanded();
        viewer.loadFile(QLatin1String("html/index.html"));
        return app.exec();
    } else {
        qDebug()<<"License key is INVALID - exiting";
        app.quit();
        return 0;
    }


}
