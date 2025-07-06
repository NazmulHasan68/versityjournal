const journalSchema = new mongoose.Schema({
  year: Number,
  volume: String,
  issue: String,
  publishedAt: Date,
  papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thesis' }]
});

export default mongoose.model('Journal', journalSchema);
