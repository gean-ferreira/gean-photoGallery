import $ from "jquery";

$("body").on("click", "img", function(event) {
	$("#myModal").css("display", "block");
	$("#img01").attr("src", event.target.src);
	$("#caption").append(event.target.alt);
	$(".close").on("click", function() {
		$("#caption").empty();
		$("#myModal").css("display", "none");
	});
});
