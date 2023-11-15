const bcrypt = require('bcrypt');
const md5 = require('md5');

class User{
    constructor(db){
        this.db = db;
    }

    async auth(token){
        if (token) {
            const customer = await this.db.getUserByToken(token);
            if (customer) return {
                customerId: customer.customers_id,
                name: customer.name,
                surname: customer.surname,
                patronymic: customer.customers_id,
                phone: customer.phone_number,
                email: customer.email,
                subscriptionId: customer.subscription_id
            }; 
        }
        return false;
    }

    async registration(userData){
        const {login, password, name, surname, patronymic, phone, email} = userData;
        const user = await this.db.getUserByLogin(login);
        if (!user) {
            if (surname && name && patronymic && phone && login && password && email) {
                const passwordHash = await bcrypt.hash(password, 10);
                const result = await this.db.addUser(login, passwordHash, name, surname, patronymic, phone, email);
                if (result) {
                    const customer = await this.db.getUserByLogin(login);
                    if (customer) this.db.createTrainingTimetable(customer.customers_id);
                    return true;
                }
            }
        }
        return false;
    }

    async login(login, password){
        if (login && password) {
            const user = await this.db.getUserByLogin(login);
            if (user){
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    const token = md5(Math.random().toString() + Math.random().toString() + Math.random().toString());
                    this.db.setToken(user.customers_id, token);
                    return {
                        user: {
                            name: user.name,
                            surname: user.surname,
                            patronymic: user.patronymic,
                            email: user.email,
                            phone: user.phone_number
                        },
                        token: token
                    };
                }
            }
        }
        return false;
    }

    async logout(userId){
        if (userId) {
            this.db.setToken(userId, null);
            return true;
        }
        return false;
    }

    async getSubscription(){
        return await this.db.getSubscription();
    }

    async buySubscription(customerId, subscriptionId){
        return await this.db.setSubscription(customerId, subscriptionId);
    }

    
}

module.exports = User;