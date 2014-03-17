


/**
 * Sector Dialog
 **/
var btn_clicked;
function showDialog( btn, dialogId ){
  return function(){
	$(".dialog").hide();
	btn_clicked = btn;
	$("#dialogContainer").show();
	$(dialogId).show();
  }
}
function setBtnText( text ){
  return function(){
	btn_clicked.html(text);
	hideAllDialogs();
  }
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
			btn_clicked.html(sectorName);
			hideAllDialogs();
			});
	});
}


/**
 * Psi Dialog
 **/
function setPsiText(text) {
	return function(){
		btn_clicked.html(text);
		hideAllDialogs();
		updateBgColor(text, btn_clicked);
	  }
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
		newBtn.click(setPsiText(psiValue));
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
			btn_clicked.html(actionName);
			hideAllDialogs();
			});
	});
}



/**
 * Units Dialog
 **/
function initUnitsDialog( ) {
	var prototypeCityBtn = $("<div class=\"unitCity_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitTypeBtn = $("<div class=\"unitType_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitBtn = $("<div class=\"unit_dialog_btn dialog_btn button\">PROTOTYPE</div>");

	unitTypes.forEach(function (unitTypeName, index, array) {
		//console.log("  "+unitTypeName);
		var unitTypeBtn = prototypeUnitTypeBtn.clone().appendTo( "#unitsDlg_types" );
		unitTypeBtn.html(unitTypeName);
		var newId = "unit_type_btn_"+unitTypeName;
		unitTypeBtn.attr("id",newId);
	});
	
	$.each(unitsByTypeByCity, function( city, unitsByType ) {
		var unitCityBtn = prototypeCityBtn.clone().appendTo( "#unitsDlg_cities" );
		unitCityBtn.html(city);
		var newId = "unit_city_btn_"+city;
		unitCityBtn.attr("id",newId);
		$.each(unitsByType, function( type, units ) {
			units.forEach(function (unitName, index, array) {
				var unitBtn = prototypeUnitBtn.clone().appendTo( "#unitsDlg_units" );
				unitBtn.html(unitName);
				var newId = "unit_city_btn_"+city;
				unitBtn.attr("id",newId);
				unitBtn.click(function() {
					btn_clicked.html(unitName);
					hideAllDialogs();
					console.log("test:"+btn_clicked.test);
					});
			});
		});
	});
}


/**
 * T-Bars
 **/
var manyUnitsBySector = {};
function initTbars() {
	//Init T-Bars
	for(var i=0; i<8; i++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo( "#tbar_container" );
		var newId = "tbar_"+i;
		tbar.attr("id",newId);
		
		//Title Btn
		var titleBtn = tbar.children(".tbar_title_container").children(".titleBtn");
		var titleBtnId = "tbar_title_"+i;
		titleBtn.attr("id", titleBtnId);
		titleBtn.click(showDialog(titleBtn, "#sector_dialog"));
		
		//Psi Btn
		var psiBtn = tbar.children(".tbar_title_container").children(".psiBtn");
		var psiBtnId = "tbar_psi_"+i;
		psiBtn.attr("id", psiBtnId);
		psiBtn.click(showDialog(psiBtn, "#psi_dialog"));
		
		//Action Btn
		var actionBtn = tbar.children(".tbar_body_container")
							.children(".actions")
							.children(".blank_btn.action_btn");
		var actionBtnId = "tbar_action_"+i;
		actionBtn.attr("id", actionBtnId);
		actionBtn.click(showDialog(actionBtn, "#actions_dialog"));
		
		//Unit Btn
		var unitBtnContainer = tbar.children(".tbar_body_container").children(".units");
		unitBtnContainer.manyUnitBtns = 0;
		var unitBtn = unitBtnContainer.children(".blank_btn.unit_btn");
		var unitBtnId = "tbar_unit_"+i;
		unitBtn.attr("id", unitBtnId);
		unitBtn.click(showDialog(unitBtn, "#units_dialog"));
	}
	$("#tbar_prototype").hide();
}




function init( ) {
	initTbars();
	
	//Init Dialogs
	initSectorDialog();
	initPsiDialog();
	initActionsDialog();
	initUnitsDialog();
	$("#dialogContainer").hide();
	$("#dialog_prototype").hide();
	$(".dialog_close_btn").click(hideAllDialogs);
	
	$("#units_dialog").show();
}

//Call this to dismiss the dialogs
function hideAllDialogs( ) {
	$("#dialogContainer").hide();
}

$( document ).ready(init);
//Esc Key Press
$(document).keyup(function(e) {
  if (e.keyCode == 27) { hideAllDialogs(); }
});


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


var engine="Engine";
var ladder="Ladder";
var bc="BC";
var squad="Squad";
var unitTypes = [
	engine,
	ladder,
	bc,
	squad,];
var unitsByTypeByCity = {
	"Mesa":{
		engine:[
			"E201",
			"E202",
			"E203",
			"E204",
			"E205",
			"E206",
			"E207",
			"E208",
			"E209",
			"E210",
			"E211",
			"E212",
			"E213",
			"E215",
			"E216",
			"E217",
			"E218",
			"E219",
			"E220",
			"E221",
			"E222",
			"E223",
			"E224",
			"E225",
			"E226",
			"E227",
			"E228",
			"E229"],
		ladder:[
			"L201",
			"L204",
			"L206",
			"L209",
			"L214",
			"L220"],
		bc:[
			"BC201",
			"BC202",
			"BC203"],
		squad:[
			"SQ204",
			"SQ206"],
	},
	
	"Gilbert":{
		engine:[
			"E251",
			"E252",		
			"E253"],		
		ladder:[
			"L251",
			"L252",],
		bc:[
			"BC291",],
	},
	
	"Chandler":{
		engine:[
			"E282",
			"E283",
			"E284",
			"E285",
			"E286",
			"E287",
			"E288",
			"E289"],
		ladder:[
			"L281",
			"L283"],
		bc:[
			"BC281",
			"BC282"],
	},
};




