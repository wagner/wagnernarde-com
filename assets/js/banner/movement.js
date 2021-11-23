import utils from '../utils.js'
import bannerLayers from './layers.js'
const movement = {
	c: '',
	s: '',
	limit: 40,
	movements: 0,
	porcent: 0,
	canMove: true,
	canGo: {
		r: 0,
		l: 0,
		u: 0,
		d: 0
	},
	init: function () {
		this.c = document.querySelector('.banner-central').querySelector('img')
		this.s = document.querySelectorAll('.banner-secondary')
		this.canMove = true
	},
	move: function (inC, inS, isVertival, reverse) {
		if (isVertival) {
			return movement.doMovimentV(inC, inS, reverse)
		}
		return movement.doMovimentH(inC, inS, reverse)
	},
	toRight: function () {
		if (movement.canGo.r < movement.limit) {
			this.move(1, 1, false, true)
			if (movement.canGo.l > 0) {
				movement.canGo.l--
			}
			movement.canGo.r++
		}
	},
	toLeft: function () {
		if (movement.canGo.l < movement.limit) {
			this.move(1, 1, false, false)
			if (movement.canGo.r > 0) {
				movement.canGo.r--
			}
			movement.canGo.l++
		}
	},
	toUp: function () {
		if (movement.canGo.u < movement.limit) {
			this.move(1, 1, true, true)
			if (movement.canGo.d > 0) {
				movement.canGo.d--
			}
			movement.canGo.u++
		}
	},
	toDown: function () {
		if (movement.canGo.d < movement.limit) {
			this.move(1, 1, true, false)
			if (movement.canGo.u > 0) {
				movement.canGo.u--
			}
			movement.canGo.d++
		}
	},
	doMovimentH: function (inC, inS, reverse) {
		if (this.canMove) {
			if (reverse) {
				inC = inC * -1
				inS = inS * -1
			}

			movement.c.style.left = `${utils.pxToIn(movement.c.style.left) - inC}px`
			if (typeof movement.s[0] !== 'undefined')
				movement.s[0].querySelector('img').style.left = `${utils.pxToIn(movement.s[0].querySelector('img').style.left) + inS}px`

			if (typeof movement.s[1] !== 'undefined')
				movement.s[1].querySelector('img').style.left = `${utils.pxToIn(movement.s[1].querySelector('img').style.left) + inS}px`
		}
	},
	doMovimentV: function (inC, inS, reverse) {
		if (this.canMove) {
			if (reverse) {
				inC = inC * -1
				inS = inS * -1
			}
			movement.c.style.top = `${utils.pxToIn(movement.c.style.top) - inC}px`
			if (typeof movement.s[0] !== 'undefined')
				movement.s[0].querySelector('img').style.top = `${utils.pxToIn(movement.s[0].querySelector('img').style.top) + inS}px`

			if (typeof movement.s[1] !== 'undefined')
				movement.s[1].querySelector('img').style.top = `${utils.pxToIn(movement.s[1].querySelector('img').style.top) + inS}px`

			if (reverse) {
				movement.movements--
				return movement.movements >= movement.limit
			}
			movement.movements++;
			return movement.movements >= movement.limit
		}
	},
	stop: function () {
		bannerLayers.cleanMovement()
		this.canMove = false
	},
}
export default movement
