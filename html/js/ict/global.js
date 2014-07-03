

var btn_clicked;
var tbar_clicked;
var tbar_moving;
var parentDialog = 0;

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

    $(".unit_btn.has_mayday").each(function() {
        var btn = $(this);
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
    $(".par_benchmark_btn").addClass("glowlightgreen");
    tbar.find(".unit_timer_bar").each(function( index ) {
        startUnitTimerAnim($(this));
    });
}
function cancelTbarParTimer(tbar) {
    var parDialog = $("#par_dialog");
    tbar.find('.par_btn').removeClass('has_par');
    $(".par_benchmark_btn").removeClass("glowlightgreen");
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
function showParDialog( tbar, btn, parentDialog_ ){
    return function(){
        if(!btn.hasClass("disabled")) {
            btn_clicked = btn;
            tbar_clicked = tbar;
            parentDialog = parentDialog_;
            var parDialog = $("#par_dialog");

            // Sector PAR
            var par_dialog_sector_btn = $("#par_dialog_sector_btn");
            var tbarTitle = tbar.find(".title_text").html();
            par_dialog_sector_btn.html(tbarTitle);
            if(tbarTitle!="Sector Title") {
                parDialog.find(".dialog_title_text_span").html(tbarTitle+" PAR");
            } else {
                parDialog.find(".dialog_title_text_span").html("Sector PAR");
            }

            // Units PAR
            var par_dialog_units = $("#par_dialog_units");
            par_dialog_units.empty();
            var unit_row_divs = tbar.find(".unit_row_div");
            if (unit_row_divs.length>0) {
                var unitNames = new Array();
                var unitBtns = new Array();
                unit_row_divs.each(function( index ) {
                    var unit_text = $(this).find(".unit_text");
                    var tbarPersonnelBtn = $(this).find(".personnel_btn");
                    var tbarPsiBtn = $(this).find(".psi_btn");
                    var manyPeople = 0;
                    if(tbarPersonnelBtn.html()!='P') {
                        manyPeople = tbarPersonnelBtn.html();
                    }
                    var par_dialog_unit = $("#par_dialog_unit_prototype").clone();
                    par_dialog_unit.show();
                    par_dialog_unit.appendTo(par_dialog_units);
                    var unit_name = unit_text.html();
                    unitNames.push(unit_name);

                    par_dialog_unit.attr("id", "par_dialog_unit_"+unit_name);

                    // Personnel Btn
                    var personnelBtn = par_dialog_unit.find(".personnel_btn")
                    personnelBtn.html(tbarPersonnelBtn.html());

                    // PSI Btn
                    var psiBtn = par_dialog_unit.find(".psi_btn")
                    psiBtn.html(tbarPsiBtn.html());
                    updateBgColor(tbarPsiBtn.html(), psiBtn);
                    psiBtn.click(showDialog( 0, [psiBtn,tbarPsiBtn], "#psi_dialog" , $("#par_dialog")));

                    // Unit Btn
                    var unitBtn = par_dialog_unit.find(".par_unit_btn").first();
                    unitBtns.push(unitBtn);
                    unitBtn.html(unit_name);
                    unitBtn.attr("id", "par_unit_btn_"+unit_name);
                    unitBtn.click(togglePar(unitBtn, "#par_unit_btn_"+unit_name+",.par_person_btn_"+unit_name));

                    // People Btns
                    var par_dialog_people = par_dialog_unit.find(".par_dialog_people");
                    var personBtnPrototype = $("<div class='par_person_btn par_dialog_btn dialog_btn button'>Firefighter</div>");
                    for (var i = 0; i < manyPeople; i++) {
                        var person_btn = personBtnPrototype.clone().appendTo(par_dialog_people);
                        person_btn.addClass("par_person_btn_"+unit_name);
                        person_btn.attr("id", "firefighter_btn_"+i+"_"+unit_name);
                        person_btn.click(togglePar(person_btn, "#firefighter_btn_"+i+"_"+unit_name));
                    }
                });
//                $(".mayday_par_btn").click(showMaydayDialog);
                $(".mayday_par_btn").click(showDialog_withCallbacks( "#mayday_dialog", parDialog, 0, 0, onCloseMaydayDialog));
            }

            parDialog.find('.button:not(.dialog_close_btn)').removeClass('has_par');
            if(typeof tbar['btn_ids_with_par'] != 'undefined') {
                $.each( tbar['btn_ids_with_par'], function(index, btnId) {
                    $('#'+btnId).addClass('has_par');
                });
            }

            // Show PAR dialog
            $(".dialog").hide();
            parDialog.show();
            $("#dialogContainer").show();
        }
    }
}
function initParDialog( ) {
	var parDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "par_dialog";
	parDialog.attr("id",newId);
	var parDialogBody = parDialog.children(".dialog_body");
	parDialog.addClass("par_dialog_body");
    parDialog.find(".dialog_title_text_span").html("Sector PAR");

	var parbody_containers = $('<div id="par_dialog_sector"><div id="par_dialog_sector_btn" class="title_text par_title_btn par_dialog_btn dialog_btn button"></div></div><div id="par_dialog_units"></div>');
	parbody_containers.appendTo(parDialogBody);
	var par_dialog_sector_btn = $("#par_dialog_sector_btn");
    par_dialog_sector_btn.click(togglePar(par_dialog_sector_btn, ".par_dialog_btn"));

	$("#par_dialog_unit_prototype").hide();
}


/**
 * Psi Dialog
 **/
function setPsiText_WithBtn(text, btn_) {
    var btn;
    if(btn_.hasClass("psi_btn")) {
        btn = btn_;
    } else  {
        btn = btn_.find(".psi_btn");
    }
    btn.html(text);
    updateBgColor(text, btn);
}
function setPsiText(text) {
	return function(){
	    if(Array.isArray(btn_clicked)) {
            btn_clicked.forEach(function(btn_clicked_, index, array){
                setPsiText_WithBtn(text, btn_clicked_);
            });
	    } else {
            setPsiText_WithBtn(text, btn_clicked);
	    }

	    if(typeof parentDialog!='undefined' && parentDialog!=0) {
            $("#psi_dialog").hide();
            parentDialog.show();
            parentDialog = 0;
        } else {
            hideAllDialogs();
        }
    }
}
function initPsiDialog( ) {
	var psiDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "psi_dialog";
	psiDialog.attr("id",newId);
	var psiDialogBody = psiDialog.children(".dialog_body");
	var psiTitleDiv = psiDialog.find(".dialog_title_text");
	psiTitleDiv.append("PSI Values");
	var prototypeBtn = $("<div class=\"psi_dialog_btn button\">PROTOTYPE</div>");
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
function clickPersonnelBtn(btn) {
	var personnel_btn = btn_clicked.find(".personnel_btn");
	if (btn.hasClass("glow_orange")) {
		$(".unit_people_dialog_btn").removeClass("glow_orange");
		personnel_btn.html("P");
	} else {
		$(".unit_people_dialog_btn").removeClass("glow_orange");
		btn.addClass("glow_orange");
		personnel_btn.html(btn.html());
	}
}
function clickResetClockBtn() {
    startUnitTimerAnim(btn_clicked.parents(".unit_row_div").find(".unit_timer_bar"));
    hideAllDialogs();
}
function showUnitPeopleDialog( tbar, btn ){
    return function(){
        if(!btn.hasClass("hidden_div")) {
            var unit_people_dialog = $("#unit_people_dialog");

            var personnel_btn = btn.find(".personnel_btn");

            var unit_people_dialog_btn = unit_people_dialog.find(".unit_people_dialog_btn:contains('"+personnel_btn.html()+"')");
            $(".unit_people_dialog_btn").removeClass("glow_orange");
            if(personnel_btn.html()!="P") {
                unit_people_dialog_btn.addClass("glow_orange");
            }


            $(".dialog").hide();
            btn_clicked = btn;
            tbar_clicked = tbar;
            $("#dialogContainer").show();
            unit_people_dialog.show();
        }
    }
}
function startDraggingUnit(draggableBtn, event){
    // Start dragging
    draggableBtn.draggable();
    draggableBtn.draggable('enable');
//    draggableBtn.addClass("unit_btn_dragging");
//    draggableBtn.draggable({
//      start: function( event, ui ) {
//        $(event.target).addClass("glowlightblue");
//        $(event.target).css("z-index", 10);
//        $(event.target).data({
//            'originalLeft': $(event.target).css('left'),
//            'origionalTop': $(event.target).css('top')
//        });
//      },
//      stop: function( event, ui ) {
//        $(event.target).removeClass("glowlightblue");
//        $(event.target).removeClass("unit_btn_dragging");
//        $(event.target).draggable('disable');
//        $(event.target).css({
//            'left': $(event.target).data('originalLeft'),
//            'top': $(event.target).data('origionalTop')
//        });
//      }
//    });
//
//    // Start dragging
    draggableBtn.trigger(event);
}
function initUnitPeopleDialog() {
    var unit_people_dialog = $("#unit_people_dialog" );
    var row1 = unit_people_dialog.find("#unit_people_dialog_row1");
    var row2 = unit_people_dialog.find("#unit_people_dialog_row2");
    var row3 = unit_people_dialog.find("#unit_people_dialog_row3");

    var personnelPrototypeBtn = $("<div class=\"unit_people_dialog_btn button sm_round_btn\">PROTOTYPE</div>");
    ["1","2","3","4","5"].forEach(function (btnText, index, array) {
		var newBtn = personnelPrototypeBtn.clone();
		newBtn.addClass("dir_supl_info_num_btn");
		newBtn.addClass(btnText+"_supl_btn");
		newBtn.html(btnText);
		row1.append(newBtn);
		newBtn.click(function() {clickPersonnelBtn(newBtn);});
	});

	var resetClockBtn = $("<div id='reset_clock_btn' class='reset_clock_btn button'><img class='clock_icon' src='images/clock.png'/>Reset Clock</div>").clone().appendTo(row1);
	resetClockBtn.click(function(){clickResetClockBtn()});
	row1.append($("<div class='clear_float'></div>"));

    // PSI Buttons
    var prototypeBtn = $("<div class=\"psi_btn unit_people_dialog_btn dialog_btn button\">PROTOTYPE</div>");
	for(var psiValue=4500; psiValue>=0; psiValue-=100) {
		var newBtn = prototypeBtn.clone();
		newBtn.html(psiValue);
		updateBgColor(psiValue, newBtn);
		row2.append(newBtn);
		newBtn.click(setPsiText(psiValue));
	}
	row2.append("<div class=\"clear_float\"></div>");
}


/**
 * Mayday Dialog
 **/
function onCloseMaydayDialog() {
    $(".mayday_info_div").not("#mayday_info_div_prototype").each(function( i ) {
        var maydayEl = $(this);
        var mayday_select = maydayEl.find(".mayday_select");
        var mayday_sector_title = maydayEl.find(".mayday_sector_title");
        var mayday_sector_title_text = mayday_select.find("option:selected").text();
        var unit_btns = $(".tbar").find(".title_text:contains("+mayday_sector_title_text+")").parents(".tbar").find(".unit_btn");
        var found_unit_btn_mayday = false;
        unit_btns.each(function (i){
            var unit_btn = $(this);
            var unit_text = unit_btn.find(".unit_text").text();
            var maydayUnitBtn = maydayEl.find(".unit_text:contains("+unit_text+")").parents(".unit_btn");
            if(maydayUnitBtn.hasClass("has_mayday")) {
                maydayUnitBtn.addClass("disabled");
                found_unit_btn_mayday = true;
            } else {
                maydayUnitBtn.remove();
            }
        });

        if(found_unit_btn_mayday) {
            mayday_select.hide();
            mayday_sector_title.show();
            mayday_sector_title.html("Sector: "+mayday_sector_title_text);
        } else {
            maydayEl.remove();
        }
    });
}
function resetMayday(maydayEl) {
    var prev_unit_btn = maydayEl.data('unit_btn');
    if(typeof prev_unit_btn!='undefined') {
        prev_unit_btn.removeClass("has_mayday");
        prev_unit_btn.removeClass("glowred");
        prev_unit_btn.removeClass("glowpink");
    }
    var prev_mayday_unit_btn = maydayEl.data('mayday_unit_btn');
    if(typeof prev_mayday_unit_btn!='undefined') {
        prev_mayday_unit_btn.removeClass("has_mayday");
        prev_mayday_unit_btn.removeClass("glowred");
        prev_mayday_unit_btn.removeClass("glowpink");
    }
}
function updateMaydaySector(maydayEl) {
    var selectedSectorTitle = maydayEl.find(".mayday_select").find("option:selected").text();
    var tbar = $(".tbar").find(".title_text:contains("+selectedSectorTitle+")").parents(".tbar");
    var mayday_units_div = maydayEl.find(".mayday_units_div");

    resetMayday(maydayEl);
    maydayEl.data("tbar", tbar);

    tbar.find(".unit_btn:not(.has_mayday)").each(function( i ) {
        var unitBtn = $(this);
        var unitText = unitBtn.html();
        var maydayUnitBtn = $("<div class='mayday_unit_btn unit_btn button'>"+unitText+"</div>");
        mayday_units_div.append(maydayUnitBtn);

        // Set Mayday for clicked unit button
        maydayUnitBtn.click(function(){
            resetMayday(maydayEl);
            maydayEl.data('unit_btn',unitBtn);
            maydayEl.data('mayday_unit_btn',maydayUnitBtn);
            unitBtn.toggleClass("has_mayday");
            if(unitBtn.hasClass('has_mayday')) {
                maydayUnitBtn.addClass("has_mayday");
            } else {
                maydayUnitBtn.removeClass("has_mayday");
                unitBtn.removeClass("glowred");
                unitBtn.removeClass("glowpink");
                maydayUnitBtn.removeClass("glowred");
                maydayUnitBtn.removeClass("glowpink");
            }
        });

    });
}
function clearMayday(maydayEl) {
    return function() {
        resetMayday(maydayEl)
        maydayEl.remove();
        showDialog(0, 0, "#mayday_clear_dialog")();
    }
}
var manyMaydays = 0;
function addMaydayEvent() {
    manyMaydays++;
    var maydayEl = $("#mayday_info_div_prototype").clone();
    maydayEl.appendTo("#mayday_scroll_div");
    maydayEl.show();
    maydayEl.attr("id", "mayday_info_div_"+manyMaydays);
    maydayEl.find(".mayday_box_title").html("Mayday #"+manyMaydays);


    // PSI button
    var mayday_psi_btn = maydayEl.find(".mayday_psi_btn");
    mayday_psi_btn.click(showDialog( 0, [mayday_psi_btn], "#psi_dialog" , $("#mayday_dialog")));

    var mayday_clear_btn = maydayEl.find(".mayday_clear_btn");
    mayday_clear_btn.click(clearMayday(maydayEl));


    // Hoseline Buttons
    var hoseline_mayday_btn = maydayEl.find(".hoseline_mayday_btn");
    var offhoseline_mayday_btn = maydayEl.find(".offhoseline_mayday_btn");
    hoseline_mayday_btn.click(
        function() {
            hoseline_mayday_btn.addClass("glowgreen");
            offhoseline_mayday_btn.removeClass("glowred");
        }
    );

    offhoseline_mayday_btn.click(
        function() {
            hoseline_mayday_btn.removeClass("glowgreen");
            offhoseline_mayday_btn.addClass("glowred");
        }
    );


    // Injured Buttons
    var uninjured_mayday_btn = maydayEl.find(".uninjured_mayday_btn");
    var injured_mayday_btn = maydayEl.find(".injured_mayday_btn");
    uninjured_mayday_btn.click(
        function() {
            uninjured_mayday_btn.addClass("glowgreen");
            injured_mayday_btn.removeClass("glowred");
        }
    );
    injured_mayday_btn.click(
        function() {
            uninjured_mayday_btn.removeClass("glowgreen");
            injured_mayday_btn.addClass("glowred");
        }
    );


    // Select DDLB
    $(".mayday_select").change(
        function() {
            $(this).addClass("glowlightgreen");
            $("#mayday_units_div").find(".unit_btn").hide();
            updateMaydaySector(maydayEl);
        }
    );


    // Sector Div
    maydayEl.find(".mayday_sector_title").hide();
}
function selectMaydayTab(tab, color) {
    var tabEl = $("#mayday_right_tab_"+tab);
    var tabDivEl = $("#mayday_tab_div_"+tab);

    $(".mayday_tab_div").hide();
    tabDivEl.show();

    $("#mayday_right_td").removeClass("tan_bg");
    $("#mayday_right_td").removeClass("green_bg");
    $("#mayday_right_td").removeClass("gray_bg");
    $("#mayday_right_td").removeClass("blue_bg");
    $("#mayday_right_td").addClass(color);
}
function initMaydayDialog( ) {
	var maydayBtn = $("#mayday_btn");
    maydayBtn.click(showDialog_withCallbacks( "#mayday_dialog", 0/*parentDialog*/, 0, 0, onCloseMaydayDialog));

    $("#mayday_info_div_prototype").hide();
    $("#new_mayday_btn").click(addMaydayEvent);

    $(".mayday_tab_div").hide();
    selectMaydayTab("radio", "tan_bg");

    $("#mayday_right_tab_radio").click(function(){selectMaydayTab("radio", "tan_bg")});
    $("#mayday_right_tab_grab").click(function(){selectMaydayTab("grab", "green_bg")});
    $("#mayday_right_tab_deploy").click(function(){selectMaydayTab("deploy", "gray_bg")});
    $("#mayday_right_tab_build").click(function(){selectMaydayTab("build", "blue_bg")});

    $(".mayday_clear_item_btn").click(function(){hideAllDialogs()});
}



/**
 * Sector Dialog
 **/
function showSectorDialog( tbar, btn, dialogId ){
    return function(){
        var sectorDlg = $(dialogId);
        $(".dialog").hide();
        btn_clicked = btn;
        tbar_clicked = tbar;
        $("#dialogContainer").show();
        sectorDlg.show();

        // Toggle prefix_dir buttons
        $(".dir_supl_info_dir_btn").removeClass("glow_orange");
        $("."+tbar.prefix_dir+"_supl_btn").addClass("glow_orange");

        // Toggle prefix_num buttons
        $(".dir_supl_info_num_btn").removeClass("glow_orange");
        $("."+tbar.prefix_num+"_supl_btn").addClass("glow_orange");

        // Highlight previously selected sectors
        $(".title_dialog_btn").removeClass("glowlightgreen");
        $(".title_text").each(function (index) {
            var title_text = $(this).html();
            if(title_text!="") {
                $(".title_dialog_btn:contains('" + title_text + "')").addClass("glowlightgreen");
            }
        });
    }
}

// onClickCallback(btnClicked_html)
var onClickCallback;
var onCloseCallback;
function showDialog_withCallbacks( dialogId, parentDialog_, onOpenCallback_, onClickCallback_, onCloseCallback_){
    return function(){
        parentDialog = parentDialog_;

        if(typeof onOpenCallback_!='undefined' && onOpenCallback_!=0) {
            onOpenCallback_();
        }

        onClickCallback = onClickCallback_;
        onCloseCallback = onCloseCallback_;

        $(".dialog").hide();
        $("#dialogContainer").show();
        $(dialogId).show();
    }
}
function showDialog( tbar, btn, dialogId, parentDialog_ ){
  return function(){
	$(".dialog").hide();
	btn_clicked = btn;
	tbar_clicked = tbar;
	parentDialog = parentDialog_;
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
        if(btn.html()=="N") {
            tbarDirBtn.html("North");
        } else if(btn.html()=="E") {
            tbarDirBtn.html("East");
        } else if(btn.html()=="S") {
            tbarDirBtn.html("South");
        } else {
            tbarDirBtn.html("West");
        }
//		tbarDirBtn.html(btn.html());
	}
}
function clickNumBtn(btn) {
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
function setTbarTitle(tbar, title) {
    var title_text_prev = tbar.find(".title_text").html();
    tbar.find(".title_text").html(title);
    if(title!="Sector") {
        hideAllDialogs();
    }
    if(title=="ReHab") {
        tbar.find(".benchmark_btn").hide();
    } else {
        tbar.find(".benchmark_btn").show();
    }

    // Customer Service
    if(title=="Cust Service" && tbar.find(".unit_btn").not(".blank_btn").not(".acct_unit_btn").length>0) {
        $("#custsvc_objective_btn").addClass("glowlightgreen");
        updateObjectivePercentComplete();
    }
    updateTbar(tbar);
    if($(".title_text:contains('Sector Title'):not(#tbar_prototype)").length<=1) {
        addTbar();
    }

    // Update any Maydays for this sector
    var maydaysSelected = $(".mayday_sector_select").find("option:selected:contains("+title_text_prev+")").parents(".mayday_sector_select");
    $(".mayday_sector_select").find("option:contains("+title_text_prev+")").remove();
    $(".mayday_sector_select").each(function(){
        $(this).append($("<option value='"+title+"'>"+title+"</option>"));
    });
    maydaysSelected.each(function(){
        $(this).find("option:contains("+title+")").attr('selected','selected');
    });
}
function initSectorDialog( ) {
	var sectorDialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
	var newId = "sector_dialog";
	sectorDialog.attr("id",newId);
	var dialog_title_text = sectorDialog.find(".dialog_title_text");
	dialog_title_text.append("Sectors");
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
		newBtn.click(function() {clickNumBtn(newBtn);});
	});
	
	
	var title_btns_container = $('<div id="title_btns_container" class="col-xs-12 container-fluid"/>').clone();
	dialog_body.append(title_btns_container);
	
	//Sector title buttons
	var prototypeBtn = $("<div class=\"title_dialog_btn title_btn button col-xs-3\">PROTOTYPE</div>");
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
		    if(!newBtn.hasClass("hidden_sector_btn") && !newBtn.hasClass("glowlightgreen")) {
		        if(sectorName=="Sector ####") {
		            key_replace_char_at_index = 7;
		            $("#key_output_value").html("Sector ####");
		            showDialog(tbar_clicked, btn_clicked, "#key_dialog")();
		        } else {
                    setTbarTitle(tbar_clicked, sectorName);
		        }
            }
		});
	});
	
}



