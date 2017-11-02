<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Expanding Video Hero</title>
<meta name="viewport" content="width=device-width">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">


<link rel="stylesheet" href="/test/resources/exam/style.css">


</head>

<body>
	<div class="video-hero">

		<h1>
			Expanding Video Hero<span>click play to start</span>
		</h1>

		<a href="#0" class="play"><span>Click to play video</span></a>

		<div class="overlay"></div>

		<img class="vid-cap"
			src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/15309/vid-cap.jpg"
			alt="Man biking in woods">

		<iframe
			src="https://player.vimeo.com/video/112233728?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=57c0d4"
			width="1060" height="596" frameborder="0" webkitallowfullscreen
			mozallowfullscreen allowfullscreen class="video" aria-hidden="true"
			tabindex="-1"></iframe>

	</div>

	<div class="sub-hero">
		<h2>Heading Here</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima esse
			dicta, soluta nisi asperiores et perspiciatis, quos nesciunt officiis
			<a href="#">quod consectetur</a> repellendus magni cupiditate
			accusamus dolorum blanditiis, maiores expedita. Id.
		</p>
	</div>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/fitvids/1.0.3/jquery.fitvids.min.js'></script>

	<script src="/test/resources/exam/index.js"></script>

</body>
</html>
