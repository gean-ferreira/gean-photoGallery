import $ from "jquery";

function loadAttach(parent) {
	if (!parent) parent = "body";
	$(parent)
		.find("[attach]")
		.each(function(i, e) {
			const url = $(e).attr("attach");
			$.ajax({
				url,
				success(data) {
					$(e).html(data);
					$(e).removeAttr("attach");

					loadAttach(e);
				},
			});
		});
}

loadAttach();
