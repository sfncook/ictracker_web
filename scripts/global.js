function init( ) {
	//Init T-Bars
	for(var i=0; i<8; i++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo( "#tbar_container" );
		var newId = "tbar_"+i;
		tbar.attr("id",newId);
	}
	$("#tbar_prototype").hide();
	
	//Init Dialogs
	//$("#windowDialogCancelBtn").hide();
	$("#dialogContainer").click(hideAllDialogs);
	//$("#dialogContainer").hide();
}

//Call this to dismiss the dialogs
function hideAllDialogs( ) {
	$("#dialogContainer").hide();
	$(".dialog").hide();
	$(".dialog").children().hide();
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