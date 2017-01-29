var pageSession = new ReactiveDict();

Template.AdminCamerasDetails.rendered = function() {
	
};

Template.AdminCamerasDetails.events({
	
});

Template.AdminCamerasDetails.helpers({
	
});

Template.AdminCamerasDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminCamerasDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminCamerasDetailsDetailsFormErrorMessage", "");

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

Template.AdminCamerasDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminCamerasDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminCamerasDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminCamerasDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminCamerasDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminCamerasDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminCamerasDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.cameras", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.cameras", {});
	}

	
});

Template.AdminCamerasDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminCamerasDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminCamerasDetailsDetailsFormErrorMessage");
	}
	
});
