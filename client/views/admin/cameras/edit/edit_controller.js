this.AdminCamerasEditController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminCamerasEdit': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("admin_camera", this.params.cameraId)
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
			admin_camera: Cameras.findOne({_id:this.params.cameraId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});