/**
 * Actions Dialog
 **/
var key_replace_char_at_index = 7;
//String.prototype.replaceAt=function(index, character) {
//    return this.substr(0, index) + character + this.substr(index+character.length);
//}
function init10KeyDialog( ) {
    $(".key_number_btn").click(function(){
        if(key_replace_char_at_index<=10) {
            var key_output_value = $("#key_output_value").html();
            key_output_value = key_output_value.substr(0, key_replace_char_at_index) + $(this).html() + key_output_value.substr(key_replace_char_at_index+1, key_output_value.length);
            $("#key_output_value").html(key_output_value);
            key_replace_char_at_index++;
        }
    });

    $("#key_del_btn").click(function(){
        if(key_replace_char_at_index>7) {
            key_replace_char_at_index--;
            var key_output_value = $("#key_output_value").html();
            key_output_value = key_output_value.substr(0, key_replace_char_at_index) + '#' + key_output_value.substr(key_replace_char_at_index+1, key_output_value.length);
            $("#key_output_value").html(key_output_value);
        }
    });

    $("#key_ok_btn").click(function(){
        if(key_replace_char_at_index>7) {
            var key_output_value = $("#key_output_value").html();
            key_output_value = key_output_value.substr(0, key_replace_char_at_index);
            setTbarTitle(tbar_clicked, key_output_value);
        }

        hideAllDialogs();
    });
}



