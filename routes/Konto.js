
const express = require("express");
const router = express.Router({mergeParams:true});


const { getKonten,getKonto,createKonto } = require("../controllers/Konto");

router.route('/').get(getKonten).post(createKonto)
/* router.route('/:id').get(getKonto) */

module.exports = router;