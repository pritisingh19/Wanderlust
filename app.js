const { config } = require("./utils/dotenv.js");
config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRoutes = require("./routes/listings.js");
const reviewRoutes = require("./routes/reviews.js");

const ExpressError = require("./utils/expresserror.js");


const mongo_url = process.env.mongo_url || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(mongo_url);
    console.log("connected to DB");
}

main().catch((err) => {
    console.log("Database connection error:", err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

