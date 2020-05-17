Î/**
 * I have solved this for just one option "Find songs by artist". Please complete the activity in similar
 * fashion by adding functions for other options.
 */
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

const main = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "top_songsDB"
    });

    console.log(`Connected to database with id ${connection.threadId}`);

    await runSearch(connection);
};

const runSearch = async (connection) => {
    const { action } = await inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Find songs by artist",
            "Find all artists who appear more than once",
            "Find data within a specific range",
            "Search for a specific song",
            "Find artists with a top song and top album in the same year",
            "Quit"
        ]
    });

    switch (action) {
        case "Find songs by artist":
            artistSearch(connection);
            break;
        /* 
        Add more conditions here
         */
        default:
            connection.end();
            break;
    }
};

const artistSearch = async (connection) => {
    const { artist } = await inquirer.prompt({
        name: "artist",
        type: "input",
        message: "What artist would you like to search for?"
    });

    const query = "SELECT position, song, year FROM top5000 WHERE ?";
    const params = { artist: artist };

    const [rows] = await connection.query(query, params);

    for (const row of rows) {
        console.log(`Position: ${row.position} || Song: ${row.song} || Year: ${row.year}`);
    }

    runSearch(connection);
};

/* 
Add more functions (like artistSearch) here based on the conditions.
 */

main();
