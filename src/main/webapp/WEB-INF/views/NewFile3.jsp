<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<link href="/test/resources/NF/nf.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/4.1.0/video.js"></script>
<!-- For the twitter icon. -->
<link
	href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
	rel="stylesheet">
<link href="http://vjs.zencdn.net/6.2.7/video-js.css" rel="stylesheet">
<link href="/test/resources/NF/videojs-resolution-switcher.css"
	rel="stylesheet">
<link rel="stylesheet" href="/test/resources/NF/share.css">
<script src="/test/resources/NF/share.js"></script>
<script src="http://vjs.zencdn.net/6.2.7/video.js"></script>
<script src="/test/resources/NF/videojs-resolution-switcher.js"></script>
<style>
.vjs-control.vjs-tweet-button:before {
	font-family: FontAwesome;
	content: "\f081";
}

.vjs-control.vjs-face-button:before {
	font-family: FontAwesome;
	content: "\f082"
}
</style>
</head>
<body>
	<video id="example_video_1" class="video-js vjs-default-skin"
		width="640" height="480" controls role="menuitem">
		<source type="video/mp4" src="/test/resources/ad.mp4">

	</video>
	<script>
		/*Create Twitter Button*/
		videojs.Tweet = videojs.Button.extend({
			/** @constructor */
			init : function(player, options) {
				videojs.Button.call(this, player, options);
				this.on('click', this.onClick);
			}
		});

		videojs.Tweet.prototype.onClick = function() {
			alert("TWEET!");
		};

		/*Create FaceBook Button*/
		videojs.Face = videojs.Button.extend({
			/** @constructor */
			init : function(player, options) {
				videojs.Button.call(this, player, options);
				this.on('click', this.onClick);
			}
		});

		videojs.Face.prototype.onClick = function() {
			alert("FACE!");
		}

		// Note that we're not doing this in prototype.createEl() because
		// it won't be called by Component.init (due to name obfuscation).
		var createTweetButton = function() {
			var props = {
				className : 'vjs-tweet-button vjs-control',
				innerHTML : '<div class="vjs-control-content"><span class="vjs-control-text">'
						+ ('Tweet') + '</span></div>',
				role : 'button',
				'aria-live' : 'polite', // let the screen reader user know that the text of the button may change
				tabIndex : 0
			};
			return videojs.Component.prototype.createEl(null, props);
		};

		var createFaceButton = function() {
			var props = {
				className : 'vjs-face-button vjs-control',
				innerHTML : '<div class="vjs-control-content"><span class="vjs-control-text">'
						+ ('face') + '</span></div>',
				role : 'button',
				'aria-live' : 'polite', // let the screen reader user know that the text of the button may change
				tabIndex : 1
			};
			return videojs.Component.prototype.createEl(null, props);
		};

		var tweet;
		videojs.plugin('tweet', function() {
			var options = {
				'el' : createTweetButton()
			};
			tweet = new videojs.Tweet(this, options);
			this.controlBar.el().appendChild(tweet.el());
		});

		var face;
		videojs.plugin('face', function() {
			var options = {
				'el' : createFaceButton()
			};
			face = new videojs.Face(this, options);
			this.controlBar.el().appendChild(face.el());
		});

		var vid = videojs("example_video_1", {
			controls : true,
			plugins : {
				videoJsResolutionSwitcher : {
					ui : true,
					dynamicLabel : true
				},
				tweet : {},
				face : {},
				videoJsResolutionSwitcher: {
			          ui: true,
		          default: 'high',
		          dynamicLabel: true // Display dynamic labels or gear symbol
		        }
		      }
		    }, function(){
		      var player = this;
		      window.player = player
		      player.updateSrc([
		        {
		          src: 'https://vjs.zencdn.net/v/oceans.mp4?sd',
		          type: 'video/mp4',
		          label: 'SD',
		          res: 360
		        },
		        {
		          src: 'https://vjs.zencdn.net/v/oceans.mp4?hd',
		          type: 'video/mp4',
		          label: 'HD',
		          res: 720
		        }
		      ])
		      player.on('resolutionchange', function(){
		        console.info('Source changed to %s', player.src())
		      })
		    });

		vid.socialShare({
			facebook : {
				handle : '',
				shareUrl : '',
				shareImage : '',
				shareText : ''
			},
			twitter : {
				handle : '',
				shareUrl : '',
				shareText : ''
			}
		});
	</script>
</body>
</html>