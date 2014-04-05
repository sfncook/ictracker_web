
/****
 Collect Events
****/

var testMe;
var incident_number="000";
var events = [];

function addEvent_unit_to_sector(unit_name, sector_name) {
	events.push({"type":"unit_to_sector", "unit":unit_name, "sector":sector_name});
}



/****
 Render PDF
****/
var MARGIN = 20;
var RIGHT_SIDE = 209;
var BOTTOM_SIDE = 265;
function generateReport() {
	var page_number = 1;
	var doc = new jsPDF();

	drawTitle(doc);
	drawPageNumber(page_number, doc);
	drawOnePageOfEvents(doc);
	
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
	doc.line(MARGIN, BOTTOM_SIDE-MARGIN-4, RIGHT_SIDE-MARGIN, BOTTOM_SIDE-MARGIN-4);
}

function drawOnePageOfEvents(doc) {
	for (event in events) {
		switch(event.type) {
			case "unit_to_sector":
				render_unit_to_sector(event, doc);
				break;
			default:
				console.log("unhandled event.type:"+event.type);
		}//switch
	}//for
}

function renderPdf(doc) {
	doc.output('dataurlnewwindow', {});
}



/****
 Render Event Types
****/
function render_unit_to_sector(event, doc) {
	
}
