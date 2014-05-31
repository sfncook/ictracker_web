

var btn_clicked;
var tbar_clicked;

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
function startTbarParTimer(tbar) {
    var parDialog = $("#par_dialog");
    tbar.find('.par_btn').addClass('has_par');
    tbar['par_timer'] = setTimeout(function(){cancelTbarParTimer(tbar);},(5*60*1000));
}
function cancelTbarParTimer(tbar) {
    var parDialog = $("#par_dialog");
    tbar.find('.par_btn').removeClass('has_par');
    if(typeof tbar['par_timer'] != 'undefined') {
        window.clearTimeout(tbar['par_timer']);
    }
    tbar.find(".has_par").removeClass("has_par");
    tbar['btn_ids_with_par'] = new Array();
}
function togglePar(btn, btnSelector) {
    return function() {
        if(btn.hasClass("has_par")) {
            // Turn OFF PAR
            $(btnSelector).removeClass("has_par");
        } else {
            // Turn ON PAR
            $(btnSelector).addClass("has_par");
        }

        // If this is a person button, then check if all sibling person buttons are green or if any are missing
        if(btn.hasClass("par_person_btn")) {
            var par_dialog_people = btn.parents(".par_dialog_people");
            var peopleWithOutPar = par_dialog_people.find(".par_person_btn:not(.has_par)");
            if(peopleWithOutPar.length==0) {
                btn.parents(".par_dialog_unit").find(".par_unit_btn").addClass("has_par");
            } else {
                btn.parents(".par_dialog_unit").find(".par_unit_btn").removeClass("has_par");
            }
        }

        // If all items have PAR (i.e. *NONE are NOT has_par*) then start the TBar PAR timer
        var btnsNoPar = $("#par_dialog").find(".par_dialog_btn:not(.has_par)");
        if(btnsNoPar.length<=1) {
            $("#par_dialog_sector_btn").addClass("has_par");
            startTbarParTimer(tbar_clicked);
        } else {
            $('#par_dialog_sector_btn').removeClass('has_par');
            cancelTbarParTimer(tbar_clicked);
        }

        // Save all items w/ PAR for next time this TBar opens PAR dialog
        var btn_ids_with_par = new Array();
        var btnsWithPar = $("#par_dialog").find(".par_dialog_btn.has_par");
        btnsWithPar.each(function( index ) {
            btn_ids_with_par.push($(this).attr('id'));
        });
        tbar_clicked['btn_ids_with_par'] = btn_ids_with_par;
    };
}
function showParDialog( tbar, btn ){
  return function(){
    btn_clicked = btn;
	tbar_clicked = tbar;
    var parDialog = $("#par_dialog");

	// Sector PAR
	var par_dialog_sector_btn = $("#par_dialog_sector_btn");
	var tbarTitle = tbar.find(".title_text").html();
	par_dialog_sector_btn.html(tbarTitle);

	// Units PAR
	var par_dialog_units = $("#par_dialog_units");
	par_dialog_units.empty();
	var tbarUnitBtns = tbar.find(".unit_btn").not(".blank_btn").not(".acct_unit_btn");
	if (tbarUnitBtns.length>0) {
	    var unitNames = new Array();
	    var unitBtns = new Array();
		tbarUnitBtns.each(function( index ) {
			var par_dialog_unit = $("#par_dialog_unit_prototype").clone();
			par_dialog_unit.show();
			par_dialog_unit.appendTo(par_dialog_units);
			var unit_name = $(this).html();
			unitNames.push(unit_name);

			par_dialog_unit.attr("id", "par_dialog_unit_"+unit_name);

			var unitBtn = par_dialog_unit.find(".par_unit_btn").first();
			unitBtns.push(unitBtn);

			unitBtn.html(unit_name);
            unitBtn.click(togglePar(unitBtn, "#par_unit_btn_"+unit_name+",.par_person_btn_"+unit_name));

            var captain_btn = par_dialog_unit.find(".captain_btn").first();
            var engineer_btn = par_dialog_unit.find(".engineer_btn").first();
		    var firefighter1_btn = par_dialog_unit.find(".firefighter1_btn").first();
		    var firefighter2_btn = par_dialog_unit.find(".firefighter2_btn").first();

		    unitBtn.attr("id", "par_unit_btn_"+unit_name);
		    captain_btn.attr("id", "captain_btn"+unit_name);
		    engineer_btn.attr("id", "engineer_btn"+unit_name);
		    firefighter1_btn.attr("id", "firefighter1_btn"+unit_name);
		    firefighter2_btn.attr("id", "firefighter2_btn"+unit_name);

		    captain_btn.addClass("par_person_btn_"+unit_name);
		    engineer_btn.addClass("par_person_btn_"+unit_name);
		    firefighter1_btn.addClass("par_person_btn_"+unit_name);
		    firefighter2_btn.addClass("par_person_btn_"+unit_name);

		    captain_btn.click(togglePar(captain_btn, "#captain_btn"+unit_name));
		    engineer_btn.click(togglePar(engineer_btn, "#engineer_btn"+unit_name));
		    firefighter1_btn.click(togglePar(firefighter1_btn, "#firefighter1_btn"+unit_name));
		    firefighter2_btn.click(togglePar(firefighter2_btn, "#firefighter2_btn"+unit_name));
		});
		$(".mayday_par_btn").click(showMaydayDialog);
	}

    parDialog.find('.button:not(.dialog_close_btn)').removeClass('has_par');
	if(typeof tbar['btn_ids_with_par'] != 'undefined') {
	    $.each( tbar['btn_ids_with_par'], function(index, btnId) {
	        $('#'+btnId).addClass('has_par');
        });
	}

	// Show PAR dialog
	$(".dialog").hide();
	$(".side_dialog_container").hide();
	parDialog.show();
	$("#dialogContainer").show();
  }
}
function initParDialog( ) {
	var parDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "par_dialog";
	parDialog.attr("id",newId);
	var parDialogBody = parDialog.children(".dialog_body");
	parDialog.addClass("par_dialog_body");
	var parTitleDiv = parDialog.find(".dialog_title_text");
	parTitleDiv.html("Sector PAR");

	var parbody_containers = $('<div id="par_dialog_sector"><div id="par_dialog_sector_btn" class="title_text title_btn par_dialog_btn dialog_btn button"></div></div><div id="par_dialog_units"></div>');
	parbody_containers.appendTo(parDialogBody);
	var par_dialog_sector_btn = $("#par_dialog_sector_btn");
    par_dialog_sector_btn.click(togglePar(par_dialog_sector_btn, ".par_dialog_btn"));

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
	var psiDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "psi_dialog";
	psiDialog.attr("id",newId);
	var psiDialogBody = psiDialog.children(".dialog_body");
	var psiTitleDiv = psiDialog.find(".dialog_title_text");
	psiTitleDiv.html("PSI Values");
	var prototypeBtn = $("<div class=\"col-xs-12 psi_btn dialog_btn button\">PROTOTYPE</div>");
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
function clickMaydayChkbox(btn) {
    return function() {
//        if(btn.hasClass("mayday_square_off")) {
//            btn.removeClass("mayday_square_off");
//            btn.addClass("mayday_square_on");
//        } else if(btn.hasClass("mayday_square_on")) {
//            btn.removeClass("mayday_square_on");
//            btn.addClass("mayday_square_off");
//        } else  if(btn.hasClass("mayday_circle_off")) {
//            btn.removeClass("mayday_circle_off");
//            btn.addClass("mayday_circle_on");
//        } else if(btn.hasClass("mayday_circle_on")) {
//            btn.removeClass("mayday_circle_on");
//            btn.addClass("mayday_circle_off");
//        }
    }
}
function initMaydayDialog( ) {
	var maydayBtn = $("#mayday_btn");
	maydayBtn.click(showMaydayDialog);
    $("#mayday_unit_btn").click(function(){});
}



/**
 * Sector Dialog
 **/
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
	tbar_clicked.prefix_dir
	$(".dir_supl_info_dir_btn").removeClass("glow_orange");
	$("."+tbar.prefix_dir+"_supl_btn").addClass("glow_orange");
	
	//Toggle prefix_num buttons
	$(".dir_supl_info_num_btn").removeClass("glow_orange");
	$("."+tbar.prefix_num+"_supl_btn").addClass("glow_orange");
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
	var tbarDirBtn = tbar_clicked.find(".title_dir");
	if (btn.hasClass("glow_orange")) {
		$(".dir_supl_info_dir_btn").removeClass("glow_orange");
		tbar_clicked.prefix_dir = 'X';
		tbarDirBtn.hide();
	} else {
		$(".dir_supl_info_dir_btn").removeClass("glow_orange");
		btn.addClass("glow_orange");
		tbar_clicked.prefix_dir = btn.html();
		tbarDirBtn.show();
		tbarDirBtn.html(btn.html());
	}
}
function toggleNumBtn(btn) {
	var tbarNumBtn = tbar_clicked.find(".title_num");
	if (btn.hasClass("glow_orange")) {
		$(".dir_supl_info_num_btn").removeClass("glow_orange");
		tbar_clicked.prefix_num = 'X';
		tbarNumBtn.hide();
	} else {
		$(".dir_supl_info_num_btn").removeClass("glow_orange");
		btn.addClass("glow_orange");
		tbar_clicked.prefix_num = btn.html();
		tbarNumBtn.show();
		tbarNumBtn.html(btn.html());
	}
}
function setTbarSectorTitle(tbar, sectorName) {
    tbar.find(".title_text").html(sectorName);
    //addTbar();
    hideAllDialogs();
}
function initSectorDialog( ) {
	var sectorDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "sector_dialog";
	sectorDialog.attr("id",newId);
	var dialog_title_text = sectorDialog.find(".dialog_title_text");
	dialog_title_text.html("Sectors");
	var dialog_body = sectorDialog.find(".dialog_body");
	
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
	var prototypeClockIcon = $("<img class=\"clock_icon\" src=\"images/clock.png\"/>");
	sectors.forEach(function (sectorName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(sectorName);
		title_btns_container.append(newBtn);

		if(sectorName=="") {
		    newBtn.addClass("hidden_sector_btn");
		}
		
		var hasClock = sectorsWithClock.indexOf(sectorName)>-1;
		if (hasClock) {
			newBtn.append(prototypeClockIcon.clone());
			newBtn.prepend(prototypeFixedTitleSpacer.clone());
		} else {
			newBtn.prepend(prototypeFixedTitleSpacer.clone());
			newBtn.append(prototypeFixedTitleSpacer.clone());
		}
		
		newBtn.click(function() {
		    if(!newBtn.hasClass("hidden_sector_btn")) {
                setTbarSectorTitle(tbar_clicked, sectorName);
                updateTbar(tbar_clicked);
                if($(".title_text:contains('Sector Title'):not(#tbar_prototype)").length<=1) {
                    addTbar($("#tbar_container"));
                }
            }
		});
	});
	
}



