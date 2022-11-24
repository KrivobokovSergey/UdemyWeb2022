const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
  navPosition: "bottom",
  responsive: {
    992: {
      nav: false
    },
    320: {
      nav: true,
    }
  }
})

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
  $(this)
    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});


function sliderClass(item) {
  $(item).each(function (i) {
  $(this).on('click', function (e) {
    e.preventDefault();
    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  })
});
};

sliderClass('.catalog-item__content');
sliderClass('.catalog-item__list');

$('[data-modal=consultation]').on('click', function () {
  $('.overlay, #consultation').fadeIn();
});
$('.modal__close').on('click', function () {
  $('.overlay, #consultation, #thanks, #order').fadeOut();
});
$('.button_mini').each(function (i) {
  $(this).on('click', function () {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn();
  })
});

function valideForms(form) {
	$(form).validate({
	rules: {
		name: "required",
		phone: "required",
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		name: "Пожалуйста, введите свое имя",
		phone: "Пожалуйста, введите свой номер телефона",
		email: {
			required: "Нам нужен ваш E-mail",
			email: "Ваш адрес должен быть в формате name@domain.com"
		}
	}
});
};

valideForms('#consultation-form');
valideForms('#consultation form');
valideForms('#order form');

$("input[name=phone]").mask("+38 (999) 999-99-99");

$('form').submit(function (e) {
	e.preventDefault();
	if (!$(this).valid()) {
		return;
	}
	$.ajax({
		type: 'POST',
		url: "mailer/smart.php",
		data: $(this).serialize()
	}).done(function () {
		$(this).find("input").val("");
		$('#consultation, #order').fadeOut();
		$('.overlay, #thanks').fadeIn('slow');
		$('form').trigger('reset');
	});
	return false;
});

$(window).scroll(function () {
	if ($(this).scrollTop() > 1600) {
		$('.pageup').fadeIn();
	} else {
		$('.pageup').fadeOut();
	}
});

/* $('a[href^="#"]').click(function(){
	var el = $(this).attr('href');
	$('html, body').animate({scrollTop: $(el).offset().top});
	return false;
}); */

new WOW().init();
