const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to find an admin by email
adminSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// Method to create a new admin
adminSchema.statics.createAdmin = function(adminData) {
    const admin = new this(adminData);
    return admin.save();
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;