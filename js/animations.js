// LINKS OFFER
$(function(){
	$('.link_h').click(function(){
		if ( $(this).hasClass('htab') ){
			$(this).parent().parent().slideUp('slow');
			$('#offer a.link').each(function(){
				$(this).slideDown('fast');
			});
			$('#offer').find('.hidden').slideUp('slow');
		}else{
			$(this).parent().slideUp('slow', function(){
				$(this).parent().find('.link').slideDown('fast');
			});
		}
	});
});

$(function(){
	var href = '';
	var rel = '';
	$('ul.menu a, a.link').click(function(event){
		event.preventDefault();
		//$('ul.menu li').each(function(){$(this).removeClass('active');});
		//$(this).parent().addClass('active');
		href = $(this).attr('href');
		rel = $(this).attr('rel');
		$('body').scrollTo(href, {duration:1000, onAfter: function(){
			show_more_con(href,rel);
		}});
	});
});

function show_more_con(href,rel){
	if ( rel == undefined ){
		$(href).find('.hidden').each(function(){
			$(this).slideDown('slow');
		});
		$(href).find('.link').hide();
	}else{
		rel ='.'+rel;

		$('#offer a.link').each(function(){
			$(this).slideDown('fast');
		});
		$('#offer').find('.hidden').slideUp('slow');
		$(href).find(rel).find('a.link').slideUp('slow');
		$(href).find(rel).find('.hidden').each(function(){
			$(this).slideDown('slow');
			$(this).find('a.link').slideUp('fast');
		});
		$('.tab').each(function(){
			$(this).slideUp('fast', function(){
				$(rel).slideDown('slow');
			});
		});
	}
	if( href == '#site_container'){
		$('.hidden, .tab').each(function(){$(this).hide();});
		$('.link').each(function(){$(this).show();});
	}
}
// END LINKS OFFER
// FIXED MENU
function fixed_menu() {
	var window_top = $(window).scrollTop();
	var stick_top = $('#stick-top').offset().top;
	if(window_top > stick_top) {
		$('#top, #site_container').addClass('fixed');
		$('#top').stop().animate({
			opacity : 1
		},0, function(){
			$('#top').stop().animate({"top": 0 });
		});
	} else {
		$('#top').stop().animate({"top": -60 }, function(){
			$('#top').stop().fadeOut('fast', function(){
				$('#top, #site_container').removeClass('fixed');
				$('#top').stop().fadeIn('fast');
			});
		});
	}
}

$(function() {			
	$(window).scroll(fixed_menu);
	fixed_menu();			
})
// END FIXED MENU

// SLIDER
var delayLength = 10000;
function doMove(panelWidth, tooFar) {
	var leftValue = $("#mover").css("left");
	if (leftValue == "auto") { leftValue = 0; };
	var movement = parseFloat(leftValue, 10) - panelWidth;
	if (movement == tooFar) {
		$(".slide .caption").animate({
			"top": -500,
			"opacity" : 0
		}, function() {
			$("#mover").animate({
				"left": 0,
			}, function() {
				$(".slide .caption").animate({
					"top": 100,
					"opacity" : 1
				});
			});
		});
	}
	else {
		$(".slide .caption").animate({
			"top": -500,
			"opacity" : 0
		}, function() {
			$("#mover").animate({
				"left": movement
			}, function() {
				$(".slide .caption").animate({
					"top": 100,
					"opacity" : 1
				});
			});
		});
	}
}

function slider(resize){
	var panelWidth = $('#slider').width();
	var panelPaddingLeft = 0;
	var panelPaddingRight = 0;
	$('.slide').each(function(){
		$(this).width(panelWidth);
	})
	panelWidth = parseFloat(panelWidth, 10);
	panelPaddingLeft = parseFloat(panelPaddingLeft, 10);
	panelPaddingRight = parseFloat(panelPaddingRight, 10);
	panelWidth = panelWidth + panelPaddingLeft + panelPaddingRight;
	var numPanels = $(".slide").length;
	var tooFar = -(panelWidth * numPanels);
	var totalMoverwidth = numPanels * panelWidth;
	$("#mover").css("width", totalMoverwidth);
	if (resize == 0){
		sliderIntervalID = setInterval(function(){
			doMove(panelWidth, tooFar);
		}, delayLength);
	}else{
		resize = 0;
		clearInterval(sliderIntervalID);
		$("#mover").css('left','0');
		slider(resize);
	}
}

$(window).load(function(){
	var resize = 0;
	slider(resize);
});
$( window ).resize(function() {
	var resize = 1;
	slider(resize);
});
// END SLIDER