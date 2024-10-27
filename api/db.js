import mysql from 'mysql2';


export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Blueshoe1",
    database: "CollabCampus",
    authPlugins: {
        mysql_native_password: true,
    }
}); 