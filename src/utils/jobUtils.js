module.exports = {
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
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        //restam x dias:
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}