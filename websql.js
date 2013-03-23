
/*
  @author Vinod K Puliyadi
*/

var websql = {

	db   : null,

	open : function(){
		this.db = openDatabase('myroom', '1.0', 'Sunny Leone Room Database', 2 * 1024 * 1024, function(){
			console.log("Database Created!");
		});
	},

	query : function (sql, callback){
		try{
			this.db.transaction(function (tx) {
				if(typeof(callback) == 'function'){
					tx.executeSql(sql, [], function(tx, results){
						var data = new Object();
						data.num_rows = results.rows.length;
						data.row = results.rows.item(0);
						data.rows = [];
						for (i = 0; i < data.num_rows; i++){
							data.rows.push(results.rows.item(i));
					    }
						callback(data);
					}, null);
				} else {
					tx.executeSql(sql);	
				}
			});
		} catch (e){
			alert(e.message);
		}
	}

};
