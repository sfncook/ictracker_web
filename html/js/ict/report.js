var testMe;
var events = new Array();


/****
 Render PDF
 ****/
var MARGIN = 20;
var RIGHT_SIDE = 209;
var BOTTOM_SIDE = 300;
var eventIndex = 0;


function getEventsBySector(events_) {
    var eventsBySectorArray = [];
    var eventsBySector = {};

    for (var i = 0; i < events_.length; i++) {
        var event = events_[i];
        if (typeof event.sector != 'undefined') {
            var sectorEvents = eventsBySector[event.sector];
            if (typeof sectorEvents == 'undefined') {
                sectorEvents = [];
                eventsBySector[event.sector] = sectorEvents;
            }
            sectorEvents.push(event);
        }
    }

    for (var sectorEvents in eventsBySector) {
        eventsBySectorArray = eventsBySectorArray.concat(eventsBySector[sectorEvents]);
    }
    return eventsBySectorArray;
}

// Get Report Str - return HTML-formatted string with entire report
//  This is for the report DIV, not the PDF
function getReportStr(eventArray) {
    var renderedStr = '<div class="div_report_block">';
    for (var i = 0; i < eventArray.length; i++) {
        var event = eventArray[i];
        var eventStr = window[event.get_str_func](event);
        renderedStr += eventStr + "<br>\n";
    }
    renderedStr += '</div>'
    return renderedStr;
}
function getReportStrSortByTime(inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    var reportStr = getTitleStr(inc_num, dept_name, inc_start_time, osr_unit, inc_address);
    reportStr += getReportStr(events);
    reportStr += '<div class="clear_float"></div>';
    return reportStr;
}
function getReportStrSortBySector(inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    var reportStr = getTitleStr(inc_num, dept_name, inc_start_time, osr_unit, inc_address);

    var eventsBySectorArray = getEventsBySector(events);
    reportStr += getReportStr(eventsBySectorArray);

    reportStr += '<div class="clear_float"></div>';

    return reportStr;
}
function getTitleStr(inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    var titleStr = '<div class="div_report_title_block">';

    if (dept_name != "") {
        titleStr += "<div class='report_div_header_span'>" + dept_name + "</div>\n";
    }

    if (inc_num != "") {
        titleStr += "<div class='report_div_header_span'>" + inc_num + "</div>";
    }


    if (osr_unit != "") {
        titleStr += "<div><span class='report_div_header_span'>OSR Unit: </span><span class='report_div_header_value_span'>" + osr_unit + "</span></div>\n";
    }

    if (inc_address != "") {
        titleStr += "<div class='report_div_header_span'>" + inc_address + "</div>\n";
    }

    if (inc_start_time != "") {
        titleStr += "<div class='report_div_header_span'>" + msEpochToDateString(inc_start_time) + "</div>";
        titleStr += "<div class='report_div_header_span'>" + msEpochToTimeString(inc_start_time) + "</div>";
    }

    titleStr += "</div>";
    return titleStr
}
function msEpochToDateString(msEpoch) {
//    var date = new Date(parseInt(msEpoch));
//    var hr = date.getHours();
//    var hrStr = hr + "";
//
//    var date = new Date(parseInt(msEpoch));
//    var min = date.getMinutes();
//    var minStr = (min < 10) ? ("0" + min) : min;
//
//    var timeStr = hrStr + ":" + minStr;
//
//    if (hr < 12) {
//        timeStr += "AM";
//    }
//
//    return timeStr;

//    var date = new Date();
//    var dayStr = weekday[date.getDay()];
//    var monthStr = month[date.getMonth()];
//    var dateStr = date.getDate();
//    var yearStr = date.getFullYear();
//    var fullDateStr = dayStr + " " + monthStr + " " + dateStr + ", " + yearStr;
//    doc.text(fullDateStr, RIGHT_SIDE - MARGIN - 60, BOTTOM_SIDE - MARGIN);
//
    return "Saturday November 1, 2014"
}

