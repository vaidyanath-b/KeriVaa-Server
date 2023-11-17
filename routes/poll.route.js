const router = require('express').Router();
const pollServices = require('../services/event_poll.services');

router.post('/add', async (req, res) => {
    const {description , options , eventId } = req.body;

    const poll = await pollServices.addPoll({description , options , eventId });

    res.status(200).json(poll);
}
)

module.exports = router;


