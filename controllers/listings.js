const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you trying to access does not exists");
    res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
  const { title, description, image, location, country, price } =
    req.body.listing;
  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image,
    owner: req.user._id,
  });
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you trying to access does not exists");
    res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
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
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }