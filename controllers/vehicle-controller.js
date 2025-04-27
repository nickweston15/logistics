module.exports = {
  showVehicles: async (req, res) => {
    const vehicles = await res.locals.db.getAllVehicles();

    res.render("vehicles", { vehicles });
  },

  showAddForm: (req, res) => {
    res.render("vehicles-add");
  },

  addVehicle: async (req, res) => {
    const { make, model, year } = req.body;

    if (make && model && year) {
      await res.locals.db.createVehicle(make, model, year);
    }

    res.redirect("/home/vehicles");
  },

  showDeleteForm: async (req, res) => {
    const vehicles = await res.locals.db.getAllVehicles();

    res.render("vehicles-delete", { vehicles });
  },

  deleteVehicle: async (req, res) => {
    const { id } = req.body;

    await res.locals.db.deleteVehicleById(id);
    
    res.redirect("/home/vehicles");
  },
};