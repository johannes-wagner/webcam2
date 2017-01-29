this.AdminCamerasController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminCameras': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("admin_cameras")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			admin_cameras: Cameras.find({}, {$orderby:{displayOrder:1}})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});