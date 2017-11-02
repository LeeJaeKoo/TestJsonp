<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<html>
<head>
<title>Get track example</title>
</head>
<body>
	<h1>Get track example</h1>
	<video id="video1" controls>
		<source
			src="http://ie.microsoft.com/testdrive/Videos/BehindIE9ModernWebStandards/Video.mp4">
		<track id="entrack" label="English subtitles" kind="captions"
			src="/test/resources/entrack.vtt" srclang="en" default>
	</video>
	<p>
		<button id="mybutton">Show tracks</button>
	</p>
	<div
		style="display: block; overflow: auto; height: 200px; width: 650px;"
		id="display"></div>

	<script>
		document
				.getElementById("mybutton")
				.addEventListener(
						"click",
						function() {
							var myTrack = document.getElementById("entrack").track; // get text track from track element          
							var myCues = myTrack.cues; // get list of cues                    
							for (var i = 0; i < myCues.length; i++) {
								// append track label
								document.getElementById("display").innerHTML += (myCues[i]
										.getCueAsHTML().textContent + "<br/>");
							}
						}, false);
	</script>
</body>
</html>
