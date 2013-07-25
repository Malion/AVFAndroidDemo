/*var db;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	var db = window.openDatabase("reviewsDB", "1.0", "Game Reviews", 1000000);
	if(dbCreated){
		db.transaction(getGames, errorCB)
	} else {
		db.transaction(populateDB, errorCB, successCB);	
	}
}
function populateDB(tx){
	tx.executeSql('DROP TABLE IF EXISTS games');
	var sql = 
		"CREATE TABLE IF NOT EXISTS games ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"catergory VARCHAR(50), " +
		"name VARCHAR(50), " +
		"publisher VARCHAR(50), " + 
		"release VARCHAR(50), " +
		"rate INTEGER, " +
		"console VARCHAR(200), " + 
		"comments VARCHAR(200))";
	tx.executeSql(sql)
	tx.executeSql("INSERT INTO games (id,catergory,name,publisher,release,rate,console,comments) VALUES (1, 'Adventure','The Legend of Zelda: Skyward Sword','Nintendo','2011-11-20','10','Wii','This Game Was Awesome!')");
	tx.executeSql("INSERT INTO games (id,catergory,name,publisher,release,rate,console,comments) VALUES (2, 'First-Person-Shooter','Halo 4','Microsoft','2012-11-06','8','Xbox 360','Good for a shooter, much better than I had expected.')");
}
function errorCB(tx, err){
	alert("Error Processing SQL: "+err);
}
function successCB(){
	dbCreated = true;
	alert("Reviews Loaded!");
}*/