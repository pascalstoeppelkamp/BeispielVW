
const express = require("express");

const advancedResults = require('../middleware/advancedResults');
// Inlcude other reource routers
const KontoRouter = require("./Konto")
const router = express.Router();

const { protect } = require('../middleware/auth');

const Vereinsmitglied = require("../models/Vereinsmitglied")
const { getVereinsmitglied, getVereinsmitglieder, createVereinsmitglied, updateVereinsmitglied, deleteVereinsmitglied, payPremium } = require("../controllers/Vereinsmitglied");


//Re-Route
router.use("/:mitgliedId/Konto", KontoRouter)

router.route('/').get(advancedResults(Vereinsmitglied, 'Konto'), getVereinsmitglieder).post(createVereinsmitglied).patch(protect, payPremium)
router.route('/:id').get(getVereinsmitglied).put(updateVereinsmitglied).post(deleteVereinsmitglied)

module.exports = router;