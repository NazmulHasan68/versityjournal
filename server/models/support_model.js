const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, enum: ['new', 'replied'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
