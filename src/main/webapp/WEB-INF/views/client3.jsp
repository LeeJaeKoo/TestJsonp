<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Jsonp test with jquery</title>

<script type="text/javascript"
	src="/test/resources/js/jquery-1.6.2.min.js"></script>
<script>
	$(document).ready(function() {
		$("#testBtn").click(function() {

			$.ajax({
				url : "localhost:8080/test/server/data",
				dataType : "jsonp",
				cache : false,
				jsonp : "callback",
				success : function(d) {
					console.log(d);
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