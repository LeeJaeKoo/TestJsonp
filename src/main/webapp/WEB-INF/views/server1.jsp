<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript"
	src="<c:url value='/resources/js/jsr_class.js'/>">
	
</script>

</head>
<body>
	<script type="text/javascript">
		function getfun(jsonData) {
			document.getElementById('MediaFile').innerHTML = jsonData;
		}
		function test() {

			var req = 'http://demo.tremorvideo.com/proddev/vast/vast2RegularLinear.xml';
			bObj = new XMLHttpRequest(req);
			bObj.buildScriptTag();
			bObj.addScriptTag();
			bObj.removeScriptTag();
		}
	</script>
	<button onclick="test()">click me</button>

	<div id="testdiv"></div>
</body>
</html>

