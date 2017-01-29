Meteor.methods({
	getHash: function (cam) {
	  
        clientIp = this.connection.httpHeaders['x-forwarded-for'].split(",")[0] 
        today = new Date();
        var permission = (cam+"_"+clientIp+"_"+today.getFullYear()+''+today.getMonth()+''+today.getDate()).hashCode()
        return  'wss://vk.bas-verkehr.de/'+cam+'/?token='+permission;
        //
        //return permission;
        },
	deleteUser: function(userId) {
		var canDelete = Meteor.user().roles[0] == "admin"
		if(canDelete){
			var toDelete = Meteor.users.findOne(userId);
			if(toDelete.roles[0] != "admin"){
				Meteor.users.remove(userId);
			}else{
				throw new Meteor.Error("noDeleteAdmin", "Admin Nutzer kann nicht gelöscht werden");
			}
		}else{
			throw new Meteor.Error("noDeletePermission", "Keine Berechtigung zum löschen des Benutzers");
		}
	}
})
