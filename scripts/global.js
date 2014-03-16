


/**
 * Sector Dialog
 **/
var tbar_title_btn_clicked;
function showSectorDialog(titleBtnId) {
	$("#dialogContainer").show();
	$("#sector_dialog").show();
	$("#psi_dialog").hide();
	$("#actions_dialog").hide();
	$(".sector_dialog_btn").show();
}
function initSectorDialog( ) {
	
	var sectorDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "sector_dialog";
	sectorDialog.attr("id",newId);
	var sectorDialogBody = sectorDialog.children(".dialog_body");
	var sectorTitleDiv = sectorDialog.children(".dialog_title").children(".dialog_title_text_container");
	sectorTitleDiv.html("Sectors");
	var prototypeBtn = $("<div class=\"titleBtn sector_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	sectors.forEach(function (sectorName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(sectorName);
		sectorDialogBody.append(newBtn);
		newBtn.click(function() {
			tbar_title_btn_clicked.html(sectorName);
			hideAllDialogs();
			});
	});
}


/**
 * Psi Dialog
 **/
function showPsiDialog() {
	$("#dialogContainer").show();
	$("#sector_dialog").hide();
	$("#psi_dialog").show();
	$("#actions_dialog").hide();
	$(".sector_dialog_btn").show();
}
function initPsiDialog( ) {
	var psiDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "psi_dialog";
	psiDialog.attr("id",newId);
	var psiDialogBody = psiDialog.children(".dialog_body");
	var psiTitleDiv = psiDialog.children(".dialog_title").children(".dialog_title_text_container");
	psiTitleDiv.html("PSI Values");
	var prototypeBtn = $("<div class=\"psiBtn dialog_btn button\">PROTOTYPE</div>");
	for(var psiValue=4500; psiValue>=0; psiValue-=100) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(psiValue);
		updateBgColor(psiValue, newBtn);
		psiDialogBody.append(newBtn);
	}
}
function updateBgColor(psi_value, btn) {
	if (psi_value>=3000) {
		btn.removeClass("psi_red").removeClass("psi_yellow").addClass("psi_green");
	} else if (psi_value>=1500) {
		btn.removeClass("psi_red").addClass("psi_yellow").removeClass("psi_green");
	} else {
		btn.addClass("psi_red").removeClass("psi_yellow").removeClass("psi_green");
	}
}



/**
 * Actions Dialog
 **/
function showActionsDialog() {
	$("#dialogContainer").show();
	$("#sector_dialog").hide();
	$("#psi_dialog").hide();
	$("#actions_dialog").show();
	$(".sector_dialog_btn").show();
}
function initActionsDialog( ) {
	var actionsDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "actions_dialog";
	actionsDialog.attr("id",newId);
	var actionsDialogBody = actionsDialog.children(".dialog_body");
	var actionsTitleDiv = actionsDialog.children(".dialog_title").children(".dialog_title_text_container");
	actionsTitleDiv.html("Actions");
	var prototypeBtn = $("<div class=\"action_btn actions_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	actions.forEach(function (actionName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(actionName);
		actionsDialogBody.append(newBtn);
		newBtn.click(function() {
			hideAllDialogs();
			});
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
		var titleBtn = tbar.children(".tbar_title_container").children(".titleBtn");
		var titleBtnId = "tbar_title_"+i;
		titleBtn.attr("id", titleBtnId);
		titleBtn.click(
			function() {
				showSectorDialog(titleBtn);
			});
	}
	$("#tbar_prototype").hide();
	$(".psiBtn").click(showPsiDialog);
	$(".action_btn").click(showActionsDialog);
}




function init( ) {
	initTbars();
	
	//Init Dialogs
	initSectorDialog();
	initPsiDialog();
	initActionsDialog();
	$("#dialogContainer").hide();
	$("#dialog_prototype").hide();
	$(".dialog_close_btn").click(hideAllDialogs);
}

//Call this to dismiss the dialogs
function hideAllDialogs( ) {
	$("#dialogContainer").hide();
}

$( document ).ready(init);



var actions = [
	"Search & Rescue",
	"Fire Control",
	"Secure Utilities",
	"Vertically ventilation",
	"Horizontal ventilation",
	"Open the building",
	"Soften the building",
	"360 of the building",
	"Recon",
	"Supply line",
	"Take a line",
	"1-1/2",
	"1-3/4",
	"2",
	"2-1/2",
	"3",
	"Portable master stream",
	"Elevated master stream",
	"Deck Gun",
	"Charge the sprinkler system",
	"Charge the stand pipe",
	"Fan to the door"];

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