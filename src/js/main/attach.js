import $ from "jquery";

const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
	if (!loadHtmlSuccessCallbacks.includes(callback)) {
		loadHtmlSuccessCallbacks.push(callback);
	}
}

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

					loadHtmlSuccessCallbacks.forEach((callback) => callback(data));
					loadAttach(e);
				},
			});
		});
}

loadAttach();
