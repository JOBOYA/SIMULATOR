import dotenv from 'dotenv';
import express from 'express';
import { google } from 'googleapis';


dotenv.config();
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index');
});


app.post('/', async (req, res) => {
  const { activite, chiffre, location,
    salarie, remuneration, materiel, vehicule, salaire } = req.body;
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  
  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  // Spreadsheet ID
  const spreadsheetID = process.env.SPREADSHEET_ID;

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId: spreadsheetID,
  });


  const getRows = await googleSheets.spreadsheets.values.get({
   auth,
   spreadsheetId: spreadsheetID,
   range: 'SAISIE CLIENT!E5',
 });


// Append the values to the next empty row
await googleSheets.spreadsheets.values.append({
  auth,
  spreadsheetId: spreadsheetID,
  range: 'SAISIE CLIENT!E5:E26',
  valueInputOption: 'USER_ENTERED',
  resource: {
    values: [
      
      [activite],
      [""],
      [""],
      [chiffre],
      [""],
      [""],
      [location],
      [""],
      [""],
      [salarie],
      [""],
      [""],
      [salaire],
      [""],
      [""],
      [""],
      [""],
      [remuneration],
      [""],
      [materiel],
      [""],
      [""],
      [vehicule],
    

    ]
  },
});

res.send("Success");

});



app.listen(5000, () => console.log('Listening on port 5000'));
