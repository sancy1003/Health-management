import mongoose from 'mongoose';
import moment from 'moment';

const LockerSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    client_name: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "client",
        },
    ],
    register_date: {
        type: Date,
    },
    expiration_date: {
        type: Date,
    },
});

const Locker = mongoose.model("locker", LockerSchema);

export default Locker;