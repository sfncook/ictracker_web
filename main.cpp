#include <QApplication>
#include <QtDebug>
#include <QDir>
#include "html5applicationviewer.h"
#include "licensekey.h"
#include <QCoreApplication>

int main(int argc, char *argv[])
{
    // Prepare the application
    QApplication app(argc, argv);
    QCoreApplication::setOrganizationName("White Helmet Technology");
    QCoreApplication::setOrganizationDomain("whitehelmettech.com");
    QCoreApplication::setApplicationName("Incident Command Tracker");

    // Check for valid license key
    LicenseKey licenseKey;
    bool isLicenseKeyValid = licenseKey.getOrSetLicenseKey();


    if(isLicenseKeyValid) {
        Html5ApplicationViewer viewer;
        viewer.setOrientation(Html5ApplicationViewer::ScreenOrientationAuto);
        viewer.showExpanded();
        viewer.loadFile(QLatin1String("html/index.html"));
        return app.exec();
    } else {
        app.quit();
        return 0;
    }


}
