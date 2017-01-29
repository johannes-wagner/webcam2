Meteor.methods({
  getHash: function (cam) {
	  
        clientIp = this.connection.httpHeaders['x-forwarded-for'].split(",")[0] 
        today = new Date();
        var permission = (cam+"_"+clientIp+"_"+today.getFullYear()+''+today.getMonth()+''+today.getDate()).hashCode()
        return  'wss://vk.bas-verkehr.de/'+cam+'/?token='+permission;
        //
        //return permission;
        }
})
