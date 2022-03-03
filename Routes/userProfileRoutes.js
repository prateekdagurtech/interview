const auth = require("../middleware/auth");
const router = require("express").Router();
const upcPoolCtrl = require("../Controller/userProfileCtrl");

router.post("/userprofile", upcPoolCtrl.createProfileDetails);
router.get("/getuserwithPump/:userid", upcPoolCtrl.getprofile);

//Route url to delete ico pool.

module.exports = router;
