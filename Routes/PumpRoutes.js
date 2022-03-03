const auth = require("../middleware/auth");
const router = require("express").Router();
const upcPoolCtrl = require("../Controller/pumpCtrl");

router.post("/pumdetails/:user_id", upcPoolCtrl.createPumpDetails);
//router.get("/getpumps/:name", upcPoolCtrl.getpump);

//Route url to delete ico pool.

module.exports = router;
