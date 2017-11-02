<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>

<html>
<head>
<title>Video events example</title>
<!-- Uncomment the following meta tag if you have issues rendering this page on an intranet or local site. -->
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"/> -->
<link href="/test/resources/css/videojs-icons.css" rel="stylesheet">
</head>
<body>

	<div>
		<label>Type or paste a video URL: <br /> <input type="text"
			id="videoFile" style="width: 300px;" title="video file input field"
			value="http://ie.microsoft.com/testdrive/ieblog/2011/nov/pp4_blog_demo.mp4" />
			<button id="loadVideo" title="Load video button">Load</button>
		</label>
	</div>
	<video id="Video1" controls style="border: 1px solid blue;"
		height="240" width="320" title="video element"> HTML5 Video is
		required for this example
	</video>

	<div id="buttonbar" style="display: none; font-size: larger;")>
		<button id="restart" title="Restart button">[]</button>
		<button id="slower" title="Slower playback button">-</button>
		<button id="rew" title="Rewind button">&lt;&lt;</button>
		<button id="play" class="vjs-icon-play" title="Play button">&gt;</button>
		<button id="fwd" title="Forward button">&gt;&gt;</button>
		<button id="faster" title="Faster playback button">+</button>
		<button id="mute" title="Mute button">
			<img alt="Volume on button" src="vol2.png" />
		</button>
		<br /> <label>Reset playback rate: </label>
		<button id="normal" title="Reset playback rate button">=</button>
		<br /> <label> Volume: </label>
		<button id="volDn" title="Volume down button">-</button>
		<button id="volUp" title="Volume up button">+</button>
		<br />
		<div id="status">
			Length(seconds): <span id="vLen"></span> <br /> Current time: <span
				id="curTime" title="Current time"></span><br /> Remaining time: <span
				id="vRemaining" title="Remaining time"></span>
		</div>
	</div>
	<br />

	<div title="Error message area" id="errorMsg" style="color: Red;"></div>
	<div title="Event status area">
		<label>oncanplaythrough: </label><span class="stats" id="cpt"></span><br />
		<label>onloadstart: </label><span class="stats" id="ls"></span><br />
		<label>onprogress: </label><span class="stats" id="pg"></span><br />
		<label>onloadeddata: </label><span class="stats" id="ld"></span><br />
		<label>onended: </label><span class="stats" id="ndd"></span><br /> <label>onemptied:
		</label><span class="stats" id="mt"></span><br /> <label>onstalled: </label><span
			class="stats" id="stall"></span><br /> <label>onwaiting: </label><span
			class="stats" id="waiting"></span><br /> <label>ondurationchange:
		</label><span class="stats" id="dc"></span><br />
	</div>

	<script>
		var video = document.getElementById("Video1");
		var vLength;
		var pgFlag = ""; // used for progress tracking
		if (video.canPlayType) { // tests that we have HTML5 video support

			//  video button helper functions
			//  play video
			function vidplay(evt) {
				if (video.src == "") { // inital source load
					getVideo();
				}
				if (video.paused) { // play the file, and display pause symbol
					video.play();
				} else { // pause the file, and display play symbol  
					video.pause();
				}
			}

			//  load video file from input field
			function getVideo() {
				var fileURL = document.getElementById("videoFile").value; // get input field                    
				if (fileURL != "") {
					video.src = fileURL;
					video.load(); // if HTML source element is used
					document.getElementById("play").click(); // start play
				} else {
					errMessage("Enter a valid video URL"); // fail silently
				}
			}

			//  button helper functions 
			//  skip forward, backward, or restart
			function setTime(tValue) {
				//  if no video is loaded, this throws an exception 
				try {
					if (tValue == 0) {
						video.currentTime = tValue;
					} else {
						video.currentTime += tValue;
					}

				} catch (err) {
					// errMessage(err) // show exception
					errMessage("Video content might not be loaded");
				}
			}

			// change volume based on incoming value 
			function setVol(value) {
				var vol = video.volume;
				vol += value;
				//  test for range 0 - 1 to avoid exceptions
				if (vol >= 0 && vol <= 1) {
					// if valid value, use it
					video.volume = vol;
				} else {
					// otherwise substitute a 0 or 1
					video.volume = (vol < 0) ? 0 : 1;
				}
			}
			//  button events               
			//  Play
			document.getElementById("play").addEventListener("click", vidplay,
					false);
			//  Restart
			document.getElementById("restart").addEventListener("click",
					function() {
						setTime(0);
					}, false);
			//  Skip backward 10 seconds
			document.getElementById("rew").addEventListener("click",
					function() {
						setTime(-10);
					}, false);
			//  Skip forward 10 seconds
			document.getElementById("fwd").addEventListener("click",
					function() {
						setTime(10);
					}, false);
			//  set src == latest video file URL
			document.getElementById("loadVideo").addEventListener("click",
					getVideo, false);

			// volume buttons
			document.getElementById("volDn").addEventListener("click",
					function() {
						setVol(-.1); // down by 10%
					}, false);
			document.getElementById("volUp").addEventListener("click",
					function() {
						setVol(.1); // up by 10%
					}, false);

			// playback speed buttons
			document.getElementById("slower").addEventListener("click",
					function() {
						video.playbackRate -= .25;
					}, false);
			document.getElementById("faster").addEventListener("click",
					function() {
						video.playbackRate += .25;
					}, false);
			document.getElementById("normal").addEventListener("click",
					function() {
						video.playbackRate = 1;
					}, false);
			document.getElementById("mute").addEventListener("click",
					function(evt) {
						if (video.muted) {
							video.muted = false;
						} else {
							video.muted = true;
						}
					}, false);

			//  any video error will fail with message 
			video.addEventListener("error", function(err) {
				errMessage(err);
			}, true);
			// content has loaded, display buttons and set up events
			video.addEventListener("canplay", function() {
				document.getElementById("buttonbar").style.display = "block";
			}, false);

			//  display video duration when available
			video.addEventListener("loadedmetadata", function() {
				vLength = video.duration.toFixed(1);
				document.getElementById("vLen").textContent = vLength; // global variable
			}, false);

			//  display the current and remaining times
			video
					.addEventListener(
							"timeupdate",
							function() {
								//  Current time  
								var vTime = video.currentTime;
								document.getElementById("curTime").textContent = vTime
										.toFixed(1);
								document.getElementById("vRemaining").textContent = (vLength - vTime)
										.toFixed(1);
							}, false);
			//  paused and playing events to control buttons
			video.addEventListener("pause", function() {
				document.getElementById("play").textContent = ">";
			}, false);

			video.addEventListener("playing", function() {
				document.getElementById("play").textContent = "||";
			}, false);

			video
					.addEventListener(
							"volumechange",
							function() {
								if (video.muted) {
									// if muted, show mute image
									document.getElementById("mute").innerHTML = "<img alt='volume off button' src='mute2.png' />";
								} else {
									// if not muted, show not muted image
									document.getElementById("mute").innerHTML = "<img alt='volume on button' src='vol2.png' />";
								}
							}, false);
			//  Download and playback status events.
			video.addEventListener("loadstart", function() {
				document.getElementById("ls").textContent = "Started";
			}, false);
			video.addEventListener("loadeddata", function() {
				document.getElementById("ld").textContent = "Data was loaded";
			}, false);

			video.addEventListener("ended", function() {
				document.getElementById("ndd").textContent = "Playback ended";
			}, false);

			video.addEventListener("emptied", function() {
				document.getElementById("mt").textContent = "Video reset";
			}, false);

			video
					.addEventListener(
							"stalled",
							function() {
								document.getElementById("stall").textContent = "Download was stalled";
							}, false);
			video
					.addEventListener(
							"waiting",
							function() {
								document.getElementById("waiting").textContent = "Player waited for content";
							}, false);
			video.addEventListener("progress", function() {
				pgFlag += "+";
				if (pgFlag.length > 10) {
					pgFlag = "+";
				}
				document.getElementById("pg").textContent = pgFlag;

			}, false);
			video
					.addEventListener(
							"durationchange",
							function() {
								document.getElementById("dc").textContent = "Duration has changed";
							}, false);
			video
					.addEventListener(
							"canplaythrough",
							function() {
								document.getElementById("cpt").textContent = "Ready to play whole video";
							}, false);
		} else {
			errMessage("HTML5 Video is required for this example");
			// end of runtime
		}
		//  display an error message 
		function errMessage(msg) {
			// displays an error message for 5 seconds then clears it
			document.getElementById("errorMsg").textContent = msg;
			setTimeout("document.getElementById('errorMsg').textContent=''",
					5000);
		}
	</script>



</body>
</html>
