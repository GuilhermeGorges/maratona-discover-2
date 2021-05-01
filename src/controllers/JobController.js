const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  create(req, res) {
    return res.render("job")
  },
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now()
    });

    return res.redirect('/')
  },
  async show(req, res) {
    const jobId = req.params.id
    const jobs = await Job.get();
    const profile = await Profile.get();


    const job = jobs.find(job => Number(job.id) === Number(jobId)) // find() faz a comparação entre os dois IDs e se for igual retorna o conteúdo daquele ID

    if (!job) {
      return res.send('JOB NOT FOUND!')
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
  },
  async update(req, res) {
    const jobId = req.params.id

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    await Job.update(updatedJob, jobId)

    res.redirect('/job/' + jobId)
  },
  async delete(req, res) {
    const jobId = req.params.id
    await Job.delete(jobId)
    return res.redirect('/')
  }
};
