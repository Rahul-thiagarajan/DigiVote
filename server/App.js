import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 5000;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'voting',
    password: 'Adhi',
    port: 5432,
  });
  db.connect();


// CORS
app.use(cors({ origin: true }));
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.options('*', cors());

// Body Parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoints
app.get('/api', (req, res) => {
  res.send('The Server is Up and Running');
});

app.post('/', async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const result = await db.query('SELECT * FROM votingSystem WHERE wallet_address = $1 AND epic_number = $2', [data.walletAddress, data.epicNumber]);
    console.log(result.rows);
    if (result.rows[0]) {
        res.send(true);
    } else {
        res.send(false);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.post('/voted', async (req, res) => {
//     try {
//         const response = await db.query('UPDATE ', [data.walletAddress, data.epicNumber]);
//     } catch (error) {
        
//     }
// });

app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});