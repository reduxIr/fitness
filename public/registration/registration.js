class Registration{
    constructor(DB, setPage){
        this.db = DB;
        this.setPage = (page) => setPage(page);
    }

    async registrationButtonHandler(){
        const login = document.getElementById("login").value;
        const password= document.getElementById("password").value;
        const name = document.getElementById("login").value;
        const surname = document.getElementById("login").value;
        const patronymic = document.getElementById("login").value;
        const phone = document.getElementById("login").value;
        const email = document.getElementById("login").value;
        if (login && password && name && surname && patronymic && phone && email){
            const result = await this.db.registration({login, password, name, surname, patronymic, phone, email});
            document.querySelectorAll(".input-registration").forEach(input => input.value = "");
            if (result) this.setPage("login");
        }
    }

    view(){
        document.getElementById("body").innerHTML = `
        <div class="div-registration">
        <label>Логин</label>
        <input id="login" class="input-registration"/>
        <label>Пароль</label>
        <input id="password" type="password" class="input-registration" />
        <label>Имя</label>
        <input id="name" class="input-registration" /> 
        <label>Фамилия</label>
        <input id="surname" class="input-registration" /> 
        <label>Отчество</label>
        <input id="patronymic" class="input-registration" />
        <label>Телефон</label>
        <input id="phone" class="input-registration" />
        <label>Почта</label>
        <input id="email" class="input-registration" />
        <button id="regBut" class="button">Регистрация</button>
        <button id="logBut" class="button">Уже есть аккаунт</button>
        </div>`
        document.getElementById("regBut").onclick = async () => await this.registrationButtonHandler();
        document.getElementById("logBut").onclick = async () => await this.setPage("login");
    }
}