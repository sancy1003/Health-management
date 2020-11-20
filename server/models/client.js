import mongoose from 'mongoose';
import moment from 'moment';

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
    },
    expiration_date: {
        type: Date,
    },
    locker: {
        type: Number,
    }
});

const Client = mongoose.model("client", ClientSchema);

export default Client;