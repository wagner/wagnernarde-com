import {allLayers, allLayersMobile} from './banner/config.js'
import touch from './banner/touch.js'
import create from './banner/create.js'
import change from './banner/change.js'
import player from './player.js'

var content = {
	done: false,
	arrowInPost: false,

	showContent: function (isClenPage) {
		const self = this
		touch.isPost = true
		var banner = document.querySelector('.banner-content')
		const base = document.querySelector('.banner-base')
		var central = base.querySelector('.principal-banner')
		document.querySelector('body').style.overflowX = 'hidden'
		document.querySelector('body').style.maxWidth = '100%'
		document.querySelector('html').style.overflowX = 'hidden'
		document.querySelector('html').style.maxWidth = '100%'
		content.toggleArrows(true)
		if (central === null) {
			central = base.querySelector('.banner-central')
		}
		central = central.querySelector('img')
		banner.style.width = '100%'
		banner.style.height = '0'
		banner.style.position = 'relative'
		banner.style.zIndex = -1
		banner.style.top = '-90'
		base.style.height = document.documentElement.clientHeight
		base.style.width = document.documentElement.clientWidth

		if(!isClenPage)
			document.body.id = `${base.id}post`

		base.id = ''
		if (window.screen.width < 800) {
			banner.style.top = '-116px'
		}

		document.querySelector('footer').hidden = true
		var transiotion = setInterval(function () {
			clearInterval(transiotion)
			document.querySelector('.post-content').style.display = 'flex'
			if (document.getElementById('audio-player-container')) {
				player.init()
			}
		}, 30)
	},

	showBanners: function () {
		content.toggleArrows(false)
		document.querySelector('body').style.maxWidth = 'none'
		document.querySelector('html').style.maxWidth = 'none'
		this.done = false
		var hasBase = document.querySelector('.banner-base')
		if (hasBase === null) {
			create.init()
		}
		var banner = document.querySelector('.banner-content').style
		var post = document.querySelector('.post-content').style
		const base = document.querySelector('.banner-base')
		banner.width = '200%'
		banner.zIndex = 1
		banner.position = 'fixed'
		banner.height = '100%'
		banner.top = '0'
		base.style.right = '0'
		base.style.width = '50%'
		base.id = `banner${document.querySelector('.banner-base').dataset.pos}`
		var transiotion = setInterval(function () {
			if (post.opacity === '') {
				post.opacity = 1
			}
			if (post.opacity >= 0.1) {
				post.opacity = `${parseFloat(post.opacity) - 0.1}`
				return
			}
			touch.isPost = false
			clearInterval(transiotion)
			document.querySelector('footer').hidden = false
			document.querySelector('.banner-content').style.display = 'flex'
			document.querySelector('.banner-content').style.opacity = 1
			document.querySelector('.post-content').style.display = 'none'
			document.querySelector('.post-content').style.opacity = 1
		}, 30)
	},

	toggleGoHome: function (isPost) {
		var goBackM = document.querySelector('.go-home-mb')
		var goBack = document.querySelector('.go-home')
		var showBackNav = document.querySelector('.show-back')
		var lArrow = document.querySelector('.tleft')
		var rArrow = document.querySelector('.tright')

		content.toggleBannerArrows(isPost)
		if (isPost) {
			showBackNav.style.display = 'none'
			if (window.screen.availWidth > 868) {
				goBack.style.display = 'block'
			} else {
				goBackM.style.display = 'block'
			}
			return
		}
		showBackNav.style.display = 'block'
		if (window.screen.availWidth > 868) {
			goBack.style.display = 'none'
		}
		else {
			goBackM.style.display = 'none'
		}
	},

	toggleArrows: function (isPost) {
		var goBackM = document.querySelector('.go-back-mb')
		var goBack = document.querySelector('.go-back')
		var showBackNav = document.querySelector('.show-back')
		content.toggleBannerArrows(isPost)
		if (isPost) {
			showBackNav.style.display = 'none'
			if (window.screen.availWidth > 868) {
				goBack.style.display = 'block'
				goBack.addEventListener('click', function () {
					content.showBanners()
				})
			} else {
				goBackM.style.display = 'block'
				goBackM.addEventListener('click', function () {
					content.showBanners()
				})
			}
			return
		}
		showBackNav.style.display = 'block'
		if (window.screen.availWidth > 868) {
			goBack.style.display = 'none'
		}
		else {
			goBackM.style.display = 'none'
		}
	},

	toggleBannerArrows: function(isPost){
		var lArrow = document.querySelector('.tleft')
		var rArrow = document.querySelector('.tright')
		if (isPost) {
			if (window.screen.availWidth > 868) {
				lArrow.style.display = 'none'
				rArrow.style.display = 'none'
				lArrow.style.top = '64%'
				rArrow.style.top = '64%'
			} 

			return
		}
		if (window.screen.availWidth > 868) {
			lArrow.style.top = '15%'
			rArrow.style.top = '15%'
			lArrow.style.display = true
			rArrow.style.display = true
		}
	},

	showClearPage: function(bg){
		document.querySelector("#post").innerHTML = ''
		document.querySelector(".banner-content").style.display = 'none'
		document.querySelector("footer").hidden = true
		document.querySelector("body").id = bg
		document.querySelector("body").className = bg
		content.toggleGoHome()

		content.showContent(true)
	},
	
	backFromClean: function(){
		const base = document.querySelector('.banner-base')
		const banner = document.querySelector('.banner-content')
		banner.style.width = '200%'
		banner.style.position = 'fixed'
		banner.style.top = '0'
		base.id = `banner${document.querySelector('.banner-base').dataset.pos}`
		document.querySelector(".banner-content").style.display = 'flex'
		document.querySelector("#post").innerHTML = ''
		content.toggleBannerArrows(false)
		if(document.querySelector("footer").hidden === true)
			document.querySelector("footer").hidden = false

		content.showBanners()
	},
}
export default content
