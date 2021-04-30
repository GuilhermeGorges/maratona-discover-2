const Profile = require('../model/Profile')

//module exports serve para exportar as funções 
module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() })
  },
  async update(req, res) {
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

    const profile = await Profile.get()

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    })

    return res.redirect('/profile')
  },
}