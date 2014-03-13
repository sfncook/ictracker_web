function initTBars( ) {
	for(var i=0; i<8; i++) {
		var tbar = $("#tbar_prototype" ).clone().appendTo( "#tbar_container" );
		var newId = "tbar_"+i;
		tbar.attr("id",newId);
	}
	$("#tbar_prototype").hide();
}

//$( document ).ready(initTBars);
