module.exports = {
  showBuildings: async (req, res) => {
    const buildings = await res.locals.db.getAllBuildings();

    res.render("buildings", { buildings });
  },

  showAddForm: (req, res) => {
    res.render("buildings-add");
  },

  addBuilding: async (req, res) => {
    const { name, city, sqft } = req.body;

    if (name && city && sqft) {
      await res.locals.db.createBuilding(name, city, sqft);
    }

    res.redirect("/home/buildings");
  },

  showDeleteForm: async (req, res) => {
    const buildings = await res.locals.db.getAllBuildings();

    res.render("buildings-delete", { buildings });
  },

  deleteBuilding: async (req, res) => {
    const { id } = req.body;

    await res.locals.db.deleteBuildingById(id);
    
    res.redirect("/home/buildings");
  },
};