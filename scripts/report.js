
/****
 Collect Events
****/

var testMe;
var incident_number="000";
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
		drawTitle(doc);
		drawPageNumber(page_number, doc);
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

function drawTitle(doc) {
	doc.text("Incident #"+incident_number, MARGIN, MARGIN);
	doc.text("Mesa Fire Department", RIGHT_SIDE-77, MARGIN);
	doc.setLineWidth(0.5);
	doc.line(MARGIN, MARGIN+2, RIGHT_SIDE-MARGIN, MARGIN+2);
}

function drawPageNumber(page_number, doc) {
	doc.text("Page:"+page_number, MARGIN, BOTTOM_SIDE-MARGIN);
	doc.line(MARGIN, BOTTOM_SIDE-MARGIN-6, RIGHT_SIDE-MARGIN, BOTTOM_SIDE-MARGIN-6);
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
	return date.toTimeString();
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

