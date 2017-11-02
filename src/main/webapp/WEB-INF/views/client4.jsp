<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<head>
<title>Cross XML Sample</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet"
	href="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.css" />
<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script
	src="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.js"></script>
<script src="<c:url value='/resources/js/xml2json.js'/>"></script>
<script src="<c:url value='/resources/js/jquery.xdomainajax.js'/>"></script>
<script>
	// For This example, im going to use sample xml from o'reily for practice
	// located at url http://examples.oreilly.com/9780596002527/examples/first.xml
	// We are going to extract character name nodes for this sample
	function xmlLoader() {
		$
				.ajax({
					url : 'http://175.125.132.216:8089/adn/p/in/v1_0/supply/?publisherid=wewdcdvc3048533330000000337383983stv&mediaid=57&medianame=ytn&mediacategory=1&mimes=video+%28mp4&minduration=5&maxduration=100&ua=Mozilla%5C%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%206_1_4%20like%20Mac%20OS%20X)%20AppleWebKit%5C%2F536.26%20(KHTML%2C%20like%20Gecko)%20Version%5C%2F6.0%20Mobile%5C%2F10B350%20Safari%5C%2F8536.25&ip=127.0.0.1&os=ios&ifa=e4273e31-97a9-4b29-93a8-8a99f0cea068&startdelay=0',
					dataType : "jsonp",
					type : 'GET',
					async : false,
					success : function(res) {
						var myXML = res.responseText;
						// This is the part xml2Json comes in.
						var JSONConvertedXML = $.xml2json(myXML);
						console.log(JSONConvertedXML.book);
						$('#myXMLList').empty();
						console.log(JSONConvertedXML.VAST.ad.length);
						for (var i = 0; i < JSONConvertedXML.book.character.length; i++) {
							$('#myXMLList')
									.append(
											'<li><a href="#">'
													+ JSONConvertedXML.VAST.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile
													+ '</a></li>')
						}
						$('#myXMLList').listview('refresh');
						$.mobile.hidePageLoadingMsg();
					}
				});
	}

	$(document).delegate("#home", "pageshow", function() {
		$.mobile.showPageLoadingMsg();
		xmlLoader();
	});
</script>
</head>

<body>
	<div data-role="page" id="home">
		<div data-role="header">
			<h1>Sample Cross Domain XML</h1>
		</div>
		<div data-role="content">
			<ul data-role="listview" data-theme="c" id="myXMLList">

			</ul>
		</div>
		<div data-role="footer">
			<a href="www.isgoodstuff.com" data-role="button">isGoodStuff.com</a>
		</div>
	</div>
</body>
</html>