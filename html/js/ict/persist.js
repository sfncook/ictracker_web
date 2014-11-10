var inc_num = "";
var inc_address = "";
var inc_type_icon = "";
var inc_type = "";
var inc_url = "";
var inc_icon = "";

//*************
//  SAVING
//*************
var bnchBtnIds_unable = [
    "benchmark_unable_primary",
    "benchmark_unable_secondary"
];
var bnchBtnIds = [
    "bnch_primary",
    "bnch_underctl",
    "bnch_secondary",
    "bnch_lossstop",
    "bnch_primary_par",
    "bnch_primary_notify",
    "bnch_primary_challenge",
    "bnch_underctl_par",
    "bnch_underctl_notify",
    "bnch_underctl_obtain",
    "bnch_secondary_par",
    "bnch_secondary_notify",
    "bnch_lossstop_par",
    "bnch_lossstop_notify",
    'benchmark_vent_1',
    'benchmark_vent_2',
    'benchmark_vent_3',
    'benchmark_iric_1',
    'benchmark_iric_2',
    'benchmark_iric_3',
    'benchmark_iric_4',
    'benchmark_safety_1',
    'benchmark_safety_2',
    'benchmark_treatment_1',
    'benchmark_treatment_2',
    'benchmark_treatment_3',
    'benchmark_lz_1',
    'benchmark_lz_2',
    'benchmark_lz_3'
];
var triageBtnIds = [
    "benchmark_triage_1",
    "benchmark_triage_2",
    "benchmark_triage_3"
];
function actionObjForJson(unitBtn) {
    var unitObj = {};

    var unit_text = unitBtn.find(".unit_text").html();
    unitObj['unit_text'] = unit_text;

    return unitObj;
}
function unitToObjForJson(unitBtn) {
    var unitObj = {};

    var unit_text = unitBtn.find(".unit_text").html();
    unitObj['unit_text'] = unit_text;

    // Actions
    unitObj['actions'] = [];
    if (typeof unitBtn.data('actions') != 'undefined') {
        jQuery.each(unitBtn.data('actions'), function (index, actionName) {
            unitObj['actions'].push(actionName);
        });
    }

    // par
    var unit_par = unitBtn.parent().find('.personnel_btn').html();
    unitObj['unit_par'] = unit_par;

    // psi
    var psi_btn = unitBtn.parent().find('.psi_btn').html();
    unitObj['psi_btn'] = psi_btn;

    // TODO:
    // unit timer

    return unitObj;
}
function tbarToJson(tbarEl) {
    var tbarObj = {};

    // TBar
    var title_text = tbarEl.find(".title_text").html();
    var col = tbarEl.data("col");
    var row = tbarEl.data("row");
    tbarObj['title_text'] = title_text;
    tbarObj['col'] = col;
    tbarObj['row'] = row;

    // Units
    var units = new Array();
    tbarEl.find(".unit_btn").each(function (index, unitBtn) {
        var unitBtnJson = unitToObjForJson($(unitBtn));
        units.push(unitBtnJson);
    });
    tbarObj['units'] = units;

    // Par Tbar
    var btn_ids_with_par = new Array();
    if (typeof tbarEl.data('btn_ids_with_par') != 'undefined') {
        jQuery.each(tbarEl.data('btn_ids_with_par'), function (index, parName) {
            btn_ids_with_par.push(parName);
        });
    }
    tbarObj['btn_ids_with_par'] = btn_ids_with_par;

    // Benchmarks
    var benchmarks = {};
    for (i = 0; i < bnchBtnIds_unable.length; i++) {
        var bnchBtnId = bnchBtnIds_unable[i];
        if (tbarEl.data(bnchBtnId)) {
            benchmarks[bnchBtnId] = 'true';
        } else {
            benchmarks[bnchBtnId] = 'false';
        }
    }
    for (i = 0; i < bnchBtnIds.length; i++) {
        var bnchBtnId = bnchBtnIds[i];
        if (tbarEl.data(bnchBtnId)) {
            benchmarks[bnchBtnId] = 'true';
        } else {
            benchmarks[bnchBtnId] = 'false';
        }
    }
    for (i = 0; i < triageBtnIds.length; i++) {
        var bnchBtnId = triageBtnIds[i];
        if (tbarEl.data(bnchBtnId)) {
            benchmarks[bnchBtnId] = tbarEl.data(bnchBtnId);
        }
    }
    tbarObj['benchmarks'] = benchmarks;

    return JSON.stringify(tbarObj);
}
function archiveCurrentInc() {
    var inc_num = localStorage.getItem('inc_num');
    var inc_address = localStorage.getItem('inc_address');
    if (inc_num != null || inc_address != null) {
        var cur_inc_string = JSON.stringify(localStorage);
        var prev_incs_str = localStorage.getItem("prev_incs");
        var prevIncsObj = new Array();
        if (prev_incs_str != null) {
            prevIncsObj = JSON.parse(prev_incs_str);
        }
        for (var i = 0; i < prevIncsObj.length; i++) {
            var incObj = JSON.parse(prevIncsObj[i]);
            if (incObj['inc_num'] == inc_num) {
                prevIncsObj.splice(i, 1);
                break;
            }
        }
        prevIncsObj.push(cur_inc_string);
        localStorage.clear();
        localStorage.setItem("prev_incs", JSON.stringify(prevIncsObj));
    }
}
function loadInc(incObj) {
    var keys = Object.keys(incObj);
    clearIncData();
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = incObj[key];
        localStorage.setItem(key, value);
    }
}
function clearIncData() {
    var cur_inc_string = JSON.stringify(localStorage);
    var prev_incs = localStorage.getItem("prev_incs");
    localStorage.clear();
    if (prev_incs != null) {
        localStorage.setItem("prev_incs", prev_incs);
    }
}
function deleteAllCookies() {
    localStorage.clear();
}
function osrToJson() {
    var osr = {};

    var osr_btns = new Array();
    $(".osr_btn").each(function (index, osr_btn) {
        var objToAdd = {
            'id': $(osr_btn).attr("id"),
            'green': $(osr_btn).hasClass("glowlightgreen"),
            'html': $(osr_btn).html()
        };
        osr_btns.push(objToAdd);
    });
    osr['osr_btns'] = osr_btns;

    osr['unit_osr_btn'] = {
        'html': $("#unit_osr_btn").html(),
        'green': $("#unit_osr_btn").hasClass("glowlightgreen")
    };
    osr['osr_address_btn'] = {
        'html': $("#osr_address_btn").html(),
        'green': $("#osr_address_btn").hasClass("glowlightgreen")
    };

    var osr_toggle_btns = new Array();
    $(".osr_toggle_btn").each(function (index, osr_btn) {
        var objToAdd = {
            'id': $(osr_btn).attr("id"),
            'green': $(osr_btn).hasClass("glowlightgreen")
        };
        osr_toggle_btns.push(objToAdd);
    });
    osr['osr_toggle_btns'] = osr_toggle_btns;

    var osr_selects = new Array();
    $(".osr_select").each(function (index, osr_select) {
        osr_selects.push({
            'id': $(osr_select).attr('id'),
            'selected': $(osr_select).find("option:selected").html(),
            'green': $(osr_select).hasClass("glowlightgreen")
        });
    });
    osr['osr_selects'] = osr_selects;

    return JSON.stringify(osr);
}
function saveCookieState() {
    if (COOKIES_ENABLED) {

        // Save items that need to survive
        var inc_url_temp = localStorage.getItem('inc_url');
        var inc_icon_temp = localStorage.getItem('inc_icon');
        var inc_type_temp = localStorage.getItem('inc_type');
        var eventsJson = localStorage.getItem('events');

        // Reset cookies
        clearIncData();

        // App version
        localStorage.setItem('previous_app_version', $('#version_text').html());

        // Incident Info
        localStorage.setItem('is_incident_running', isIncidentRunning);
        localStorage.setItem('inc_num', inc_num);
        localStorage.setItem('inc_address', inc_address);
        localStorage.setItem('inc_url', inc_url_temp);
        localStorage.setItem('inc_icon', inc_icon_temp);
        localStorage.setItem('inc_type', inc_type_temp);


        // Tbars
        $(".tbar").each(function (index, tbar) {
            if ($(tbar).attr('id') != 'tbar_prototype') {
                var tbarJson = tbarToJson($(tbar));
                var tbar_key = "tbar_" + $(tbar).data("col") + "_" + $(tbar).data("row");
                localStorage.setItem('tbar_' + tbar_key, tbarJson);
            }
        });

        // Timer
        localStorage.setItem('t0', t0);

        // Mode
        var mode_btn = $("#mode_btn");
        localStorage.setItem('mode', mode_btn.html());

        // Cust Actions
        var cust_actions = new Array();
        $(".action_cust_btn").each(function () {
            cust_actions.push($(this).html());
        });
        localStorage.setItem('cust_actions', JSON.stringify(cust_actions));

        // Dispatched Units
        var dispatched_units = new Array();
        $(".dispatched_unit_btn").each(function (index, dispatched_unit_btn) {
            var dispatched_unit_text = $(dispatched_unit_btn).text();
            dispatched_unit_text = dispatched_unit_text.substring(0, dispatched_unit_text.length - 1);
            dispatched_units.push(dispatched_unit_text);
        });
        localStorage.setItem('dispatched_units', JSON.stringify(dispatched_units));

        // Upgrade
        var upgrade_btns = new Array();
        $(".upgrade_btn").each(function (index, upgrade_btn) {
            var objToAdd = {
                'id': $(upgrade_btn).attr("id"),
                'disabled': $(upgrade_btn).hasClass("disabled"),
                'green': $(upgrade_btn).hasClass("glowlightgreen")
            };
            upgrade_btns.push(objToAdd);
        });
        localStorage.setItem('upgrade_btns', JSON.stringify(upgrade_btns));

        // OSR
        localStorage.setItem('osr', osrToJson());

        // Objectives
        var objective_btns = new Array();
        $(".objective_btn").each(function (index, objective_btn) {
            var objToAdd = {
                'id': $(objective_btn).attr("id"),
                'green': $(objective_btn).hasClass("glowlightgreen")
            };
            objective_btns.push(objToAdd);
        });
        localStorage.setItem('objective_btns', JSON.stringify(objective_btns));

        // IAP
        var iap_toggle_btns = new Array();
        $(".iap_toggle_btn").each(function (index, iap_toggle_btn) {
            var objToAdd = {
                'id': $(iap_toggle_btn).attr("id"),
                'orange': $(iap_toggle_btn).hasClass("glow_orange"),
                'green': $(iap_toggle_btn).hasClass("glowlightgreen")
            };
            iap_toggle_btns.push(objToAdd);
        });
        localStorage.setItem('iap_toggle_btns', JSON.stringify(iap_toggle_btns));

        var iap_inputs = new Array();
        $(".iap_input").each(function (index, iap_input) {
            var objToAdd = {
                'id': $(iap_input).attr("id"),
                'text': $(iap_input).val()
            };
            iap_inputs.push(objToAdd);
        });
        localStorage.setItem('iap_inputs', JSON.stringify(iap_inputs));

        // Report
        localStorage.setItem('events', eventsJson);

        // Command Transferred
        var unit_cmdxfer_btns = new Array();
        $(".unit_cmdxfer_btn").each(function (index, unit_cmdxfer_btn) {
            var objToAdd = {
                'id': $(unit_cmdxfer_btn).attr("id"),
                'html': $(unit_cmdxfer_btn).html(),
                'green': $(unit_cmdxfer_btn).hasClass("glowlightgreen")
            };
            unit_cmdxfer_btns.push(objToAdd);
        });
        localStorage.setItem('unit_cmdxfer_btns', JSON.stringify(unit_cmdxfer_btns));
    }
}