/**
 * Actions Dialog
 **/
function initActionsDialog( ) {
	var actionsDialog = $("#dialog_prototype" ).clone().appendTo("#dialog_vertical_align_cell");
	var newId = "actions_dialog";
	actionsDialog.attr("id",newId);
	var actionsDialogBody = actionsDialog.children(".dialog_body");
	var actionsTitleDiv = actionsDialog.find(".dialog_title_text");
	actionsTitleDiv.html("Actions");
	var prototypeBtn = $("<div class=\"actions_dialog_btn col-xs-2 action_btn dialog_btn button\">PROTOTYPE</div>");
	actions.forEach(function (actionName, index, array) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(actionName);

		if(actionName=="") {
		    newBtn.addClass("hidden_sector_btn");
		}

		actionsDialogBody.append(newBtn);
		newBtn.click(function() {
		    if(!newBtn.hasClass("hidden_sector_btn")) {
                var isNewButton = btn_clicked.html()=="Action";
                btn_clicked.html(actionName);
                //hideAllDialogs();
                if (isNewButton) {
                    var actionsContainer = btn_clicked.parent();
                    addActionButton(btn_clicked.tbar, actionsContainer);
                    btn_clicked = actionsContainer.children(".blank_btn");
                }
            }
        });
	});
}



/**
 * Benchmark Dialog
 **/
