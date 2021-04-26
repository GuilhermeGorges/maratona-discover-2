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
  "vacation-per-day": 4,
  "value-hour": 75
}
//array que armazena os dados vindos do req.body
const jobs = [
  {
    id: 1,
    name: "Pizzaria Gulozo",
    "daily-hours": 2,
    "total-hours": 3,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: "Projexo X",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now(),
  }
]

function remainingDays(job) {
  // function que calcula quantos dias restam para a entrega do projeto 
  // calculo de tempo restante
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // .toFixed() arredondamento do resultado 

  const createdDate = new Date(job.created_at)
  const dueDay = createdDate.getDate() + Number(remainingDays)
  const dueDateInMs = createdDate.setDate(dueDay)

  const timeDiffInMs = dueDateInMs - Date.now()
  // transformar Ms em remainingDays
  const dayInMs = 1000 * 60 * 60 * 24
  const dayDiff = Math.floor(timeDiffInMs / dayInMs)

  // restam x days 
  return dayDiff
}


routes.get('/', (req, res) => {
  // req, res

  const updatedJobs = jobs.map((job) => {
    // .map() pega cada item no estilo for each e retorna um item novo 
    // ajustes no job
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'  //if ternário para retornar o status 

    return {
      ...job,
      remaining,
      status,
      budget: profile["value-hour"] * job["total-hours"],
    }
  })

  return res.render(views + "index", { jobs: updatedJobs })

})

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))
routes.get('/job', (req, res) => res.render(views + "job"))
// rota para recebimento do post na page job, (SALVAR) button. 
routes.post('/job', (req, res) => {
  // estrutura do dado vindo do req.body => { name: 'asd', 'daily-hours': '0.4', 'total-hours': '3' }
  const lastId = jobs[jobs.length - 1]?.id || 1;

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now() // atribuindo data de hoje
  })
  return res.redirect('/')
})



module.exports = routes;

//"https://scontent.fbnu4-1.fna.fbcdn.net/v/t31.18172-8/18738846_260016597807794_5882782853619273723_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DwB2DRSR5tcAX9wWqZc&_nc_ht=scontent.fbnu4-1.fna&oh=f4576b391b2aefa775198ea00e20488c&oe=60A3ED31"