function msEpochToTimeString(msEpoch) {
    var date = new Date(parseInt(msEpoch));
    var hr = date.getHours();
    var hrStr = hr + "";

    var date = new Date(parseInt(msEpoch));
    var min = date.getMinutes();
    var minStr = (min < 10) ? ("0" + min) : min;

    var timeStr = hrStr + ":" + minStr;

    if (hr < 12) {
        timeStr += "AM";
    }

    return timeStr;
}


// Generate the Report PDF
function generateReportSortByTime(inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    generateReport(events, inc_num, dept_name, inc_start_time, osr_unit, inc_address);
}
function generateReportSortBySector(inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    var eventsBySectorArray = getEventsBySector(events);
    generateReport(eventsBySectorArray, inc_num, dept_name, inc_start_time, osr_unit, inc_address);
}
function generateReport(eventArray, inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    eventIndex = 0;
    var page_number = 1;
    var doc = new jsPDF();
    var done = false;

    var startY = drawTitle(doc, inc_num, dept_name, inc_start_time, osr_unit, inc_address);
    var y = startY + 10;
    while (!done) {
        drawOnePageOfEvents(doc, eventArray, y);
        drawFooter(doc, page_number, inc_num);

        if (eventIndex < eventArray.length) {
            page_number++;
            doc.addPage();
        } else {
            done = true;
        }
        y = MARGIN;
    }

    renderPdf(doc);
}


function drawTitle(doc, inc_num, dept_name, inc_start_time, osr_unit, inc_address) {
    var y = MARGIN;
    var lineSpacing = 8;

    if (inc_num != "") {
        y += lineSpacing;
        doc.text(inc_num, MARGIN, y);
    }

    if (osr_unit != "") {
        y += lineSpacing;
        doc.text('OSR Unit:' + osr_unit, MARGIN, y);
    }

    if (inc_address != "") {
        y += lineSpacing;
        doc.text(inc_address, MARGIN, y);
    }

    if (inc_start_time != "") {
        y += lineSpacing;
        doc.text(msEpochToDateString(inc_start_time) + "  " + msEpochToTimeString(inc_start_time), MARGIN, y);
    }

    if (dept_name != "") {
        y += lineSpacing;
        doc.text("*The information in this report is private and is the sole property of:", MARGIN, y);
        y += lineSpacing;
        doc.text(dept_name, MARGIN, y);
    }


    y += 2;
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y, RIGHT_SIDE - MARGIN, y);

    return y;
}

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
function drawFooter(doc, page_number, inc_num) {
    doc.text(inc_num, MARGIN, BOTTOM_SIDE - MARGIN);
    doc.text("Page:" + page_number, RIGHT_SIDE - MARGIN - 20, BOTTOM_SIDE - MARGIN);
    doc.line(MARGIN, BOTTOM_SIDE - MARGIN - 6, RIGHT_SIDE - MARGIN, BOTTOM_SIDE - MARGIN - 6);
}


/*
 * return:The last event Index
 *
 */
function drawOnePageOfEvents(doc, eventArray, startY) {
    var y = startY;
    for (; eventIndex < eventArray.length && (y < BOTTOM_SIDE - MARGIN - 15); eventIndex++) {
        var event = eventArray[eventIndex];
//        event.render_func(y, event, doc);
        window[event.render_func](y, event, doc);
        y += 8;
    }
}

function renderPdf(doc) {
    doc.output('dataurlnewwindow', {});
//	doc.output('datauri', {});
}


//unit to sector
function getDateStr(date_) {
    var date = new Date(date_);
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hour + ":" + min + ":" + sec;
}


function loadEvents(newEvents) {
    if (REPORT_COOKIES_ENABLED) {
        events = new Array();
        for (var i = 0; i < newEvents.length; i++) {
            events.push(newEvents[i]);
        }
    }
}
function saveEvents() {
    if (REPORT_COOKIES_ENABLED && COOKIES_ENABLED) {
        var eventsJson = JSON.stringify(events);
        localStorage.setItem('events', eventsJson);
    }
}


