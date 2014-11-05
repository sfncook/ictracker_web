
function loadPrevTable(prevIncs) {
    for (var i = 0; i < prevIncs.length; i++) {
        var incStr = prevIncs[i];
        var incObj = JSON.parse(incStr);

        var rowEl = $('<tr></tr>');
        rowEl.append('<td><div class="load_btn button">Load</div></td>');
        rowEl.append('<td>' + incObj['inc_num'] + '</td>');
        rowEl.append('<td>' + incObj['inc_type'] + '</td>');
        rowEl.append('<td>' + incObj['inc_address'] + '</td>');
        rowEl.append('<td><div class="del_btn button">Delete</div></td>');

        var load_btn = rowEl.find(".load_btn");
        load_btn.click(function () {
            loadInc(incObj);
            window.location.href = incObj['inc_url'];
        });

        var del_btn = rowEl.find(".del_btn");
        del_btn.click(function () {
            //TODO
        });

        $('#previnc_right_col_body').append(rowEl);
    }
}
function initPrevTable() {
    var previnc_container = $("#previnc_container");
    var previnc_right_col = $("#previnc_right_col");
    var view_previnc_btn = $("#view_previnc_btn");
    var view_previn_clos = $("#view_previn_clos");
    var view_previn_open = $("#view_previn_open");

    previnc_right_col.hide();
    view_previn_clos.hide();
    view_previn_open.show();

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

    var prevIncsStr = localStorage.getItem("prev_incs");
    if (prevIncsStr != null && prevIncsStr.length > 0) {
        var prevIncsObj = JSON.parse(prevIncsStr);
        previnc_container.show();
        loadPrevTable(prevIncsObj);
    } else {
        previnc_container.hide();
    }
}

function initSplash() {

    var inc_num = localStorage.getItem('inc_num');
    var inc_address = localStorage.getItem('inc_address');
    if (inc_num != null || inc_num != null) {
        if (inc_num == null) {
            $("#prev_inc_num").parent().hide();
        } else {
            $("#prev_inc_num").html(inc_num);
            $("#prev_inc_num").parent().show();
        }

        if (inc_address == null) {
            $("#prev_inc_address").parent().hide();
        } else {
            $("#prev_inc_address").html(inc_address);
            $("#prev_inc_address").parent().show();
        }

        $("#prev_inc_btn").show();
        var inc_url = localStorage.getItem('inc_url');
        $("#prev_inc_btn").data({'url': inc_url});

        var inc_icon = localStorage.getItem('inc_icon');
        $("#prev_inc_icon").attr("src", inc_icon);

        $("#prev_inc_no_inc_info").hide();
    } else {
        $("#prev_inc_btn").hide();
        $("#prev_inc_no_inc_info").show();
    }

    var btnPrototypeStr = '<div class="splash_start_btn button">' +
        '<img class="splash_start_btn_icon" src="[icon]"/>' +
        '<div class="splash_start_btn_text">[text]</div>' +
        '</div>'
    incidentStartBtns.forEach(function (btnObj, index, array) {
        var btnText = btnPrototypeStr.replace("[icon]", btnObj.icon).replace("[text]", btnObj.text);
        var btn = $(btnText);
        $("#splash_row" + btnObj.row).append(btn);

        if (typeof btnObj.disabled != 'undefined') {
            btn.addClass("disabled");
        }

        if (typeof btnObj.url != 'undefined') {
            btn.click(function () {
                deleteAllCookies();

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

    $("#prev_inc_btn").click(function () {
        window.location.href = $("#prev_inc_btn").data('url');
    });
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