//*************
//  LOADING
//*************
function findTbarElementByColRow(col, row) {
    var retTbar;
    $(".tbar").each(function (index, tbar) {
        if ($(tbar).attr('id') != 'tbar_prototype') {
            var colTbar = $(tbar).data("col");
            var rowTbar = $(tbar).data("row");
            if (col == colTbar && row == rowTbar) {
                retTbar = tbar;
            }
        }
    });
    if (typeof retTbar != 'undefined') {
        return $(retTbar);
    } else {
        return retTbar;
    }
}
function addAllUnitsToTbar(tbarEl, units) {
    var unit_col_left = tbarEl.find(".unit_col_left");
    //TODO: Need to distinguish between left and right containers
//    var unit_col_right = tbarEl.find(".unit_col_right");
    for (var i = 0; i < units.length; i++) {
        var unit = units[i];
        var unit_text = unit['unit_text'];
        addUnitButton(unit_col_left, unit_text);
        var unitBtn = unit_col_left.find(".unit_btn:contains('" + unit_text + "')");

        // Actions
        var actions = unit['actions'];
        unitBtn.data({'actions': actions});

        // Par
        if (typeof unit['unit_par'] != 'undefined') {
            unitBtn.parent().find('.personnel_btn').html(unit['unit_par']);
        }

        // PSI
        if (typeof unit['psi_btn'] != 'undefined') {
            setPsiText_WithBtn(unit['psi_btn'], unitBtn.parent().find('.psi_btn'));
        }

    }
}
function loadTbarFromCookie(tbarObj) {
    var col = tbarObj['col'];
    var row = tbarObj['row'];
    var units = tbarObj['units'];
    var tbarEl = findTbarElementByColRow(col, row);
    if (typeof tbarEl != 'undefined') {
        tbarEl.find(".title_text").html(tbarObj['title_text']);
    } else {
        tbarEl = addTbar(col, row);
        var title_text = tbarObj['title_text'];
        tbarEl.find(".title_text").html(title_text);
    }
    addAllUnitsToTbar(tbarEl, units);

    // Par Tbar
    if (typeof tbarObj['btn_ids_with_par'] != 'undefined') {
        tbarEl.data({'btn_ids_with_par': tbarObj['btn_ids_with_par']});
    }
    // TODO: Turn tbar par btn green if needed
    // TODO: Update tbar par timer (?)

    if (units.length > 0) {
        showActionsForUnitBtn(tbarEl.find(".unit_row_div").first().find(".unit_btn"))();
    }

    // Benchmarks
    var benchmarks = tbarObj['benchmarks'];
    var benchmarksKeys = Object.keys(benchmarks);
    for (i = 0; i < benchmarksKeys.length; i++) {
        var benchmarksKey = benchmarksKeys[i];
        var benchmark = benchmarks[benchmarksKey];
        if (triageBtnIds.indexOf(benchmarksKey) == -1) {
            tbarEl.data(benchmarksKey, benchmark == "true");
        } else {
            tbarEl.data(benchmarksKey, benchmark);
        }
    }
}
initializingInProgress = false;
function loadCookieState() {
    if (COOKIES_ENABLED) {
        COOKIES_ENABLED = false; // temporarily disable so we don't try to save cookies again.
        var newEvents = new Array();
        for (var keyIndex = 0, len = localStorage.length; keyIndex < len; keyIndex++) {
            var key = localStorage.key(keyIndex);
            var value = localStorage[key];

            // Incident Info
            if (key == 'previous_app_version') {
                // TODO:
            }
            else if (key == 'inc_num') {
                inc_num = value;
            }
            else if (key == 'inc_address') {
                inc_address = value;
            }
            else if (key == 'inc_url') {
                inc_url = value;
            }
            else if (key == 'inc_icon') {
                inc_icon = value;
            }
            else if (key == 'inc_type') {
                inc_type = value;
            }
            else if (key == 'is_incident_running') {
                isIncidentRunning = value;
            }

            // Timer
            else if (key == 't0') {
                t0 = value;
            }

            // Mode
            else if (key == 'mode') {
                var mode = value;
                setMode(mode)
            }

//            // Custom Actions
            else if (key == 'cust_actions') {
                // Handle in postLoad()
            }

            // Dispatched Units
            else if (key == 'dispatched_units') {
                var dispatched_units_str = value;
                var dispatched_units = JSON.parse(dispatched_units_str);
                for (var i = 0; i < dispatched_units.length; i++) {
                    var dispatched_unit = dispatched_units[i];
                    addDispatchedUnit(dispatched_unit);
                }
            }

            // Upgrade
            else if (key == 'upgrade_btns') {
                var upgradeBtnsStr = value;
                var upgrade_btns = JSON.parse(upgradeBtnsStr);
                for (var i = 0; i < upgrade_btns.length; i++) {
                    var objFromJson = upgrade_btns[i];
                    if (objFromJson['green']) {
                        $("#" + objFromJson['id']).addClass("glowlightgreen");
                    }
                    if (objFromJson['disabled']) {
                        $("#" + objFromJson['id']).addClass("disabled");
                    } else {
                        $("#" + objFromJson['id']).removeClass("disabled");
                    }
                }
            }

            // OSR
            else if (key == 'osr') {
                var osrStr = value;
                var osrObj = JSON.parse(osrStr);
                if (typeof osrObj['osr_btns'] != 'undefined') {
                    var osr_btns = osrObj['osr_btns'];
                    for (var i = 0; i < osr_btns.length; i++) {
                        var objFromJson = osr_btns[i];
                        if (objFromJson['green']) {
                            $("#" + objFromJson['id']).addClass("glowlightgreen");
                        }
                        $("#" + objFromJson['id']).html(objFromJson['html']);
                    }
                }
                $("#unit_osr_btn").html(osrObj['unit_osr_btn']['html']);
                if (osrObj['unit_osr_btn']['green']) {
                    $("#unit_osr_btn").addClass('glowlightgreen');
                }
                $("#osr_address_btn").html(osrObj['osr_address_btn']['html']);
                if (osrObj['osr_address_btn']['green']) {
                    $("#osr_address_btn").addClass('glowlightgreen');
                }
                if (typeof osrObj['osr_toggle_btns'] != 'undefined') {
                    var osr_btns = osrObj['osr_toggle_btns'];
                    for (var i = 0; i < osr_btns.length; i++) {
                        var objFromJson = osr_btns[i];
                        if (objFromJson['green']) {
                            $("#" + objFromJson['id']).addClass("glowlightgreen");
                        }
                    }
                }

                if (typeof osrObj['osr_selects'] != 'undefined') {
                    var osr_selects = osrObj['osr_selects'];
                    for (var i = 0; i < osr_selects.length; i++) {
                        var objFromJson = osr_selects[i];
                        if (objFromJson['green']) {
                            $("#" + objFromJson['id']).addClass("glowlightgreen");
                        }
                        $("#" + objFromJson['id']).find("option:contains(" + objFromJson['selected'] + ")").attr('selected', 'selected');
                    }
                }
                updateOsrPercentComplete();
            }// OSR

            // Objectives
            else if (key == 'objective_btns') {
                var objectiveBtnStr = value;
                var objective_btns = JSON.parse(objectiveBtnStr);
                for (var i = 0; i < objective_btns.length; i++) {
                    var objFromJson = objective_btns[i];
                    if (objFromJson['green']) {
                        $("#" + objFromJson['id']).addClass("glowlightgreen");
                    }
                }
                updateObjectivePercentComplete();
            }

            // IAP
            else if (key == 'iap_toggle_btns') {
                var iapBtnStr = value;
                var iap_toggle_btns = JSON.parse(iapBtnStr);
                for (var i = 0; i < iap_toggle_btns.length; i++) {
                    var objFromJson = iap_toggle_btns[i];
                    if (objFromJson['orange']) {
                        $("#" + objFromJson['id']).addClass("glow_orange");
                    }
                    if (objFromJson['green']) {
                        $("#" + objFromJson['id']).addClass("glowlightgreen");
                    }
                }
            }
            else if (key == 'iap_inputs') {
                var iapBtnStr = value;
                var iap_toggle_btns = JSON.parse(iapBtnStr);
                for (var i = 0; i < iap_toggle_btns.length; i++) {
                    var objFromJson = iap_toggle_btns[i];
                    $("#" + objFromJson['id']).val(objFromJson['text']);
                }
            }

            // Report
            else if (key == 'events') {
                var newEventsStr = value;
                newEvents = JSON.parse(newEventsStr);
            }

            // Command Transferred
            else if (key == 'unit_cmdxfer_btns') {
                var unit_cmdxfer_btnstr = value;
                var unit_cmdxfer_btns = JSON.parse(unit_cmdxfer_btnstr);
                for (var i = 0; i < unit_cmdxfer_btns.length; i++) {
                    var objFromJson = unit_cmdxfer_btns[i];
                    $("#" + objFromJson['id']).html(objFromJson['html']);
                    if (objFromJson['green']) {
                        $("#" + objFromJson['id']).addClass("glowlightgreen");
                    }
                }
            }

            else if (key.indexOf("tbar_") == 0) {
                var tbarObj = JSON.parse(value);
                loadTbarFromCookie(tbarObj);
            }

            else if (key == 'prev_incs') {
                // Do nothing
            }

            else {
                console.log("Unhandled cookie: key:[" + key + "] value:[" + value + "]");
            }
        } // for
        loadEvents(newEvents);
        COOKIES_ENABLED = true;
    }
}

function postLoadCookieState() {
    if (COOKIES_ENABLED) {
        COOKIES_ENABLED = false; // temporarily disable so we don't try to save cookies again.
        for (var keyIndex = 0, len = localStorage.length; keyIndex < len; keyIndex++) {
            var key = localStorage.key(keyIndex);
            var value = localStorage[key];
            // Custom Actions
            if (key == 'cust_actions') {
                var cust_actions_str = value;
                var cust_actions = JSON.parse(cust_actions_str);
                for (var i = 0; i < cust_actions.length; i++) {
                    var cust_action = cust_actions[i];
                    addCustAction(cust_action);
                }
            }

            else {
                // Do Nothing
            }
        } // for
        COOKIES_ENABLED = true;
    }
}
