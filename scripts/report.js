
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
		drawTitle(doc, $("#inc_num").html());
		drawFooter(doc, page_number, $("#address").html());
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
		if (event.type=="unit_to_sector") {
			render_unit_to_sector(y, event, doc);
		}
		y+=8;
	}
}

function renderPdf(doc) {
	doc.output('dataurlnewwindow', {});
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
function addEvent_unit_to_sector(unit_name, sector_name) {
	events.push({"type":"unit_to_sector",
				"datetime":new Date(),
				"unit":unit_name,
				"sector":sector_name});
}
function render_unit_to_sector(y, event, doc) {
	doc.text(getDateStr(event.datetime)+"  Unit:"+event.unit+" added to Sector:"+event.sector, MARGIN, y);
}

