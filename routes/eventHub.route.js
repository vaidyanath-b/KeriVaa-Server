const router = require('express').Router();

const eventHubServices = require('../services/eventHub.services');  

router.get('/', async (req, res) => {
    const events = await eventHubServices.geteventhubs();
    res.status(200).json(events);
})

router.post('/add', async (req, res) => {
    const { name , end_date,start_date } = req.body;
    const event = await eventHubServices.createEventHub({ name , end_date,start_date });
    res.status(200).json(event);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const event = await eventHubServices.geteventhubById(id);
    res.status(200).json(event);
})

module.exports = router;
