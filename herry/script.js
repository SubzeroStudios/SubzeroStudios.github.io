$(document).ready(function(){
	$('#nav').hide().fadeIn(250);
	$('#about').hide().fadeIn(250);
	$('#contain').hide().fadeIn(250);
	$('#projectsList').find('ul').find('li').css({"height":"100px","opacity":"0.7"});
	$('#nav>a').on('mouseover', function(e){
		$(this).animate({
			color: "#02DE09"
		}, 100, function(){});
	});
	$('#nav>a').on('mouseout', function(e){
		$(this).animate({
			color: "#fff"
		}, 100, function(){});
	});
	$('#projectsList').find('ul').find('li').on('mouseover', function(e){		
		$(this).animate({
			height: "125px",
			opacity: "1"
		}, 100, function(){});
	});
	$('#projectsList').find('ul').find('li').on('mouseout', function(e){
		$(this).animate({
			height: "100px",
			opacity: "0.7"
		}, 100, function(){});
	});
	$('#projectsList').find('ul').find('li').on('click', function(){
		var panelID = $(this).attr('id');
		$('#projectsList').find('ul').find('li').animate({"color":"#fff"}, 100, false);
		$(this).animate({"color": "#02DE09"}, 100, false);
		$('#projectViewWindow').find('div').fadeOut(200);
		$('#projectViewWindow').find('#proj'+panelID).fadeIn(200);
	});
	$('#1').css({"color": "#02DE09", "opacity":"1"});
	$('#projectViewWindow').find('div').hide();
	$('#projectViewWindow').find('#proj1').show();
});