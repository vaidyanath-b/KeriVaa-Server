const router = require('express').Router();
const resultServices = require('../services/result.service');

router.get('/add', async (req, res) => {
    const { pollId , optionId } = req.body;
    const res = await resultServices.addResult({ pollId , optionId });
    res.status(200).json(res);
}
)
module.exports = router;

