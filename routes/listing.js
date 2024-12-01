const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const flash = require("connect-flash");
const { isLoggedIn } = require("../middlewares");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

//new route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you trying to access does not exists");
      res.redirect("/listings");
    }
    res.render("listings/show", { listing });
  })
);

//create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const { title, description, image, location, country, price } =
      req.body.listing;
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      image,
    });

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you trying to access does not exists");
      res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
  })
);

// update route
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, location, country } =
      req.body.listing;

    await Listing.findByIdAndUpdate(id, {
      title,
      description,
      image,
      price,
      location,
      country,
    });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//delete route
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
