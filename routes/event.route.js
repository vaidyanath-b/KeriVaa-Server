const router = require('express').Router();
const eventServices = require('../services/event.services');

router.get('/', async (req, res) => {
    const events = await eventServices.getEvents();
    res.status(200).json(events);
}
)

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const event = await eventServices.getEventById(id);
    res.status(200).json(event);
}
)

router.post('/addToHub/:hub_id', async (req, res) => {
    const { name ,date } = req.body;
    const { hub_id } = req.params;
    const event = await eventServices.addEvent({ name ,date, hub_id });
    res.status(200).json(event);
}
)

module.exports = router;