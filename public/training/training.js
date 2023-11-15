async function trainingPage(DB){

}

class Training{
    constructor(DB, setPage){
        this.db = DB;
        this.setPage = (page) => setPage(page);
        this.days = {
            'pn': "Понедельник",
            'vt': "Вторник",
            'sr': "Среда",
            'cht': "Четверг",
            'pt': "Пятница",
            'sb': "Суббота",
            'vsk': "Воскресенье"
        };
    }

    async exitHandler(){
        const result = this.db.logout();
        if (result) this.setPage("login");
    }

    async getTrainings(){
        const result = await this.db.getAllTraining();
        if (result) {
            this.render();
        }
    }

    render(){
        const trainings = this.db.trainings;
        if (trainings){
            Object.keys(this.days).forEach(day => {
                const training = trainings.find(training => training.dayWeek === this.days[day]);
                if (training) {
                    const timeTd = document.getElementById(day +"_time");
                    timeTd.textContent = training.time;
                    timeTd.value = training.id;
                    const programTD = document.getElementById(day +"_program");
                    programTD.textContent = training.trainingProgram;
                    programTD.value = training.id;
                    const name = (training.coach.name) ? (training.coach.name + ' ') : '';
                    const surname = (training.coach.surname) ? (training.coach.surname + ' ') : '';
                    const patronymic = (training.coach.patronymic) ? (training.coach.patronymic) : '';
                    const phone = (training.coach.phone) ? ( ' тел.' + training.coach.phone) : '';
    
                    const coachTd = document.getElementById(day +"_coach");
                    coachTd.textContent = surname + name + patronymic + phone;
                    coachTd.value = training.id; 
                }
                
            })
        }
    }

    selectTime(training){
        const selector = document.getElementById("selector");
        selector.innerHTML = '';
        selector.hidden = false;
        const times = this.db.times.map((el)=> el);
        times.push({
            name: null,
            timeId: null
        });
        times.forEach(time => {
            const button = document.createElement('button');
            button.textContent = time.name;
            button.className = "button-time";
            button.onclick = () => {
                selector.innerHTML = '';
                selector.hidden = true;
                training.time = time.name;
                training.timeId = time.time_id
                this.render();
            };
            selector.prepend(button);
        });
        return training.time;
    }



    selectCoach(training){
        const selector = document.getElementById("selector");
        selector.innerHTML = '';
        selector.hidden = false;
        const coaches = this.db.coaches.map((el)=> el);
        coaches.push({
            name: null,
            surname: null,
            patronymic: null,
            phone: null
        });
        coaches.forEach(coach => {
            const button = document.createElement('button');
            button.textContent = coach.surname + " " + coach.name + " " + coach.patronymic;
            button.className = "button-coach";
            console.log(button);
            button.onclick = () => {
                selector.innerHTML = '';
                selector.hidden = true;
                training.coach.name = coach.name,
                training.coach.surname = coach.surname,
                training.coach.patronymic = coach.patronymic,
                training.coach.phone = coach.phone_number,
                training.coach.id = coach.coach_id
                this.render();
            };
            selector.prepend(button);
        });
        return training.coach;
    }

    inputProgram(training){
        document.getElementById("inputProgram").hidden = false;
        const input = document.getElementById("newProgram");
        input.value = training.trainingProgram;
        document.getElementById("acceptProgCh").onclick = () =>{
            document.getElementById("inputProgram").hidden = true;
            training.trainingProgram = input.value;
            this.render();
        }
    }

    async view(){
        document.getElementById("body").innerHTML = `
        <div id="selector" class="selector" hidden=true></div>
        <div id="inputProgram" class="div-program" hidden="true">
            <label>Введите программу</label>
            <input id="newProgram" class="input-program" />
            <button id="acceptProgCh" class="button-program">Принять</button>
        </div>
        <div id="div-training" class="div-training">
        <div class="label-training"><label id="name" ></label></div>
        <table class="table-training" rules="all" cols="5">
            <tr class="tr-training table-header">
                <td class="td-training td-day_week">День недели</td>
                <td class="td-training td-time">Время</td>
                <td class="td-training td-program">Программа</td>
                <td class="td-training td-coach">Тренер</td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Понедельник</td>
                <td id="pn_time" value="pn" class="td-training td-time"></td>
                <td id="pn_program" value="pn" class="td-training td-program"></td>
                <td id="pn_coach" value="pn" class="td-training td-coach"></td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Вторник</td>
                <td id="vt_time" class="td-training td-time"></td>
                <td id="vt_program" class="td-training td-program"></td>
                <td id="vt_coach" class="td-training td-coach"></td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Среда</td>
                <td id="sr_time" class="td-training td-time"></td>
                <td id="sr_program"class="td-training td-program"></td>
                <td id="sr_coach" class="td-training td-coach"></td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Четверг</td>
                <td id="cht_time" class="td-training td-time"></td>
                <td id="cht_program"class="td-training td-program"></td>
                <td id="cht_coach" class="td-training td-coach"></td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Пятница</td>
                <td id="pt_time" class="td-training td-time"></td>
                <td id="pt_program"class="td-training td-program"></td>
                <td id="pt_coach" class="td-training td-coach"></td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Суббота</td>
                <td id="sb_time" class="td-training td-time"></td>
                <td id="sb_program"class="td-training td-program"></td>
                <td id="sb_coach" class="td-training td-coach"></td>
            </tr>
            <tr class="tr-training">
                <td class="td-training td-day_week">Воскресенье</td>
                <td id="vsk_time" class="td-training td-time"></td>
                <td id="vsk_program"class="td-training td-program"></td>
                <td id="vsk_coach" class="td-training td-coach"></td>
            </tr>
        </table>
        <button id="buy" class="button-exit">Купить абонемент</button>
        <button id="save" class="button-exit">Сохранить</button>
        <button id="exit" class="button-exit">Выйти</button>
        </div>`

        const times = document.querySelectorAll(".td-time");
        times.forEach( time => {
            time.onclick = () => {
                if (this.db.trainings){
                    const training = this.db.trainings.find(el => el.id === time.value);
                    training.time = this.selectTime(training);
                };
            } 
        });
        const programs = document.querySelectorAll(".td-program");
        programs.forEach( program => {
            program.onclick = () => {
                if (this.db.trainings){
                    const training = this.db.trainings.find(el => el.id === program.value);
                    training.trainingProgram = this.inputProgram(training);
                    this.render();
                };
            } 
        });
        const coachs = document.querySelectorAll(".td-coach");
        coachs.forEach( coach => {
            coach.onclick = () => {
                if (this.db.trainings){
                    const training = this.db.trainings.find(el => el.id === coach.value);
                    const newCoach = this.selectCoach(training);
                    training.coach.id = coach.coach_id;
                    training.coach.name = newCoach.name;
                    training.coach.surname = newCoach.surname;
                    training.coach.patronymic = newCoach.patronymic;
                    training.coach.phone = newCoach.phone;
                    this.render();
                };
            }
        });

        const user = this.db.user;
        await this.getTrainings();
        document.getElementById("name").innerHTML = user.surname + ' ' + user.name + ' ' + user.patronymic;
        document.getElementById("exit").onclick = async () => await this.exitHandler();
        document.getElementById("save").onclick = async () => await this.db.updateTraining();
        document.getElementById("buy").onclick = async () => {
            const result = await this.db.buySubscription(1);
            this.setPage("training");
        }
    }
}