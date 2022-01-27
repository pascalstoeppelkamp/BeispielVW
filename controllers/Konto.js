const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Konto = require("../models/Konto");
//@desc Lese alle Konten 
//@route GET /api/v1/vereinsmitglieder/:mitgliedID/konto
exports.getKonten = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.mitgliedId) {
        query = Konto.find({ vereinsmitglied: req.params.mitgliedId });
    }
    else {
        query = Konto.find().populate('vereinsmitglied')
    }
    /*   const kontos = await Konto.find();
      res.status(200).json({ success: true, data: kontos }); */
    const konten = await query;

    res.status(200).json({
        success: true,
        count: konten.length,
        data: konten
    })
})

//desc Lese ein Konto
//route GET /api/v1/Konto/:id
exports.getKonto = asyncHandler(async (req, res, next) => {
    const konto = await Konto.findById(req.params.id);

    if (!konto) {
        return next(
            new ErrorResponse(`Konto mit der ID ${req.params.id} wurde nicht gefunden.`, 404)
        );
    }

    res.status(200).json({ success: true, data: konto })
})

//@desc Füge neues Konto hinzu
//@route POST /api/v1/vereinsmitglied/:mitgliedID/konto
exports.createKonto = asyncHandler(async (req, res, next) => {
    req.body.vereinsmitglied = req.params.mitgliedId;
    const konto = await Konto.create(req.body);

    res.status(201).json({
        success: true,
        data: konto
    })
})

//@desc update Konto
//@route PUT /api/v1/vereinsmitglied/:mitgliedID/konto
exports.updateKonto = asyncHandler(async (req, res, next) => {
    await Konto.findByIdAndUpdate(req.params.mitgliedId, req.body)

    const konto = await Konto.findById(req.params.mitgliedId)

    res.status(201).json({
        success: true,
        data: konto
    })
})

//@desc update Konto
//@route DELETE /api/v1/vereinsmitglied/:mitgliedID/konto
exports.deleteKonto = asyncHandler(async (req, res, next) => {
    await Konto.findByIdAndDelete(req.params.mitgliedId)

    const konto = await Konto.findById(req.params.mitgliedId)
    if (!konto)
    console.log("Konto wurde gelöscht")
    res.status(201).json({
        success: true,
        data: konto
    })
})