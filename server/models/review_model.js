const reviewSchema = new mongoose.Schema({
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Thesis' },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: String,
  recommendation: {
    type: String,
    enum: ['accept', 'minor_revision', 'major_revision', 'reject'],
  },
  isSubmitted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
