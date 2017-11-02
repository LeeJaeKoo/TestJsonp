<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<title>HTML5 vast pre-roll video ads</title>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="/test/resources/roll/vastvideoplugin.js"></script>
<link rel="stylesheet" type="text/css"
	href="/test/resources/roll/site.css">
</head>
<body bgcolor="#424142">
	<video id="example_video_1" src="/test/resources/ad.mp4" width="640"
		height="480" controls
		ads='{"servers": [{"apiAddress": "http://localhost:8080/test/server/data"}],"schedule": [{"position": "mid-roll"}]}'></video>
	<span class="skipBtn">Skip</span>
	<script>
		initAdsFor("example_video_1");
	</script>
</body>
</html>
