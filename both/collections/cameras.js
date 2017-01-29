this.Cameras = new Mongo.Collection("cameras");

this.Cameras.userCanInsert = function(userId, doc) {
	return true;
};

this.Cameras.userCanUpdate = function(userId, doc) {
	return true;
};

this.Cameras.userCanRemove = function(userId, doc) {
	return true;
};
