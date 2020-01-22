const mysql = require('mysql');

const connection = mysql.createConnection ( {
    host: 'localhost',
    user: 'root',
    password: '14031995@kush',
    database: 'restapi'
});

connection.connect( err => {
    if(err) {
        console.log("error in database connection "+err)
    }
        console.log(" Database connected successfuly")
});

module.exports = connection;