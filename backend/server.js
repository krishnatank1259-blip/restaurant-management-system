const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://krishnatank1259_db_user:KRISHNA1908@cluster0.bhfn5eu.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Restaurant API Running...");
});

app.post("/booking", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      success: true,
      message: "Booking Saved",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/booking/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/booking/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/booking/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({
      message: "Update Failed",
    });
  }
});
app.delete("/booking/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/booking/status/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "Confirmed",
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});