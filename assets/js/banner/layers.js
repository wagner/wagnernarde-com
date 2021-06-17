import content from '../content.js'
import touch from './touch.js'
import movement from './movement.js'
const bannerLayers = {
  fps: 30,
  mY: 0,
  mX: 0,
  mYold: 0,
  mXold: 0,
  changScreen: 0,
  cleanInterval: false,
  screen: window.screen,
  middle: window.screen.width / 2,
  center: window.screen.height / 2,
  init: function (layer, pos) {
    var base = bannerLayers.createBanner(layer, pos)
    if (window.screen.width > 800) {
      bannerLayers.mouseMove(document.querySelector('.banner-content'))
    } else {
      bannerLayers.moveScreen()
    }
    return base
  },
  mouseMove: function () {
    window.onmousemove = function (e) {
      bannerLayers.mX = e.clientX
      bannerLayers.mY = e.clientY
    }
    var moveInterval = setInterval(function () {
      if (bannerLayers.cleanInterval) {
        clearInterval(moveInterval)
      }
      bannerLayers.cleanInterval = false
      if (bannerLayers.mX > bannerLayers.mXold) {
        movement.toRight()
      } else if (bannerLayers.mX < bannerLayers.mXold) {
        movement.toLeft()
      }
      if (bannerLayers.mY > bannerLayers.mYold) {
        movement.toUp()
      } else if (bannerLayers.mY < bannerLayers.mYold) {
        movement.toDown()
      }
      bannerLayers.mXold = bannerLayers.mX
      bannerLayers.mYold = bannerLayers.mY
    }, 60)
  },
  moveScreen: function () {
    window.ondeviceorientation = function (e) {
      if (e.gamma > 0) {
        movement.toLeft()
      }
      else if (e.gamma < 0) {
        movement.toRight()
      }

    }
  },
  cleanMovement: function () {
    this.cleanInterval = true
  },
  needClean: function () {
    return this.cleanInterval
  },
  createBanner: function (layer, pos) {
    var banner = document.createElement('div')
    banner.className = 'banner-base'
    banner.append(this.createCentral(layer.central))
    layer.secondary.forEach(function (s) {
      if (s.isPrincipal) {
        banner.append(bannerLayers.createSecondary(s, true))
        return
      }
      banner.append(bannerLayers.createSecondary(s))
    })
    banner.append(this.createText(layer.text, pos))
    return banner
  },
  createCentral: function (layer) {
    return this.createLayer(layer, 'banner-central')
  },
  createSecondary: function (layer, isPrincipal) {
    return this.createLayer(layer, 'banner-secondary', isPrincipal)
  },
  createText: function (layer, pos) {
    return this.createLayerText(layer, 'banner-text', pos)
  },
  createLayer: function (layer, id, isPrincipal) {
    if (isPrincipal) {
      id = `${id} principal-banner`
    }
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = `/assets/images/banners/${layer.src}.png`
    if (window.screen.width < 800)
      img.src = `/assets/images/banners/${layer.src}_M.png`

    img.onload = function () {
      this.style.position = 'absolute'
      this.style.left = (document.documentElement.clientWidth / 2 - this.width / 2) - layer.pos.left
      this.style.top = layer.pos.top
    }

    div.append(img)
    div.className = id
    img.style.cursor = 'pointer'
    return div
  },

  createLayerText: function (layer, id, pos) {
    const div = document.createElement('div')
    const p = []
    layer.forEach(function (text, key) {
      var t_ = document.createElement('p')
      if (typeof text.pre !== 'undefined') {
        t_ = document.createElement('pre')
      }
      t_.innerHTML = text.text
      t_.style.cursor = 'pointer'
      t_.className = text.class
      p.push(t_)
      div.append(t_)

      t_.style.position = 'absolute'
      t_.style.left = document.documentElement.clientWidth / 2 - layer[key].pos.left
      t_.style.top = layer[key].pos.top

    })

    div.id = `banner-text${pos}`
    div.className = id
    return div
  },
  setPorcent: function () {
    return this.middle / this.toMove
  },
  checkDistance: function (mousePos) {
    return parseInt(mousePos / this.setPorcent())
  },
}
export default bannerLayers
