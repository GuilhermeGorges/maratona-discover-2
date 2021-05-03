module.exports = {
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
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

    // restam x days 
    return dayDiff
  },
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}