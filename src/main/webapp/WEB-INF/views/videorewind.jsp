<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Play HTML5 Video Backwards</title>



<link rel="stylesheet" href="css/style.css">


</head>

<body>
	<video id="video" controls="controls">
		<source
			src="https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4"
			type="video/mp4">
		<source
			src="https://www.quirksmode.org/html5/videos/big_buck_bunny.webm"
			type="video/webm">
		<source
			src="https://www.quirksmode.org/html5/videos/big_buck_bunny.ogv"
			type="video/ogg">
	</video>
	<button id="speed">Fast Forward</button>
	<button id="negative">Rewind</button>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

	<script src="/test/resources/rewind/index.js"></script>

</body>
</html>
