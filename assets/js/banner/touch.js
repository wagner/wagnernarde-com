import utils from '../utils.js'
import create from './create.js'
import movement from './movement.js'
import fakeJson from '../fake-ajax.js'
import {allLayersMobile} from './config.js'

const touch = {
	isPost: false,
	canLeave: false,
	initPosX: 0,
	posX: null,
	bannersAround: {},
	nextBanner: null,
	currentBanner: 0,
	transitionDone: true,
	bannerSpeed: 2,

	checkDirection: function () {
		if (touch.posX > touch.initPosX) {
			return true
		}
		return false
	},
	start: function (e) {
		if (touch.onlyOne(e)) {
			touch.initPosX = e.changedTouches[0].clientX
		}
	},
	move: function (e) {
		if (touch.transitionDone) {
			if (!touch.isPost) {
				if (touch.onlyOne(e)) {
					touch.canLeave = true
					touch.transitionDone = false
					touch.posX = e.changedTouches[0].clientX
					if (touch.checkDirection()) {
						touch.toPrevious()
						return
					}
					touch.toNext()
				}
			}
		}
	},
	onlyOne: function (e) {
		return e.changedTouches.length < 2
	},
	toPrevious: function () {
		touch.appendPrevius()
		var nextBanner = touch.nextBanner
		var restore = setInterval(function () {
			if (utils.prToIn(nextBanner.style.width) < 50) {
				nextBanner.style.width = `${utils.prToIn(nextBanner.style.width) + touch.bannerSpeed}%`
				return
			}
			clearInterval(restore)
			touch.destroyBanner()
		}, 30)
	},
	toNext: function () {
		touch.appendNext()
		var banner = document.querySelector(`#banner${touch.currentBanner}`)
		var restore = setInterval(function () {
			if (utils.prToIn(banner.style.width) > 0) {
				banner.style.width = `${utils.prToIn(banner.style.width) - touch.bannerSpeed}%`
				return
			}
			touch.destroyBanner()
			clearInterval(restore)
		}, 30)
	},
	getPercent: function () {
		return window.screen.width / 100
	},
	appendNext: function () {
		var nextBannerID = parseInt(touch.currentBanner) + 1
		if (touch.currentBanner == allLayersMobile.length - 1) {
			nextBannerID = 0
		}
		if (document.querySelector(`#banner${nextBannerID}`)) {
			return
		}
		var banner = document.querySelector(`#banner${touch.currentBanner}`)
		var nextBanner = create.one(nextBannerID, false, true)
		banner = document.querySelector('.banner-content')
		banner.appendChild(nextBanner)
		touch.nextBanner = nextBanner
	},
	appendPrevius: function () {
		var nextBannerID = parseInt(touch.currentBanner) - 1
		if (touch.currentBanner == 0) {
			nextBannerID = allLayersMobile.length - 1
		}
		if (document.querySelector(`#banner${nextBannerID}`)) {
			return
		}
		var previousBanner = create.one(nextBannerID, true, true)
		var banner = document.querySelector(`#banner${touch.currentBanner}`)
		banner.parentNode.insertBefore(previousBanner, banner)
		touch.nextBanner = previousBanner
	},
	destroyBanner: function () {
		var banner = document.querySelector(`#banner${touch.currentBanner}`)
		banner.remove()
		touch.updateBanners()
		touch.transitionDone = true
		fakeJson.init()
		movement.init()
	},
	updateBanners: function () {
		touch.currentBanner = touch.nextBanner.dataset.pos
		document.body.className = allLayersMobile[touch.currentBanner].bg
	}
}
export default touch
