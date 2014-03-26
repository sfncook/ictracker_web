


/**
 * Sector Dialog
 **/
var btn_clicked;
var tbar_clicked;
function showSectorDialog( tbar, btn, dialogId ){
  return function(){
	$(".dialog").hide();
	btn_clicked = btn;
	tbar_clicked = tbar;
	$("#dialogContainer").show();
	$(dialogId).show();
	
	//Toggle selected Sector button
	$(".sector_dialog_btn").removeClass("sector_dialog_btn_on");
	$( "div:contains('"+btn.html()+"').sector_dialog_btn" ).addClass("sector_dialog_btn_on");
	
	//Toggle prefix_dir buttons
	$(".dir_supl_info_dir_btn").removeClass("dir_supl_info_btn_on");
	$( "div:contains('"+tbar.prefix_dir+"').dir_supl_info_dir_btn" ).addClass("dir_supl_info_btn_on");
	
	//Toggle prefix_num buttons
	$(".dir_supl_info_num_btn").removeClass("dir_supl_info_btn_on");
	$( "div:contains('"+tbar.prefix_num+"').dir_supl_info_num_btn" ).addClass("dir_supl_info_btn_on");
  }
}
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
function toggleClass(btn, class_to_toggle, class_category, set_prefix_dir, set_prefix_num) {
	if (btn.hasClass(class_to_toggle)) {
		$("."+class_category).removeClass(class_to_toggle);
	} else {
		$("."+class_category).removeClass(class_to_toggle);
		btn.addClass(class_to_toggle);
		if (set_prefix_dir) {
			tbar_clicked.prefix_dir = btn.html();
		} else if (set_prefix_num) {
			tbar_clicked.prefix_num = btn.html();
		}
		
	}
}
function initSectorDialog( ) {
	var sectorDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "sector_dialog";
	sectorDialog.attr("id",newId);
	var sectorTitleDiv = sectorDialog.children(".dialog_title").children(".dialog_title_text_container");
	sectorTitleDiv.html("Sectors");
	var sectorDialogBody = sectorDialog.children(".dialog_body");
	
	var row1Container = $("<div id=\"sector_dlg_row1\"></div>").clone();
	var row2Container = $("<div id=\"sector_dlg_row2\"></div>").clone();
	sectorDialogBody.append(row1Container);
	sectorDialogBody.append(row2Container);
	
	//Suplimental buttons
	var prototypeBtn = $("<div class=\"dir_supl_info_btn sector_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	["N","E","S","W"].forEach(function (btnText, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.addClass("dir_supl_info_dir_btn");
		newBtn.html(btnText);
		row1Container.append(newBtn);
		newBtn.click(function() {
			toggleClass(newBtn, "dir_supl_info_btn_on", "dir_supl_info_dir_btn", true, false);
			});
	});
	
	row1Container.append($("<div class=\"horiz_spacer\"></div>"));
	
	["1","2","3","4","5","6","7","8","9"].forEach(function (btnText, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.addClass("dir_supl_info_num_btn");
		newBtn.html(btnText);
		row1Container.append(newBtn);
		newBtn.click(function() {
			toggleClass(newBtn, "dir_supl_info_btn_on", "dir_supl_info_num_btn", false, true);
			});
	});
	
	//Sector title buttons
	var prototypeBtn = $("<div class=\"titleBtn sector_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	sectors.forEach(function (sectorName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(sectorName);
		row2Container.append(newBtn);
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
	var prototypeBtn = $("<div class=\"actions_dialog_btn action_btn dialog_btn button\">PROTOTYPE</div>");
	actions.forEach(function (actionName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(actionName);
		actionsDialogBody.append(newBtn);
		newBtn.click(function() {
			var isNewButton = btn_clicked.html()=="Action";
			btn_clicked.html(actionName);
			hideAllDialogs();
			if (isNewButton) {
				var actionsContainer = btn_clicked.parent();
				addActionButton(actionsContainer);
			}
			});
	});
}



/**
 * Benchmark Dialog
 **/
