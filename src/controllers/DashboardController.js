const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {

    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    };
    // total de horas por dia de cada job in progress 
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      // .map() pega cada item no estilo for each e retorna um item novo 
      // ajustes no job
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'  //if ternário para retornar o status 
      //somando a quantidade de status 
      //recebe o conteúdo de status, compara se é igual done or progress, se for igual ele soma +1
      statusCount[status] += 1;

      // total de horas por dia de cada job in progress
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;


      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      };
    });

    // qts de horas que quero trabalhar
    // MENOS quantidade de horas/dia de cada job em progress 
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
  }
}