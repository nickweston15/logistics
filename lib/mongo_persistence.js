const mongoose = require("mongoose");

// ??
mongoose.connect("mongodb://localhost:27017/company")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ??
const buildingSchema = new mongoose.Schema({
  name: String,
  city: String,
  sqft: Number,
  sessionId: String,
});

// ??
const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  sessionId: String,
});

// ??
const Building = mongoose.model("Building", buildingSchema);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = class MongoPersistence {
  // ??
  constructor(sessionID) {
    this.sessionID = sessionID;
  }

  // ??
  async createBuilding(name, city, sqft) {
    console.log(`Creating building for session: ${this.sessionID}`);
    return await Building.create({ name, city, sqft: Number(sqft), sessionId: this.sessionID });  // saves buildings with a flag for which session they are in
  }

  // ??
  async getAllBuildings() {
    console.log(`Fetching buildings for session: ${this.sessionID}`);
    return await Building.find({ sessionId: this.sessionID });  // only fetch buildings for that session
  }

  // ??
  async deleteBuildingById(id) {
    console.log(`Deleting building for session: ${this.sessionID}`);
    return await Building.findByIdAndDelete({ _id: id, sessionId: this.sessionID });  // only able to delete your own session's buildings
  }

  // ??
  async createVehicle(make, model, year) {
    console.log(`Creating vehicle for session: ${this.sessionID}`);
    return await Vehicle.create({ make, model, year: Number(year), sessionId: this.sessionID });  // saves vehicles with a flag for which session they are in
  }

  // ??
  async getAllVehicles() {
    console.log(`Fetching vehicles for session: ${this.sessionID}`);
    return await Vehicle.find({ sessionId: this.sessionID });  // only fetch vehicles for that session
  }

  // ??
  async deleteVehicleById(id) {
    console.log(`Deleting vehicle for session: ${this.sessionID}`);
    return await Vehicle.findByIdAndDelete({ _id: id, sessionId: this.sessionID });  // only able to delete your own session's vehicles
  }
};