function createCheckBox(label) {
	var chkContainer = $("<div class=\"horiz_chkbox\"></div>").clone();
	var chkBtn = $("<input type=\"checkbox\" class=\"benchmark_chk_btn dialog_btn button\"\>").clone();
	var labelBtn = $("<div class=\"benchmark_chk_label_btn\"\></div>").clone();
	labelBtn.html(label);
	chkContainer.append(chkBtn);
	chkContainer.append(labelBtn);
	return chkContainer;
}
function initBenchmarkDialog( ) {
	var benchmarkDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "benchmark_dialog";
	benchmarkDialog.attr("id",newId);
	var benchmarkDialogBody = benchmarkDialog.children(".dialog_body");
	var benchmarkTitleDiv = benchmarkDialog.children(".dialog_title").children(".dialog_title_text_container");
	benchmarkTitleDiv.html("Benchmarks");
	
	var primarySearchChk = createCheckBox("Primary Search");
	var secondarySearchChk = createCheckBox("Secondary Search");
	var fireCtlSearchChk = createCheckBox("Fire Control");
	var lossStopSearchChk = createCheckBox("Loss Stop");
	
	benchmarkDialogBody.append(primarySearchChk);
	benchmarkDialogBody.append(secondarySearchChk);
	benchmarkDialogBody.append(fireCtlSearchChk);
	benchmarkDialogBody.append(lossStopSearchChk);
	
	primarySearchChk.click(function() {
		btn_clicked.children(".benchmark_dot_1").addClass("benchmark_dot_btn_isset");
		});
	secondarySearchChk.click(function() {
		btn_clicked.children(".benchmark_dot_2").addClass("benchmark_dot_btn_isset");
		});
	fireCtlSearchChk.click(function() {
		btn_clicked.children(".benchmark_dot_F").addClass("benchmark_dot_btn_isset");
		});
	lossStopSearchChk.click(function() {
		btn_clicked.children(".benchmark_dot_L").addClass("benchmark_dot_btn_isset");
		});
}



/**
 * Units Dialog
 **/
function showBtnClass(city) {
	return function(){
		$(".unitCity_dialog_btn").removeClass("glow");
		$("#unit_city_btn_"+city).addClass("glow");
		$(".unit_dialog_btn").hide();
		$(".unit_dialog_btn."+city).show();
	}
}
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
		unitCityBtn.click(showBtnClass(city));
		$.each(unitsByType, function( type, units ) {
			var unitTypeCol = $("#"+type+".unitTypeColumn");
			units.forEach(function (unitName, index, array) {
				var unitBtn = prototypeUnitBtn.clone();
				unitTypeCol.append(unitBtn);
				unitBtn.html(unitName);
				unitBtn.addClass(city);
				unitBtn.addClass(type);
				var newId = "unit_city_btn_"+city;
				unitBtn.attr("id",newId);
				unitBtn.click(function() {
					var isNewButton = btn_clicked.html()=="Unit";
					btn_clicked.html(unitName);
					hideAllDialogs();
					if (isNewButton) {
						var unitsContainer = btn_clicked.parent();
						addUnitButton(unitsContainer);
					}
					});
			});
		});
	});
	$(".unit_dialog_btn").hide();
	showBtnClass("Mesa")();
}


/**
 * T-Bars
 **/
function addUnitButton(unitsContainer) {
	unitsContainer.children().removeClass("blank_btn");
	var unitBtn = $("<div class=\"blank_btn unit_btn button\">Unit</div>").clone();
	unitsContainer.append(unitBtn);
	unitBtn.click(showDialog(unitBtn, "#units_dialog"));
}
function addActionButton(actionsContainer) {
	actionsContainer.children().removeClass("blank_btn");
	var actionBtn = $("<div class=\"blank_btn action_btn button\">Action</div>").clone();
	actionsContainer.append(actionBtn);
	actionBtn.click(showDialog(actionBtn, "#actions_dialog"));
}
function initTbars() {
	//Init T-Bars
	for(var i=0; i<8; i++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo( "#tbar_container" );
		tbar.prefix_dir = 'X';
		tbar.prefix_num = 'X';
		var newId = "tbar_"+i;
		tbar.attr("id",newId);
		
		//Title Btn
		var titleBtn = tbar.children(".tbar_title_container").children(".titleBtn");
		var titleBtnId = "tbar_title_"+i;
		titleBtn.attr("id", titleBtnId);
		titleBtn.click(showSectorDialog(tbar, titleBtn, "#sector_dialog"));
		
		//Benchmark Btn
		var benchmarkBtn = tbar.children(".tbar_title_container").children(".benchmark_dots_container");
		var benchmarkBtnId = "tbar_benchmark_"+i;
		benchmarkBtn.attr("id", benchmarkBtnId);
		benchmarkBtn.click(showDialog(benchmarkBtn, "#benchmark_dialog"));
		
		//Action Btn
		var actionBtnContainer = tbar.children(".tbar_body_container").children(".tbar_body_rightcol").children(".actions");
		actionBtnContainer.manyBtns = 0;
		addActionButton(actionBtnContainer);
		
		//Unit Btn
		var unitBtnContainer = tbar.children(".tbar_body_container").children(".units");
		unitBtnContainer.manyBtns = 0;
		addUnitButton(unitBtnContainer);
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
	initBenchmarkDialog();
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




