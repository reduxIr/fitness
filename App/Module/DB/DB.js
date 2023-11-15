const sqlite3 = require('sqlite3').verbose();

class DB{

    constructor(config){
        this.db = new sqlite3.Database(config.sqlite);
    }

    async sqlExec(method, sql, params = []){
        return new Promise((resolve, reject) => {
            return this.db[method](sql, params, function (err, res) {
              if (err) {
                return resolve(false)
            }
              return resolve((method === 'run') ? true : res);
            });
          });
    }

    async get(sql, params = []){
        return await this.sqlExec('get', sql, params);
    }

    async all(sql, params = []){
        return await this.sqlExec('all', sql, params);
    }

    async run(sql, params = []){
        return await this.sqlExec('run', sql, params);
    }

    async getUserByLogin(login){
        return await this.get(`
            SELECT * FROM Customers
            WHERE login=?`,
            [login]);
    }

    async addUser(login, password, name, surname, patronymic, phone, email){
        return await this.run(`
            INSERT INTO Customers 
            (login, password, name, surname, patronymic, phone_number, email) 
            VALUES (?,?,?,?,?,?,?)`, 
            [login, password, name, surname, patronymic, phone, email]);
    };

    async setToken(userId, token){
        return await this.run(`
            UPDATE Customers
            SET token=?
            WHERE customers_id=?`, 
            [token, userId]);
    }

    async getUserByToken(token){
        return this.get(`
        SELECT *
        FROM Customers 
        WHERE token=?`,
        [token]);
    }

    async getAllTraining(customerId){
        const sql = `
            SELECT training_id, Times.time_id as time_id, Trainings.coach_id as coach_id, Times.name as time, Trainings.day_id, Coaches.name as name, surname, phone_number, patronymic, training_program, Days.name as day
            FROM (Trainings LEFT JOIN Coaches ON Trainings.coach_id = Coaches.coach_id) 
            LEFT JOIN Days ON Trainings.day_id = Days.day_id
            LEFT JOIN Times ON Trainings.time_id = Times.time_id
            WHERE customer_id=?
        `
        return await this.all(sql,[customerId]);
    }

    async createTrainingTimetable(customerId){
        const sql = `
        INSERT INTO Trainings
        (day_id, customer_id)
        VALUES 
        (1, ?),
        (2, ?),
        (3, ?),
        (4, ?),
        (5, ?),
        (6, ?),
        (7, ?)
        `
        return await this.run(sql,[customerId, customerId, customerId, customerId, customerId, customerId, customerId]); 
    }

    async getCoaches(level){
        return await this.all(`
        SELECT coach_id, name, surname, patronymic, phone_number 
        FROM Coaches
        WHERE subscription_level <=?`,[level]);
    }

    async getTimes(level){
        return await this.all(`
        SELECT time_id, name 
        FROM Times
        WHERE subscription_level <=?`,[level]);
    }

    async getLevel(subscriptionId){
        return await this.get(`
        SELECT level 
        FROM Subscriptions
        WHERE subscription_id =?`,[subscriptionId]);
    }

    async updateTraining(customerId, training){
        return await this.run(`
            UPDATE Trainings
            SET 
            time_id=?,
            coach_id=?,
            training_program=?
            WHERE customer_id=? AND training_id=?
        `, [training.timeId, training.coach.id, training.trainingProgram, customerId, training.id]);
    }

    async getSubscription(){
        return await this.all(`
        SELECT *
        FROM Subscriptions
        `);
    }

    async setSubscription(customerId, subscriptionId){
        return await this.run(`
        UPDATE Customers
        SET subscription_id = ?
        WHERE customers_id = ?
        `, [subscriptionId, customerId]);
    }
}

module.exports = DB;