/**
 * Actions Dialog
 **/
function updateSelectedUnitActionsData(tbar) {
    var selected_unit_btn = tbar.find(".unit_row_div.glowlightyellow").find(".unit_btn");
    var actions = new Array();

    $.each(tbar.find(".action_btn"), function( index, tbarActionBtn ) {
        var actionName = $(tbarActionBtn).html();
        actions.push(actionName);
    });

    selected_unit_btn.data({'actions':actions});
}
function onOpenActionsDialogFromTbar(tbar) {
    return function() {
        $(".action_dialog_btn").removeClass("glowlightgreen");
        $.each(tbar.find(".action_btn"), function( index, tbarActionBtn ) {
            var html = $(tbarActionBtn).html();
            $(".action_dialog_btn").filter(function () {
                return $(this).text() == html;
            }).addClass("glowlightgreen");
        });
    }
}
function toggleActionButtonForTbar(tbar) {
    return function(actionName) {
        if($(".action_dialog_btn").filter(function () {
            return $(this).text() == actionName;
        }).hasClass("glowlightgreen")) {
            removeActionButtonFromTbar(tbar, actionName);
        } else {
            addActionButtonToTbar(tbar, actionName);
        }
    }
}
function removeActionButtonFromTbar(tbar, actionName) {
    // Update Actions Dialog
    $(".action_dialog_btn").filter(function () {
        return $(this).text() == actionName;
    }).removeClass("glowlightgreen");

    // Remove action from TBar
    var action_btn = tbar.find(".action_btn").filter(function () {
        return $(this).text() == actionName;
    });
//    jQuery(action_btn).detach();
    var scroll_pane = tbar.find(".right_scroll_pane");
    var pane2api = scroll_pane.data('jsp');
    action_btn.remove();
    pane2api.reinitialise();

    // Update unit button's action list data
    updateSelectedUnitActionsData(tbar);
}
function addActionButtonToTbar(tbar, actionName) {
    // Update Actions Dialog
    var action_dialog_btn = $(".action_dialog_btn").filter(function () {
        return $(this).text() == actionName;
    });
    action_dialog_btn.addClass("glowlightgreen");

    var is_font_red = action_dialog_btn.hasClass("font_red");
    // Add action button to TBar
    var actionBtn = $("<div class='disabled action_btn button'>"+actionName+"</div>");

    if(is_font_red) {
        actionBtn.addClass("font_red");
    }

    if(actionName.length>19) {
        actionBtn.addClass("btn_largetext");
    } else if(actionName.length>15) {
        actionBtn.addClass("btn_medtext");
    }

    if(actionName=="IRIC") {
        $("#iric_osr_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
    }

    // Update scroll container
    var scroll_pane = tbar.find(".right_scroll_pane");
    var pane2api = scroll_pane.data('jsp');
    pane2api.getContentPane().append(actionBtn);
    pane2api.reinitialise();

    // Update unit button's action list data
    updateSelectedUnitActionsData(tbar);
}
function initActionsDialog( ) {
	var actionsDialog = $("#dialog_prototype" ).clone().appendTo("#dialog_vertical_align_cell");
	var newId = "actions_dialog";
	actionsDialog.attr("id",newId);
	var actionsDialogBody = actionsDialog.children(".dialog_body");
	var actionsTitleDiv = actionsDialog.find(".dialog_title_text");
	actionsTitleDiv.append("Actions");
    var prototypeHeader = $("<div class=\"action_type_dialog_header col-xs-12\">PROTOTYPE</div>");
	var prototypeBtn = $("<div class=\"action_dialog_btn col-xs-2 action_btn dialog_btn button\">PROTOTYPE</div>");
	actions.forEach(function (actionObj, index, array) {
        var actionTypeHeader = prototypeHeader.clone();
        actionTypeHeader.html(actionObj.action_type);
        actionsDialogBody.append(actionTypeHeader);

        actionObj.actions.forEach(function (actionName, index, array) {
            var newBtn = prototypeBtn.clone();
            newBtn.html(actionName);

            if(actionName.length>19) {
                newBtn.addClass("btn_largetext");
            } else if(actionName.length>15) {
                newBtn.addClass("btn_medtext");
            }

            actionsDialogBody.append(newBtn);
            newBtn.click(function () {
                onClickCallback(actionName)
            });
        });

        actionObj.actions_warning.forEach(function (actionName, index, array) {
            var newBtn = prototypeBtn.clone();
            newBtn.html(actionName);
            newBtn.addClass("font_red");

            if(actionName.length>15) {
                newBtn.addClass("btn_largetext");
            }

            actionsDialogBody.append(newBtn);
            newBtn.click(function () {
                onClickCallback(actionName)
            });
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
function initBenchmarkDialog( ) {
    $("#benchmark_unable_primary").click(function(){clickUnableToObtain($(this))});
    $("#benchmark_unable_secondary").click(function(){clickUnableToObtain($(this))});

    $("#bnch_primary").click(function(){clickPrimaryBenchmark($(this))});
    $("#bnch_underctl").click(function(){clickPrimaryBenchmark($(this))});
    $("#bnch_secondary").click(function(){clickPrimaryBenchmark($(this))});
    $("#bnch_lossstop").click(function(){clickPrimaryBenchmark($(this))});

    $("#bnch_primary_par").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_primary_notify").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_primary_challenge").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_underctl_par").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_underctl_notify").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_underctl_obtain").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_secondary_par").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_secondary_notify").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_lossstop_par").click(function(){clickSecondaryBenchmark($(this))});
    $("#bnch_lossstop_notify").click(function(){clickSecondaryBenchmark($(this))});

    $('#bnch_primary').data(    {'right_col':$('#bnch_2nd_col_primary')});
    $('#bnch_underctl').data(   {'right_col':$('#bnch_2nd_col_underctl')});
    $('#bnch_secondary').data(  {'right_col':$('#bnch_2nd_col_secondary')});
    $('#bnch_lossstop').data(   {'right_col':$('#bnch_2nd_col_lossstop')});

    var dialog = $("#dialog_prototype" ).clone().appendTo( "#dialog_vertical_align_cell" );
    var newId = "benchmarks_dialog";
	dialog.attr("id",newId);
    dialog.find(".dialog_title_text_span").html("Benchmarks");
    var dialogBody = dialog.children(".dialog_body");
    dialogBody.remove();
    dialog.append($("#benchmarks_dialog_body"));

    $(".benchmark_2nd_col_container").hide();
	btnsToBlink.push($("#bnch_primary_challenge"));

    resetBenchmarks();
}
function clickUnableToObtain(unable_benchmark_btn) {
    if(unable_benchmark_btn.hasClass("glowpink")) {
        $("#benchmark_unable_primary").removeClass("glowpink");
        $("#benchmark_unable_secondary").removeClass("glowpink");
    } else {
        if(unable_benchmark_btn.attr("id")=="benchmark_unable_primary") {
            unable_benchmark_btn.addClass("glowpink");
            resetBenchmarks();
        }
        if(unable_benchmark_btn.attr("id")=="benchmark_unable_secondary") {
            resetBenchmarks();
            clickPrimaryBenchmark($("#bnch_primary"));
            clickPrimaryBenchmark($("#bnch_underctl"));
            unable_benchmark_btn.addClass("glowpink");
        }
    }
    var isOn_1 = ($("#benchmark_unable_primary").hasClass("glowpink"))?'true':'false';
    tbar_clicked.data('benchmark_unable_primary',isOn_1);

    var isOn_2 = ($("#benchmark_unable_secondary").hasClass("glowpink"))?'true':'false';
    tbar_clicked.data('benchmark_unable_secondary',isOn_2);

    updateTbarBenchmarkIcon(tbar_clicked);
}
function clickPrimaryBenchmark(benchmark_item) {
    var benchmark_item_btn = benchmark_item.find(".benchmark_item_btn");
    benchmark_item_btn.toggleClass("glowlightgreen");
    if(benchmark_item_btn.hasClass("glowlightgreen")) {
        // If user Checked the box
        tbar_clicked.data('primary_benchmark',benchmark_item.attr('id'));
        setBenchmark(benchmark_item.attr('id'));
        if(benchmark_item.attr('id')=='bnch_underctl') {
            $("#benchmark_unable_secondary").removeClass("disabled");
        }
        if(benchmark_item.attr('id')=='bnch_primary'){
            $("#benchmark_unable_primary").removeClass("glowpink");
            $("#benchmark_unable_secondary").removeClass("glowpink");
            $("#benchmark_unable_secondary").addClass("disabled");
        }
        if(benchmark_item.attr('id')=='bnch_secondary'){
            $("#benchmark_unable_secondary").removeClass("glowpink");
        }
    } else {
        // If user UN-checked the box
        resetSecondaryBenchmarks(tbar_clicked, benchmark_item.attr('id'));
        if(benchmark_item.attr('id')=='bnch_primary'){
            tbar_clicked.data('primary_benchmark','');
            resetBenchmarks();
            tbar_clicked.find(".benchmarks_icon").attr("src", "images/benchmarks_0.png");
        } else {
            tbar_clicked.data('primary_benchmark',benchmark_item.prev().attr('id'));
            setBenchmark(benchmark_item.prev().attr('id'));
        }
    }
    updateTbarBenchmarkIcon(tbar_clicked);
}
function updateTbarBenchmarkIcon(tbar) {
    tbar.find(".benchmark_bar_img_1").attr("src", "images/benchmark_bar_black.png");
    tbar.find(".benchmark_bar_img_2").attr("src", "images/benchmark_bar_black.png");
    tbar.find(".benchmark_bar_img_3").attr("src", "images/benchmark_bar_black.png");
    tbar.find(".benchmark_bar_img_4").attr("src", "images/benchmark_bar_black.png");

    if($("#benchmark_unable_primary").hasClass("glowpink")) {
        tbar.find(".benchmark_bar_img_1").attr("src", "images/benchmark_bar_red.png");
    } else {
        if($("#bnch_primary").find(".benchmark_item_btn").hasClass("glowlightgreen")) {
            tbar.find(".benchmark_bar_img_1").attr("src", "images/benchmark_bar_green.png");
        }
    }

    if($("#bnch_underctl").find(".benchmark_item_btn").hasClass("glowlightgreen")) {
        tbar.find(".benchmark_bar_img_2").attr("src", "images/benchmark_bar_green.png");
    }

    if($("#benchmark_unable_secondary").hasClass("glowpink")) {
        tbar.find(".benchmark_bar_img_3").attr("src", "images/benchmark_bar_red.png");
    } else {
        if($("#bnch_secondary").find(".benchmark_item_btn").hasClass("glowlightgreen")) {
            tbar.find(".benchmark_bar_img_3").attr("src", "images/benchmark_bar_green.png");
        }
    }

    if($("#bnch_lossstop").find(".benchmark_item_btn").hasClass("glowlightgreen")) {
        tbar.find(".benchmark_bar_img_4").attr("src", "images/benchmark_bar_green.png");
    }
}
function resetBenchmarks() {
    // Disable ALL
    $('.benchmark_btn_parent_div').each(function (index) {
        $(this).find(".benchmark_item_btn_primary").addClass("disabled");
        $(this).find(".benchmark_item_btn_primary").removeClass("glowlightgreen");
        $(this).removeClass("glowlightyellow");
    });
    $('.benchmark_2nd_col_container').hide();

    // Enable but do not check, nor select first chkbox
    $("#bnch_primary").find(".benchmark_item_btn_primary").removeClass("disabled");
}
function setBenchmark(benchmark_item_id) {
    var benchmark_item = $("#"+benchmark_item_id);
    var benchmark_item_btn_primary = benchmark_item.find(".benchmark_item_btn_primary");
    var chk_btn = $(benchmark_item.find(".chk_btn")[0]);

    benchmark_item_btn_primary.removeClass("disabled");
    benchmark_item_btn_primary.addClass("glowlightgreen");
    benchmark_item.addClass("glowlightyellow");

    // Show right-side
    $('.benchmark_2nd_col_container').hide();
    var right_col = benchmark_item.data("right_col");
    right_col.show();

    // Remove glowlightyellow from previous
    benchmark_item.prevAll().each(function (index) {
        $(this).find(".benchmark_item_btn_primary").removeClass("disabled");
        $(this).find(".benchmark_item_btn_primary").addClass("glowlightgreen");
        $(this).removeClass("glowlightyellow");
    });

    // Disable ALL next
    benchmark_item.nextAll().each(function (index) {
        $(this).find(".benchmark_item_btn_primary").addClass("disabled");
        $(this).find(".benchmark_item_btn_primary").removeClass("glowlightgreen");
        $(this).removeClass("glowlightyellow");
    });

    if(benchmark_item.next().hasClass("benchmark_btn_parent_div")) {
        benchmark_item.next().find(".benchmark_item_btn_primary").removeClass("disabled");
        benchmark_item.next().removeClass("glowlightyellow");
    }
}
function clickSecondaryBenchmark(benchmark_item_2) {
    var benchmark_item_btn_2 = benchmark_item_2.find(".benchmark_item_btn");
    benchmark_item_btn_2.toggleClass("glowlightgreen");
    var isOn = (benchmark_item_btn_2.hasClass("glowlightgreen"))?'true':'false';
    var bchmk_id = benchmark_item_2.attr('id');
    tbar_clicked.data(bchmk_id,isOn);
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
        // Change benchmark dialog title
        var title = tbar.find(".title_text").html();
        if(title!="Sector Title") {
            $("#benchmarks_dialog").find(".dialog_title_text_span").html(title+" Benchmarks");
        } else {
            $("#benchmarks_dialog").find(".dialog_title_text_span").html("Benchmarks");
        }
        $(".benchmark_item_btn_secondary").each(function(){
            var bchmk_btn = $(this);
            var bchmk_id = bchmk_btn.parents(".benchmark_btn_parent_div").attr("id");
            if(typeof tbar.data(bchmk_id) != 'undefined' && tbar.data(bchmk_id)=='true') {
                bchmk_btn.addClass("glowlightgreen");
            } else {
                bchmk_btn.removeClass("glowlightgreen");
            }
        });


        // Show the dialog box
        showDialog(tbar, benchmarkBtn, "#benchmarks_dialog")();
        if(typeof tbar.data('primary_benchmark') != 'undefined' && tbar.data('primary_benchmark')!='') {
            setBenchmark(tbar.data('primary_benchmark'));
        } else {
            resetBenchmarks();
        }

        // Par buttons
        var par_btn = tbar.find(".par_btn");
        if(par_btn.hasClass("disabled")) {
            $("#benchmarks_dialog").find(".par_benchmark_btn").addClass("disabled");
        } else {
            $("#benchmarks_dialog").find(".par_benchmark_btn").removeClass("disabled");
        }

        if(par_btn.hasClass("has_par")) {
            $("#benchmarks_dialog").find(".par_benchmark_btn").addClass("glowlightgreen");
        } else {
            $("#benchmarks_dialog").find(".par_benchmark_btn").removeClass("glowlightgreen");
        }
        $("#benchmarks_dialog").find(".par_benchmark_btn").unbind("click");
        $("#benchmarks_dialog").find(".par_benchmark_btn").click(showParDialog(tbar, par_btn, $("#benchmarks_dialog")));
    };
}



/**
 * Objectives Dialog
 **/
function updateObjectivePercentComplete() {
    var many_objective_btn = $(".objective_btn").length;
    var many_objective_btn_green = $(".objective_btn.glowlightgreen").length;
    var percent_complete = Math.floor((many_objective_btn_green/many_objective_btn)*100);
    $("#objectives_btn_perccomplete").html("("+percent_complete+"% Complete)");
}
function toggleObjBtn(btn) {
    return function() {
        btn.toggleClass("glowlightgreen");
        updateObjectivePercentComplete();
    }
}
function initObjectivesDialog( ) {
    $(".objective_btn").each(function() {
        $(this).click(toggleObjBtn($(this)));
    });
	var objectives_header_btn = $("#objectives_header_btn");
	objectives_header_btn.click(showDialog(0, objectives_header_btn, "#objectives_dialog"));
}



/**
 * OSR Dialog
 **/
 function updateOsrPercentComplete() {
    var many_osr_btn = $(".osr_btn").length;
    var many_osr_btn_green = $(".osr_btn.glowlightgreen").length;
    var percent_complete = Math.floor((many_osr_btn_green/many_osr_btn)*100);
    $("#osr_btn_perccomplete").html("("+percent_complete+"% Complete)");
}
 function toggleOsrBtn(btn) {
    return function() {
        btn.toggleClass("glowlightgreen");
        if(btn.attr("id")=="unit_osr_btn" && btn.hasClass("glowlightgreen")){
//            showUnitsDialog(0, $("#unit_osr_btn"), $("#osr_dialog"))();
            showDialog_withCallbacks(
                "#units_dialog",
                0,//parent dialog
                function(){
                    $(".unit_dialog_btn").removeClass("glowlightgreen");
                    $(".unit_dialog_btn:contains('"+btn.html()+"')").addClass("glowlightgreen");
                },
                function(unitName){
                    btn.html(unitName);
                    $("#units_dialog").hide();
                    $("#osr_dialog").show();
                }
            )();
        }
        updateOsrPercentComplete();
    }
}
function initOsrDialog( ) {
    $(".osr_btn").each(function() {
        $(this).click(toggleOsrBtn($(this)));
    });

    $("#osr_address_btn").click(showDialog(0, $("#address_btn"), "#address_dialog", $("#osr_dialog")));
    $("#osr_address_btn").click(toggleOsrBtn($("#osr_address_btn")));

    $("#osr_occupancy_basement_btn").click(function(){
        $("#osr_occupancy_basement_btn").addClass("glowlightgreen");
        $("#osr_occupancy_nobasement_btn").removeClass("glowlightgreen");
        updateOsrPercentComplete();
    });
    $("#osr_occupancy_nobasement_btn").click(function(){
        $("#osr_occupancy_basement_btn").removeClass("glowlightgreen");
        $("#osr_occupancy_nobasement_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
    });

    $("#osr_occupancy_off_btn").click(function(){
        $("#osr_occupancy_off_btn").addClass("glowlightgreen");
        $("#osr_occupancy_def_btn").removeClass("glowlightgreen");
        updateOsrPercentComplete();
    });
    $("#osr_occupancy_def_btn").click(function(){
        $("#osr_occupancy_off_btn").removeClass("glowlightgreen");
        $("#osr_occupancy_def_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
    });

    $("#osr_occupancy_mob_btn").click(function(){
        $("#osr_occupancy_mob_btn").addClass("glowlightgreen");
        $("#osr_occupancy_stat_btn").removeClass("glowlightgreen");
        updateOsrPercentComplete();
    });
    $("#osr_occupancy_stat_btn").click(function(){
        $("#osr_occupancy_mob_btn").removeClass("glowlightgreen");
        $("#osr_occupancy_stat_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
    });


    $(".osr_select").change(
        function() {
            $(this).addClass("glowlightgreen");
        }
    );

    $("#osr_select_type_of_building").change(function() {
        $("#occupancy_osr_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
        });
    $("#osr_select_type_of_construction").change(function() {
        $("#construction_osr_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
        });
    $("#osr_select_conditions").change(function() {
        $("#conditions_osr_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
        });
    $("#osr_occupancy_mob_btn").click(function() {
        $("#location_osr_btn").addClass("glowlightgreen");
        $("#assumecmd_osr_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
        });
    $("#osr_occupancy_stat_btn").click(function() {
        $("#location_osr_btn").addClass("glowlightgreen");
        $("#assumecmd_osr_btn").addClass("glowlightgreen");
        updateOsrPercentComplete();
        });
    $("#osr_occupancy_off_btn").click(
        function() {
            $("#mode_osr_btn").addClass("glowlightgreen");
            var mode_btn = $("#mode_btn");
            mode_btn.addClass("offensive_btn");
            mode_btn.removeClass("defensive_btn");
            mode_btn.html("OFFENSE");
            updateOsrPercentComplete();
        }
    );
    $("#osr_occupancy_def_btn").click(
        function() {
            $("#mode_osr_btn").addClass("glowlightgreen");
            var mode_btn = $("#mode_btn");
            mode_btn.addClass("defensive_btn");
            mode_btn.removeClass("offensive_btn");
            mode_btn.html("DEFENSE");
            updateOsrPercentComplete();
            showDialog(0, mode_btn, "#emergency_traffic_dialog")();
        }
    );

	var osr_btn = $("#osr_header_btn");
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
function startUnitTimerAnim(el) {
    el.stop(true);
    el.css("width","48px").css("background","lightgreen");

    el
      .animate({width:"32px"}, 3.33*60*1000, "linear", function(){el.css("background","yellow")})
      .animate({width:"16px"}, 3.33*60*1000, "linear", function(){el.css("background","red")})
      .animate({width:"0"},    3.33*60*1000, "linear");
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
	dialog_title_text.append("Units");
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
				    onClickCallback(unitName);
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
}
function showActionsForUnitBtn(unitBtn) {
	return function(){
		var tbar = unitBtn.parents(".tbar");
        var sectorName = tbar.find(".title_text").html();
        var hasActions = !(sectorsWithOutActions.indexOf(sectorName)>-1);
        if(hasActions) {
            var scroll_pane = tbar.find(".right_scroll_pane");
            var pane2api = scroll_pane.data('jsp');
            pane2api.getContentPane().empty();

            if (typeof unitBtn.data('actions') != 'undefined') {
                jQuery.each(unitBtn.data('actions'), function (index, actionName) {
                    var actionBtn = $("<div class='disabled action_btn button'>" + actionName + "</div>");
                    if(actionName.length>15) {
                        actionBtn.addClass("btn_largetext");
                    }
                    pane2api.getContentPane().append(actionBtn);
                });
            }

            // Add color
            tbar.find(".unit_row_div").removeClass("glowlightyellow");
            unitBtn.parents(".unit_row_div").addClass("glowlightyellow");

            pane2api.reinitialise();
        }
    }
}
function updateTbar(tbar) {
    // Get current state of TBar
    var sectorName = tbar.find(".title_text").html();
	var hasClock = sectorsWithClock.indexOf(sectorName)>-1;
	var hasAcctBtn = !(sectorsWithOutAcctBtn.indexOf(sectorName)>-1);
	var hasPsiBtn = !(sectorsWithOutAPsiBtn.indexOf(sectorName)>-1);
	var hasActions = !(sectorsWithOutActions.indexOf(sectorName)>-1);
	var unitBtns = tbar.find(".unit_btn");
	var manyUnits = unitBtns.length;

    var timer_bar = tbar.find(".unit_timer_bg");
    if (hasClock) {
        timer_bar.show();
	} else {
	    timer_bar.hide();
	}

    // Actions vs. Right Col Units
    if(hasActions) {
        tbar.find(".action_col_right").show();
        tbar.find(".unit_col_right").hide();
    } else {

        tbar.find(".action_col_right").hide();
        tbar.find(".unit_col_right").show();
    }

    // Acct Btn
	var acctBtn = tbar.find(".acct_unit_btn");
	if (hasAcctBtn) {
        acctBtn.show();
	} else {
	    acctBtn.hide();
	}

    // PSI btn
	var psiBtns = tbar.find(".psi_btn");
	if (hasPsiBtn) {
        psiBtns.show();
	} else {
	    psiBtns.hide();
	}

	// PAR btn
	if(manyUnits>0) {
	    tbar.find(".par_btn").removeClass("disabled");
	} else {
	    tbar.find(".par_btn").addClass("disabled");
	}

    // Actions
    if(manyUnits>0) {
	    tbar.find(".action_add_btn").show();

	    // Always at least one unit selected
        if(tbar.find(".unit_row_div.glowlightyellow").length==0) {
            showActionsForUnitBtn(tbar.find(".unit_row_div").first().find(".unit_btn"))();
        }
	}

    if(manyUnits>0) {
        if(sectorName=="RESCUE") {
            $("#rescue_objective_btn").addClass("glowlightgreen");
        }
        if(sectorName=="Safety") {
            $("#safety_objective_btn").addClass("glowlightgreen");
        }
        if(sectorName=="On Deck") {
            $("#ondeck_objective_btn").addClass("glowlightgreen");
        }
        if(sectorName=="ReHab") {
            $("#rehab_objective_btn").addClass("glowlightgreen");
        }
        if(sectorName=="Cust Service") {
            $("#custsvc_objective_btn").addClass("glowlightgreen");
        }
    }
    updateOsrPercentComplete();
    updateObjectivePercentComplete();
}
function initTbars() {
    var rescue_tbar = addTbar(gridster.cols, 1);
    var safety_tbar = addTbar(gridster.cols, 2);
    var rehab_tbar = addTbar(gridster.cols, 3);

    rescue_tbar.find(".title_text").html("RESCUE");
    safety_tbar.find(".title_text").html("Safety");
    rehab_tbar.find(".title_text").html("ReHab");

    updateTbar(rescue_tbar);
    updateTbar(safety_tbar);
    updateTbar(rehab_tbar);

    addTbar();
    addTbar();
    addTbar();
    addTbar();
    addTbar();

    addTbar();

    rehab_tbar.find(".benchmark_btn").hide();
}


function onOpenUnitsDialogFromTbar(tbar) {
    return function() {
        $(".unit_dialog_btn").removeClass("glowlightgreen");
        $.each(tbar.find(".unit_text"), function( index, tbarUnitBtn ) {
            var html = $(tbarUnitBtn).html();
            $(".unit_dialog_btn:contains('"+html+"')").addClass("glowlightgreen");
        });
    }
}
function toggleUnitButtonForTbar(unit_col_container) {
    return function(unitName) {
        if($(".unit_dialog_btn:contains('"+unitName+"')").hasClass("glowlightgreen")) {
            removeUnitButton(unit_col_container, unitName);
        } else {
            addUnitButton(unit_col_container, unitName);
        }
    }
}
function removeUnitButton(unit_col_container, unitName) {
    var tbar = unit_col_container.parents(".tbar");

    // Update Units Dialog
    $(".unit_dialog_btn:contains('"+unitName+"')").removeClass("glowlightgreen");

    // Remove unit row from TBar
    var unit_row_div = unit_col_container.find(".unit_btn:contains('"+unitName+"')").parents(".unit_row_div");
    var scroll_pane = unit_col_container.find(".scroll-pane");
    var pane2api = scroll_pane.data('jsp');
    unit_row_div.remove();
    pane2api.reinitialise();

    // Move unit button
    if(unit_col_container.find(".unit_btn").length==0) {
        tbar.find(".unit_move_btn").hide();
    }

    updateTbar(tbar);
}
var unitRowDivSerialId = 1;
function addUnitButton(unit_col_container, unitName, personnel_btn_text) {
    unitRowDivSerialId++;
    var tbar = unit_col_container.parents(".tbar");

    var scroll_pane = unit_col_container.find(".scroll-pane");
    var pane2api = scroll_pane.data('jsp');

    // Update Units Dialog
    $(".unit_dialog_btn:contains('"+unitName+"')").addClass("glowlightgreen");

    // Unit row div
    var unit_row_div = $("#unit_row_div_prototype").clone();
    pane2api.getContentPane().append(unit_row_div);
    unit_row_div.show();
    unit_row_div.children().show();
    unit_row_div.attr("id",unitRowDivSerialId+"_unit_row_div");

    // Unit Info Btn ('P' and PSI buttons)
    var tbar_unit_info_btn = unit_row_div.find(".tbar_unit_info_btn");
    tbar_unit_info_btn.attr("id", unitRowDivSerialId+"_unit_row_div");
    tbar_unit_info_btn.click(showUnitPeopleDialog(tbar, tbar_unit_info_btn));
    tbar_unit_info_btn.show();
    tbar_unit_info_btn.children().show();

    tbar_unit_info_btn.find(".personnel_btn").text(personnel_btn_text);

    // Unit button
    var unitBtn = unit_row_div.find(".unit_btn");
    unitBtn.click(showActionsForUnitBtn(unitBtn));
    var unit_text = unitBtn.find(".unit_text");
    unit_text.html(unitName);
    if (unitName.length>5) {
        unit_text.addClass("btn_largetext");
    } else if (unitName.length>4) {
        unit_text.addClass("btn_medtext");
    }

    // Move checkbox
    tbar.find(".unit_move_btn").show();
    unit_row_div.find(".unit_move_checkbox").hide();

    // Unit Timer
    // I think we'll need to show/hide the timer in the updateTbar function, but start it here.
    var unit_timer_bg = unitBtn.find(".unit_timer_bg");
    startUnitTimerAnim(unit_timer_bg.find(".unit_timer_bar"));

    // Reinitialize
    pane2api.reinitialise();

    updateTbar(tbar);
}
function moveUnitButton(unit_col, unit_col_destination, unitBtn) {
    var unitName = unitBtn.find(".unit_text").html();
    var personnel_btn_text = unitBtn.parents(".unit_row_div").find(".personnel_btn").html();

    removeUnitButton(unit_col, unitName)
    addUnitButton(unit_col_destination, unitName, personnel_btn_text);
}
function cancelUnitMove() {
    if(typeof tbar_moving!='undefined') {
        // Move unit button
        if(tbar_moving.find(".unit_btn").length==0) {
            tbar_moving.find(".unit_move_btn").hide();
        } else {
            tbar_moving.find(".unit_move_btn").show();
        }
    }
    jQuery($(".tbar_move_unit_cover")).detach();
    $(".unit_move_cancel_btn").hide();
    $(".unit_move_checkbox").hide();
    $(".tbar_unit_info_btn").show();
}

var tbarIndex = 0;
function addTbar(col_x, row_y) {
    tbarIndex++;

    if(typeof col_x=='undefined') {
        col_x = 0;
    }
    if(typeof row_y=='undefined') {
        row_y = 0;
    }

    var tbar = $("#tbar_prototype" ).clone();
    tbar.max_size_x = 1;
//    tbar.attr("data-col", col_x);
//    tbar.attr("data-row", row_y);
    gridster.add_widget.apply(gridster, [tbar, 1, 1, col_x, row_y]);
    tbar.prefix_dir = 'X';
    tbar.prefix_num = 'X';
    var newTbarId = "tbar_"+tbarIndex;
    tbar.attr("id",newTbarId);

    //Title Btn
    var titleBtn = tbar.find(".title_btn");
    var titleBtnId = "tbar_title_"+tbarIndex;
    titleBtn.attr("id", titleBtnId);
    titleBtn.click(showSectorDialog(tbar, titleBtn, "#sector_dialog"));
    var tbarDirBtn = tbar.find(".title_dir");
    var tbarNumBtn = tbar.find(".title_num");
    tbarDirBtn.hide();
    tbarNumBtn.hide();

    //PAR (Sector) button
    var parBtn = tbar.find(".par_btn");
    parBtn.attr("id", "par_btn_"+tbarIndex);
    parBtn.click(showParDialog(tbar, parBtn));

    //Accountability button
    var acctBtn = tbar.find(".acct_unit_btn");
    acctBtn.attr("id", "acct_unit_btn_"+tbarIndex);
    acctBtn.click(
        showDialog_withCallbacks(
            "#units_dialog",
            0, //parentDialog
            function(){
                $(".unit_dialog_btn").removeClass("glowlightgreen");
                $(".unit_dialog_btn:contains('"+acctBtn.html()+"')").addClass("glowlightgreen");
            },
            function(unitName){
                acctBtn.html(unitName);
                $("#acct_osr_btn").addClass("glowlightgreen");
                updateOsrPercentComplete();
                hideAllDialogs();
            }
        )
    );

    //Benchmark Btn
    var benchmarkBtn = tbar.find(".benchmark_btn");
    var benchmarkBtnId = "tbar_benchmark_"+tbarIndex;
    benchmarkBtn.attr("id", benchmarkBtnId);
    benchmarkBtn.click(showBenchmarkDialog(tbar, benchmarkBtn));

    // Add Unit Btn
    var unit_col_left = tbar.find(".unit_col_left");
    var unit_col_right = tbar.find(".unit_col_right");
    unit_col_right.hide();
    var unit_add_btn_left = unit_col_left.find(".unit_add_btn");
    var unit_add_btn_right = unit_col_right.find(".unit_add_btn");
    unit_add_btn_left.attr("id", "unit_add_btn_left_"+tbarIndex);
    unit_add_btn_right.attr("id", "unit_add_btn_right_"+tbarIndex);
    unit_add_btn_left.click(showDialog_withCallbacks("#units_dialog", 0/*parentDialog*/,onOpenUnitsDialogFromTbar(tbar), toggleUnitButtonForTbar(unit_col_left)));
    unit_add_btn_right.click(showDialog_withCallbacks("#units_dialog", 0/*parentDialog*/, onOpenUnitsDialogFromTbar(tbar), toggleUnitButtonForTbar(unit_col_right)));

    // Add Action Btn
    var action_add_btn = tbar.find(".action_add_btn");
    action_add_btn.attr("id", "action_add_btn_"+tbarIndex);
    action_add_btn.hide();//Button is shown once units have been added
    action_add_btn.click(showDialog_withCallbacks("#actions_dialog", 0/*parentDialog*/, onOpenActionsDialogFromTbar(tbar), toggleActionButtonForTbar(tbar)));

    // Move Btn
    var unit_move_btn = tbar.find(".unit_move_btn");
    unit_move_btn.hide();
    var unit_move_cancel_btn = tbar.find(".unit_move_cancel_btn");
    unit_move_btn.click(function(){
        tbar_moving = tbar;
        tbar.find(".tbar_unit_info_btn").fadeOut(100, "linear", function(){tbar.find(".unit_move_checkbox").fadeIn(100)});
        $(".unit_col:visible").each(function(){
            var unit_col_destination = $(this);

            var thisTbarId = unit_col_destination.parents(".tbar").attr("id");
            if(thisTbarId!=newTbarId) {
                unit_move_btn.hide();
                unit_move_cancel_btn.show();
                var tbar_cover = $("<div class='tbar_move_unit_cover'></div>");
                tbar_cover.appendTo($('#mayday_and_tbar_container'));
                tbar_cover.width(unit_col_destination.width() + 1);
                tbar_cover.height(unit_col_destination.height() + 1);
                tbar_cover.offset(unit_col_destination.offset());
                tbar_cover.click(function () {
                    tbar.find(".unit_move_checkbox>*:checkbox:checked").each(function () {
                        var unit_move_checkbox = $(this);
                        var unit_btn = unit_move_checkbox.parents(".unit_row_div").find(".unit_btn");
                        var unit_col = unit_move_checkbox.parents(".unit_col");
                        moveUnitButton(unit_col, unit_col_destination, unit_btn);
                    });

                    // Show action list
                    var first_unit_btn = tbar.find(".unit_btn").first();
                    if (typeof first_unit_btn != 'undefined') {
                        showActionsForUnitBtn(first_unit_btn);
                    }
                    var first_unit_btn_dst = unit_col_destination.find(".unit_btn").first();
                    if (typeof first_unit_btn_dst != 'undefined') {
                        showActionsForUnitBtn(first_unit_btn_dst);
                    }

                    // Close all TBar covers
                    cancelUnitMove();
                });
            }//if not this tbar
        });
    });

    // Move Cancel Btn
    unit_move_cancel_btn.hide();
    unit_move_cancel_btn.click(function(){
        cancelUnitMove();
    });

    tbar.show();

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


function toggleEmergTrafficBtn(btn) {
    return function() {
        btn.toggleClass("glowlightgreen");
    }
}
function initEmergTrafficDialog() {
    $(".emergency_traffic_item_btn").each(function() {
        $(this).click(function() {
            toggleEmergTrafficBtn($(this));
            hideAllDialogs();
        })});
}
function clickModeButton() {
    // TODO: Update OSR button percentage when toggle mode button to OFF
    var mode_btn = $("#mode_btn");

    if(mode_btn.hasClass("offensive_btn")) {
        mode_btn.addClass("defensive_btn");
        mode_btn.removeClass("offensive_btn");
        mode_btn.html("DEFENSE");
        $("#osr_occupancy_off_btn").removeClass("glowlightgreen");
        $("#osr_occupancy_def_btn").addClass("glowlightgreen");
        showDialog(0, mode_btn, "#emergency_traffic_dialog")();
    } else {
        mode_btn.addClass("offensive_btn");
        mode_btn.removeClass("defensive_btn");
        mode_btn.html("OFFENSE");
        $("#osr_occupancy_off_btn").addClass("glowlightgreen");
        $("#osr_occupancy_def_btn").removeClass("glowlightgreen");
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

var gridster;
function init( ) {

    var log = document.getElementById('log');

    gridster = $(".gridster ul").gridster({
      widget_base_dimensions: [278, 275],
      widget_margins: [5, 5],
      autogrow_cols: false
    }).data('gridster');
    gridster.disable();

    initTbars();

	//Init Dialogs
	initSectorDialog();
	initParDialog();
	initPsiDialog();
	initActionsDialog();
	initUnitsDialog();
	initUnitPeopleDialog();
	initBenchmarkDialog();
	$("#report_btn").click(function(){alert("TESTING");});
	initCmdTerminateDialog();
	initMaydayDialog();
	initObjectivesDialog();
	initOsrDialog();
	initIapDialog();
	initIncidentInfo();
	initEmergTrafficDialog();
	init10KeyDialog();

    $("#unit_row_div_prototype").hide();
    $("#unit_row_div_prototype>*").hide();
	$("#tbar_prototype").hide();
	$("#dialogContainer").hide();
	$("#dialog_prototype").hide();
	$(".dialog_close_btn").click(function(){
        if(typeof onCloseCallback!='undefined' && onCloseCallback!=0) {
            onCloseCallback();
        }
	    hideAllDialogs();
	    $(".dialog").hide();
	    if(typeof parentDialog!='undefined' && parentDialog!=0) {
	        $("#dialogContainer").show();
            parentDialog.show();
            parentDialog = 0;
        }
	});

    $("#move_unit_screen_cover").hide();
	$("#mode_btn").click(clickModeButton);
	
	hideAllDialogs();
	
	window.setTimeout(blinkUnit, 500);
	window.setInterval(updateTimer, 1000);

	$('.scroll-pane').jScrollPane();

    Array.prototype.remByVal = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === val) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    }
}

//Call this to dismiss the dialogs
function hideAllDialogs( ) {
	$("#dialogContainer").hide();
	$(".dialog").hide();
}

$.fn.exists = function () {
    return this.length !== 0;
}

$( document ).ready(init);
//Esc Key Press
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        if(typeof onCloseCallback!='undefined' && onCloseCallback!=0) {
            onCloseCallback();
        }
        hideAllDialogs();
        cancelUnitMove();
        if(typeof parentDialog!='undefined' && parentDialog!=0) {
            $("#dialogContainer").show();
            parentDialog.show();
            parentDialog = 0;
        }
    }
});

document.addEventListener('click', function(event) {
    if($(event.target).hasClass("disabled") || $(event.target).parents(".disabled").length>0) {
        event.stopPropagation();
    }
}, true);

var actions = [
    {action_type:"Engine",
        actions:[
            "Supply",
            "Take a Line",
            "Search/Rescue",
            "Fire Attack",
            "IRIC",
            "Check Extension",
            "Protect Exposures",
            "Overhaul",
            "Deck Gun",
            "Portable Monitor"
        ],
        actions_warning:[]
    },
    {action_type:"Ladder",
        actions:[
            "Secure Utilities",
            "Vert Ventilation",
            "Trench Cut",
            "Roof Profile",
            "Fan to the Door",
            "Soften Building",
            "Open Building",
            "Salvage",
            "Elevated Master"
        ],
        actions_warning:[]
    },
    {action_type:"Safety",
        actions:[
            "Agrees With Strategy",
            "360 recon"
        ],
        actions_warning:[
            "*Pool",
            "*Empty Pool",
            "*Powerlines",
            "*Powerlines Down",
            "*Bars on Windows",
            "*Dogs in Yard",
            "*Hoarders House",
            "*Basement"
    ]},
    {action_type:"Rescue",
        actions:[
            "Grab RIC Bag",
            "Accountability Update",
            "Throw Ladders"
        ],
        actions_warning:[]
    },
    {action_type:"Lines",
        actions:[
            "1-3/4",
            "2\"",
            "2-1/2",
            "3\"",
            "Piercing Nozzle",
            "Horizontal Standpipe",
            "Support Sprinklers",
            "Standpipe"
        ],
        actions_warning:[]
    }
];



var sectorsWithClock = [
	"Interior",
	"Roof",
	"Ventilation",
	"Sector 1",
	"Sector 2",
	"Sector 3",
	"Sector 4",
	"RESCUE",
	"Sector",
    "Safety",
    "IRIC",
    "RIC"
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
	"RESCUE",

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
	"Sector ####",

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
var Con = "Con";

var unitTypes = [
	Engine,
	Ladder,
	BC,
	Squad,
	Util,
	CV,
	Con,
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
		Ambo:[
			"Ambo",],
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
		    "ED200",
			"BC201",
			"BC202",
			"BC203",
			"BSO200",
			"BSO201",
			"BSO202",
			"BSO203"],
		Squad:[
			"SQ204",
			"SQ206"],
        ScnSup:[
            "SS208",
        ],
		WtrTend:[
			"WT213",
		],
		Brush:[
			"Br212",
			"Br214",
			"Br216",
			"Br219",
        ],
        Foam:[
            "FO21",
            "FO22",
            "FO23",
        ],
		Con:[
		    "Con201",
		    "Con202",
		    "Con203"
		],
		Util:[
			"U202",],
		CV:[
		    "CV201"
		],
		HazMat:[
			"HM206",],
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
		WtrTend:["WT261"],
		Brush:["BR261"],
		Rehab:["RH261"],
		Ambo:[
			"SWA261",
			"SWA262",
			"SWA265",],
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
		Medic:[
			"Med271",
			"Med272",
			"Med276"],
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


