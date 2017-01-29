var pageSession = new ReactiveDict();

Template.AdminCamerasInsert.rendered = function() {
	
};

Template.AdminCamerasInsert.events({
	
});

Template.AdminCamerasInsert.helpers({
	
});

Template.AdminCamerasInsertEditForm.rendered = function() {
	

	pageSession.set("adminCamerasInsertEditFormInfoMessage", "");
	pageSession.set("adminCamerasInsertEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.AdminCamerasInsertEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCamerasInsertEditFormInfoMessage", "");
		pageSession.set("adminCamerasInsertEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminCamerasInsertEditFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminCamerasInsertEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminCamerasInsertEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.cameras", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminCamerasInsertEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Cameras.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.cameras", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminCamerasInsertEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCamerasInsertEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCamerasInsertEditFormErrorMessage");
	}
	
});
