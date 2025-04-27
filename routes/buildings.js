const express = require("express");
const catchError = require("../lib/catch-error");
const buildingController = require("../controllers/building-controller");

const router = express.Router();

router.get("/", catchError(buildingController.showBuildings));
router.get("/add", buildingController.showAddForm);
router.post("/add", catchError(buildingController.addBuilding));
router.get("/delete", catchError(buildingController.showDeleteForm));
router.post("/delete", catchError(buildingController.deleteBuilding));

module.exports = router;