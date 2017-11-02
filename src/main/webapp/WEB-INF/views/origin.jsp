<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<script type="text/javascript"
	src="http://code.jquery.com/jquery-1.12.2.min.js"></script>
<script type="text/javascript"
	src="/test/resources/js/jquery.ajax-cross-origin.min.js"></script>
</head>

<body>

	<select id="service">
		<option value="http://ip.jsontest.com/">IP Address</option>
		<option value="http://headers.jsontest.com/">HTTP Headers</option>
		<option value="http://date.jsontest.com/">Date & Time</option>
		<option value="http://echo.jsontest.com/key/value/one/two">Echo
			JSON</option>
		<option value='http://validate.jsontest.com/?json={"key":"value"};'>Validate</option>
		<option value="http://code.jsontest.com/">Arbitrary JS Code</option>
		<option value="http://cookie.jsontest.com/">Cookie</option>
		<option value="http://md5.jsontest.com/?text=[text%20to%20MD5]">MD5</option>
	</select>
	<br />
	<input type="text" id="url" style="width: 400px">
	<input type="button" id="btn" value="Get JSON">
	<br />
	<br />
	<div id="test" />

	<script type="text/javascript">
		$(function() {
			$('#service').on('change', function() {
				$('#url').val($(this).val());
			});

			$('#url').val($('#service').val());

			$('#btn').click(function() {
				var url = $('#url').val()

				$.ajax({
					crossOrigin : true,
					url : url,
					success : function(data) {
						console.log(data);
						$('#test').html(data);
					}
				});
			});
		});
	</script>

</body>
</html>