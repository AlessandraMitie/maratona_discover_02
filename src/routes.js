//para pegar o express:
const express = require('express');
const routes = express.Router()
//express.Router() é uma funcionalidade que vai devolver um objeto para a const routes

const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Ale",
        avatar:"https://github.com/alessandramitie.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            //req.body para pegar os dados:
            const data = req.body
            //definir quantas semanas tem no ano:
            const weeksPerYear = 52
            //remover as semanas de férias do ano, para pegar quantas semanas tem 1 mês:
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            //quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            //total de horas trabalhadas no mes
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            // qual será o valor da minha hora:
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
    
}

//objeto literal
const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()
        }
    ],
    //objeto para controlar
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
            //map é usado para poder retornar algo. Com o forEach não seria possível
            
                const remaining = Job.services.remainingDays(job)
                const status = remaining <=0 ? 'done' : 'progress'
            
                return {
                //espalhamento(pegar tudo o que tem no objeto (no caso job) e espalhar no novo objeto)
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job["total-hours"]
                }
            })
            
            res.render(views + "index", { jobs: updatedJobs })
        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
            //req.body = {name: 'asdf', 'daily-hours': '3', 'total-hours': '30'}
         
            const lastId = Job.data[Job.data.length - 1]?.id || 1;
            //se a condição achar o objeto no array, então vai pegar o id dele e atribuir em lastId
            // || significa ou
            //se a condição não achar, então vai ser o número 1
        
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() //atribuindo uma nova data a partir da criação
            })
            return res.redirect('/')
        },

        show(req, res) {

            const jobId = req.params.id

            //buscar dentro do array: para cada um dos dados vai rodar uma função e se for o valor, vai atribuir na const
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }


            return res.render(views + "job-edit", {job})
        }
    },
    services: {
        remainingDays (job) {
            //ajustes no job (cálculo de tempo restante)
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
                
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            //precisa passar o Number pois o toFixed transforma em string
            //data futura de vencimento em milissegundos:
            const dueDateInMs = createdDate.setDate(dueDay)
            //diferença do tempo em milissegundos
            const timeDiffInMs = dueDateInMs - Date.now()
            //transformar milissegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            //difereça de dias que faltam
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            //restam x dias:
            return dayDiff
        }
    }
}

//render é uma função do ejs que entende os caminhos de rotas
//para pegar as rotas:
routes.get('/', Job.controllers.index)
//pegar os dados na requisição:
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
//vai enviar o objeto profile:
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;
//foi feita a exportação desta rota para poder usar em outro lugar/arquivo