function createCheckBox(label, id) {
	var chkContainer = $("<div id=\""+id+"\" class=\"horiz_chkbox\"></div>").clone();
	var chkBtn = $("<input type=\"checkbox\" class=\"chk_btn dialog_btn button\"\>").clone();
	var labelBtn = $("<div class=\"chk_label\"\></div>").clone();
	labelBtn.html(label);
	chkContainer.append(chkBtn);
	chkContainer.append(labelBtn);
	chkContainer.append($('<div class="clear_float"/>'));
	return chkContainer;
}
var right_cols = {};
var benchmarks = [
        {
            id:"bnch_primary", label:"Primary All Clear",
            secondaries:[
                {id:"bnch_primary_par", label:"PAR"},
                {id:"bnch_primary_notify", label:"Notify Alarm"},
                {id:"bnch_primary_challenge", label:"Challenge Strategy"}]
        },{
            id:"bnch_underctl", label:"Under Control",
            secondaries:[
                {id:"bnch_underctl_par", label:"PAR"},
                {id:"bnch_underctl_notify", label:"Notify Alarm"},
                {id:"bnch_underctl_obtain", label:"Obtain Secondary"}]
        },{
            id:"bnch_secondary", label:"Secondary All Clear",
            secondaries:[
                {id:"bnch_secondary_par", label:"PAR"},
                {id:"bnch_secondary_notify", label:"Notify Alarm"}]
        },{
            id:"bnch_lossstop", label:"Loss Stop",
            secondaries:[
                {id:"bnch_lossstop_par", label:"PAR"},
                {id:"bnch_lossstop_notify", label:"Notify Alarm"}]
        }];
