const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Vereinsmitglied = require("../models/Vereinsmitglied");
//@desc Lese alle Vereinsmitglieder 
//@route GET /api/v1/Vereinsmitglieder
exports.getVereinsmitglieder = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//desc Lese einen einziges Vereinsmitglied
//route GET /api/v1/Vereinsmitglied
exports.getVereinsmitglied = asyncHandler(async (req, res, next) => {
    const mitglied = await Vereinsmitglied.findById(req.params.id);

    if (!mitglied) {
        return next(
            new ErrorResponse(`Vereinsmitglied mit der ID ${req.params.id} wurde nicht gefunden.`, 404)
        );
    }

    res.status(200).json({ success: true, data: mitglied })
})

//@desc Füge neues Vereinsmitglied hinzu
//@route POST /api/v1/Vereinsmitglied
exports.createVereinsmitglied = asyncHandler(async (req, res, next) => {
    const mitglied = await Vereinsmitglied.create(req.body);
    res.status(201).json({
        success: true,
        data: mitglied
    })
})

//@desc Update  Vereinsmitglied hinzu
//@route PUT /api/v1/Vereinsmitglied/:id
exports.updateVereinsmitglied = asyncHandler(async (req, res, next) => {
    await Vereinsmitglied.findByIdAndUpdate(req.params.id, req.body);
    const mitglied = await Vereinsmitglied.findById(req.params.id)
    res.status(201).json({
        success: true,
        data: mitglied
    })
})


//@desc Delete  Vereinsmitglied hinzu
//@route POST /api/v1/Vereinsmitglied/:id
exports.deleteVereinsmitglied = asyncHandler(async (req, res, next) => {
    await Vereinsmitglied.findByIdAndDelete(req.params.id);
    res.status(201).json({
        success: true,
        data: {}
    })
})

