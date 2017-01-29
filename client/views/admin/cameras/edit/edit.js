var pageSession = new ReactiveDict();

Template.AdminCamerasEdit.rendered = function() {
	
};

Template.AdminCamerasEdit.events({
	
});

Template.AdminCamerasEdit.helpers({
	
});

Template.AdminCamerasEditEditForm.rendered = function() {
	

	pageSession.set("adminCamerasEditEditFormInfoMessage", "");
	pageSession.set("adminCamerasEditEditFormErrorMessage", "");

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

Template.AdminCamerasEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCamerasEditEditFormInfoMessage", "");
		pageSession.set("adminCamerasEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminCamerasEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminCamerasEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminCamerasEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.cameras", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminCamerasEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Cameras.update({ _id: t.data.admin_camera._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AdminCamerasEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCamerasEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCamerasEditEditFormErrorMessage");
	}
	
});
