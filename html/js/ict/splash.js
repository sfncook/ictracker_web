function init_splash() {

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

                localStorage.setItem('inc_num',     $("#inc_num_input").val());
                localStorage.setItem('inc_address', $("#address_input").val());
                localStorage.setItem('inc_url',     btnObj.url);
                localStorage.setItem('inc_icon',    btnObj.icon);
                localStorage.setItem('inc_type',    btnObj.type);

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

$(document).ready(init_splash);

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
        type: 'hazmat',
        icon: "images/icons/hazmat.png",
        text: "HazMat Incident",
        disabled: "true",
        row: 3
    },
    {
        type: 'water',
        icon: "images/icons/water.png",
        text: "Water Rescue",
        disabled: "true",
        row: 3
    },
    {
        type: 'trench',
        icon: "images/icons/trench.png",
        text: "Trench Rescue",
        disabled: "true",
        row: 3
    },
    {
        type: 'mountain',
        icon: "images/icons/mountain.png",
        text: "Mountain Rescue",
        disabled: "true",
        row: 4
    },
    {
        type: 'palm',
        icon: "images/icons/palm.png",
        text: "Palm Rescue",
        disabled: "true",
        row: 4
    },
    {
        type: 'struct',
        icon: "images/icons/structure.png",
        text: "Structural Rescue",
        disabled: "true",
        row: 4
    },
    {
        type: 'confined',
        icon: "images/icons/confined.png",
        text: "Confined Space Rescue",
        disabled: "true",
        row: 4
    }
];
