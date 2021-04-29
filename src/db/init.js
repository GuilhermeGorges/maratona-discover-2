// criação da tabela do backend 
const Database = require('config')

Database()//abre o banco de dados 

Database.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTO_INCREMENT, 
  name TEXT,
  avatar TEXT,
  monthly_budget INT,
  days_per_week INT,
  hours_per_day INT,
  vacation_per_year INT,
  value_hour INT,
)`);

Database.exec(`CREATE TABLE jobs(
  id INTEGER PRIMARY KEY AUTO_INCREMENT, 
  name TEXT,
  daily_hours INT,
  total_hours INT,
  created_at DATE_TIME, 
)`)

Database.run(`INSERT INTO profile (
  name, 
  avatar, 
  monthly_budget, 
  days_per_week,
  hours_per_day,
  vacation_per_year,
  value_hour,
  ) VALUES (
    "Guilherme",
    "https://github.com/GuilhermeGorges.png",
    3000,
    5, 
    5,
    4,
    75
  );`)

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at,
  ) VALUES(
    "Pizzaria Guloso",
    2,
    1,
    1619712960453
  );`)

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at,
  ) VALUES(
    "Projexo X",
    3,
    47,
    1619712960453
  );`)


Database.close()//fecha o banco de dados 


