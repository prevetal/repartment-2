document.addEventListener('DOMContentLoaded', function () {
	// Set scrollbar width
	document.documentElement.style.setProperty('--scroll_width', widthScroll() + 'px')
})


const getCssVar = (el, name) => {
    const val = getComputedStyle(el).getPropertyValue(name).trim(),
    	num = parseFloat(val)

    return isNaN(num) ? val : num
}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}