const express = require("express");
const router = express.Router();
const opdController = require("../controllers/opdController");

router.get("/opd", opdController.getAllOPDVisits);
router.get("/opd/:id", opdController.getOPDVisitById);
router.post("/opd", opdController.createOPDVisit);
router.put("/opd/:id", opdController.updateOPDVisit);
router.delete("/opd/:id", opdController.deleteOPDVisit);

module.exports = router;
