<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Unobtrusive Video</title>



<style>
/* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */
@import url(https://fonts.googleapis.com/css?family=Tinos);

html {
	box-sizing: border-box;
	font-family: "droid sans", sans-serif;
}

* {
	box-sizing: inherit;
	margin: 0;
	padding: 0;
	position: relative;
}

section+section {
	margin-top: 1em;
}

.video {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	transition: .5s;
	z-index: 5;
}

.aside {
	position: fixed;
	width: 40%;
}

h1 {
	padding: 1em;
	transition: opacity .5s;
}

.vid-wrap {
	height: 480px;
	background-color: hsl(0, 0%, 10%);
	transition: .5s;
}

.vid-wrap>iframe {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: 100%;
	max-width: 854px;
}

.aside .vid-wrap {
	height: 240px;
}

.aside h1 {
	opacity: 0;
}

.post {
	top: calc(480px + 6em);
	padding: 1em;
	width: 60%;
	font-family: 'Tinos', serif;
	font-size: 1.2em;
}

.post>p+p {
	margin-top: 1em;
}

.post>p {
	line-height: 1.5;
	transition: background-color .5s;
	padding: 1em;
}

.post>p:hover {
	background-color: hsla(18, 100%, 70%, .5)
}
</style>

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>

</head>

<body>
	<section class="video">
		<h1>Scroll Down for lyrics</h1>
		<div class="vid-wrap">
			<iframe src="/test/resources/ad.mp4" frameborder="0" allowfullscreen></iframe>
		</div>
	</section>
	<section class="post">
		<!--http://www.azlyrics.com/lyrics/katebush/runningupthathill.html-->
		<br />a <br />a <br /> a<br /> a<br /> a<br />a <br /> a<br />
		<br /> a<br />a <br /> a<br />a<br /> a<br /> a<br /> a<br />a <br />

	</section>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

	<script src="/test/resources/scroll/index.js"></script>

</body>
</html>
