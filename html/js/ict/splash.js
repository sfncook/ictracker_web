function callLoadInc(incObj) {
    return function(){
        loadInc(incObj);
        window.location.href = incObj['inc_url'];
    };
}
function loadPrevTable(prevIncs) {
    for (var i = 0; i < prevIncs.length; i++) {
        var incStr = prevIncs[i];
        var incObj = JSON.parse(incStr);

        var rowEl = $('<tr></tr>');
        rowEl.append('<td><div class="load_btn button">Load</div></td>');
        rowEl.append('<td>' + incObj['inc_num'] + '</td>');
        rowEl.append('<td><img class="prev_table_type_icon" src="' + incObj['inc_icon'] + '"/></td>');
        rowEl.append('<td>' + incObj['inc_address'] + '</td>');

        var load_btn = rowEl.find(".load_btn");
        load_btn.click(callLoadInc(incObj));

        $('#previnc_right_col_body').append(rowEl);
    }
}
function initPrevTable() {
    archiveCurrentInc();

    var previnc_container = $("#previnc_container");
    var previnc_right_col = $("#previnc_right_col");
    var view_previnc_btn = $("#view_previnc_btn");
    var view_previn_clos = $("#view_previn_clos");
    var view_previn_open = $("#view_previn_open");
    var no_previnc_btn = $("#no_previnc_btn");

    previnc_right_col.hide();
    view_previn_clos.hide();
    view_previn_open.show();


    var prevIncsStr = localStorage.getItem("prev_incs");
    if (prevIncsStr != null && prevIncsStr.length > 0) {
        no_previnc_btn.hide();
        view_previnc_btn.click(function () {
            if (previnc_right_col.is(":visible")) {
                // close it
                previnc_right_col.hide();
                view_previn_clos.hide();
                view_previn_open.show();
            } else {
                // open it
                previnc_right_col.show();
                view_previn_clos.show();
                view_previn_open.hide();
            }
        });

        var prevIncsObj = JSON.parse(prevIncsStr);
        loadPrevTable(prevIncsObj);
    } else {
        view_previnc_btn.hide();
    }
}

function initSplash() {

    var btnPrototypeStr = '<div class="splash_start_btn button">' +
        '<img class="splash_start_btn_icon" src="[icon]"/>' +
        '<div class="splash_start_btn_text">[text]</div>' +
        '</div>';

    incidentStartBtns.forEach(function (btnObj, index, array) {
        var btnText = btnPrototypeStr.replace("[icon]", btnObj.icon).replace("[text]", btnObj.text);
        var btn = $(btnText);
        $("#splash_row" + btnObj.row).append(btn);

        if (typeof btnObj.disabled != 'undefined') {
            btn.addClass("disabled");
        }

        if (typeof btnObj.url != 'undefined') {
            btn.click(function () {
                clearIncData();

                localStorage.setItem('inc_num', $("#inc_num_input").val());
                localStorage.setItem('inc_address', $("#address_input").val());
                localStorage.setItem('inc_url', btnObj.url);
                localStorage.setItem('inc_icon', btnObj.icon);
                localStorage.setItem('inc_type', btnObj.type);

                var urlLink = btnObj.url;
                window.location.href = urlLink;
            });
        }
    });
    $("#splash_row2").append($("<div class='clear_float'></div>"));
    $("#splash_row3").append($("<div class='clear_float'></div>"));
    $("#splash_row4").append($("<div class='clear_float'></div>"));
}

function init() {
    initSplash();
    initPrevTable();

    $("#clickme_btn").click(function () {

    });
}

$(document).ready(init);

var incidentStartBtns = [
    {
        type: 'fire',
        icon: "images/icons/fire.png",
        text: "Fire Incident",
        url: "fire_inc.html",
        row: 2
    },
    {
        type: 'medical',
        icon: "images/icons/medical.png",
        text: "Medical Incident",
        disabled: "true",
        row: 2
    },
    {
        type: 'arff',
        icon: "images/icons/plane.png",
        text: "ARFF Incident",
        url: "fire_inc.html",
        row: 3
    },
    {
//        type: 'hazmat',
        type: 'arff',
        icon: "images/icons/hazmat.png",
        text: "HazMat Incident",
        url: "fire_inc.html",
        row: 3
    },
    {
//        type: 'water',
        type: 'arff',
        icon: "images/icons/water.png",
        text: "Water Rescue",
        url: "fire_inc.html",
        row: 3
    },
    {
//        type: 'trench',
        type: 'arff',
        icon: "images/icons/trench.png",
        text: "Trench Rescue",
        url: "fire_inc.html",
        row: 3
    },
    {
//        type: 'mountain',
        type: 'arff',
        icon: "images/icons/mountain.png",
        text: "Mountain Rescue",
        url: "fire_inc.html",
        row: 4
    },
    {
//        type: 'palm',
        type: 'arff',
        icon: "images/icons/palm.png",
        text: "Palm Rescue",
        url: "fire_inc.html",
        row: 4
    },
    {
//        type: 'struct',
        type: 'arff',
        icon: "images/icons/structure.png",
        text: "Structural Rescue",
        url: "fire_inc.html",
        row: 4
    },
    {
//        type: 'confined',
        type: 'arff',
        icon: "images/icons/confined.png",
        text: "Confined Space Rescue",
        url: "fire_inc.html",
        row: 4
    }
];
