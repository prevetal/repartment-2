// Theme
const lightBtn = $('.light_btn'),
	darkBtn = $('.dark_btn')

const savedTheme = localStorage.getItem('theme')
    ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

applyTheme(savedTheme)

lightBtn.on('click', () => applyTheme('light'))
darkBtn.on('click', () => applyTheme('dark'))

function applyTheme(theme) {
    $('html').attr('data-theme', theme)
    localStorage.setItem('theme', theme)

    lightBtn.toggleClass('active', theme === 'light')
    darkBtn.toggleClass('active', theme === 'dark')
}


document.addEventListener('DOMContentLoaded', function() {
	// Products slider
	const workProcessSliders = [],
		workProcess = document.querySelectorAll('.work_process .swiper')

	workProcess.forEach((el, i) => {
		el.classList.add('work_process_s' + i)

		const parent = el.closest('.work_process')

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: parent.querySelector('.swiper-button-next'),
				prevEl: parent.querySelector('.swiper-button-prev')
			},
			breakpoints: {
				0: {
					spaceBetween: getCssVar(el, '--spaceBetween-0'),
					slidesPerView: getCssVar(el, '--slidesPerView-0'),
				},
				768: {
					spaceBetween: getCssVar(el, '--spaceBetween-768'),
					slidesPerView: getCssVar(el, '--slidesPerView-768'),
				},
				1024: {
					spaceBetween: getCssVar(el, '--spaceBetween-1024'),
					slidesPerView: getCssVar(el, '--slidesPerView-1024'),
				}
			},
		}

		workProcessSliders.push(new Swiper('.work_process_s' + i, options))
	})



	// Fancybox
	const fancyOptions = {
		dragToClose: false,
		placeFocusBack: false,
		l10n: {
			CLOSE: 'Закрыть',
			NEXT: 'Следующий',
			PREV: 'Предыдущий',
			MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
		},
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		...fancyOptions,
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// About info - video
	const video = document.querySelector('.about_info video')

	if (video) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				entry.isIntersecting
					? video.play()
					: video.pause()
			})
		}, { threshold: 0.5 })

		observer.observe(video)
	}


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Advantages spoler
	$('.about_info .advantages .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this)
			.toggleClass('active')
			.closest('.advantages').find('.hidden').toggleClass('show')
	})


	// Interiors description spoler
	$('.interiors .description .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this)
			.toggleClass('active')
			.closest('.description').find('.text_block').toggleClass('show_full')
	})


	// Mob. menu
	$('.mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header .menu').slideToggle(300)
	})
})