function initBenchmarkDialog( ) {
    var dialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "benchmarks_dialog";
	dialog.attr("id",newId);
	var dialogBody = dialog.children(".dialog_body");
	newId = "benchmarks_dialog_body";
	dialogBody.attr("id",newId);
	var titleDiv = dialog.find(".dialog_title_text");
	titleDiv.html("Benchmarks");

	var left_col = $('<div class="benchmark_col_container benchmark_1st_col_container"/>');
	left_col.appendTo(dialogBody);


    benchmarks.forEach(function (benchmark, index, array) {
        var chkBox_primary = createCheckBox(benchmark.label, benchmark.id);
        chkBox_primary.addClass("benchmark_checkbox_container");
        left_col.append(chkBox_primary);

        var right_col = $('<div class="benchmark_col_container benchmark_2nd_col_container"/>');
        right_col.appendTo(dialogBody);
        right_col.hide();
        right_cols[benchmark.id] = right_col;
        benchmark.secondaries.forEach(function (benchmark_2, index, array) {
            var chkBox_2 = createCheckBox(benchmark_2.label, benchmark_2.id);
            chkBox_2.find(".chk_btn").click(clickSecondaryBenchmark(chkBox_2));
            right_col.append(chkBox_2);
        });

        chkBox_primary.find(".chk_btn").click(clickPrimaryBenchmark(chkBox_primary));
	});

	btnsToBlink.push($("#bnch_primary_challenge"));
}
function clickPrimaryBenchmark(chkbox_container) {
    return function() {
        var chk_btn = chkbox_container.find(".chk_btn")[0];
        if(chk_btn.checked) {
            // If user Checked the box
            tbar_clicked['primary_benchmark'] = chkbox_container.attr('id');
            setBenchmark(chkbox_container.attr('id'));
        } else {
            // If user UN-checked the box
            resetSecondaryBenchmarks(tbar_clicked, chkbox_container.attr('id'));
            if(chkbox_container.attr('id')=='bnch_primary'){
                tbar_clicked['primary_benchmark'] = '';
                resetBenchmarks();
            } else {
                tbar_clicked['primary_benchmark'] = chkbox_container.prev().attr('id');
                setBenchmark(chkbox_container.prev().attr('id'));
            }
        }
    };
}
function resetBenchmarks() {
    // Disable ALL
    $('.benchmark_checkbox_container').each(function (index) {
        $(this).find(".chk_btn").attr("disabled", true);
        $(this).find(".chk_btn").prop("checked", false);
        $(this).find(".chk_label").addClass("disabled");
        $(this).removeClass("glow_orange");
    });
    $('.benchmark_2nd_col_container').hide();

    // Enable but do not check, nor select first chkbox
    $("#bnch_primary").find(".chk_btn").attr("disabled", false);
    $("#bnch_primary").find(".chk_label").removeClass("disabled");
}
function setBenchmark(chkbox_container_id) {
    var chkbox_container = $("#"+chkbox_container_id);
    var chk_btn = $(chkbox_container.find(".chk_btn")[0]);
    var chk_label = $(chkbox_container.find(".chk_label")[0]);

    chk_btn.attr("disabled", false);
    chk_btn.prop("checked", true);
    chk_label.removeClass("disabled");
    chkbox_container.addClass("glow_orange");

    // Show right-side
    $('.benchmark_2nd_col_container').hide();
    var right_col = right_cols[chkbox_container_id];
    right_col.show();

    // Remove glow_orange from previous
    chkbox_container.prevAll().each(function (index) {
        $(this).find(".chk_btn").attr("disabled", false);
        $(this).find(".chk_btn").prop("checked", true);
        $(this).find(".chk_label").removeClass("disabled");
        $(this).removeClass("glow_orange");
    });

    // Disable ALL next
    chkbox_container.nextAll().each(function (index) {
        $(this).find(".chk_btn").attr("disabled", true);
        $(this).find(".chk_btn").prop("checked", false);
        $(this).find(".chk_label").addClass("disabled");
        $(this).removeClass("glow_orange");
    });

    if(chkbox_container.next().hasClass("benchmark_checkbox_container")) {
        chkbox_container.next().find(".chk_btn").attr("disabled", false);
        chkbox_container.next().find(".chk_label").removeClass("disabled");
        chkbox_container.next().removeClass("glow_orange");
    }
}
function clickSecondaryBenchmark(chkBox_2) {
    return function() {
        var chkbox = chkBox_2.find(".chk_btn")[0];
        tbar_clicked[chkBox_2.attr('id')] = chkbox.checked;
    };
}
function resetSecondaryBenchmarks(tbar, chkbox_container_id) {
    return function() {
        var right_col = right_cols[chkbox_container.attr('id')];

        right_col.find(".chk_btn").each(function (index) {
            $(this).prop("checked", false);
        });

        right_col.find(".horiz_chkbox").each(function (index) {
            tbar[$(this).attr('id')] = false;
        });
    };
}
function showBenchmarkDialog(tbar, benchmarkBtn) {
    return function() {
        // Update all checkboxes
        benchmarks.forEach(function (benchmark, index, array) {
            if(typeof tbar[benchmark.id] != 'undefined' && tbar[benchmark.id]) {
                $('#'+benchmark.id).find(".chk_btn").prop('checked', true);
            } else {
                $('#'+benchmark.id).find(".chk_btn").prop('checked', false);
            }
        });

        // Show the dialog box
        showDialog(tbar, benchmarkBtn, "#benchmarks_dialog")();
        if(typeof tbar['primary_benchmark'] != 'undefined') {
            setBenchmark(tbar['primary_benchmark']);
        } else {
            resetBenchmarks();
        }
    };
}



/**
 * Objectives Dialog
 **/
function initObjectivesDialog( ) {
	var dialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var objectiveBtnPrototype = $("<div class=\"objective_btn button\"></div>");
	var newId = "objectives_dialog";
	dialog.attr("id",newId);
	var dialogBody = dialog.children(".dialog_body");
	newId = "objectives_dialog_body";
	dialogBody.attr("id",newId);
	var titleDiv = dialog.find(".dialog_title_text");
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
        var btn = objectiveBtnPrototype.clone().html(objectiveText);
		dialogBody.append(btn);
		btn.click(function() {btn.toggleClass("glowlightgreen");});
	});
	
	var objectives_header_btn = $("#objectives_header_btn");
	objectives_header_btn.click(showDialog(0, objectives_header_btn, "#objectives_dialog"));
}



/**
 * OSR Dialog
 **/
