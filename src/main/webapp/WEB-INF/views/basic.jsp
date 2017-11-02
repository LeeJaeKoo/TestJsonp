<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<link href="https://vjs.zencdn.net/5.0/video-js.css" rel="stylesheet">
<link rel="stylesheet" type="text/css"
	href="/test/resources/basic/style.css">
<script src="https://vjs.zencdn.net/5.0/video.js"></script>
<!-- <link href="/test/resources/NF/videojs-resolution-switcher.css"
	rel="stylesheet">
<script src="/test/resources/NF/videojs-resolution-switcher.js"></script>
<script src="/test/resources/NF/vast-client.js"></script>
<script src="/test/resources/NF/videojs.ads.js"></script>
<script src="/test/resources/NF/videojs.vast.js"></script> -->
<title>Insert title here</title>
</head>
<body>

	<div id="mainContainer">
		<div id="content">
			<video id="contentElement" pre-roll> <source
				src="/test/resources/sample.mp4"></source> </video>
		</div>
		<div id="adContainer"></div>
	</div>
	<button id="playButton">Play</button>
	<script type="text/javascript"
		src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
	<script type="text/javascript" src="/test/resources/basic/ads.js"></script>
</body>
</html>