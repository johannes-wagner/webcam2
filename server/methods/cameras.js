Meteor.methods({
	"camerasInsert": function(data) {
		return Cameras.insert(data);
	},
	"camerasUpdate": function(id, data) {
		Cameras.update({ _id: id }, { $set: data });
	},
	"camerasRemove": function(id) {
		Cameras.remove({ _id: id });
	}
});
