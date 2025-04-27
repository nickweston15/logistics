const express = require("express");
const catchError = require("../lib/catch-error");
const vehicleController = require("../controllers/vehicle-controller");

const router = express.Router();

router.get("/", catchError(vehicleController.showVehicles));
router.get("/add", vehicleController.showAddForm);
router.post("/add", catchError(vehicleController.addVehicle));
router.get("/delete", catchError(vehicleController.showDeleteForm));
router.post("/delete", catchError(vehicleController.deleteVehicle));

module.exports = router;