
function init_splash( ) {

    // Reset any past incidents
    //  Delete all cookies
    for(var key in $.cookie()){
        $.removeCookie(key);
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
                var urlLink = btnObj.url + "?";
                urlLink += "inc_num_input=" + $("#inc_num_input").val();
                window.location.href = urlLink;
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
	    icon:"images/icons/fire.png",
	    text:"Fire Incident",
	    url:"fire_inc.html",
	    row:2
	},
	{
	    icon:"images/icons/medical.png",
	    text:"Medical Incident",
	    disabled:"true",
	    row:2
	},
	{
	    icon:"images/icons/plane.png",
	    text:"ARFF Incident",
	    disabled:"true",
	    row:3
	},
	{
	    icon:"images/icons/hazmat.png",
	    text:"HazMat Incident",
	    disabled:"true",
	    row:3
	},
	{
	    icon:"images/icons/water.png",
	    text:"Water Rescue",
	    disabled:"true",
	    row:3
	},
	{
	    icon:"images/icons/trench.png",
	    text:"Trench Rescue",
	    disabled:"true",
	    row:3
	},
	{
	    icon:"images/icons/mountain.png",
	    text:"Mountain Rescue",
	    disabled:"true",
	    row:4
	},
	{
	    icon:"images/icons/palm.png",
	    text:"Palm Rescue",
	    disabled:"true",
	    row:4
	},
	{
	    icon:"images/icons/structure.png",
	    text:"Structural Rescue",
	    disabled:"true",
	    row:4
	},
	{
	    icon:"images/icons/confined.png",
	    text:"Confined Space Rescue",
	    disabled:"true",
	    row:4
	},
];
