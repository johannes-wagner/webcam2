var pageSession = new ReactiveDict();
import '../../lib/jsmpg.js'




Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	
});

var HomePrivateViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}
	console.log(cursor);
	sort = _.sortBy(cursor.fetch(),"displayOrder");
	return sort;
};

Template.HomePrivateView.rendered = function() {
	pageSession.set("HomePrivateViewStyle", "table");
};

Template.HomePrivateView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},
});

Template.HomePrivateView.helpers({

	"isEmpty": function() {
		return !this.user_cameras || this.user_cameras.count() == 0;
	},
	"isNotEmpty": function() {
		return this.user_cameras && this.user_cameras.count() > 0;
	},
	"isNotFound": function() {
		return this.user_cameras && pageSession.get("HomePrivateViewSearchString") && HomePrivateViewItems(this.user_cameras).length == 0;
	},
	"viewAsTable": function() {
		return pageSession.get("HomePrivateViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("HomePrivateViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HomePrivateViewStyle") == "gallery";
	}

	
});


Template.HomePrivateViewTable.rendered = function() {
	
};

Template.HomePrivateViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("HomePrivateViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HomePrivateViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HomePrivateViewSortAscending") || false;
			pageSession.set("HomePrivateViewSortAscending", !sortAscending);
		} else {
			pageSession.set("HomePrivateViewSortAscending", true);
		}
	}
});

Template.HomePrivateViewTable.helpers({
	"tableItems": function() {
		return HomePrivateViewItems(this.user_cameras);
	}
});


Template.HomePrivateViewTableItems.rendered = function() {
        var cam =(this.data && this.data.name) || Router.current().url.split("/")[2]
        Meteor.call('getHash',cam,function(error,result){
                if(error){
                //@TODO error handling
                        console.log(error)
                }else{
                        var client = new WebSocket(result);
                        var cam = result.split("/")[3]
                        var canvas = document.getElementById(cam);
                        console.log(canvas);
                        var player = new jsmpeg(client, {canvas:canvas});
                }
        })
};


