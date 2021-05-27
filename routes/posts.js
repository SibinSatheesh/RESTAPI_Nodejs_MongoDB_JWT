const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/',verify, async (req,res) =>{
    res.send(req.user);
    
});


module.exports = router;