// criação da tabela do backend 
const Database = require('config')

Database()//abre o banco de dados 

Database.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTO_INCREMENT, 
  name TEXT,
  avatar TEXT,
  monthly-budget INT,
  days-per-week INT,
  hours-per-day INT,
  vacation-per-day INT,
  value-hour INT,
)`);

Database.close()//fecha o banco de dados 






