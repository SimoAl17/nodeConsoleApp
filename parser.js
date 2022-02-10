class EmptyStringError extends Error{
    constructor(message){
        super(message);
    }
}

class InvalidStringError extends Error{
    constructor(message){
        super(message);
    }
}

class PartialInvalidStringError extends Error{
    constructor(message, array){
        super(message);
        this.array = array;
    }
}

class StringParser{
    static parseCSVLine(string){
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota");
        }
        
        let stringNumber = string;
        if (string.includes(",")) {
            stringNumber = string.replace(",", ".");
        }
        let array = stringNumber.split("; ");

        let lostNumbers = false;
        let finalArray = [];
        for (let element of array) {
            element = parseFloat(element);
            if (isNaN(element)) {
                lostNumbers = true;
            } else {
                finalArray.push(element);
            }
        }

        if (finalArray.length === 0) {
            throw new InvalidStringError("Stringa non valida");
        } else if (lostNumbers === true) {
            throw new PartialInvalidStringError("Stringa parzialmente non valida", finalArray);
        } else {
            console.log(finalArray);
        }
    }

    static parseMultiline(string){
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota");
        }

        let stringNumber = string;
        if (stringNumber.length >=2 && stringNumber.substring(stringNumber.length-1, stringNumber.length) === "\n") {
            stringNumber = stringNumber.substring(0, stringNumber.length-1);
        }
        if (stringNumber.includes(",")) {
            stringNumber = stringNumber.replace(/,/g, ".");
        }
        if (stringNumber.includes("\n")) {
            stringNumber = stringNumber.replace(/\n/g, "; ");
        } 

        let array = stringNumber.split("; ");
        let lostNumbers = false;
        let finalArray = [];
        for (let element of array) {
            element = parseFloat(element);
            if (isNaN(element)) {
                lostNumbers = true;
            } else {
                finalArray.push(element);
            }
        }

        if (finalArray.length === 0) {
            throw new InvalidStringError("Stringa non valida");
        } else if (lostNumbers === true) {
            throw new PartialInvalidStringError("Stringa parzialmente non valida", finalArray);
        } else {
            console.log(finalArray);
        }
    }

    static parseMultilineMultiarray(string){
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota");
        }

        let stringNumber = string;
        if (stringNumber.length >=2 && stringNumber.substring(stringNumber.length-1, stringNumber.length) === "\n") {
            stringNumber = stringNumber.substring(0, stringNumber.length-1);
        }
        if (stringNumber.includes(",")) {
            stringNumber = stringNumber.replace(/,/g, ".");
        }
        let finalArray = [];
        let lostNumbers = false;
        if (stringNumber.includes("\n")) {
            finalArray = stringNumber.split("\n");                  //Se la stringa contiene \n dividila in pezzi dentro finalArray
            for (const [index,array] of finalArray.entries()) {     //Per ogni pezzo  --------- [index, element] of array.entries() consente di ricavare l'index
                let oldArray = array.split("; ")                    //Fai una copia
                let filteredArray = [];
                for (let element of oldArray) {
                    element = parseFloat(element);
                    if (isNaN(element)) {                           //Analizzane ogni elemento
                        lostNumbers = true;
                    } else {
                        filteredArray.push(element);                //Salva gli elementi compatibili
                    }
                }
                finalArray[index] = filteredArray;                  //E sovrascrivi il pezzo
            }
        } else {
            let oldArray = stringNumber.split("; ")                 //Altrimenti copia la stringa divisa in elementi
                for (let element of oldArray) {
                    element = parseFloat(element);
                    if (isNaN(element)) {                           //Analizzane ogni elemento
                        lostNumbers = true;
                    } else {
                        finalArray.push(element);                   //E salva gli elementi compatibili
                    }
                }
        }

        if (finalArray.length === 0) {
            throw new InvalidStringError("Stringa non valida");
        } else if (lostNumbers === true) {
            throw new PartialInvalidStringError("Stringa parzialmente non valida", finalArray);
        } else {
            return finalArray;
        }
    }

    static parseMultilineTable(string){
        
    }
}

module.exports = {StringParser, InvalidStringError, EmptyStringError, PartialInvalidStringError};