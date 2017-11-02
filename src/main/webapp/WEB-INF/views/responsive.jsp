<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Responsive Youtube Video</title>

<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">


<link rel="stylesheet" href="/test/resources/responsive/style.css">


</head>

<body>
	<header class='opened' id='header'>
		<h1 class='logo' data-title='AD'></h1>
		<div class='menu'>
			<span class='selected icon-dar'>Responsive Youtube</span>
			<ul class='drop'>
				<li class='link checked'
					data-url='https://twistedshape.blogspot.com/p/youtube-responsive.html'>Contoh
					Video</li>
			</ul>
		</div>
		<div class='devices'>
			<button class='device desk active'></button>
			<button class='device tablet'></button>
			<button class='device tablet-land'></button>
			<button class='device phone'></button>
			<button class='device phone-land'></button>
		</div>
		<div class='options'>
			<button class='close entypo-cancel'></button>
		</div>
	</header>
	<main class='opened' id='frame'> <iframe height='100%'
		src='https://twistedshape.blogspot.com/p/youtube-responsive.html'
		rel='nofollow' width='100%'></iframe> </main>
	<script
		src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

	<script src="/test/resources/responsive/index.js"></script>

</body>
</html>
