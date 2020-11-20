import mongoose from 'mongoose';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    branch_office: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Manager"],
        default: "Manager",
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    admission: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("user", UserSchema);

export default User;