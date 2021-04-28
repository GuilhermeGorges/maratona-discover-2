//arquivo responsável pelos dados de model de  Job
let data = [
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
];

module.exports = {
  get() {
    return data
  },
  update(newJob) {
    data = newJob
  },
  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id)) // filter remove o tal situação acontecer (job.id ser igual jobId)
  }
}