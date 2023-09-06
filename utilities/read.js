const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function readCsvRows(n) {
  return new Promise((resolve, reject) => {
    const dataList = [];
    let rowNumber = 1;

    try {
      const filePath = path.join(__dirname, '..', 'test-data', 'Testdata.csv');
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          if (rowNumber <= n) {
            // Handle missing values by converting empty strings to null
            for (const key in row) {
              if (row[key] === '') {
                row[key] = null;
              }
            }

            dataList.push(row);
            rowNumber++;
          }
        })
        .on('end', () => {
          // Processed all rows, resolve the promise with dataList
          resolve(dataList);
        });
    } catch (error) {
      // If an error occurs, reject the promise with the error
      reject(`Error reading CSV file: ${error.message}`);
    }
  });
}

async function data() {
  try {
    const dataList = await readCsvRows(2);
    console.log(dataList);
  } catch (error) {
    console.error(error);
  }
}

//data();


module.exports.readCsvRows = readCsvRows;
// npm install csv-parser 
//npm install axios     