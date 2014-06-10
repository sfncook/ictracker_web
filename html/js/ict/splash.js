
function init_splash( ) {
    var btnPrototypeStr = '<div class="splash_start_btn button">'+
                            '<img class="splash_start_btn_icon" src="[icon]"/>'+
                            '<span class="splash_start_btn_text">[text]</span>'+
                        '</div>'
    incidentStartBtns.forEach(function(btnObj, index, array){
        var btnText = btnPrototypeStr.replace("[icon]", btnObj.icon).replace("[text]", btnObj.text);
        var btn = $(btnText);
        $("#splash_row2").append(btn);
        if(typeof btnObj.disabled != 'undefined') {
            btn.addClass("disabled");
        }

        if(typeof btnObj.url != 'undefined') {
            btn.click(function(){window.location.href = btnObj.url;});
        }
    });
    $("#splash_row2").append($("<div class='clear_float></div>"));
}

$( document ).ready(init_splash);

var incidentStartBtns = [
	{
	    icon:"images/icon_incident_fire.png",
	    text:"Fire Incident",
	    url:"fire_inc.html"
	},
	{
	    icon:"images/icon_incident_plane.png",
	    text:"ARFF Incident",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_hazmat.png",
	    text:"HazMat Incident",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_medic.png",
	    text:"Medical Incident",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_water.png",
	    text:"Water Rescue",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_trench.png",
	    text:"Trench Rescue",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_mountain.png",
	    text:"Mountain Rescue",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_palm.png",
	    text:"Palm Rescue",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_structural.png",
	    text:"Structural Rescue",
	    disabled:"true"
	},
	{
	    icon:"images/icon_incident_confined.png",
	    text:"Confined Space Rescue",
	    disabled:"true"
	},
];
