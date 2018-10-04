var fs = require('fs');
var FilePublisher = /** @class */ (function () {
    function FilePublisher(name) {
        this.filename = name;
    }
    FilePublisher.prototype.showFile = function () {
        fs.readFile(this.filename, 'utf8', function (err, data) {
            if (err)
                throw err;
            var clean;
            var reg = /\n| |-/; // Radera onödiga tecken
            clean = data.split(reg);
            // Räkna objekt i filen
            data = [];
            var count = {};
            for (var _i = 0, clean_1 = clean; _i < clean_1.length; _i++) { // Loop igenom alla objekt i array clean
                var i = clean_1[_i];
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
    };
    return FilePublisher;
}());
var obj = new FilePublisher("hitch.txt"); // Instansiera filepublisher med objekt
obj.showFile();
