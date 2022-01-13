
const express = require("express");

const advancedResults = require('../middleware/advancedResults');
// Inlcude other reource routers
const KontoRouter = require("./Konto")
const router = express.Router();
const Vereinsmitglied = require("../models/Vereinsmitglied")
const { getVereinsmitglied, getVereinsmitglieder, createVereinsmitglied } = require("../controllers/Vereinsmitglied");


//Re-Route
router.use("/:mitgliedId/Konto", KontoRouter)

router.route('/').get(advancedResults(Vereinsmitglied, 'Konto'), getVereinsmitglieder).post(createVereinsmitglied)
router.route('/:id').get(getVereinsmitglied)

module.exports = router;