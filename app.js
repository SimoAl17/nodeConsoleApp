"use strict"

const fs = require('fs');
const { json } = require('stream/consumers');
const ParserV3 = require('./parserV3.js');
const argume = process.argv.slice(2);
const fileToRead = "./input/test4.csv";
const fileToWrite = "./output/pippo.JSON";
const outputType = argume[2];

fs.readFile(fileToRead, 'utf8', manageFileData);
console.log(ParserV3.parseCSV(fileToRead));

function manageFileData(error, data) {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
        const array = ParserV3.parseCSV(data, outputType);
        console.log(array);
        const json = JSON.stringify(array);
        writeJSONFile(json);
    }
}

function writeJSONFile(json) {
    fs.writeFile(fileToWrite, json, error => {
        if (error) {
            console.log(error);
        } else {
            console.log("Salvataggio completato");
        }
    });
}

console.log("Ho già letto?");

// let data;
// try {
//     data = fs.readFileSync(fileToRead, 'utf8'); // Il default è utf8.
//     //console.log(data);
// } catch (err) {
//     console.log("\nProblemi durante la lettura del file.\n");
//     console.error(err);
// }


// let result;
// try {
//     result = StringParser.parseMultilineMultiarray(data);
//     console.log("Array risultato: ", result);
//     const sum = result.reduce((p, c) => p = p + c, 0);
//     console.log("Somma elementi array: ", sum);
// } catch (error) {
//     if (error instanceof EmptyStringError) {
//         console.log(error.message);
//     } else if (error instanceof InvalidStringError) {
//         console.log(error.message);
//     } else {
//         console.log(error.message, error.array);
//     }
// }

// try {
//     fs.writeFileSync(fileToWrite, JSON.stringify(result)); // JSON.stringify() -> trasforma qualsiasi elemento in una stringa
// } catch (error) {
//     console.log(error.message);
// }

