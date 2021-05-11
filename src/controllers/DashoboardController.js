const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();
    
        const updatedJobs = jobs.map((job) => {
        //map é usado para poder retornar algo. Com o forEach não seria possível
        
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <=0 ? "done" : "progress";
        
            return {
            //espalhamento(pegar tudo o que tem no objeto (no caso job) e espalhar no novo objeto)
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });
        
        return res.render("index", { jobs: updatedJobs, profile: profile })
    },
};