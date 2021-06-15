var colorScreen = {
	link: '',

	setNightScreen: function () {
		colorScreen.link = document.createElement("link");
		colorScreen.link.href = "app/css/night.css"
		colorScreen.link.type = "text/css";
		colorScreen.link.rel = "stylesheet";
		colorScreen.link.media = "screen,print";

		document.getElementsByTagName("head")[0].appendChild(colorScreen.link);
		document.querySelector(".icon-day").style.display = 'none'
		document.querySelector(".icon-night").style.display = 'block'
	},

	setDayScreen: function () {
		colorScreen.link.remove()
		document.querySelector(".icon-day").style.display = 'block'
		document.querySelector(".icon-night").style.display = 'none'
	},

	setup: function () {
		document.querySelector('.icon-day').addEventListener('click', this.setNightScreen)
		document.querySelector('.icon-night').addEventListener('click', this.setDayScreen)
	}
}

export default colorScreen
