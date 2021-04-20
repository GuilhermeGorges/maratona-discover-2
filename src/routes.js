// biblioteca para criar o servidor 
const express = require('express');
// é uma parte do express que vai criar os caminhos 
const routes = express.Router()
// caminho base para o views
const views = __dirname + "/views/"
// criando um novo perfil 
const profile = {
  name: "Guilherme",
  avatar: "https://github.com/GuilhermeGorges.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-day": 4
}
//array que armazena os dados vindos do req.body
const jobs = []

// req, res
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

// rota para recebimento do post na page job, (SALVAR) button. 
routes.post('/job', (req, res) => {
  // estrutura do dado vindo do req.body => { name: 'asd', 'daily-hours': '0.4', 'total-hours': '3' }
  const job = req.body
  job.created = Date.now() // atribuindo uma nova data

  jobs.push(req.body)
  return res.redirect('/')
})



module.exports = routes;

//"https://scontent.fbnu4-1.fna.fbcdn.net/v/t31.18172-8/18738846_260016597807794_5882782853619273723_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DwB2DRSR5tcAX9wWqZc&_nc_ht=scontent.fbnu4-1.fna&oh=f4576b391b2aefa775198ea00e20488c&oe=60A3ED31"