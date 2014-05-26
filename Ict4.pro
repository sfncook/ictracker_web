greaterThan(QT_MAJOR_VERSION, 4):QT += widgets webkitwidgets

# Add more folders to ship with the application, here
folder_01.source = html
folder_01.target = .
DEPLOYMENTFOLDERS = folder_01

# Define TOUCH_OPTIMIZED_NAVIGATION for touch optimization and flicking
#DEFINES += TOUCH_OPTIMIZED_NAVIGATION

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp \
    licensekey.cpp \
    simplecrypt.cpp

# Please do not modify the following two lines. Required for deployment.
include(html5applicationviewer/html5applicationviewer.pri)
qtcAddDeployment()

OTHER_FILES += \
    html/fire_inc_ict2.html \
    html/fire_inc.html \
    html/index_ict2.html \
    html/index.html \
    html/offcanvas_index.html \
    html/page2.html \
    html/splash.html \
    css/bootstrap-theme.min.css \
    css/bootstrap.min.css \
    css/offcanvas.css \
    css/bootstrap-theme.css.map \
    css/bootstrap.css.map \
    css/ict/stylesheet_global_ict2.css \
    css/ict/stylesheet_global.css \
    css/ict/stylesheet_reset.css \
    css/ict/stylesheet_tbar_ict2.css \
    css/ict/stylesheet_tbar.css \
    images/terminate.xcf \
    images/cancel.png \
    images/clock.png \
    images/ok.png \
    images/report.png \
    images/terminate.png \
    js/bootstrap.min.js \
    js/jquery-1.11.0.js \
    js/offcanvas.js \
    js/ict/global.js \
    js/ict/report.js \
    images/icon/ict_logo_29x29.png \
    images/icon/ict_logo_100x100.png \
    images/icon/ict_logo_300x300.png \
    images/icon/ict_logo_600x600.png

RESOURCES +=

HEADERS += \
    licensekey.h \
    simplecrypt.h
