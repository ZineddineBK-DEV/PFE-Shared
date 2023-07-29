const express = require("express");
const router = express.Router();
const userCtr = require("../controllers/userController");
const userEventCtr = require("../controllers/technical_team/userEventCtr");
const userPlanCtr = require("../controllers/technical_team/userPlanCtr");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { checkAdminMiddleware } = require("../middlewares/checkAdminMiddleware");
const { fileStorageEngine } = require("../tools/FileStorageEngine");
const multer = require("multer");
const upload = multer({ storage: fileStorageEngine });




router.post("/signup", upload.single("image"), userCtr.signUp);
router.post("/adduser",userCtr.AddUser);
router.get("/signup/requests",userCtr.getSignUpRequests);
router.post("/confirm-signup/:id",  userCtr.confirmSignUp);
router.patch("/update/:id",upload.single("image"),userCtr.UpdateUser );
router.patch("/update-roles/:id",userCtr.updateUserRoles);
router.post("/forgotPassword", userCtr.forgotPassword);  //1
router.post("/checkpass",  userCtr.checkPassword);
router.post("/addUser",userCtr.AddUser)
router.post("/validateCode", userCtr.validateCode); //2
router.post("/changePswdAutorisation/:id", userCtr.changePswdAutorisation);
router.patch("/change-psw/:id", userCtr.changePswd); //3
router.get("/getall", userCtr.getAllUsers);
router.get("/sousTraitant", userCtr.getAllUsers);
router.post("/filter",  userCtr.filterUsers);
router.post("/search",  userCtr.searchUsers);
router.delete("/delete/:id",  userCtr.deleteUser);
router.get("/drivers",userCtr.getDrivers);
/******************************************* */
/************ Event Managment ************** */
/******************************************* */
router.get("/events",  userEventCtr.getUserEvents);
router.post("/setevent",  userEventCtr.createEvent );
// router.get("/Plan", authMiddleware, userPlanCtr.getUserPlans);
router.patch("/acceptEvent/:id",  userEventCtr.updateEvent);
router.delete("/deleteEvent/:id",  userEventCtr.deleteEvent);
router.get("/:id",  userCtr.getUserById);
router.get("/getPlanById/:id",  userPlanCtr.getPlanById);
router.post("/upload",upload.single("pdf"), userPlanCtr.uploadPlan);
module.exports = router;
