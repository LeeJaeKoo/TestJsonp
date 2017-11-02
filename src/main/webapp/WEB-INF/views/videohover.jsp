<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HTML5 Video Play on Hover</title>



<link rel="stylesheet" href="/test/resources/hover/style.css">


</head>

<body>
	<!--
Data: https://gfycat.com/cajax/get/VerifiableTerrificHind
 
Source: https://www.youtube.com/watch?v=nZcejtAwxz4

More info on youtube api for thumbnails: http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
-->
	<div id="videosList">


		<div class="video">
			<video class="thevideo" loop preload="none">
				<source src="/test/resources/ad.mp4" type="video/mp4">
				Your browser does not support the video tag.
			</video>
		</div>
		Hover mouse over video. Desktop only [ Obviously! ;) ]
	</div>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

	<script src="/test/resources/hover/index.js"></script>

</body>
</html>
