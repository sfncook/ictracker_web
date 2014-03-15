function showSectorDialog() {
	$("#dialogContainer").show();
}
function initSectorDialog( ) {
	var prototypeBtn = $("<div class=\"sector_dialog_btn button\">PROTOTYPE</div>");
	sectors.forEach(function (element, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(element);
		newBtn.appendTo("#sector_dialog");
	});
	//layoutSizeAndCenterDialog("sector_dialog", sectorBtns, 4, function(title) {callbackSetTitle(title);});
}


/**
 * T-Bars
 **/
function initTbars() {
	//Init T-Bars
	for(var i=0; i<8; i++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo( "#tbar_container" );
		var newId = "tbar_"+i;
		tbar.attr("id",newId);
		tbar.click(showSectorDialog);
	}
	$("#tbar_prototype").hide();
}




function init( ) {
	initTbars();
	
	//Init Dialogs
	initSectorDialog();
	$("#dialogContainer").click(hideAllDialogs);
	$("#dialogContainer").hide();
}

//Call this to dismiss the dialogs
function hideAllDialogs( ) {
	$("#dialogContainer").hide();
}

$( document ).ready(init);





var sectors = [
	"REHAB",
	"RESCUE",
	"Sector 1",
	"Sector 2",
	"Sector 3",
	"Sector 4",
	"A Sector",
	"B Sector",
	"C Sector",
	"D Sector",
	"North Sector",
	"East Sector",
	"South Sector",
	"West Sector",
	"Interior",
	"Roof",
	"Ventilation",
	"Salvage",
	"Cust Service",
	"Sprinkler",
	"Stand-pipe",
	"On Deck",
	"IRIC",
	"RIC",
	"Medical",
	"Safety",
	"Staging",
	"Lobby",
	"Treatment",
	"Evacuation",
	"Resource",
	"Transportation",
	"Accountability",
	"Triage"];