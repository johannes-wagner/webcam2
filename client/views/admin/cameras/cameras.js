var pageSession = new ReactiveDict();

Template.AdminCameras.rendered = function() {
	
};

Template.AdminCameras.events({
	
});

Template.AdminCameras.helpers({
	
});

var AdminCamerasViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminCamerasViewSearchString");
	var sortBy = pageSession.get("AdminCamerasViewSortBy");
	var sortAscending = pageSession.get("AdminCamerasViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "desc", "displayOrder"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AdminCamerasViewExport = function(cursor, fileType) {
	var data = AdminCamerasViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminCamerasView.rendered = function() {
	pageSession.set("AdminCamerasViewStyle", "table");
	
};

Template.AdminCamerasView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AdminCamerasViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AdminCamerasViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AdminCamerasViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.cameras.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminCamerasViewExport(this.admin_cameras, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminCamerasViewExport(this.admin_cameras, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminCamerasViewExport(this.admin_cameras, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminCamerasViewExport(this.admin_cameras, "json");
	}

	
});

Template.AdminCamerasView.helpers({

	"insertButtonClass": function() {
		return Cameras.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_cameras || this.admin_cameras.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_cameras && this.admin_cameras.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_cameras && pageSession.get("AdminCamerasViewSearchString") && AdminCamerasViewItems(this.admin_cameras).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminCamerasViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminCamerasViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminCamerasViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminCamerasViewStyle") == "gallery";
	}

	
});


Template.AdminCamerasViewTable.rendered = function() {
	
};

Template.AdminCamerasViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminCamerasViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminCamerasViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminCamerasViewSortAscending") || false;
			pageSession.set("AdminCamerasViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminCamerasViewSortAscending", true);
		}
	}
});

Template.AdminCamerasViewTable.helpers({
	"tableItems": function() {
		return AdminCamerasViewItems(this.admin_cameras);
	}
});


Template.AdminCamerasViewTableItems.rendered = function() {
	
};

Template.AdminCamerasViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Cameras.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Kamera löschen?",
			title: "Löschen bestätigen",
			animate: false,
			buttons: {
				success: {
					label: "Ja",
					className: "btn-success",
					callback: function() {
						Cameras.remove({ _id: me._id });
					}
				},
				danger: {
					label: "Nein",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.cameras.edit", {cameraId: this._id});
		return false;
	}
});

Template.AdminCamerasViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Cameras.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Cameras.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