function initOsrDialog( ) {
	var dialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "osr_dialog";
	dialog.attr("id",newId);
	var dialogBody = dialog.children(".dialog_body");
	newId = "osr_dialog_body";
	dialogBody.attr("id",newId);
	var titleDiv = dialog.find(".dialog_title_text");
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
	
	osrs.forEach(function (osrText, index, array) {
		var chkBox = createCheckBox(osrText, "osr_"+osrText);
		dialogBody.append(chkBox);
	});
	
	var osr_btn = $("#osr_btn");
	osr_btn.click(showDialog(0, osr_btn, "#osr_dialog"));
}



/**
 * IAP Dialog
 **/
function clickIapToggleBtn(btn) {
    return function() {
        if(btn.hasClass("glow_orange")) {
            btn.removeClass("glow_orange");
        } else {
            btn.addClass("glow_orange");
        }
    };
}
function initIapDialog( ) {

    $.each($(".iap_toggle_btn"), function( index, stuff) {
        $(this).click(clickIapToggleBtn($(this)));
    });

    $("#iap_evacloc_input_container").hide();
    $("#iap_btn_evacloc").click(
        function() {
            $("#iap_evacloc_input_container").toggle();
            if($("#iap_evacloc_input_container").is(":visible")) {
                $("#iap_btn_evacloc").html("Hide Evacuation Location");
            } else {
                $("#iap_btn_evacloc").html("Show Evacuation Location");
            }
        }
    );

    var iap_btn = $("#iap_btn");
	iap_btn.click(showDialog(0, iap_btn, "#iap_dialog"));
}




/**
 * Units Dialog
 **/
