const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    vendorname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    engagement: { type: String }
}, {
    timestamps: true,
});