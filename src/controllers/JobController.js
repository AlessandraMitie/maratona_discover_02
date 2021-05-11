const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    save(req, res) {
        //req.body = {name: 'asdf', 'daily-hours': '3', 'total-hours': '30'}
     
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0;
        //se a condição achar o objeto no array, então vai pegar o id dele e atribuir em lastId
        // || significa ou
        //se a condição não achar, então vai ser o número 1
    
        jobs.push({
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
        const jobs = Job.get()

        //buscar dentro do array: para cada um dos dados vai rodar uma função e se for o valor, vai atribuir na const
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        //se nao tiver nada
        if (!job) {
            return res.send('Job not found!')
        }

        const profile = Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    update(req, res) {
        const jobId = req.params.id
        const jobs = Job.get()

        //buscar dentro do array: para cada um dos dados vai rodar uma função e se for o valor, vai atribuir na const
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            //sobrescrever name
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = jobs.map(job => {
            if(Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            return job
        })
        
        Job.update(newJobs)

        res.redirect('/job/' + jobId)
    },

    delete(req, res) {
        const jobId= req.params.id
        //const jobs = Job.get()

        //o que retornar false vai ser tirado do filtro
        //Job.data = jobs.filter(job => Number(job.id) !== Number(jobId))

        Job.delete(jobId)
        return res.redirect('/')
    }
}