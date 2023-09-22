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
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
