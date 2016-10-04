# Avatar-Initials
Create initials with your name, instead of using images. Also options to use images with image tag or set to background. You don't need any other html content. Takes care of using images and using initials

It takes one or two names. e.g *"Dante" would be "D" and "Dante Lex" would be "DL"*. It fits into the height and width of your container, modifiy style to suit your needs.
You can improve and use in your project.

## Include in your page
###### Dependency
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```
###### Component - Unminified
```html
<link rel="stylesheet" type="text/css" href="css/placeholderavatar.css" />
<script src="app.init.js"></script>
<script src="app.placeholderavatar.js"></script>
```
###### Component - Minified
```html
<link rel="stylesheet" type="text/css" href="css/placeholderavatar.css" />
<script src="app.min.js"></script>
```

### Initialize

```javascript
$(function(){
	app.init({});
});
```

### Usage
    
<p>Add: <code>data-xt-placeholder-avatar='name goes here'</code></p>

```html
<div data-xt-placeholder-avatar="Lex">
</div>
```

![Image of inital](/img/1.png)

<p>Change text size: <code>data-xt-avatar-size='medium, large or small'</code></p>

```html
<div data-xt-placeholder-avatar="Dante Lex" data-xt-avatar-size="medium">
</div>
```

![Image of inital](/img/2.png)

<p>Use background image: <code>data-xt-background-uimage='path to image'</code></p>

```html
<div data-xt-placeholder-avatar data-xt-background-uimage="img/profile.jpg">
</div>
```

![Image of inital](/img/3.png)

<p>Default state with no name: <code>data-xt-placeholder-avatar</code></p>

```html
<div data-xt-placeholder-avatar>
</div>
```

![Image of inital](/img/4.png)

<p>Use image: <code>data-xt-uimage='path to image'</code></p>

```html
<div data-xt-placeholder-avatar data-xt-uimage="img/profile.jpg">
</div>
```

![Image of inital](/img/3.png)

<div class="profile js-profile" data-xt-placeholder-avatar="" data-xt-uimage="img/profile.jpg">
</div>

<h4>Options</h4>
<p>If you want colors to be handled from stylesheet</p>

```javascript
$(function(){
	app.init({
		placeholderAvatar: {
			useColorClasses: true
		}
	});
});
```
You can check it out here - 
[avata-initials](http://dantelex.github.io/avatar-Initials/)

<footer class="profile-footer">
	<p>Developed By: <a href="https://twitter.com/Dantelex">@dantelex</a></p>
</footer>