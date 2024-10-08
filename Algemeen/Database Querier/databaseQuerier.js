const sqlite3 = require("sqlite3").verbose();
const readline = require("readline");

const db = new sqlite3.Database("./../../Materials Database/material_database.db");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

db.all("SELECT * FROM material_properties;", [], (err, rows) => {
    if (err) {
        throw err;
    }

    console.log("Type the laminate that you want to get the material properties of.\nYour input should be of the form: '90' or '0/90/0', without the ' obviously.");
    rl.on('line', (input) => {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].laminate === input) {
                console.log(rows[i]);
                break;
            }
        }
        rl.close();
    });
})