function pushEvent_toQueues(event) {
    events.push(event);
}

function addEvent_title_to_sector(sector) {
    addEvent_title_to_sector_with_date(sector, new Date());
}
function addEvent_title_to_sector_with_date(sector, date) {
    var event = {
        "render_func": 'render_title_to_sector',
        "get_str_func": 'get_str_title_to_sector',
        "datetime": date,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_title_to_sector(y, event, doc) {
    doc.text(get_str_title_to_sector(event), MARGIN, y);
}
function get_str_title_to_sector(event) {
    return getDateStr(event.datetime) + "  Sector initialized:" + event.sector;
}

function addEvent_unit_to_sector(unit, sector) {
    addEvent_unit_to_sector_with_date(unit, sector, new Date());
}
function addEvent_unit_to_sector_with_date(unit, sector, date) {
    var event = {
        "render_func": 'render_unit_to_sector',
        "get_str_func": 'get_str_unit_to_sector',
        "datetime": date,
        "unit": unit,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_unit_to_sector(y, event, doc) {
    doc.text(get_str_unit_to_sector(event), MARGIN, y);
}
function get_str_unit_to_sector(event) {
    return getDateStr(event.datetime) + "  Unit:" + event.unit + " added to Sector:" + event.sector;
}

function addEvent_unit_to_acct(unit, sector) {
    addEvent_unit_to_acct_with_date(unit, sector, new Date());
}
function addEvent_unit_to_acct_with_date(unit, sector, date) {
    var event = {
        "render_func": 'render_unit_to_acct',
        "get_str_func": 'get_str_unit_to_acct',
        "datetime": date,
        "unit": unit,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_unit_to_acct(y, event, doc) {
    doc.text(get_str_unit_to_acct(event), MARGIN, y);
}
function get_str_unit_to_acct(event) {
    return getDateStr(event.datetime) + "  Accountability Unit:" + event.unit + " added to Sector:" + event.sector;
}

function addEvent_action_to_unit(action, unit, sector) {
    addEvent_action_to_unit_with_date(action, unit, sector, new Date());
}
function addEvent_action_to_unit_with_date(action, unit, sector, date) {
    var event = {
        "render_func": 'render_action_to_unit',
        "get_str_func": 'get_str_action_to_unit',
        "datetime": date,
        "action": action,
        "unit": unit,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_action_to_unit(y, event, doc) {
    doc.text(get_str_action_to_unit(event), MARGIN, y);
}
function get_str_action_to_unit(event) {
    return getDateStr(event.datetime) + "  Action:" + event.action + " added to Unit:" + event.unit + " Sector:" + event.sector;
}


function addEvent_person_has_par(unit, sector) {
    addEvent_person_has_par_with_date(unit, sector, new Date());
}
function addEvent_person_has_par_with_date(unit, sector, date) {
    var event = {
        "render_func": 'render_person_has_par',
        "get_str_func": 'get_str_person_has_par',
        "datetime": date,
        "unit": unit,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_person_has_par(y, event, doc) {
    doc.text(get_str_person_has_par(event), MARGIN, y);
}
function get_str_person_has_par(event) {
    return getDateStr(event.datetime) + "  Fire Fighter has PAR in Unit:" + event.unit + " Sector:" + event.sector;
}

function addEvent_unit_has_par(unit, sector) {
    addEvent_unit_has_par_with_date(unit, sector, new Date());
}
function addEvent_unit_has_par_with_date(unit, sector, date) {
    var event = {
        "render_func": 'render_unit_has_par',
        "get_str_func": 'get_str_unit_has_par',
        "datetime": date,
        "unit": unit,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_unit_has_par(y, event, doc) {
    doc.text(get_str_unit_has_par(event), MARGIN, y);
}
function get_str_unit_has_par(event) {
    return getDateStr(event.datetime) + "  Unit:" + event.unit + " has PAR in Sector:" + event.sector;
}

function addEvent_sector_has_par(sector) {
    addEvent_sector_has_par_with_date(sector, new Date());
}
function addEvent_sector_has_par_with_date(sector, date) {
    var event = {
        "render_func": 'render_sector_has_par',
        "get_str_func": 'get_str_sector_has_par',
        "datetime": date,
        "sector": sector
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_sector_has_par(y, event, doc) {
    doc.text(get_str_sector_has_par(event), MARGIN, y);
}
function get_str_sector_has_par(event) {
    return getDateStr(event.datetime) + "  Sector:" + event.sector + " has PAR";
}


function addEvent_benchmark(benchmark) {
    addEvent_benchmark_with_date(benchmark, new Date());
}
function addEvent_benchmark_with_date(benchmark, date) {
    var event = {
        "render_func": 'render_benchmark',
        "get_str_func": 'get_str_benchmark',
        "datetime": date,
        "benchmark": benchmark
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_benchmark(y, event, doc) {
    doc.text(get_str_benchmark(event), MARGIN, y);
}
function get_str_benchmark(event) {
    return getDateStr(event.datetime) + "  Benchmark:" + event.benchmark;
}


function addEvent_mode(mode) {
    addEvent_mode_with_date(mode, new Date());
}
function addEvent_mode_with_date(mode, date) {
    var event = {
        "render_func": 'render_mode',
        "get_str_func": 'get_str_mode',
        "datetime": date,
        "mode": mode
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_mode(y, event, doc) {
    doc.text(get_str_mode(event), MARGIN, y);
}
function get_str_mode(event) {
    return getDateStr(event.datetime) + "  Mode changed:" + event.mode;
}


function addEvent_osr(osr) {
    addEvent_osr_with_date(osr, new Date());
}
function addEvent_osr_with_date(osr, date) {
    var event = {
        "render_func": 'render_osr',
        "get_str_func": 'get_str_osr',
        "datetime": date,
        "osr": osr
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_osr(y, event, doc) {
    doc.text(get_str_osr(event), MARGIN, y);
}
function get_str_osr(event) {
    return getDateStr(event.datetime) + "  OSR:" + event.osr;
}

function addEvent_objective(objective) {
    addEvent_objective_with_date(objective, new Date());
}
function addEvent_objective_with_date(objective, date) {
    var event = {
        "render_func": 'render_objective',
        "get_str_func": 'get_str_objective',
        "datetime": date,
        "objective": objective
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_objective(y, event, doc) {
    doc.text(get_str_objective(event), MARGIN, y);
}
function get_str_objective(event) {
    return getDateStr(event.datetime) + "  Objectives:" + event.objective;
}

function addEvent_iap(iap) {
    addEvent_iap_with_date(iap, new Date());
}
function addEvent_iap_with_date(iap, date) {
    var event = {
        "render_func": 'render_iap',
        "get_str_func": 'get_str_iap',
        "datetime": date,
        "iap": iap
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_iap(y, event, doc) {
    doc.text(get_str_iap(event), MARGIN, y);
}
function get_str_iap(event) {
    return getDateStr(event.datetime) + "  IAP:" + event.iap;
}

function addEvent_cmdxfer(from_unit, to_unit) {
    addEvent_cmdxfer_with_date(from_unit, to_unit, new Date());
}
function addEvent_cmdxfer_with_date(from_unit, to_unit, date) {
    var event = {
        "render_func": 'render_cmdxfer',
        "get_str_func": 'get_str_cmdxfer',
        "datetime": date,
        "from_unit": from_unit,
        "to_unit": to_unit
    };

    pushEvent_toQueues(event);
    saveEvents();
}
function render_cmdxfer(y, event, doc) {
    doc.text(get_str_unit_to_sector(event), MARGIN, y);
}
function get_str_cmdxfer(event) {
    return getDateStr(event.datetime) + "  Command Transferred From:" + event.from_unit + " To:" + event.to_unit;
}
