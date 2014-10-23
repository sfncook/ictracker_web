
function init_splash( ) {

    if (localStorage.getItem('inc_info') != null ) {
        var inc_info = JSON.parse(localStorage.getItem('inc_info'));
        $("#prev_inc_btn").show();
        $("#prev_inc_icon").attr("src", inc_info['inc_icon']);

        var inc_num = inc_info['inc_num'];
        var address = inc_info['address'];
        if(inc_num==="") {
            $("#prev_inc_num").parent().hide();
        } else {
            $("#prev_inc_num").html(inc_info['inc_num']);
            $("#prev_inc_num").parent().show();
        }
        if(address==="") {
            $("#prev_inc_address").parent().hide();
        } else {
            $("#prev_inc_address").html(inc_info['address']);
            $("#prev_inc_address").parent().show();
        }

        $("#prev_inc_no_inc_info").hide();
        if (inc_info['inc_num']=='' && inc_info['address']=='') {
            $("#prev_inc_no_inc_info").show();
        }
    } else {
        $("#prev_inc_btn").hide();
    }

    var btnPrototypeStr = '<div class="splash_start_btn button">'+
                            '<img class="splash_start_btn_icon" src="[icon]"/>'+
                            '<div class="splash_start_btn_text">[text]</div>'+
                        '</div>'
    incidentStartBtns.forEach(function(btnObj, index, array){
        var btnText = btnPrototypeStr.replace("[icon]", btnObj.icon).replace("[text]", btnObj.text);
        var btn = $(btnText);
        $("#splash_row"+btnObj.row).append(btn);

        if(typeof btnObj.disabled != 'undefined') {
            btn.addClass("disabled");
        }

        if(typeof btnObj.url != 'undefined') {
            btn.click(function(){
                var urlLink = btnObj.url;
                window.location.href = urlLink;
                var inc_info = {
                    'inc_num':$("#inc_num_input").val(),
                    'address':$("#address_input").val(),
                    'inc_type':btnObj.type,
                    'inc_icon':btnObj.icon
                };
                deleteAllCookies();
                localStorage.setItem('inc_info', JSON.stringify(inc_info));
            });
        }
    });
    $("#splash_row2").append($("<div class='clear_float'></div>"));
    $("#splash_row3").append($("<div class='clear_float'></div>"));
    $("#splash_row4").append($("<div class='clear_float'></div>"));
}

$( document ).ready(init_splash);

var incidentStartBtns = [
	{
        type:'fire',
	    icon:"images/icons/fire.png",
	    text:"Fire Incident",
	    url:"fire_inc.html",
	    row:2
	},
	{
        type:'medical',
	    icon:"images/icons/medical.png",
	    text:"Medical Incident",
	    disabled:"true",
	    row:2
	},
	{
        type:'arff',
	    icon:"images/icons/plane.png",
	    text:"ARFF Incident",
	    disabled:"true",
	    row:3
	},
	{
        type:'hazmat',
	    icon:"images/icons/hazmat.png",
	    text:"HazMat Incident",
	    disabled:"true",
	    row:3
	},
	{
        type:'water',
	    icon:"images/icons/water.png",
	    text:"Water Rescue",
	    disabled:"true",
	    row:3
	},
	{
        type:'trench',
	    icon:"images/icons/trench.png",
	    text:"Trench Rescue",
	    disabled:"true",
	    row:3
	},
	{
        type:'mountain',
	    icon:"images/icons/mountain.png",
	    text:"Mountain Rescue",
	    disabled:"true",
	    row:4
	},
	{
        type:'palm',
	    icon:"images/icons/palm.png",
	    text:"Palm Rescue",
	    disabled:"true",
	    row:4
	},
	{
        type:'struct',
	    icon:"images/icons/structure.png",
	    text:"Structural Rescue",
	    disabled:"true",
	    row:4
	},
	{
        type:'confined',
	    icon:"images/icons/confined.png",
	    text:"Confined Space Rescue",
	    disabled:"true",
	    row:4
	},
];
