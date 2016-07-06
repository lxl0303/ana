$(function () {
	$("#instagram").text("");
	$.ajax({
		url: "https://api.instagram.com/v1/users/self/media/recent",
		data: {access_token: '2095702244.7b7a7bf.6f32c4016e0c483bb18635524268597e', count: 12},
		cache : true,
		dataType: "jsonp"
	}).done(function (data, textStatus, jqXHR) {
		$("#instagram").text("");
		for (var i = 0, length = 12; i < length; i++) {
			var d = data.data[i];
			$("#instagram").append(
				$("<div>").addClass("instagram_photo").append($("<a>").addClass("photo imgLis").attr("href", d.link).attr("target", "_blank").append($("<img>").attr("src", d.images.thumbnail.url).attr("alt", d.caption.text))));
		}
		$(".imgLis").imgLiquid({
			verticalAlign:'center'
		});
	}).fail(function (data, textStatus, errorThrown) {
		$("#instagram").text(textStatus);
	}).always(function (data, textStatus, returnedObject) {
	});
});