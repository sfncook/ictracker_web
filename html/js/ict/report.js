
var testMe;
var events = [];
var eventsBySector = {};


/****
 Render PDF
****/
var MARGIN = 20;
var RIGHT_SIDE = 209;
var BOTTOM_SIDE = 300;
var eventIndex=0;
function generateReportSortByTime() {
    generateReport(events);
}
function generateReportSortBySector() {
    var eventsBySectorArray = [];

    for (var sectorEvents in eventsBySector) {
        eventsBySectorArray = eventsBySectorArray.concat(eventsBySector[sectorEvents]);
    }

    generateReport(eventsBySectorArray);
}

function generateReport(eventArray) {
	eventIndex=0;
	var page_number = 1;
	var doc = new jsPDF();
	var done = false;

	while (!done) {
        drawTitle(doc, "");
//		drawTitle(doc, $("#inc_num").html());
        drawFooter(doc, page_number, "");
//		drawFooter(doc, page_number, $("#address").html());
        drawOnePageOfEvents(doc, eventArray);
        if (eventIndex<eventArray.length) {
            page_number++;
            doc.addPage();
        } else {
            done = true;
        }
	}
	
	renderPdf(doc);
}

function drawTitle(doc, inc_num) {
	doc.text("Incident #"+inc_num, MARGIN, MARGIN);
	doc.text("Mesa Fire Department", RIGHT_SIDE-77, MARGIN);
	doc.setLineWidth(0.5);
	doc.line(MARGIN, MARGIN+2, RIGHT_SIDE-MARGIN, MARGIN+2);
}

var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";
function drawFooter(doc, page_number, address) {
	var date = new Date();
	var dayStr = weekday[date.getDay()];
	var monthStr = month[date.getMonth()];
	var dateStr = date.getDate();
	var yearStr = date.getFullYear();
	var fullDateStr = dayStr+" "+monthStr+" "+dateStr+", "+yearStr;
	doc.text(fullDateStr, RIGHT_SIDE-MARGIN-60, BOTTOM_SIDE-MARGIN);
	
	doc.text("Page:"+page_number, MARGIN, BOTTOM_SIDE-MARGIN);
	doc.line(MARGIN, BOTTOM_SIDE-MARGIN-6, RIGHT_SIDE-MARGIN, BOTTOM_SIDE-MARGIN-6);
	doc.text(address, MARGIN, BOTTOM_SIDE-MARGIN-7);
}




/*
 * return:The last event Index
 * 
 */
function drawOnePageOfEvents(doc, eventArray) {
    var y = MARGIN+10;

    for (; eventIndex<eventArray.length && (y<BOTTOM_SIDE-MARGIN-15); eventIndex++)
    {
        var event = eventArray[eventIndex];
        event.render_func(y, event, doc);
//		if (event.type=="unit_to_sector") {
//			render_unit_to_sector(y, event, doc);
//		}
        y+=8;
    }
}

function renderPdf(doc) {
	doc.output('dataurlnewwindow', {});
//	doc.output('datauri', {});
}


//unit to sector
function getDateStr(date) {
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	if (hour<10) {
		hour = "0"+hour;
	}
	if (min<10) {
		min = "0"+min;
	}
	if (sec<10) {
		sec = "0"+sec;
	}
	return hour+":"+min+":"+sec;
}

function pushEvent_toQueues(event) {
    events.push(event);

    if(typeof event.sector!='undefined') {
        var sectorEvents = eventsBySector[event.sector];
        if(typeof sectorEvents=='undefined') {
            sectorEvents = [];
            eventsBySector[event.sector] = sectorEvents;
        }
        sectorEvents.push(event);
    }
}

