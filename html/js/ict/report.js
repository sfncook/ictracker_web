
var testMe;
var events = [];


/****
 Render PDF
****/
var MARGIN = 20;
var RIGHT_SIDE = 209;
var BOTTOM_SIDE = 300;
var eventIndex=0;
function generateReport() {
	eventIndex=0;
	var page_number = 1;
	var doc = new jsPDF();
	var done = false;

	while (!done) {
        drawTitle(doc, "");
//		drawTitle(doc, $("#inc_num").html());
        drawFooter(doc, page_number, "");
//		drawFooter(doc, page_number, $("#address").html());
		drawOnePageOfEvents(doc, eventIndex);
		if (eventIndex<events.length) {
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
function drawOnePageOfEvents(doc) {
	var y = MARGIN+10;
	
	for (; eventIndex<events.length && (y<BOTTOM_SIDE-MARGIN-15); eventIndex++)
	{
		var event = events[eventIndex];
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


function addEvent_title_to_sector(sector) {
    events.push({"render_func":render_title_to_sector,
        "datetime":new Date(),
        "sector":sector});
}
function render_title_to_sector(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Sector initialized:"+event.sector, MARGIN, y);
}

function addEvent_unit_to_sector(unit, sector) {
	events.push({"render_func":render_unit_to_sector,
				"datetime":new Date(),
				"unit":unit,
				"sector":sector});
}
function render_unit_to_sector(y, event, doc) {
	doc.text(getDateStr(event.datetime)+"  Unit:"+event.unit+" added to Sector:"+event.sector, MARGIN, y);
}
function addEvent_unit_to_acct(unit, sector) {
    events.push({"render_func":render_unit_to_acct,
        "datetime":new Date(),
        "unit":unit,
        "sector":sector});
}
function render_unit_to_acct(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Accountability Unit:"+event.unit+" added to Sector:"+event.sector, MARGIN, y);
}

function addEvent_action_to_unit(action, unit, sector) {
    events.push({"render_func":render_action_to_unit,
        "datetime":new Date(),
        "action":action,
        "unit":unit,
        "sector":sector});
}
function render_action_to_unit(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Action:"+event.action+" added to Unit:"+event.unit+" Sector:"+event.sector, MARGIN, y);
}


function addEvent_person_has_par(unit, sector) {
    events.push({"render_func":render_person_has_par,
        "datetime":new Date(),
        "unit":unit,
        "sector":sector});
}
function render_person_has_par(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Fire Fighter has PAR in Unit:"+event.unit+" Sector:"+event.sector, MARGIN, y);
}
function addEvent_unit_has_par(unit, sector) {
    events.push({"render_func":render_unit_has_par,
        "datetime":new Date(),
        "unit":unit,
        "sector":sector});
}
function render_unit_has_par(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Unit:"+event.unit+" has PAR in Sector:"+event.sector, MARGIN, y);
}
function addEvent_sector_has_par(sector) {
    events.push({"render_func":render_sector_has_par,
        "datetime":new Date(),
        "sector":sector});
}
function render_sector_has_par(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Sector:"+event.sector+" has PAR", MARGIN, y);
}


function addEvent_benchmark(benchmark) {
    events.push({"render_func":render_benchmark,
        "datetime":new Date(),
        "benchmark":benchmark});
}
function render_benchmark(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Benchmark:"+event.benchmark, MARGIN, y);
}


function addEvent_mode(mode) {
    events.push({"render_func":render_mode,
        "datetime":new Date(),
        "mode":mode});
}
function render_mode(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Mode changed:"+event.mode, MARGIN, y);
}


function addEvent_osr(osr) {
    events.push({"render_func":render_osr,
        "datetime":new Date(),
        "osr":osr});
}
function render_osr(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  OSR:"+event.osr, MARGIN, y);
}

function addEvent_objective(objective) {
    events.push({"render_func":render_objective,
        "datetime":new Date(),
        "objective":objective});
}
function render_objective(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  Objectives:"+event.objective, MARGIN, y);
}

function addEvent_iap(iap) {
    events.push({"render_func":render_iap,
        "datetime":new Date(),
        "iap":iap});
}
function render_iap(y, event, doc) {
    doc.text(getDateStr(event.datetime)+"  IAP:"+event.iap, MARGIN, y);
}
