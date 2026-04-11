const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/expresserror.js");
const { reviewSchema } = require("../schema.js");
const reviewController = require("../controllers/reviewController.js");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

router.post("/", validateReview, wrapAsync(reviewController.createReview));

module.exports = router;
