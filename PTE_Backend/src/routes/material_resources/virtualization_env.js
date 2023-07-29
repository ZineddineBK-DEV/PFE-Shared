const express = require("express");
const router = express.Router();
const virtualizationEnvCtr = require("../../controllers/material_resources/virtualizationEnvController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.get("/getVirtsEnv",virtualizationEnvCtr.getAllVirtsEnv);
router.post("/addaddVirtEnv", virtualizationEnvCtr.addVirtEnv);
router.get("/getVirtEnv/:id", virtualizationEnvCtr.getVirtEnvById);
router.delete("/deleteVirtEnv/:id", virtualizationEnvCtr.deleteVirtEnv);

module.exports = router;
