import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
import content from './content.js'
import create from './banner/create.js'

const fakeJson = {
	hots: 'localhost:8080',
	init: function () {
		var post = document.querySelector('#post')
		if (document.querySelector('#banner2')) {
			document.querySelector('#banner-text2').onclick = function () {
				$.get('post/timezone.html')
					.done(function(resp) {
						content.showContent()
						document.querySelector('#post').innerHTML = resp
					})
			}
		}
		if (document.querySelector('#banner5')) {
			document.querySelector('#banner-text5').onclick = function () {
				$.get('post/gatlin.html')
					.done(function(resp) {
						content.showContent()
						document.querySelector('#post').innerHTML = resp
					})
			}
		}
		if (document.querySelector('#banner1')) {
			document.querySelector('#banner-text1').onclick = function () {
				$.get('post/psico.html')
					.done(function(resp) {
						content.showContent()
						document.querySelector('#post').innerHTML = resp
					})
			}
		}

		document.querySelectorAll(".go-home, .go-home-mb").forEach(function(btn){
			btn.addEventListener('click', function (event) {
				content.backFromClean()
			})
		})
	}
}
export default fakeJson
