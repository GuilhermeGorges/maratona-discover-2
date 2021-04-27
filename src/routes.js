const express = require('express');// biblioteca para criar o servidor 
const routes = express.Router();// é uma parte do express que vai criar os caminhos 
const views = __dirname + "/views/";// caminho base para o views

const Profile = {// criando um novo perfil 
  data: {
    name: "Guilherme",
    avatar: "https://github.com/GuilhermeGorges.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-day": 4,
    "value-hour": 75
  },
  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },
    update(req, res) {
      // req body para pegar os dados 
      const data = req.body
      // definir quantas semanas tem em um ano 
      const weeksPerYear = 52
      // remover as semanas de férias do ano, para pegar quantas semanas tem em um mes
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
      // total de horas trabalhadas na semana 
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      // horas trabalhadas no mes 
      const monthTotalHours = weekTotalHours * weeksPerMonth
      // qual será o valor da minha hora?
      const valueHour = data["value-hour"] = data["monthly-budget"] / monthTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour,
      }

      return res.redirect('/profile')
    },
  },
}

const Job = {
  data: [
    //array que armazena os dados vindos do req.body
    {
      id: 1,
      name: "Pizzaria Gulozo",
      "daily-hours": 2,
      "total-hours": 0,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "Projexo X",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    }

  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        // .map() pega cada item no estilo for each e retorna um item novo 
        // ajustes no job
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'  //if ternário para retornar o status 
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
      })

      return res.render(views + "index", { jobs: updatedJobs })
    },
    create(req, res) {
      return res.render(views + "job")
    },
    save(req, res) {
      // estrutura do dado vindo do req.body => { name: 'asd', 'daily-hours': '0.4', 'total-hours': '3' }
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
      })
      return res.redirect('/')
    },
    show(req, res) {

      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId)) // find() faz a comparação entre os dois IDs e se for igual retorna o conteúdo daquele ID

      if (!job) {
        return res.send('JOB NOT FOUND!')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render(views + "job-edit", { job })
    },
    update(req, res) {
      const jobId = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      if (!job) {
        return res.send('JOB NOT FOUND!')
      }

      const updatedJob = {
        ...job, //quando á mais itens precisamos espalhar o conteúdo
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job
      })
      res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId)) // filter remove o tal situação acontecer (job.id ser igual jobId)

      return res.redirect('/')
    },
  },
  services: {
    remainingDays(job) {
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
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)// rota para recebimento do post na page job, (SALVAR) button. 
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)// postando atualização do projeto 
routes.post('/job/delete/:id', Job.controllers.delete)// delete project 
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update) // postando atualização do profile 



module.exports = routes;

//"https://scontent.fbnu4-1.fna.fbcdn.net/v/t31.18172-8/18738846_260016597807794_5882782853619273723_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DwB2DRSR5tcAX9wWqZc&_nc_ht=scontent.fbnu4-1.fna&oh=f4576b391b2aefa775198ea00e20488c&oe=60A3ED31"