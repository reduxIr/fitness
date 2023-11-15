class Login{
    constructor(DB, setPage){
        this.db = DB;
        this.setPage = (page) => setPage(page);
    }

    async loginButtonHandler(){
        const loginInput = document.getElementById("login");
        const passwordInput = document.getElementById("password");
        const login = loginInput.value;
        const password = passwordInput.value;
        if (login && password) {
            const result = await this.db.login(login,password);
            loginInput.value = "";
            passwordInput.value = "";
            if (result) this.setPage("training");
        };
    }

    view(){
        document.getElementById("body").innerHTML = `
        <div id="div-login" class="div-login">
        <label class="label-login">Логин</label>
        <input id="login" class="input-login"></input>
        <label class="label-login">Пароль</label>
        <input id="password" class="input-login" type="password"></input>
        <button id="loginButton" class="button">Войти</button>
        <button id="regButton" class="button">Регистрация</button>
        </div>`
        document.getElementById("loginButton").onclick = async () => await this.loginButtonHandler();
        document.getElementById("regButton").onclick = async () => await this.setPage("registration");
    }
}