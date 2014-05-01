


/**
 * PAR Dialog
 **/
function setParText(text) {
	return function(){
		btn_clicked.html(text);
		btn_clicked.removeClass("par_btn_without_number");
		hideAllDialogs();
	  }
}
function showParDialog( tbar, btn ){
  return function(){
	// Sector PAR
	var par_dialog_sector_btn = $("#par_dialog_sector_btn");
	var tbarTitle = tbar.find(".title_text").html();
	par_dialog_sector_btn.html(tbarTitle);
	
	// Units PAR
	var par_dialog_units = $("#par_dialog_units");
	par_dialog_units.empty();
	var tbarUnitBtns = tbar.children(".tbar_body_container").children(".units").children(".single_unit_div").children(".unit_btn").not(".blank_btn");
	if (tbarUnitBtns.length>0) {
		tbarUnitBtns.each(function( index ) {
			var par_dialog_unit = $("#par_dialog_unit_prototype").clone();
			par_dialog_unit.show();
			var unit_name = $(this).html();
			var unitBtn = par_dialog_unit.children(".par_unit_btn");
			unitBtn.html(unit_name);
			par_dialog_unit.css( "display", "flex");
			par_dialog_unit.appendTo(par_dialog_units);
		});
	}
	
	// Show PAR dialog
	var parDialog = $("#par_dialog");
	$(".dialog").hide();
	$(".side_dialog_container").hide();
	parDialog.show();
	$("#dialogContainer").show();
  }
}
function initParDialog( ) {
	$("#par_dialog_unit_prototype").hide();
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
	var psiTitleDiv = psiDialog.find(".dialog_title_text_container");
	psiTitleDiv.html("PSI Values");
	var prototypeBtn = $("<div class=\"psiBtn dialog_btn button\">PROTOTYPE</div>");
	for(var psiValue=4500; psiValue>=0; psiValue-=100) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(psiValue);
		updateBgColor(psiValue, newBtn);
		psiDialogBody.append(newBtn);
		newBtn.click(setPsiText(psiValue));
	}
	psiDialogBody.append("<div class=\"horiz_spacer\"></div>");
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
 * Mayday Dialog
 **/
var unitsToTbarMap = {};
var sectorsToTbarMap = {};
function selectMaydayUnitBtn(unitBtn){
	return function(){
		$(".unit_mayday_btn").removeClass("glow");
		unitBtn.addClass("glow");
	}
}
function selectMaydaySectorBtn(sectorBtn){
	return function(){
		$(".sector_mayday_btn").removeClass("glow");
		sectorBtn.addClass("glow");
	}
}
function showMaydayDialog(){
	var mayday_dialog = $("#mayday_dialog");
	
	
	// Get lists of UNITS & SECTORS
	$(".tbar").each(function( index ) {
		var tbar = $(this);
		if (tbar.attr("id")!="tbar_prototype") {
			var unitBtns = tbar.find(".unit_btn").not(".blank_btn").not(".acct_unit_btn");
			unitBtns.each(function( i ) {
				var unitBtn = $(this);
				var unitData = new Object();
				unitData.btn = unitBtn;
				unitData.tbar = tbar;
				unitsToTbarMap[unitBtn.html()] = unitData;
			});
			
			var sectorTitle = tbar.find(".title_text").html();
			if (sectorTitle!="Sector Title") {
				sectorsToTbarMap[sectorTitle] = tbar;
			}
		}
	});
	
	// Units
	var mayday_unit_list_div = $("#mayday_unit_list_div");
	mayday_unit_list_div.empty();
	var prototypeUnitBtn = $("<div class=\"unit_mayday_btn unit_btn dialog_btn button\">PROTOTYPE</div>");
	$.each( unitsToTbarMap, function( unitName, unitData ) {
		var unitBtn = prototypeUnitBtn.clone();
		unitBtn.html(unitName);
		unitBtn.click(selectMaydayUnitBtn(unitBtn));
		if (unitData.btn.hasClass("unit_btn_mayday")) {
			unitBtn.addClass("unit_btn_mayday");
		}
		mayday_unit_list_div.append(unitBtn);
	});
	
	// Sectors
	var mayday_sector_list_div = $("#mayday_sector_list_div");
	mayday_sector_list_div.empty();
	var prototypeSectorBtn = $("<div class=\"titleBtn sector_mayday_btn dialog_btn button\">PROTOTYPE</div>");
	$.each( sectorsToTbarMap, function( sectorName, tbar ) {
		var sectorBtn = prototypeSectorBtn.clone();
		sectorBtn.html(sectorName);
		sectorBtn.click(selectMaydaySectorBtn(sectorBtn));
		mayday_sector_list_div.append(sectorBtn);
	});
	
	$(".dialog").hide();
	$(".side_dialog_container").hide();
	$("#dialogContainer").show();
	mayday_dialog.show();
}
function createMayday() {
	var selectedUnit = $(".unit_mayday_btn.glow");
	var selectedSector = $(".sector_mayday_btn.glow");
	if (selectedUnit.exists()) {
		var unitData = unitsToTbarMap[selectedUnit.html()];
		btnsToBlink.push(unitData.btn);
	}
	if (selectedSector.exists()) {
		var sectorTbar = sectorsToTbarMap[selectedSector.html()];
		btnsToBlink.push(sectorTbar.find(".title_btn"));
	}
	hideAllDialogs();
}
var btnsToBlink = new Array();
function blinkUnit() {
	$.each( btnsToBlink, function( index, btn ) {
		if (btn.hasClass("glowred")) {
			btn.removeClass("glowred");
			btn.addClass("glowpink");
		} else {
			btn.addClass("glowred");
			btn.removeClass("glowpink");
		}
	});
	
	window.setTimeout(blinkUnit, 500);
}
function initMaydayDialog( ) {
	var maydayBtn = $("#mayday_btn");
	maydayBtn.click(showMaydayDialog);
	$("#ok_mayday_btn").click(createMayday);
	$("#cancel_mayday_btn").click(hideAllDialogs);
}



