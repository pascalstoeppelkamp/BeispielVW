
const express = require("express");
const router = express.Router({ mergeParams: true });


const { getKonten, getKonto, createKonto, updateKonto,deleteKonto } = require("../controllers/Konto");

router.route('/').get(getKonten).post(createKonto).put(updateKonto).delete(deleteKonto)
/* router.route('/:id').get(getKonto).put(updateKonto) */

module.exports = router;