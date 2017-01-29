Meteor.publish("admin_cameras", function() {
	return Cameras.find({}, {});
});

Meteor.publish("admin_camera", function(cameraId) {
	return Cameras.find({_id:cameraId}, {});
});

Meteor.publish("user_cameras", function() {
	return Cameras.find({name:{$in:Meteor.users.findOne(this.userId).profile.cameras}}, {});
});

