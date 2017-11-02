<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Jsonp test with jquery</title>

<script type="text/javascript"
	src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript"
	src="/test/resources/js/jquery.ajax-cross-origin.min.js"></script>
<script>
	$(document).ready(function() {

		$("#testBtn").click(function() {

			$.ajax({
				url : 'http://175.125.132.121:8080/test/server/data',
				dataType : 'JSONP',
				jsonpCallback : 'callback',
				type : 'GET',
				success : function(data) {
					console.log(data.Ad.attributes(id));
				}
			});
		});

	});
</script>

<style>
div {
	margin-bottom: 10px;
	padding: 2px;
}

#getjson {
	border: 1px solid red;
	display: none;
}

#ajax {
	border: 1px solid blue;
	display: none;
}
</style>
</head>

<body>
	<button id="testBtn">테스트!</button>
	<div id="ajax"></div>
</body>
</html>
