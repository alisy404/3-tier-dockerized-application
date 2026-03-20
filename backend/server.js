const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection config from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
};

// GET / → basic OK response
app.get('/', (req, res) => {
  console.log('GET / — OK');
  res.status(200).json({ status: 'ok', service: 'backend' });
});

// GET /health → DB health status
app.get('/health', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.execute('SELECT 1');
    await connection.end();
    console.log('GET /health — healthy');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (err) {
    console.error('GET /health — unhealthy:', err.message);
    if (connection) {
      try { await connection.end(); } catch (_) {}
    }
    res.status(500).json({ status: 'unhealthy', database: 'disconnected', error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
