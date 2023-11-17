var express = require('express');
var router = express.Router();

const userServices = require('../services/user.services')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", async (req, res) => {
try{    const { username, password } = req.body;
    const user = await userServices.addUser({ username, password });
    res.status(200).json(user);
}
catch(err){
    res.status(500).json(err);
}
}

)



module.exports = router;
