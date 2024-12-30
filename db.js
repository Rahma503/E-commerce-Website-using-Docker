const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432, // Update with the correct port number
  user: 'postgres',
  password: 'postgres',
  database: 'testUser'
});

client.connect();

client.query('SELECT * FROM users', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end();
});