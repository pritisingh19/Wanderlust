const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/expresserror.js");
const { listingSchema } = require("../schema.js");
const listingController = require("../controllers/listingController.js");

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

router.get("/", wrapAsync(listingController.index));
router.get("/new", listingController.renderNewForm);
router.get("/:id", wrapAsync(listingController.showListing));
router.post("/", validateListing, wrapAsync(listingController.createListing));
router.get("/:id/edit", wrapAsync(listingController.renderEditForm));
router.put("/:id", validateListing, wrapAsync(listingController.updateListing));
router.delete("/:id", wrapAsync(listingController.destroyListing));

module.exports = router;
