const Router = require('express');
const userController = require('../controllers/user-controller');
const tovarsController = require('../controllers/tovars-controller');

require('dotenv').config();

const router = new Router();

router.get("/sneakers", tovarsController.getAllTovars);
router.post("/sneakerOne", tovarsController.getOneTovar);
router.post("/getCompanySneaker", tovarsController.getOneCompanyTovar);
router.get("/sizes", tovarsController.getAllSize);
router.get("/brands", tovarsController.getAllBrands);
router.get("/colors", tovarsController.getAllColor);

router.post("/createSneaker", tovarsController.createTovars);
router.post("/updateSneaker", tovarsController.updateTovars);
router.post("/deleteSneaker", tovarsController.deleteTovars);




module.exports = router;
