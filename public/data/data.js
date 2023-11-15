class Database {

    token = null;
    user = null;
    trainings = null;

    async sendPost(url,data) {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({ "Content-Type": "application/json" })
        });
        let answer = null;
        if (res.ok) answer = await res.json();
        if (answer.data) return answer.data;
        return false;
    }
    
    async sendGet(url) {
        const res = await fetch(url);
        let answer = null;
        if (res.ok) answer = await res.json();
        if (answer.data) return answer.data;
        return false;
    }

    async registration($data){
        return await this.sendPost("/registration", $data);
    }

    async login(login, password) {
        const result = await this.sendPost("/login", { login, password });
        if (result) {
            this.token = result.token;
            this.user = result.user;
            return true;
        }
        return false;
    }

    async logout() {
        const result = await this.sendGet('/' + this.token + '/logout');
        if (result) {
            this.token = null;
            return true;
        }
        return false;
    }

    async getAllTraining() {
        if (this.token) {
            const result = await this.sendGet('/' + this.token + '/training/all');
            const coaches = await this.sendGet('/' + this.token + '/training/coaches');
            if (coaches) this.coaches = coaches;
            const times = await this.sendGet('/' + this.token + '/training/times');
            if (times) this.times = times;
            if (result) {
                this.trainings = result;
                return true;
            }
            
        }
        return false
    }

    async updateTraining(){
        if (this.token) {
            const result = await this.sendPost('/' + this.token + '/training/update', this.trainings);
        };
    }

    async buySubscription(id){
        if (this.token) {
            const result = await this.sendGet('/' + this.token + '/subscription/' + id);
            if (result) return true;
        };
        return false;
    }
}