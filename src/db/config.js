//importar o sqlite3:
const sqlite3 = require("sqlite3")
//importar apenas a funcionalidade open do sqlite:
const { open } = require("sqlite")

module.exports = () => open({
    //fazer a conexão com o banco de dados
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });

