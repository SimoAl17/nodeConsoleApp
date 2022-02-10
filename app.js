"use strict"

const fs = require('fs');
const {StringParser, InvalidStringError, EmptyStringError, PartialInvalidStringError} = require('./parser.js');
const argume = process.argv.slice(2);
const fileToRead = argume[0];
const fileToWrite = argume[1];

let data;
try {
    data = fs.readFileSync(fileToRead, 'utf8'); // Il default è utf8.
    //console.log(data);
} catch (err) {
    console.log("\nProblemi durante la lettura del file.\n");
    console.error(err);
}


let result;
try {
    result = StringParser.parseMultilineMultiarray(data);
    console.log("Array risultato: ", result);
    const sum = result.reduce((p, c) => p = p + c, 0);
    console.log("Somma elementi array: ", sum);
} catch (error) {
    if (error instanceof EmptyStringError) {
        console.log(error.message);
    } else if (error instanceof InvalidStringError) {
        console.log(error.message);
    } else {
        console.log(error.message, error.array);
    }
}

try {
    fs.writeFileSync(fileToWrite, JSON.stringify(result)); // JSON.stringify() -> trasforma qualsiasi elemento in una stringa
} catch (error) {
    console.log(error.message);
}

