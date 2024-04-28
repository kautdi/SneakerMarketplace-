const Router = require('express');
const userController = require('../controllers/user-controller');
const companyController = require('../controllers/company-controller');

require('dotenv').config();

const router = new Router();

router.post("/registration", companyController.registration);
router.post("/login", companyController.login);
router.post("/getOneCompany", companyController.getOneCompany);



module.exports = router;
