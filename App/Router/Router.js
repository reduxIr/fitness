function Router(router, User, Training){

    router.post('/registration/', async (req, res) => {
        const data = await User.registration(req.body);
        res.send({data});
    });

    router.post('/login', async (req, res) => {
        const data = await User.login(req.body.login, req.body.password);
        res.send({data});
    });

    router.get('/:token/logout/', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await User.logout(user.customers_id) : false;
        res.send({data});

    });

    router.get('/:token/training/all', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await Training.getAllTraining(user) : false;
        res.send({data});
    });

    router.get('/:token/training/coaches', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await Training.getCoaches(user) : false;
        res.send({data});
    });

    router.get('/:token/training/times', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await Training.getTimes(user) : false;
        res.send({data});
    });

    router.post('/:token/training/update/', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await Training.updateTraining(user.customerId, req.body) : false;
        res.send({data});
    });

    router.get('/:token/subscription/', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await User.getSubscription() : false;
        res.send({data});
    });

    router.get('/:token/subscription/:subscriptionId', async (req, res) => {
        const user = await User.auth(req.params.token);
        const data = (user) ? await User.buySubscription(user.customerId, req.params.subscriptionId) : false;
        res.send({data});
    });

    return router;
}

module.exports = Router;
