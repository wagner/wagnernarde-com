# Montando um post

## div#post: fica na tag main do index.html, recebe o conteudo do post
```html 
<div id="post" class="post-body">
</div>
```
	- ela não é exibida enquanto os banners estiverem ativos
	- recebe o conteudo do post
	- com o fake-ajax ativado, ele printa o arquivo html ques estiver na prop "includeHtml"

## article: cada "pedaço" do post, é englobado por uma tag article com a class "home-post"

```html
<article class="home-post">
	<h4 class="title orange-sub-title">titulo</h4>
	<p>texto </p>
	<div class="post-img">
	imagem do article
	<img src="./assets/Image.png" alt="" />
	</div>
	<div class="img-note">
	<p>caso queira colocar um texto de nota para a imagem</p>
	</div>
</article>
```

## player:
	- audio#file-to-play: recebe o arquivo do player

## cards da pagina about wnarde.html
- caso o card tenha mais de uma linha, usar a class "multi-line" na tag div.job-card-row
```html
  <div class="job-card ">
    <section>
      <div class="job-card-row multi-line center space-around row">
        <div class="job-card-title center row ">
          <p>diretor</p>
        </div>
        <div class="job-card-info center row">
          <p>17 de julho de 2019 </p>
          <span class="icon icon-recent_w"></span>
        </div>
      </div>
      <div class="job-card-row center row">
        <div class="job-card-info center row ">
          <span class="icon icon-recent_w"></span>
          <p class="slin">Fevereiro de 2014 / outubro 2020</p>
        </div>
      </div>
    </section>
  </div>
  ```

# css
## titulos
	.title - toda tag de titulo precisa dessa e de uma variação
### variações
	.black-title
	.orange-title
	.orange-sub-title
	.pink-title
	.pink-sub-title
	.gold-title
	.gold-sub-title
	.title-bio-pink
	.title-bio-blue

## visibilidade
	.dk : visivel somento no desktop
	.mb : visivel somento no moibile

# paginas

## paginas/posts
	
	 aqui estão todos os htmls dos posts montados, que serão colocados dentro da div#post

		./post/psico.html
		./post/gatlin.html
		./post/timezone.html
		./post/wnarde.html

# js

## ./app/js/main.js:
	esse arquivo inicia os js que usei no layout


## ./app/js/content.js:
- esse arquivo gerencia o que é exibido na tela
- contemt.showBanners() : 
  	* tem que ser chamado quando for esconder o post, e exibir os banners
- content.showContent() : 
	* deixa visivel a tag div#post, e desabilita os banners deixando somente o banner do post no topo
- content.showClearPage(bg) :
	* desabilita os banners e mostra a tag dev#post sem banner no topo, usada para exibir a pagina "about" da logo, ou qualquer pagina que não venha de um banner, ela recebe um parametro bg que é a class css com um backgound para a pagina.


## ./app/js/fake-ajax.js:
	esse arquivo gerencia as posts que são exibidas, usando o banner atual, foi criada para simular o fluxo sem uma api, e dar uma base para a integração ajax


## ./app/js/banner/config.js:
	esse arquivo configura o conteudo dos bannes dinamicos
- allLayers :
	- serve para criar os banners, eles são dinamicos e criados via js
			
		```js
		allLayers = [
			{
				central: {
					// nome do arquivo na pasts banners e campos para caso precise ajustar a posição
					src: `imagem-do-centro`, pos: {top: 110, left: 0, delay: 10}
				},
				text:[
						// textos dos banners e campos para caso precise ajustar a posição
						{
							text: `text do banner <span>algum detalhe</span> `, class: `class-css`, 
							pos: {top: 110, left: 350, delay: 20}
						},
						{
							text: `caso tenha um segundo texto`, class: `class-css`,
							pos: {top: 550, left: 350, delay: 20}
						}
					],
				secondary:[ // nome do arquivo na pasts banners e campos para caso precise ajustar a posição
						{src: `imagens-secundarias`, pos: {top: 110, left: 0, delay: 30}},
						{src: `imagens-secundarias`, pos: {top: 110, left: 0, delay: 30}}
					]
			},
		]
		```
	- allLayersMobile :
		- esse array é só uma variação dos mesmos banners para ajustes das versões mobile. 