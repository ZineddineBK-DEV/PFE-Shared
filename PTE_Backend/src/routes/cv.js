const express = require("express");
const router = express.Router();
const cvCtr = require("../controllers/cvController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.patch("/update/:id", cvCtr.updateCv);
router.patch("/delete-item/:id", cvCtr.deleteElement);
router.post("/filter",  cvCtr.filterCvs);
router.post("/search",  cvCtr.searchCvs);


module.exports = router;
