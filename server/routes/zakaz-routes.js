const Router = require('express');
const zakazController = require('../controllers/zakaz-controller');

require('dotenv').config();

const router = new Router();

router.get("/getAllZakaz", zakazController.getAllZakaz);
router.post("/createZakaz", zakazController.createZakaz);
router.post("/delete", zakazController.deleteZakaz);



module.exports = router;
