if (navigator.userAgent.indexOf('iPad') != -1) {
location.href = 'ipad.html' + paramStr;
}else if (navigator.userAgent.indexOf('iPhone') != -1) {
	location.href = 'iphone.html' + paramStr;
}else if (navigator.userAgent.indexOf('iPod') != -1) {
	location.href = 'iphone.html' + paramStr;
}else if (navigator.userAgent.indexOf('Android') != -1) {
	location.href = 'android.html' + paramStr;
}
