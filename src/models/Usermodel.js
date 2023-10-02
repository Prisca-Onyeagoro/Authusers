import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Provide a name'],
  },
  email: {
    type: String,
    required: [true, 'please provide an email address'],
    unique: true,
  },
  contact: {
    type: String,
    required: [true, 'please provide your contact'],
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  Otp: String,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const auth = mongoose.models.auth || mongoose.model('auth', userSchema);

export default auth;
