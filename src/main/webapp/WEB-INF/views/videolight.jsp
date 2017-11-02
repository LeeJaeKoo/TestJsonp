<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HTML5 Video Ambilight</title>



<style>
/* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */
* {
	margin: 0;
	padding: 0;
	border: 0;
}

html, body {
	height: 100%;
}

body {
	background: #222;
	overflow: hidden;
}

.info {
	position: absolute;
	top: 10px;
	left: 10px;
	width: 200px;
	background: rgba(0, 0, 0, 0.6);
	padding: 10px;
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.4);
	box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
	color: #fff;
	font-family: Helvetica;
	font-size: 15px;
}

.info a, .info strong {
	font-weight: bold;
	color: aqua;
	text-decoration: none;
}

.wrapper {
	width: 600px;
	margin: 60px auto;
}

.player {
	width: 600px;
	height: 337px;
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.player video {
	width: 600px;
	height: 337px;
	z-index: 1;
	position: absolute;
	overflow: hidden;
	border-radius: 20px;
	border: 10px solid #000;
	box-shadow: 0 0 10px #000;
}

.player canvas {
	position: absolute;
	width: 600px;
	height: 337px;
	transform: scale(1.2);
	-webkit-filter: blur(50px);
	opacity: 0.75;
	z-index: -1;
}
</style>

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>

</head>

<body>
	<div class="wrapper">
		<div class="player">
			<video id="video" src="/test/resources/ad.mp4" controls></video>

			<!-- Available video files:
    sports.mp4
    video.mp4
    gopro.mp4
    -->

			<canvas id="myCanvas" width="600" height="337"></canvas>
		</div>
	</div>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

	<script src="/test/resources/light/index.js"></script>

</body>
</html>