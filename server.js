const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Google Sheets setup
const SPREADSHEET_ID = '1k4Gr-hXN987zD5NqgmP1JVrIAKt2DGr1KDZq59Kuw5s';
const RANGE = 'Sheet1!A:C'; // Assuming columns: Name, Idea, Link

// Authenticate with Google
async function authenticate() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth;
}

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, idea, link } = req.body;

  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const values = [[name, idea, link]];
    const resource = {
      values,
    };

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      resource,
    });

    console.log(`${result.data.updates.updatedCells} cells appended.`);
    res.send('Gift idea submitted anonymously!');
  } catch (error) {
    console.error('Error appending to sheet:', error);
    res.status(500).send('Error submitting gift idea.');
  }
});

// Route to fetch sheet data
app.get('/api/sheet-data', async (req, res) => {
  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });
    res.json(result.data.values || []);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});