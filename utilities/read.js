const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function readCsvRows(n) {
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
        // Processed all rows
        console.log(dataList);
      });

  } catch (error) {
    throw new Error(`Error reading CSV file: ${error.message}`);
  }
}

// Example usage:
const numberOfRowsToRead = 10;
try {
  readCsvRows(numberOfRowsToRead);
} catch (error) {
  console.error(error.message);
}


// npm install csv-parser 
//npm install axios     