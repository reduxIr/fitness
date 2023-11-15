window.onload = async () => {

    const DB = new Database;

    function setPage(page){
        switch(page){
            case "registration": registration.view();
            break;
            case "login": login.view();
            break;
            case "training": training.view();
        }
    }

    const registration = new Registration(DB, (page) => setPage(page));
    const login = new Login(DB, (page) => setPage(page));
    const training = new Training(DB, (page) => setPage(page));
    registration.view(); 
};