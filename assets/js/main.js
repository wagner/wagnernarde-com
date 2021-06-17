import create from './banner/create.js'
import colorScreen from './colorScreen.js'
import navBar from './nav.js'
import fakeJson from './fake-ajax.js'
import content from './content.js'

window.onload = function () {
	navBar.init()
	colorScreen.setup()
	fakeJson.init()
	create.init()

	content.toggleGoHome(true)
} 