/**
 * Sector Dialog
 **/
var btn_clicked;
var tbar_clicked;
function showSectorDialog( tbar, btn, dialogId ){
  return function(){
	var sectorDlg = $(dialogId);
	$(".dialog").hide();
	$(".side_dialog_container").hide();
	btn_clicked = btn;
	tbar_clicked = tbar;
	$("#dialogContainer").show();
	sectorDlg.show();
	
	//Toggle selected Sector button
	$("div.title_btn.dialog_btn").removeClass("sector_dialog_btn_on");
	$( "div:contains('"+btn.html()+"').title_btn.dialog_btn" ).addClass("sector_dialog_btn_on");
	
	//Toggle prefix_dir buttons
	$(".dir_supl_info_dir_btn").removeClass("dir_supl_info_btn_on");
	$("."+tbar.prefix_dir+"_supl_btn").addClass("dir_supl_info_btn_on");
	
	//Toggle prefix_num buttons
	$(".dir_supl_info_num_btn").removeClass("dir_supl_info_btn_on");
	$("."+tbar.prefix_num+"_supl_btn").addClass("dir_supl_info_btn_on");
  }
}
function showDialog( tbar, btn, dialogId ){
  return function(){
	$(".dialog").hide();
	$(".side_dialog_container").hide();
	btn_clicked = btn;
	tbar_clicked = tbar;
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

function toggleDirBtn(btn) {
	var tbarDirBtn = tbar_clicked.find(".dir_supl_info_dir_btn");
	var tbarDirSpacer = tbar_clicked.find(".dir_spacer");
	if (btn.hasClass("dir_supl_info_btn_on")) {
		$(".dir_supl_info_dir_btn").removeClass("glow_orange");
		tbar_clicked.prefix_dir = 'X';
		tbarDirBtn.hide();
		tbarDirSpacer.show();
	} else {
		$(".dir_supl_info_dir_btn").removeClass("glow_orange");
		btn.addClass("glow_orange");
		tbar_clicked.prefix_dir = btn.html();
		tbarDirBtn.show();
		tbarDirSpacer.hide();
		tbarDirBtn.html(btn.html());
	}
}
function toggleNumBtn(btn) {
	var tbarNumBtn = tbar_clicked.find(".dir_supl_info_num_btn");
	var tbarNumSpacer = tbar_clicked.find(".num_spacer");
	if (btn.hasClass("dir_supl_info_btn_on")) {
		$(".dir_supl_info_num_btn").removeClass("glow_orange");
		tbar_clicked.prefix_num = 'X';
		tbarNumBtn.hide();
		tbarNumSpacer.show();
	} else {
		$(".dir_supl_info_num_btn").removeClass("glow_orange");
		btn.addClass("glow_orange");
		tbar_clicked.prefix_num = btn.html();
		tbarNumBtn.show();
		tbarNumSpacer.hide();
		tbarNumBtn.html(btn.html());
	}
}
function initSectorDialog( ) {
	var sectorDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "sector_dialog";
	sectorDialog.attr("id",newId);
	var dialog_title_text = sectorDialog.find(".dialog_title_text");
	dialog_title_text.html("Sectors");
	var dialog_body = sectorDialog.find(".dialog_body");
	
	//var row1Container = $("<div id=\"sector_dlg_row1\"></div>").clone();
	//var row2Container = $("<div id=\"sector_dlg_row2\"></div>").clone();
	//var row3Container = $("<div id=\"sector_dlg_row3\"></div>").clone();
	//sectorDialogBody.append(row1Container);
	//sectorDialogBody.append(row2Container);
	//sectorDialogBody.append(row3Container);
	
	var dir_btns_container = $('<div id="dir_btns_container" class="col-xs-12 container-fluid"/>').clone();
	dialog_body.append(dir_btns_container);
	var suplInfoPrototypeBtn = $("<div class=\"button col-xs-3 sm_round_btn\">PROTOTYPE</div>");
	
	//Suplimental buttons
	["N","E","S","W"].forEach(function (btnText, index, array) {
		var newBtn = suplInfoPrototypeBtn.clone();
		newBtn.addClass("dir_supl_info_dir_btn");
		newBtn.addClass(btnText+"_supl_btn");
		newBtn.html(btnText);
		dir_btns_container.append(newBtn);
		newBtn.click(function() {toggleDirBtn(newBtn);});
	});
	
	["1","2","3","4","5","6","7","8","9"].forEach(function (btnText, index, array) {
		var newBtn = suplInfoPrototypeBtn.clone();
		newBtn.addClass("dir_supl_info_num_btn");
		newBtn.addClass(btnText+"_supl_btn");
		newBtn.html(btnText);
		dir_btns_container.append(newBtn);
		newBtn.click(function() {toggleNumBtn(newBtn);});
	});
	
	
	var title_btns_container = $('<div id="title_btns_container" class="col-xs-12 container-fluid"/>').clone();
	dialog_body.append(title_btns_container);
	
	//Sector title buttons
	var prototypeBtn = $("<div class=\"title_btn button col-xs-3\">PROTOTYPE</div>");
	var prototypeFixedTitleSpacer = $("<div class=\"fixed_title_spacer\"></div>");
	var prototypeClockIcon = $("<img class=\"clock_icon\" src=\"../images/clock.png\"/>");
	sectors.forEach(function (sectorName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(sectorName);
		title_btns_container.append(newBtn);
		
		var hasClock = sectorsWithClock.indexOf(sectorName)>-1;
		if (hasClock) {
			newBtn.append(prototypeClockIcon.clone());
			newBtn.prepend(prototypeFixedTitleSpacer.clone());
		} else {
			newBtn.prepend(prototypeFixedTitleSpacer.clone());
			newBtn.append(prototypeFixedTitleSpacer.clone());
		}
		
		newBtn.click(function() {
			btn_clicked.children(".title_text").html(sectorName);
			//addTbar();
			hideAllDialogs();
			
			//REHAB sector has no acctBtn
			var acctBtn = tbar_clicked.children(".tbar_title_container").children(".acct_unit_btn");
			if (sectorName=="REHAB") {
				acctBtn.hide();
			} else {
				acctBtn.show();
			}
		});
	});
	
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
			//hideAllDialogs();
			if (isNewButton) {
				var actionsContainer = btn_clicked.parent();
				addActionButton(btn_clicked.tbar, actionsContainer);
				btn_clicked = actionsContainer.children(".blank_btn");
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
	$("#benchmark_primary_checklist").hide();
	
	var benchmark_primary_checkbox = $("#benchmark_primary_checkbox");
	benchmark_primary_checkbox.click(function() {
		if(benchmark_primary_checkbox.is(":checked")) {
			$("#benchmark_primary_checklist").show();
		} else {
			$("#benchmark_primary_checklist").hide();
		}
	});
}



/**
 * Objectives Dialog
 **/
function initObjectivesDialog( ) {
	var dialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "objectives_dialog";
	dialog.attr("id",newId);
	var dialogBody = dialog.children(".dialog_body");
	newId = "objectives_dialog_body";
	dialogBody.attr("id",newId);
	var titleDiv = dialog.children(".dialog_title").children(".dialog_title_text_container");
	titleDiv.html("Objectives");
	var objectives = ["All Clear",
						"Under Control",
						"Loss Stopped",
						"Upgrade to full recue",
						"Assing safety",
						"Establish supply line",
						"Secure utilities",
						"Ventilation",
						"Create \"On deck\"",
						"Pressurize exposures",
						"Monitor channel 16",
						"Salvage",
						"Establish rehab",
						"Occupant services"];
	
	objectives.forEach(function (objectiveText, index, array) {
		var chkBox = createCheckBox(objectiveText);
		dialogBody.append(chkBox);
	});
	
	var objectives_btn = $("#objectives_btn");
	objectives_btn.click(showDialog(0, objectives_btn, "#objectives_dialog"));
}



/**
 * OSR Dialog
 **/
function initOsrDialog( ) {
	var dialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "osr_dialog";
	dialog.attr("id",newId);
	var dialogBody = dialog.children(".dialog_body");
	newId = "osr_dialog_body";
	dialogBody.attr("id",newId);
	var titleDiv = dialog.children(".dialog_title").children(".dialog_title_text_container");
	titleDiv.html("OSR");
	var osrs = ["Unit ID",
				"Address",
				"Occupancy",
				"Construction",
				"Conditions",
				"Assume Command",
				"Location(mobile/cab)",
				"Strategy (off./def.)",
				"Attack line",
				"Water supply",
				"IRIC",
				"Accountability"];
	
	osrs.forEach(function (objectiveText, index, array) {
		var chkBox = createCheckBox(objectiveText);
		dialogBody.append(chkBox);
	});
	
	var osr_btn = $("#osr_btn");
	osr_btn.click(showDialog(0, osr_btn, "#osr_dialog"));
}




/**
 * Units Dialog
 **/
function toggleCity(city) {
	return function(){
		$(".unitCity_dialog_btn").removeClass("glow");
		$("#unit_city_btn_"+city).addClass("glow");
		$(".unit_dialog_btn").hide();
		$(".unit_dialog_btn."+city).show();
	}
}
function toggleType(type) {
	return function(){
		if ($("#unit_type_btn_"+type).hasClass("glow")) {
			$(".unitType_dialog_btn").removeClass("glow");
			$(".unitTypeColumn").show();
		} else {
			$(".unitType_dialog_btn").removeClass("glow");
			$("#unit_type_btn_"+type).addClass("glow");
			$(".unitTypeColumn").hide();
			$(".unit_type_"+type).show();
		}
	}
}
function initUnitsDialog( ) {
	var prototypeCityBtn 		= $("<div class=\"unitCity_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitTypeBtn 	= $("<div class=\"unitType_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitBtn 		= $("<div class=\"unit_dialog_btn unit_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitDiv 		= $("<div class=\"unitsDlg_units\"></div>");
	var prototypeUnitTypeColDiv = $("<div class=\"unitTypeColumn\"></div>");

	//Create Unit Type Buttons
	unitTypes.forEach(function (type, index, array) {
		var unitTypeBtn = prototypeUnitTypeBtn.clone().appendTo( "#unitsDlg_types" );
		unitTypeBtn.html(type);
		var newId = "unit_type_btn_"+type;
		unitTypeBtn.attr("id",newId);
		unitTypeBtn.click(toggleType(type));
	});
	
	//**** CITY *****
	$.each(unitsByTypeByCity, function( city, unitsByType ) {
		//Unit button
		var unitCityBtn = prototypeCityBtn.clone().appendTo("#unitsDlg_cities");
		unitCityBtn.html(city);
		var unitCityBtnId = "unit_city_btn_"+city;
		unitCityBtn.attr("id",unitCityBtnId);
		unitCityBtn.click(toggleCity(city));
		
		//Unit div
		var unitCityDiv = prototypeUnitDiv.clone().appendTo("#units_dlg_row2");
		var unitCityDivId = "unit_city_div_"+city;
		unitCityDiv.attr("id",unitCityDivId);
		
		//Populate unit div
		//**** TYPE *****
		$.each(unitsByType, function( type, units ) {
			var unitTypeCol = prototypeUnitTypeColDiv.clone().appendTo(unitCityDiv);
			unitTypeCol.addClass("unit_type_"+type);
			
			//**** UNIT *****
			units.forEach(function (unitName, index, array) {
				var unitBtn = prototypeUnitBtn.clone();
				unitTypeCol.append(unitBtn);
				unitBtn.html(unitName);
				if (unitName.length>5) {
					unitBtn.addClass("btn_largetext");
				} else if (unitName.length>4) {
					unitBtn.addClass("btn_medtext");
				}
				unitBtn.addClass(city);
				unitBtn.addClass(type);
				var newId = "unit_city_btn_"+city;
				unitBtn.attr("id",newId);
				unitBtn.click(function() {
					var isNewButton = btn_clicked.html()=="Unit";
					setUnitName(btn_clicked, unitName);
					btn_clicked.unbind( "click" );
					btn_clicked.click(showActionsForUnitBtn(btn_clicked));
					showActionsForUnitBtn(btn_clicked)();
					addEvent_unit_to_sector(unitName, "sector");
					hideAllDialogs();
					if (isNewButton) {
						var unitsContainer = btn_clicked.parent().parent();
						var actionsTopContainer = tbar_clicked.children(".tbar_body_container").children(".actions_column").children(".actions_parent_container");
						addUnitButton(unitsContainer, tbar_clicked);
					}
				});
			});
		});
	});
	$(".unit_dialog_btn").hide();
	toggleCity("Mesa")();
}


/**
 * T-Bars
 **/
function setUnitName(unitBtn, unitName) {
	unitBtn.html(unitName);
	if (unitName.length>5) {
		unitBtn.addClass("btn_largetext");
	} else if (unitName.length>4) {
		unitBtn.addClass("btn_medtext");
	}
	if (typeof unitBtn.actions_list !== "undefined") {
		var action_list_unit_name_title = unitBtn.actions_list.children(".action_list_unit_name_title");
		action_list_unit_name_title.html(unitName);
		unitBtn.actions_list.addClass(unitName);
		addActionButton(unitBtn.tbar, unitBtn.actions_list);
	}
}
function showActionsForUnitBtn(unitBtn) {
	return function(){
		var tbar = unitBtn.tbar;
		if (typeof tbar !== "undefined") {
			var actionsParentContainer = tbar.find(".actions_parent_container");
			actionsParentContainer.children(".actions_list").hide();
			actionsParentContainer.children("."+unitBtn.html()).show();
			
			// Highlight select unit
			tbar.find(".single_unit_div").removeClass("single_unit_div_on");
			unitBtn.parent().addClass("single_unit_div_on");
			
			// Update PAR and PSI buttons
			var psiBtn = unitBtn.parent().children(".psi_btn");
			psiBtn.click(showDialog(tbar, psiBtn, "#psi_dialog"));
			psiBtn.removeClass("par_psi_hidden");
			
			var parBtn = unitBtn.parent().children(".par_btn");
			parBtn.click(showDialog(tbar, parBtn, "#par_dialog"));
			parBtn.removeClass("par_psi_hidden");
		}
	  }
}
function addUnitButton(unitsContainer, tbar) {
	unitsContainer.children().children().removeClass("blank_btn");
	var singleUnitContainer = $("<div class=\"single_unit_div\"></div>").clone();
	var psiBtn = $("<div class=\"psi_btn par_psi_hidden tbar_unit_btn button\">PSI</div>").clone();
	var unitBtn = $("<div class=\"blank_btn tbar_unit_btn unit_btn button\">Unit</div>").clone();
	unitBtn.tbar = tbar;
	singleUnitContainer.append(psiBtn);
	singleUnitContainer.append(unitBtn);
	unitsContainer.append(singleUnitContainer);
	unitBtn.click(showDialog(tbar, unitBtn, "#units_dialog"));
	
	// Create the actions column for this unit
	var actions_list = $("<div class=\"actions_list\"></div>");
	tbar.find(".actions_parent_container").append(actions_list);
	unitBtn.actions_list = actions_list;
}
function addActionButton(tbar, actionsContainer) {
	console.log(actionsContainer);
	actionsContainer.children().removeClass("blank_btn");
	var actionBtn = $("<div class=\"blank_btn action_btn button\">Action</div>").clone();
	actionsContainer.append(actionBtn);
	actionBtn.tbar = tbar;
	actionBtn.click(showDialog(tbar, actionBtn, "#actions_dialog"));
}
var tbarIndex = 1;
function addTbar() {
	//Init T-Bars
	
	for (tbarIndex=1; tbarIndex<=4; tbarIndex++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo( "#tbar_container" );
		tbar.prefix_dir = 'X';
		tbar.prefix_num = 'X';
		var newId = "tbar_"+tbarIndex;
		tbar.attr("id",newId);
		
		//Title Btn
		var titleBtn = tbar.find(".title_btn");
		var titleBtnId = "tbar_title_"+tbarIndex;
		titleBtn.attr("id", titleBtnId);
		titleBtn.click(showSectorDialog(tbar, titleBtn, "#sector_dialog"));
		var tbarDirBtn = $(".title_dir");
		var tbarNumBtn = $(".title_num");
		tbarDirBtn.hide();
		tbarNumBtn.hide();
		
		
		//PAR (Sector) button
		var parBtn = tbar.find(".par_btn");
		parBtn.click(showParDialog(tbar, parBtn));
		
		//Accountability button
		var acctBtn = tbar.find(".acct_unit_btn");
		acctBtn.click(showDialog(tbar, acctBtn, "#units_dialog"));
		
		//Benchmark Btn
		var benchmarkBtn = tbar.find(".benchmark_btn");
		var benchmarkBtnId = "tbar_benchmark_"+tbarIndex;
		benchmarkBtn.attr("id", benchmarkBtnId);
		benchmarkBtn.click(showDialog(tbar, benchmarkBtn, "#benchmark_dialog"));
		
		//Action Btn
		//var actionBtnContainer = tbar.find(".actions_parent_container");
		//actionBtnContainer.manyBtns = 0;
		//console.log(actionBtnContainer);
		//addActionButton(tbar, actionBtnContainer);
		
		//Unit Btn
		var unitBtnContainer = tbar.find(".units_container");
		unitBtnContainer.manyBtns = 0;
		addUnitButton(unitBtnContainer, tbar);
	}
}


/**
 * Init Safety Dialog
 **/
function showSideDialog( btn, dialogId ){
  return function(){
	var dlg_side = $(dialogId);
	var dlg_side_container = $(dialogId+"_container");
	var showMe = false;

	if (dlg_side_container.is(":hidden") ) {
		showMe = true;
	}
	
	hideAllDialogs();
	
	if (showMe) {
		btn_clicked = btn;
		dlg_side_container.show();
		
		// Reposition side dialog
		var btn_top = btn.offset().top;
		var btn_left = btn.offset().left;
		
		dlg_side_container.offset({ top:btn_top-3, left:btn_left-dlg_side.width()-12});
	}
  }
}
function initSafetyDialog() {
	var prototypeSafetyBtn = $("<div class=\"safety_btn button\">PROTOTYPE</div>");
	safteyNames.forEach(function (safetyName, index, array) {
		var safetyBtn = prototypeSafetyBtn.clone().appendTo( "#safety_side_dialog" );
		safetyBtn.html(safetyName);
		var newId = "safety_dialog_btn_"+safetyName;
		safetyBtn.attr("id",newId);
		safetyBtn.click(function() {
			btn_clicked.html(safetyName);
			hideAllDialogs();
			});
	});
	var safetyBtn = $("#safety_btn");
	safetyBtn.click(showSideDialog(safetyBtn, "#safety_side_dialog"));
}


/**
 * Init Mode Dialog
 **/
function initModeDialog() {
	$("#offensive_btn").click(function() {
			btn_clicked.html($("#offensive_btn").html());
			btn_clicked.removeClass("defensive_btn");
			btn_clicked.addClass("offensive_btn");
			hideAllDialogs();
			});
	$("#defensive_btn").click(function() {
			btn_clicked.html($("#defensive_btn").html());
			btn_clicked.removeClass("offensive_btn");
			btn_clicked.addClass("defensive_btn");
			hideAllDialogs();
			});
	var modeBtn = $("#mode_btn");
	modeBtn.click(showSideDialog(modeBtn, "#mode_side_dialog"));
	//init
	modeBtn.html($("#offensive_btn").html());
	modeBtn.addClass("offensive_btn");
}


/**
 * Init Command Terminate Dialog
 **/
function terminateCommand() {
	generateReport();
	hideAllDialogs();
}
function dontTerminateCommand() {
	hideAllDialogs();
}
function initCmdTerminateDialog( ) {
	var cmdTrmDialog = $("#dialog_prototype" ).clone().appendTo( "#dialogContainer" );
	var newId = "cmd_trm_dialog";
	cmdTrmDialog.attr("id",newId);
	var dialogBody = cmdTrmDialog.children(".dialog_body");
	var titleDiv = cmdTrmDialog.find(".dialog_title_text_container");
	titleDiv.html("Terminate Command?");
	var question_div = $("<div class=\"dialog_question\">Are you sure you want to terminate command of this incident?</div>");
	var prototypeBtn = $("<div class=\"yes_no_btn dialog_btn button\">PROTOTYPE</div>");
	var yesBtn = prototypeBtn.clone();
	var noBtn = prototypeBtn.clone();
	yesBtn.html("YES");
	noBtn.html("NO");
	dialogBody.append(question_div);
	dialogBody.append(yesBtn);
	dialogBody.append(noBtn);
	yesBtn.click(terminateCommand);
	noBtn.click(dontTerminateCommand);
	
	var cmdTrmBtn = $("#cmd_term_btn");
	cmdTrmBtn.click(showDialog(0, cmdTrmBtn, "#cmd_trm_dialog"));
}


/**
 * Init Incident Info
 **/
function initIncidentInfo() {
	var inc_num_input = getHttpRequestByName("inc_num_input");
	inc_num_input = decodeURIComponent(inc_num_input);
	$("#inc_num").html(inc_num_input);
	
	var address_input = getHttpRequestByName("address_input");
	address_input = decodeURIComponent(address_input);
	$("#address").html(address_input);
}
function getHttpRequestByName(name) {
	get_string = document.location.search;         
	return_value = '';
	
	do { //This loop is made to catch all instances of any get variable.
	   name_index = get_string.indexOf(name + '=');
	   
	   if(name_index != -1)
		 {
		 get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
		 
		 end_of_value = get_string.indexOf('&');
		 if(end_of_value != -1)                
		   value = get_string.substr(0, end_of_value);                
		 else                
		   value = get_string;                
		   
		 if(return_value == '' || value == '')
			return_value += value;
		 else
			return_value += ', ' + value;
		 }
	   } while(name_index != -1)
	   
	//Restores all the blank spaces.
	space = return_value.indexOf('+');
	while(space != -1)
		 { 
		 return_value = return_value.substr(0, space) + ' ' + 
		 return_value.substr(space + 1, return_value.length);
						
		 space = return_value.indexOf('+');
		 }
	 
	return(return_value);        
}//getHttpRequestByName


/**
 * Init Timer
 **/
var t0;
var hourRollOverDone = false;
function startIncidentTimer() {
	t0 = (new Date()).getTime();
}
function updateTimer() {
	var t1 = (new Date()).getTime();
	var elapsed = parseInt(t1-t0);
	var elapsedSec = parseInt((elapsed/1000)%60);
	var elapsedMin = parseInt((elapsed/(1000*60))%60);
	var elapsedHr = parseInt((elapsed/(1000*60*60))%60);
	
	var secStr = (elapsedSec<10)?("0"+elapsedSec):elapsedSec;
	var minStr = (elapsedMin<10)?("0"+elapsedMin):elapsedMin;
	var hrStr = (elapsedHr<10)?("0"+elapsedHr):elapsedHr;
	
	if (elapsedHr>0) {
		if (!hourRollOverDone) {
			$("#time").removeClass("time_lg");
			hourRollOverDone = true;
		}
		$("#time").html(hrStr+":"+minStr+":"+secStr);
	} else {
		$("#time").html(minStr+":"+secStr);
	}
}



function init( ) {
	addTbar();
	$("#tbar_prototype").hide();
	
	//Init Dialogs
	initSectorDialog();
	//initParDialog();
	//initPsiDialog();
	//initActionsDialog();
	//initUnitsDialog();
	//initBenchmarkDialog();
	initSafetyDialog();
	initModeDialog();
	//$("#report_btn").click(generateReport);
	//initCmdTerminateDialog();
	//initMaydayDialog();
	//initObjectivesDialog();
	//initOsrDialog();
	initIncidentInfo();
	
	$("#dialogContainer").hide();
	$("#dialog_prototype").hide();
	$(".dialog_close_btn").click(hideAllDialogs);
	
	$("#units_dialog").show();
	
	hideAllDialogs();
	
	window.setTimeout(blinkUnit, 500);
	window.setInterval(updateTimer, 1000);
}

//Call this to dismiss the dialogs
function hideAllDialogs( ) {
	$("#dialogContainer").hide();
	$(".side_dialog_container").hide();
}

$.fn.exists = function () {
    return this.length !== 0;
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

var sectorsWithClock = [
	"Interior",
	"Medical",
	"Safety",
	"Cust Service",
	];

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
var medic="Medic";
var u="Util";
var cv="CV";
var wt="WtrTend";
var hm="Haz Mat";
var br="Brush";
var rehab="Rehab";
var specialIncident="Spec Inc";
var sceneSupport="Scn Sup";
var supportVehicle="Sup Veh";
var fireBoat = "Fire Bt";
var ambo = "Ambo";
var unitTypes = [
	engine,
	ladder,
	bc,
	squad,
	medic,
	u,
	cv,
	wt,
	hm,
	br,
	rehab,
	specialIncident,
	supportVehicle,
	fireBoat,
	ambo];
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
		ambo:[
			"SWA201",
			"SWA202",
			"SWA203",
			"SWA204",
			"SWA205",
			"SWA206",
			"SWA207",
			"SWA208",
			"SWA209",
			"SWA210",
			"SWA211",
			"SWA212",
			"SWA220",
			"SWA221",
			"SWA222",
			"SWA223",
			"SWA224",
			"SWA225",
			"SWA226",
			"SWA227",
			"SWA228",
			"SWA229",
		],
	},
	"Gilbert":{
		engine:[
			"E251",
			"E252",		
			"E254",		
			"E256",		
			"E257",		
			"E258",		
			"E2510",		
			"E2511",		
			"E2540"],		
		ladder:[
			"L251",
			"L253",
			"L252",
			"Lt251",
			"Lt253",
			"Lt252",],
		bc:[
			"BC251",
			"BC252",],
		u:[
			"U251",],
		cv:[
			"CV251",],
		wt:[
			"WT256",],
		hm:[
			"HM258",],
		br:[
			"Br2511",],
		ambo:[
			"SWA261",
			"SWA262",
			"SWA255",],
	},
	
	"QC":{
		engine:["E412"],
		bc:["BC411"],
		ambo:[
			"SWA411",],
	},
	
	"AJ":{
		engine:[
			"E262",
			"E265"],
		ladder:[
			"L263",
			"L264"],
		bc:["BC261"],
		ambo:[
			"SWA251",
			"SWA252",
			"SWA253",
			"SWA255",],
		wt:["WT261"],
		br:["BT261"],
		rehab:["RH261"],
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
			"E289",
			"E2810",
			"E2282"],
		ladder:[
			"L281",
			"L283",
			"Lt281",
			"Lt283"],
		bc:[
			"BC281",
			"BC282"],
		squad:[
			"SQ283",],
		hm:[
			"HM283",],
		u:[
			"U288",],
		br:[
			"Br284",],
	},
	
	"Tempe":{
		engine:[
			"E271",
			"E272",
			"E273",
			"E274",
			"E275",
			"E276",
			"E277",
			"E278"],
		ladder:[
			"L273",
			"L276",
			"Lt273",
			"Lt276"],
		bc:[
			"BC271"],
		medic:[
			"Med271",
			"Med272",
			"Med276"],
		specialIncident:[
			"SI272"
		],
		sceneSupport:[
			"SS274"
		],
		supportVehicle:[
			"SV276"
		],
		fireBoat:[
			"FB271"
		],
	},
	
	"Superstn":{
		engine:[
			"E261",
			"E262",
			"E265",],
		ladder:[
			"L263",
			"L264",
			"Lt263",
			"Lt264"],
		bc:[
			"BC261",
			"BC262"],
		wt:[
			"WT261",],
		u:[
			"U262",],
		rehab:[
			"RH264"],
	},
};

var safteyNames = [
	"Cross",
	"Fox",
	"Jones",
	"Smith",];