function toggleCity(city, unitsByType) {
	return function(){
		$(".unitCity_dialog_btn").removeClass("glow_blue");
		$("#unit_city_btn_"+city).addClass("glow_blue");
		$(".unit_dialog_btn").hide();
		$(".unit_dialog_btn."+city).show();
		$(".units_dialog_citybtns_div").hide();
		$("#unit_city_div_"+city).show();

        $(".unitType_dialog_btn").hide();
		$.each(unitsByType, function( type, units ) {
		    $("#unit_type_btn_"+type).show();
		});
	}
}
function toggleType(type) {
	return function(){
		if ($("#unit_type_btn_"+type).hasClass("glow_blue")) {
			$(".unitType_dialog_btn").removeClass("glow_blue");
			$(".unitTypeColumn").show();
		} else {
			$(".unitType_dialog_btn").removeClass("glow_blue");
			$("#unit_type_btn_"+type).addClass("glow_blue");
			$(".unitTypeColumn").hide();
			$(".unit_type_"+type).show();
		}
	}
}
function initUnitsDialog( ) {
	var prototypeCityBtn 		= $("<div class=\"unitCity_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitTypeBtn 	= $("<div class=\"unitType_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitBtn 		= $("<div class=\"unit_dialog_btn unit_btn dialog_btn button\">PROTOTYPE</div>");
	var prototypeUnitTypeColDiv = $("<div class=\"unitTypeColumn\"></div>");
	
	var unitsDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "units_dialog";
	unitsDialog.attr("id",newId);
	var dialog_title_text = unitsDialog.find(".dialog_title_text");
	dialog_title_text.html("Units");
	var dialog_body = unitsDialog.find(".dialog_body");
	
	var citiesDiv = $('<div id="units_dialog_cities_div"></div>').appendTo(dialog_body);
	var typesDiv = $('<div id="units_dialog_types_div"></div>').appendTo(dialog_body);;
	var btnsDivProto = $('<div class="units_dialog_citybtns_div"></div>');

	//Create Unit Type Buttons
	unitTypes.forEach(function (type, index, array) {
		var unitTypeBtn = prototypeUnitTypeBtn.clone().appendTo(typesDiv);
		unitTypeBtn.html(type);
		var newId = "unit_type_btn_"+type;
		unitTypeBtn.attr("id",newId);
		unitTypeBtn.click(toggleType(type));
	});
	
	//**** CITY *****
	$.each(unitsByTypeByCity, function( city, unitsByType ) {
		//Unit button
		var unitCityBtn = prototypeCityBtn.clone().appendTo(citiesDiv);
		unitCityBtn.html(city);
		var unitCityBtnId = "unit_city_btn_"+city;
		unitCityBtn.attr("id",unitCityBtnId);
		unitCityBtn.click(toggleCity(city, unitsByType));
		
		//Unit div
		var unitCityDiv = btnsDivProto.clone().appendTo(dialog_body);
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
					    tbar_clicked.find(".par_btn").removeClass("disabled");
						var unitsContainer = btn_clicked.parent().parent();
						var actionsTopContainer = tbar_clicked.children(".tbar_body_container").children(".actions_column").children(".actions_parent_container");
						addUnitButton(unitsContainer, tbar_clicked);
					}
					updateTbar(tbar_clicked);
				});
			});
			unitTypeCol.append($('<div class="clear_float"/>'));
		});
	});
	
	$('<div class="clear_float"/>').clone().appendTo(citiesDiv);
	
	$(".unit_dialog_btn").hide();
	toggleCity("Mesa", unitsByTypeByCity["Mesa"])();
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
			tbar.find(".single_unit_div").removeClass("glowlightyellow");
			unitBtn.parent().addClass("glowlightyellow");
			
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
function updateTbar(tbar) {
    var sectorName = tbar.find(".title_text").html();
	var hasClock = sectorsWithClock.indexOf(sectorName)>-1;
	var hasAcctBtn = !(sectorsWithOutAcctBtn.indexOf(sectorName)>-1);
	var hasPsiBtn = !(sectorsWithOutAPsiBtn.indexOf(sectorName)>-1);
	var hasActions = !(sectorsWithOutActions.indexOf(sectorName)>-1);

    var unit_timer_divs = tbar.find(".unit_btn:not(.blank_btn)").siblings(".unit_timer_div");
    if (hasClock) {
        unit_timer_divs.show();
	} else {
	    unit_timer_divs.hide();
	}

	var acctBtn = tbar.find(".acct_unit_btn");
	if (hasAcctBtn) {
        acctBtn.show();
	} else {
	    acctBtn.hide();
	}

	var psiBtns = tbar.find(".psi_btn");
	var unitBtns = tbar.find(".unit_btn");
	if (hasPsiBtn) {
        psiBtns.show();
        unitBtns.removeClass("unit_btn_no_psi");
	} else {
	    psiBtns.hide();
	    unitBtns.addClass("unit_btn_no_psi");
	}

	var actions_parent_container = tbar.find(".actions_parent_container");
	if(hasActions) {
	    actions_parent_container.show();
	} else {
	    actions_parent_container.hide();
	}
}
function addUnitButton(unitsContainer, tbar) {
	unitsContainer.children().children().removeClass("blank_btn");
	var singleUnitContainer = $("<div class=\"single_unit_div\"></div>").clone();
	var psiBtn = $("<div class=\"psi_btn par_psi_hidden tbar_unit_btn button\">PSI</div>").clone();
	var unitBtn = $("<div class=\"blank_btn tbar_unit_btn unit_btn button\">Unit</div>").clone();
	var clockDiv = $("<div class=\"unit_timer_div\"><img style=\"margin:0\" class=\"clock_icon\" src=\"images/clock.png\"/></div>").clone();
	unitBtn.tbar = tbar;
	singleUnitContainer.append(psiBtn);
	singleUnitContainer.append(unitBtn);
	singleUnitContainer.append(clockDiv);
	clockDiv.hide();
	singleUnitContainer.append($('<div class="clear_float"/>'));
	unitsContainer.append(singleUnitContainer);
	unitBtn.click(showDialog(tbar, unitBtn, "#units_dialog"));
	
	// Create the actions column for this unit
	var actions_list = $("<div class=\"actions_list\"></div>");
	tbar.find(".actions_parent_container").append(actions_list);
	unitBtn.actions_list = actions_list;
}
function addActionButton(tbar, actionsContainer) {
	actionsContainer.children().removeClass("blank_btn");
	var actionBtn = $("<div class=\"blank_btn action_btn button\">Action</div>").clone();
	actionsContainer.append(actionBtn);
	actionBtn.tbar = tbar;
	actionBtn.click(showDialog(tbar, actionBtn, "#actions_dialog"));
}
function initTbars() {
    var tbar_container = $("#tbar_container");
    addTbar(tbar_container);
    addTbar(tbar_container);
    addTbar(tbar_container);
    addTbar(tbar_container);
    addTbar(tbar_container);
    addTbar(tbar_container);

    var rehab_tbar_container = $("#rehab_tbar_container");
    var rescue_tbar = addTbar(rehab_tbar_container);
    var safety_tbar = addTbar(rehab_tbar_container);
    var rehab_tbar = addTbar(rehab_tbar_container);
    setTbarSectorTitle(rescue_tbar, "RESCUE");
    setTbarSectorTitle(safety_tbar, "Safety");
    setTbarSectorTitle(rehab_tbar, "ReHab");

    updateTbar(rescue_tbar);
    updateTbar(safety_tbar);
    updateTbar(rehab_tbar);
}
var tbarIndex = 1;
function addTbar(tbarContainer) {
	//Init T-Bars
	
//	for (tbarIndex=1; tbarIndex<=4; tbarIndex++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo(tbarContainer);
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
		benchmarkBtn.click(showBenchmarkDialog(tbar, benchmarkBtn));
		
		//Unit Btn
		var unitBtnContainer = tbar.find(".units_container");
		unitBtnContainer.manyBtns = 0;
		addUnitButton(unitBtnContainer, tbar);

		tbar.show();
//	}
    return tbar;
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
	var cmdTrmDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "cmd_trm_dialog";
	cmdTrmDialog.attr("id",newId);
	var dialogBody = cmdTrmDialog.children(".dialog_body");
	var titleDiv = cmdTrmDialog.find(".dialog_title_text");
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



function clickModeButton() {
    var mode_btn = $("#mode_btn");

    if(mode_btn.hasClass("offensive_btn")) {
        mode_btn.addClass("defensive_btn");
        mode_btn.removeClass("offensive_btn");
        mode_btn.html("DEFNS");
    } else {
        mode_btn.addClass("offensive_btn");
        mode_btn.removeClass("defensive_btn");
        mode_btn.html("OFFNS");
    }
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



function init_splash_buttons() {
    
}


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

    initTbars();

	//Init Dialogs
	initSectorDialog();
	initParDialog();
	initPsiDialog();
	initActionsDialog();
	initUnitsDialog();
	initBenchmarkDialog();
	$("#report_btn").click(function(){alert("TESTING");});
	initCmdTerminateDialog();
	initMaydayDialog();
	initObjectivesDialog();
	initOsrDialog();
	initIapDialog();
	initIncidentInfo();

	$("#tbar_prototype").hide();
	$("#dialogContainer").hide();
	$("#dialog_prototype").hide();
	$(".dialog_close_btn").click(hideAllDialogs);
	$("#mode_btn").click(clickModeButton);
	
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
    "Take a Line",
    "Secure Util",
    "360",
    "Protect Exposure",
    "1-1/2\"",

    "Search/Rescue",
    "Vert Vent",
    "Open Build",
    "",
    "1-3/4",

    "Fire Attack",
    "Roof Prof",
    "Soften build",
    "",
    "2\"",

    "Supply",
    "Fan to Door",
    "Sprinkler",
    "",
    "2-1/2\"",

    "IRIC",
    "Throw Ladders",
    "Overhaul",
    "",
    "3\"",

    "Check Ext",
    "Salvage",
    "Standpipe",
    "",
    "Piercing Nozzle",

    "Deck Gun",
    "Elev Master",
    "Horz Standpipe",
    "",
    "",
    ];




var sectorsWithClock = [
	"Interior",
	"Roof",
	"Ventilation",
	"Sector 1",
	"Sector 2",
	"Sector 3",
	"Sector 4",
	"Rescue",
	"Sector"
	];
var sectorsWithOutAcctBtn = [
	"ReHab",
	];
var sectorsWithOutAPsiBtn = [
	"ReHab",
	];
var sectorsWithOutActions = [
	"ReHab",
	];

var sectors = [
	"Interior",
	"Roof",
	"Ventilation",
	"Evac",
	"IRIC",

	"Sector 1",
	"Sector 2",
	"Sector 3",
	"Sector 4",
	"RIC",

	"North Sector",
	"East Sector",
	"South Sector",
	"West Sector",
	"Rescue",

	"A Side",
	"B Side",
	"C Side",
	"D Side",
	"Safety",

	"On Deck",
	"Staging",
	"Lobby",
	"Accountability",
	"ReHab",

	"Overhaul",
	"Salvage",
	"Cust Service",
	"Resource",
	"",

	"Medical",
	"Triage",
	"Treatment",
	"Transportation",
	"Sector",
	];

var Engine="Engine";
var Ladder="Ladder";
var BC="BC";
var Squad="Squad";
var Medic="Medic";
var Util="Util";
var CV="CV";
var WtrTend="WtrTend";
var HazMat="HazMat";
var Brush="Brush";
var Rehab="Rehab";
var SpecInc="SpecInc";
var ScnSup="ScnSup";
var SupVeh="SupVeh";
var FireBt = "FireBt";
var Ambo = "Ambo";
var Heilo = "Heilo";
var Util = "Util";
var Foam = "Foam";
var Hose = "Hose";
var Vent = "Vent";
var Crisis = "Crisis";
var HighRise = "HighRise";
var PIO = "PIO";
var Attack = "Attack";
var AirVac = "AirVac";

var unitTypes = [
	Engine,
	Ladder,
	BC,
	Squad,
	Util,
	CV,
	WtrTend,
	HazMat,
	Brush,
	Foam,
	Hose,
	Rehab,
	SpecInc,
	SupVeh,
	FireBt,
	Vent,
	Crisis,
	PIO,
	Attack,
	Ambo,
	Medic,
	Heilo,
	AirVac];

var unitsByTypeByCity = {
    "Chandler":{
		Engine:[
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
		Ladder:[
			"L281",
			"L283",
			"Lt281",
			"Lt283"],
		BC:[
			"BC281",
			"BC282",
			"BSO281",
			"BSO282"],
		Squad:[
			"SQ283",],
		HazMat:[
			"HM283",],
		Util:[
			"U288",],
		Brush:[
			"Br284",],
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
	},
	"Gilbert":{
		Engine:[
			"E251",
			"E252",
			"E254",
			"E256",
			"E257",
			"E258",
			"E2510",
			"E2511",
			"E2540"],
		Ladder:[
			"L251",
			"L253",
			"L255",
			"Lt251",
			"Lt253",
			"Lt255",],
		BC:[
			"BC251",
			"BC252",
			"BSO251",
			"BSO252",],
		Util:[
			"U251",],
		CV:[
			"CV251",],
		WtrTend:[
			"WT256",
			"WT2511",],
		HazMat:[
			"HM258",],
		Brush:[
			"Br2511",],
		Ambo:[
			"SWA251",
			"SWA252",
			"SWA253",
			"SWA255",],
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
	},
	"Mesa":{
		Engine:[
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
		Ladder:[
			"L201",
			"L204",
			"L206",
			"L209",
			"L214",
			"L220",
			"Lt201",
			"Lt204",
			"Lt206",
			"Lt209",
			"Lt214",
			"Lt220"],
		BC:[
			"BC201",
			"BC202",
			"BC203",
			"BSO201",
			"BSO202",
			"BSO203",
			"ED"],
		Squad:[
			"SQ204",
			"SQ206"],
		Ambo:[
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
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
	},
	"QC":{
		Engine:[
		    "E411",
		    "E412"],
		BC:["BC411", "BSO411"],
		Ambo:[
			"SWA411",],
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
	},
    "Phoenix":{
        Engine:[
            "E1",
            "E3",
            "E4",
            "E5",
            "E6",
            "E7",
            "E8",
            "E9",
            "E10",
            "E11",
            "E12",
            "E13",
            "E14",
            "E15",
            "E16",
            "E17",
            "E18",
            "E19",
            "E20",
            "E21",
            "E22",
            "E23",
            "E24",
            "E25",
            "E26",
            "E27",
            "E28",
            "E29",
            "E30",
            "E31",
            "E32",
            "E33",
            "E34",
            "E35",
            "E36",
            "E37",
            "E38",
            "E39",
            "E40",
            "E41",
            "E42",
            "E43",
            "E44",
            "E45",
            "E46",
            "E48",
            "E49",
            "E50",
            "E52",
            "E54",
            "E56",
            "E57",
            "E58",
            "E59",
            "E60",
            "E61",
            "E72",
            "E905",
            "E910",
            "E918",
            "E925",
            "E929",
            "E930",
            "E935",
            "E960",
        ],
        Ladder:[
            "L1",
            "L4",
            "L9",
            "L11",
            "L12",
            "L20",
            "L22",
            "L24",
            "L26",
            "L33",
            "L37",
            "L41",
            "L43",
            "L50",
            "Lt1",
            "Lt4",
            "Lt9",
            "Lt11",
            "Lt12",
            "Lt20",
            "Lt22",
            "Lt24",
            "Lt26",
            "Lt33",
            "Lt37",
            "Lt41",
            "Lt43",
            "Lt50",
        ],
        BC:[
            "BC1",
            "BC2",
            "BC3",
            "BC4",
            "BC5",
            "BC6",
            "BC8",
            "BC19",
            "No Dep",
            "So Dep",
            "BSO1",
            "BSO2",
            "BSO3",
            "BSO4",
            "BSO5",
            "BSO6",
            "BSO8",
            "BSO19",
        ],
        Ambo:[
            "RES3",
            "RES5",
            "RES7",
            "RES8",
            "RES9",
            "RES11",
            "RES12",
            "RES13",
            "RES15",
            "RES16",
            "RES17",
            "RES18",
            "RES21",
            "RES22",
            "RES25",
            "RES26",
            "RES27",
            "RES28",
            "RES29",
            "RES30",
            "RES31",
            "RES32",
            "RES33",
            "RES34",
            "RES35",
            "RES36",
            "RES38",
            "RES40",
            "RES42",
            "RES43",
            "RES45",
            "RES50",
            "RES60",
            "RES918",
            "RES942",
        ],
        Brush:[
            "BT23",
            "BT28",
            "BT33",
            "BT35",
            "BT36",
            "BT45",
            "BT46",
            "BT48",
            "BT49",
            "BT52",
            "BT56",
            "BT57",
            "BT58",
        ],
        HazMat:[
            "HM4",
            "HM38",
            "HM41"
        ],
        Util:[
            "U10",
            "U29",
            "U50",
        ],
        Squad:[
            "SQ8",
            "SQ44",
            "SQ72",
        ],
        SupVeh:[
            "SV8",
            "SV12",
            "SV45",
        ],
        Foam:[
            "Foam1",
            "Foam2",
            "Foam3",
            "Foam34",
            "Foam44",
        ],
        WtrTend :[
            "WT23",
            "WT36",
            "WT52",
            "WT54",
            "WT56",
            "WT58",
        ],
        CV:[
            "CV1",
            "CV2"
        ],
        Hose:[
            "Hose34",
            "Hose58"
        ],
        Vent:[
            "Vent3"
        ],
        Crisis:[
            "Cris16"
        ],
        HighRise:[
            "HiRi1"
        ],
        PIO:[
            "PI3"
        ],
        Attack:[
            "Att19"
        ],
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
    },

	"Suprstion":{
		Engine:[
		    "E261",
			"E262",
			"E265"],
		Ladder:[
			"L263",
			"L264",
			"Lt263",
			"Lt264"],
		BC:[
		    "BC261",
		    "BSO261"],
		Ambo:[
			"SWA261",
			"SWA262",
			"SWA265",],
		WtrTend:["WT261"],
		Brush:["BT261"],
		Rehab:["RH261"],
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
	},
	"Tempe":{
		Engine:[
			"E271",
			"E272",
			"E273",
			"E274",
			"E275",
			"E276",
			"E277",
			"E278"],
		Ladder:[
			"L273",
			"L276",
			"Lt273",
			"Lt276"],
		BC:[
			"BC271",
			"BSO271"],
		Medic:[
			"Med271",
			"Med272",
			"Med276"],
		SpecInc:[
			"SI272"
		],
		ScnSup:[
			"SS274"
		],
		SupVeh:[
			"SV276"
		],
		FireBt:[
			"FB271"
		],
		Squad:[
		    "SQ271"
		],
		HazMat:[
		    "HM272"
		],
		AirVac:[
		    "Native Air",
		    "Life Net",
		    "Ranger 41"
		]
	},



};

var safteyNames = [
	"Cross",
	"Fox",
	"Jones",
	"Smith",];


