import $ from "jquery";

import { onLoadHtmlSuccess } from "../main/attach";

const duration = 300;

function filterByType(type) {
	$("[session-types]").each(function(i, e) {
		const target = $(this).attr("session-types") === type || type === null;
		if (target) {
      $(this).parent().removeClass('d-none')
			$(this).fadeIn(duration);
		} else {
			$(this).fadeOut(duration, () => {
        $(this).parent().addClass('d-none')
      })
		}
	});
}

$.fn.typeButtons = function() {
	const types = new Set();
	$("[session-types]").each(function(i, e) {
		types.add($(e).attr("session-types"));
	});

	const btns = Array.from(types).map((type) => {
		const btn = $("<button>")
			.addClass(["btn", "btn-info", "my-btn-green"])
			.html(type);
		btn.click((e) => filterByType(type));
		return btn;
	});

	const btnAll = $("<button>")
		.addClass(["btn", 'btn-info', 'my-btn-green-active'])
		.html("Todas");
	btnAll.click((e) => filterByType(null));
	btns.push(btnAll);

	const btnGroup = $("<div>").addClass(["btn-group"]);
	btnGroup.append(btns);

	$(this).html(btnGroup);
	return this;
};

onLoadHtmlSuccess(function() {
	$("[session-types-buttons]").typeButtons();
});
