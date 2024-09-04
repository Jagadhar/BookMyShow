import { Router } from 'express';
import Booking from '../models/bookingModel.js';

const router = Router();

router.post('/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body); // req.body should include rows
        await newBooking.save();
        res.status(201).json({ message: 'Booking saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save booking', details: error });
    }
});

// GET endpoint to fetch bookings
router.get('/bookings', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    try {
        const bookings = await Booking.find({ userId: userId });
        res.json(bookings);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching bookings', error: err });
    }
});

// Update booking status
router.put('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = req.body.status;
        await booking.save();

        res.status(200).json({ message: 'Status updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
});



router.get('/booking-seat', async (req, res) => {
    const { movieName , showTime} = req.query;
    try {
        const bookings = await Booking.find({
            movieName: movieName,
            showTime: showTime,
            status: 'Successful'
        });
        const rowsAndSeats = bookings.flatMap(booking => booking.rows.map(row => ({
            row: row.rowName,
            seatNumber: row.seatNo,
            showTime: booking.showTime
        })));

        res.json(rowsAndSeats);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;