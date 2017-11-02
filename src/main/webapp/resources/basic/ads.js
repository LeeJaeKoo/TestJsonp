var videoContent = document.getElementById('contentElement');
var playButton = document.getElementById('playButton');
playButton.addEventListener('click', onPlayButtonClick);

var adDisplayContainer = new google.ima.AdDisplayContainer(document
		.getElementById('adContainer'), videoContent);

var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

adsLoader.addEventListener(
		google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
		onAdsManagerLoaded, false);
adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError,
		false);

var onContentEnded = function() {
	adsLoader.contentComplete();
};
videoContent.addEventListener('ended', onContentEnded);

var adsRequest = new google.ima.AdsRequest();
adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpostonly&cmsid=496&vid=short_onecue&correlator=';
adsRequest.linearAdSlotWidth = 640;
adsRequest.linearAdSlotHeight = 360;
adsRequest.nonLinearAdSlotWidth = 640;
adsRequest.nonLinearAdSlotHeight = 120;

var adsManager;

function onPlayButtonClick() {
	adDisplayContainer.initialize();
	adsLoader.requestAds(adsRequest);
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
	adsManager = adsManagerLoadedEvent.getAdsManager(videoContent);
	adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,
			onAdError);
	adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
			onContentPauseRequested);
	adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
			onContentResumeRequested);

	adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
	adsManager.start();
}

function onAdError(adErrorEvenet) {
	console.log(adErrorEvent.getError());
	if (adsManager) {
		adsManager.destroy();
	}
	videoContent.play();
}

function onContentPauseRequested() {
	videoContent.removeEventListener('ended', onContentEnded);
	videoContent.pause();
}

function onContentResumeRequested() {
	videoContent.addEventListener('ended', onContentEnded);
	videoContent.play();
}