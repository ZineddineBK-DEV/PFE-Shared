const express = require("express");
const router = express.Router();
const careerCtr = require("../controllers/careerController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { checkAdminMiddleware } = require("../middlewares/checkAdminMiddleware");

router.get("/getAllCareers",careerCtr.getCareers);
router.get("/getUserCareer/:id",careerCtr.getUserCareer);
router.put("/updateCareer/:id",careerCtr.updateCareer);

module.exports = router;
