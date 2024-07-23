const express = require('express');
const axios = require('axios');
const pool = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const fetchAndStoreData = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;
        const top10Tickers = Object.values(tickers).slice(0, 10);

        await pool.query('DELETE FROM tickers');

        for (const ticker of top10Tickers) {
            const { name, last, buy, sell, volume, base_unit } = ticker;
            await pool.query(
                'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
                [name, last, buy, sell, volume, base_unit]
            );
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

app.get('/tickers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    fetchAndStoreData();
    setInterval(fetchAndStoreData, 10 * 60 * 1000); // Fetch data every 10 minutes
});
