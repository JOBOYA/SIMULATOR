import dotenv from 'dotenv';
import express from 'express';
import { google } from 'googleapis';




dotenv.config();
const app = express();



app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

app.post('/FormComponent', async (req, res) => {
  
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    
    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    // spreadsheet id
    
    const spreadsheetID = process.env.SPREADSHEET_ID;


    //get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: spreadsheetID,
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadsheetID,
        range: 'SAISIE CLIENT!E5',
       

    });




    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: spreadsheetID,
        range: 'SAISIE CLIENT!E5' ,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                ['value1'],
            ]
        },
       
    });
   


    res.send(getRows.data.values);

});

app.listen(5000, () => console.log('Listening on port 5000'));