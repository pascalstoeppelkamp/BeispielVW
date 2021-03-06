const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const bcrypt = require('bcryptjs');
const Vereinsmitglied = require("../models/Vereinsmitglied");
const Konto = require("../models/Konto");
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
    req.body.vereinsmitglied = mitglied.id;
    const konto = await Konto.create(req.body);

    res.status(201).json({
        success: true,
        data: mitglied,
    });
})

//@desc Update  Vereinsmitglied hinzu
//@route PUT /api/v1/Vereinsmitglied/:id
exports.updateVereinsmitglied = asyncHandler(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await Vereinsmitglied.findByIdAndUpdate(req.params.id, req.body);
    const mitglied = await Vereinsmitglied.findById(req.params.id);

    console.log(mitglied);
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

// @desc      Pay Premium from current User
// @route     POST /api/v1/Vereinsmitglied/payPremium
// @access    Private
exports.payPremium = asyncHandler(async (req, res, next) => {
    await Vereinsmitglied.findByIdAndUpdate(req.user.id, { hasPremium: true });
    const user = await Vereinsmitglied.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: {
            hasPremium: user.hasPremium
        }
    });
});


