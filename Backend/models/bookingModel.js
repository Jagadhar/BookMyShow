import mongoose from 'mongoose';


const rowSchema = new mongoose.Schema({
  rowName: { type: String, required: true },
  seatNo: { type: Number, required: true }
});

const BookingSchema = new mongoose.Schema({
  userId: String,
  movieName: String,
  showTime: String,
  rows: [rowSchema],
  ticketPrice: Number,
  status: {
    type: String,
    enum: ['Successful', 'Canceled'],
    default: 'Successful',
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;