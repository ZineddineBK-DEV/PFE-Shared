const express = require("express");
const router = express.Router();
const roomCtr = require("../../controllers/material_resources/roomController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  checkAdminMiddleware,
} = require("../../middlewares/checkAdminMiddleware");

router.get("/getRooms",  roomCtr.getAllRooms);
router.get("/search",  roomCtr.searchRoom);
router.post("/add",   roomCtr.addRoom);

router.delete("/delete/:id",roomCtr.deleteRoom
);
/**Events Managment ********/
router.get("/events",  roomCtr.getRoomEvents);
router.post("/setevent",  roomCtr.createEvent);
router.patch("/acceptEvent/:id",  roomCtr.updateEvent);
router.delete("/deleteEvent/:id",  roomCtr.deleteEvent);

module.exports = router;
