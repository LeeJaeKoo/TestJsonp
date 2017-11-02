<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<link rel="stylesheet" href="/test/resources/b_a/style.css">
</head>
<body>
	<div id="video-compare-container">
		<video loop autoplay
			poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/dirty.jpg">
		<source
			src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/floodplain-dirty.mp4>
		<source
			src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/floodplain-dirty.webm></video>
		<div id="video-clipper">
			<video loop autoplay
				poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/clean.jpg">
			<source
				src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/floodplain-clean.mp4>
			<source
				src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/floodplain-clean.webm></video>
		</div>
	</div>
	<script src="/test/resources/b_a/index.js"></script>
</body>
</html>