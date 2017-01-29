Cameras.allow({
	insert: function (userId, doc) {
		return Cameras.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Cameras.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Cameras.userCanRemove(userId, doc);
	}
});

Cameras.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Cameras.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Cameras.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Cameras.before.remove(function(userId, doc) {
	
});

Cameras.after.insert(function(userId, doc) {
	
});

Cameras.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Cameras.after.remove(function(userId, doc) {
	
});
