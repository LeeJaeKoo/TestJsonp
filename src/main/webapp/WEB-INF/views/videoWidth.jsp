<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<style type="text/css">
body {
	font-family: 'Arimo', sans-serif;
}

video {
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	width: auto;
	height: auto;
	z-index: -100;
	background-size: cover;
}

/*****************************/
.overlay {
	width: 400px;
	height: 400px;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	background: rgba(0, 0, 0, 0.3);
	display: block;
	position: absolute;
	top: 10%;
	left: 50%;
}

.overlay h1 {
	text-align: center;
	padding-top: 100px;
	color: #fff;
	font-family: inherit;
}

.overlay p {
	text-align: center;
	width: 80%;
	margin: 0 auto;
	color: #fff;
	font-family: inherit;
	margin-bottom: 20px;
}

.overlay a {
	color: #fff;
}

.orange {
	text-decoration: none;
}

p a.orange {
	color: #f27950;
}
</style>
</head>
<body>
	<video autoplay="" loop="" id="bgvid"
		poster="https://images.unsplash.com/photo-1461409971633-aa0e46732112?crop=entropy&fit=crop&fm=jpg&h=1000&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925">
		<source type="video/mp4" src="/test/resources/ad.mp4">
		<img
			src="https://images.unsplash.com/photo-1458724338480-79bc7a8352e4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=0e8fe82e7f50091319fdc635582bf62d"
			title="Your browser does not support the <video> tag">
	</video>

	<div class="overlay">
		<h1>HTML5 Video</h1>
		<p>HTML5 Video overlay example, quite popular with a lot of
			creative sites.</p>
		<p>
			View <a target="_BLANK"
				href="http://demosthenes.info/blog/777/Create-Fullscreen-HTML5-Page-Background-Video">Original</a>
			demo for best experience.
		</p>
		<p>
			<a target="_BLANK" href="https://codepen.io/doddsy105/full/rtcbE/">Fullscreen</a>
		</p>


	</div>
</body>
</html>
