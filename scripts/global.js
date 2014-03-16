function showSectorDialog() {
	$("#dialogContainer").show();
}
function initSectorDialog( ) {
	
	var sectorDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "sector_dialog";
	sectorDialog.attr("id",newId);
	sectorDialog.css("width", "760px");
	sectorDialog.css("height", "360px");
	var sectorDialogBody = sectorDialog.children(".dialog_body");
	var sectorTitleDiv = sectorDialog.children(".dialog_title");
	sectorTitleDiv.html("Sectors");
	var prototypeBtn = $("<div class=\"titleBtn dialog_btn button\">PROTOTYPE</div>");
	sectors.forEach(function (element, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(element);
		sectorDialogBody.append(newBtn);
	});
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
	}
	$("#tbar_prototype").hide();
	$(".titleBtn").click(showSectorDialog);
}




function init( ) {
	initTbars();
	
	//Init Dialogs
	initSectorDialog();
	$("#dialogContainer").click(hideAllDialogs);
	$("#dialogContainer").hide();
	$("#dialog_prototype").hide();
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