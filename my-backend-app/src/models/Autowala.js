import mongoose from 'mongoose';

const autowalaSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true }, 
  imageUrl: { type: String, required: true }, 
}, 
);

export default mongoose.model('Autowala', autowalaSchema);
