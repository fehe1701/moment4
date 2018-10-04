declare function require(name: string); // Gör det möjligt att använda require i TypeScript
var fs = require('fs');

class FilePublisher {
    filename: string;

    constructor(name: string) {
        this.filename = name;
    }

    showFile(): void { // Funktion som öppnar filen och skriver ut data till konsolen 
        fs.readFile(this.filename, 'utf8', function (err, data) { // Läs ut allt innehåll i filen
            if (err) throw err;

            var clean;
            var reg = /\n| |-/; // Radera onödiga tecken
            clean = data.split(reg);

            // Räkna objekt i filen
            data = [];
            var count = {};

            for (var i of clean) {  // Loop igenom alla objekt i array clean
                count[i] = count[i] != undefined ? count[i] + 1 : 1; // Oindentifierat objekt indentifieras och räknaren sätts på noll, vid upprepning + 1
            }

            var sorted = [];
            for (var key in count)
                sorted.push([key, count[key]]); // Kopiera objekten till en associativ array

            sorted.sort(function (a, b) {
                return a[1] - b[1]; // Sortera beroende på räkningen   
            });
            sorted.reverse(); // Omvänd arrayen till fallande ordning
            console.log(sorted.slice(0, 10)); // Visa de 10 högsta värdena
        });
    }

}

let obj = new FilePublisher("hitch.txt");   // Instansiera filepublisher med objekt
obj.showFile();