function addEvent_title_to_sector(sector) {
    addEvent_title_to_sector_with_date(sector, new Date());
}
function addEvent_title_to_sector_with_date(sector, date) {
    var event = {"render_func":render_title_to_sector,
        "datetime":date,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_title_to_sector(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Sector initialized:"+event.sector, MARGIN, y);
}

function addEvent_unit_to_sector(unit, sector) {
    addEvent_unit_to_sector_with_date(unit, sector, new Date());
}
function addEvent_unit_to_sector_with_date(unit, sector, date) {
    var event = {"render_func":render_unit_to_sector,
        "datetime":date,
        "unit":unit,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_unit_to_sector(y, event, doc) {
	doc.text(getDateStr(event.datetime)+"  Unit:"+event.unit+" added to Sector:"+event.sector, MARGIN, y);
}
function addEvent_unit_to_acct(unit, sector) {
    addEvent_unit_to_acct_with_date(unit, sector, new Date());
}
function addEvent_unit_to_acct_with_date(unit, sector, date) {
    var event = {"render_func":render_unit_to_acct,
        "datetime":date,
        "unit":unit,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_unit_to_acct(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Accountability Unit:"+event.unit+" added to Sector:"+event.sector, MARGIN, y);
}

function addEvent_action_to_unit(action, unit, sector) {
    addEvent_action_to_unit_with_date(action, unit, sector, new Date());
}
function addEvent_action_to_unit_with_date(action, unit, sector, date) {
    var event = {"render_func":render_action_to_unit,
        "datetime":date,
        "action":action,
        "unit":unit,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_action_to_unit(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Action:"+event.action+" added to Unit:"+event.unit+" Sector:"+event.sector, MARGIN, y);
}


function addEvent_person_has_par(unit, sector) {
    addEvent_person_has_par_with_date(unit, sector, new Date());
}
function addEvent_person_has_par_with_date(unit, sector, date) {
    var event = {"render_func":render_person_has_par,
        "datetime":date,
        "unit":unit,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_person_has_par(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Fire Fighter has PAR in Unit:"+event.unit+" Sector:"+event.sector, MARGIN, y);
}
function addEvent_unit_has_par(unit, sector) {
    addEvent_unit_has_par_with_date(unit, sector, new Date());
}
function addEvent_unit_has_par_with_date(unit, sector, date) {
    var event = {"render_func":render_unit_has_par,
        "datetime":date,
        "unit":unit,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_unit_has_par(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Unit:"+event.unit+" has PAR in Sector:"+event.sector, MARGIN, y);
}
function addEvent_sector_has_par(sector) {
    addEvent_sector_has_par_with_date(sector, new Date());
}
function addEvent_sector_has_par_with_date(sector, date) {
    var event = {"render_func":render_sector_has_par,
        "datetime":date,
        "sector":sector};

    pushEvent_toQueues(event);
}
function render_sector_has_par(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Sector:"+event.sector+" has PAR", MARGIN, y);
}


function addEvent_benchmark(benchmark) {
    addEvent_benchmark_with_date(benchmark, new Date());
}
function addEvent_benchmark_with_date(benchmark, date) {
    var event = {"render_func":render_benchmark,
        "datetime":date,
        "benchmark":benchmark};

    pushEvent_toQueues(event);
}
function render_benchmark(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Benchmark:"+event.benchmark, MARGIN, y);
}


function addEvent_mode(mode) {
    addEvent_mode_with_date(mode, new Date());
}
function addEvent_mode_with_date(mode, date) {
    var event = {"render_func":render_mode,
        "datetime":date,
        "mode":mode};

    pushEvent_toQueues(event);
}
function render_mode(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Mode changed:"+event.mode, MARGIN, y);
}


function addEvent_osr(osr) {
    addEvent_osr_with_date(osr, new Date());
}
function addEvent_osr_with_date(osr, date) {
    var event = {"render_func":render_osr,
        "datetime":date,
        "osr":osr};

    pushEvent_toQueues(event);
}
function render_osr(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  OSR:"+event.osr, MARGIN, y);
}

function addEvent_objective(objective) {
    addEvent_objective_with_date(objective, new Date());
}
function addEvent_objective_with_date(objective, date) {
    var event = {"render_func":render_objective,
        "datetime":date,
        "objective":objective};

    pushEvent_toQueues(event);
}
function render_objective(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Objectives:"+event.objective, MARGIN, y);
}

function addEvent_iap(iap) {
    addEvent_iap_with_date(iap, new Date());
}
function addEvent_iap_with_date(iap, date) {
    var event = {"render_func":render_iap,
        "datetime":date,
        "iap":iap};

    pushEvent_toQueues(event);
}
function render_iap(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  IAP:"+event.iap, MARGIN, y);
}
