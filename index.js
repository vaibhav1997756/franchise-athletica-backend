const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies in requests

const port = 8081;

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "franchiseathletica",
    port:3307
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});


app.post('/api/register', (req, res) => {
    const sql = "INSERT INTO contact (`name`, `email`,`mobile`,`message`) VALUES (?, ?, ?, ?)";
    const values = [
       
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.message

    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


app.listen(port, () => {
    console.log("Server running on port 8081");
});