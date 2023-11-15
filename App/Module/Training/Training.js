class Training{
    constructor(db){
        this.db = db;
    }

    async getAllTraining(customer){
        if (customer.subscriptionId) {
            const trainings = await this.db.getAllTraining(customer.customerId);
            if (trainings) return trainings.map((training) => {
                return {
                    id: training.training_id,
                    time: training.time,
                    timeId: training.time_id,
                    dayWeek: training.day,
                    coach: {
                        id: training.coach_id,
                        name: training.name,
                        surname: training.surname,
                        patronymic: training.patronymic,
                        phone: training.phone_number
                    },
                    trainingProgram: training.training_program
                }
            });
        }
        return false;
    }

    async getCoaches(user){
        if (user.subscriptionId){
            const level = await this.db.getLevel(user.subscriptionId);
            const coaches = this.db.getCoaches(level.level);
            if (coaches) return coaches;
        }
        return false;
    }

    async getTimes(user){
        if (user.subscriptionId){
            const level = await this.db.getLevel(user.subscriptionId);
            const times = this.db.getTimes(level.level);
            if (times) return times;
        }
        return false;
    }

    async updateTraining(customerId, trainings){
        trainings.forEach(training => {
            this.db.updateTraining(customerId, training);
        });
    }

}

module.exports = Training;