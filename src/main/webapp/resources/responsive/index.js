// Youtube
setTimeout(function(){$(".video-youtube").each(function(){$(this).replaceWith('<iframe class="video-youtube loader" src="'+$(this).data("src")+'" allowfullscreen="allowfullscreen" height="281" width="500"></iframe>')})},5e3);
// Responsive Device
$('.menu .selected').on('click',function(){
  $(this).next('.drop').toggle();
});
$('.menu .drop .link').on('click',function(){
  var $active = $('.menu .checked'),
      input = $(this).text(),
      url = $(this).data('url'),
      $selected = $('.menu .selected');
  $active.removeClass('checked');
  $(this).addClass('checked');
  $selected.text(input);
  $('#frame iframe').attr('src',url);
});
$('.close').on('click',function(){
  if ( $('#header').hasClass('opened') ) {
    $('#header,#frame').removeClass('opened').addClass('closed')
    .find('.menu .drop').hide();
  } else if ( $('#header').hasClass('closed') ) {
    $('#header,#frame').removeClass('closed').addClass('opened');
  }
  if ( $(this).hasClass('entypo-down-open') ) {
    $(this).removeClass('entypo-cancel').addClass('entypo-cancel');
  } else if ( $(this).hasClass('entypo-down-open') ) {
    $(this).removeClass('entypo-cancel').addClass('entypo-down-open');
  }
});
$('.devices .device').on('click',function(){
  var $active = $('.devices .active'),
      $frame = $('#frame iframe');
  if ( $(this).hasClass('desk') ) {
    $active.removeClass('active');
    $(this).addClass('active');
    $frame.css({ width: '100%' });
  } else if ( $(this).hasClass('tablet') ) {
    $active.removeClass('active');
    $(this).addClass('active');
    $frame.css({ width: '788px' });
  } else if ( $(this).hasClass('tablet-land') ) {
    $active.removeClass('active');
    $(this).addClass('active');
    $frame.css({ width: '1040px' });
  } else if ( $(this).hasClass('phone') ) {
    $active.removeClass('active');
    $(this).addClass('active');
    $frame.css({ width: '340px' });
  } else if ( $(this).hasClass('phone-land') ) {
    $active.removeClass('active');
    $(this).addClass('active');
    $frame.css({ width: '500px' });
  }
});