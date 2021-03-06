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
					url : 'http://examples.oreilly.com/9780596002527/examples/first.xml',
					dataType : "xml",
					type : 'GET',
					success : function(res) {
						var myXML = res.responseText;
						// This is the part xml2Json comes in.
						var JSONConvertedXML = $.xml2json(myXML);
						$('#myXMLList').empty();
						for (var i = 0; i < JSONConvertedXML.book.character.length; i++) {
							$('#myXMLList')
									.append(
											'<li><a href="#">'
													+ JSONConvertedXML.book.character[i].name
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