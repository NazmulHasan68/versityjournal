const thesisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: [String],
  category: {
    type: String,
    enum: ['Computer Science','Engineering', 'Medical', 'Business', 'Social Science', 'Education', 'Law', 'Others' ],
   },
  type : {
    type : String,
    enum : ['artical', 'thesis']
  },
  fileUrl: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'revised', 'accepted', 'rejected', 'published'],
    default: 'submitted',
  },
  country : {
    type : String,
  },
  viwed: { type : String},
  popular : {
    type : Boolean,
    default : false,
  },
  suggested : {
    type : Boolean,
    default : false,
  },
  journalIssue: {
    year: Number,
    volume: String,
    issue: String,
  },
}, { timestamps: true });

export default mongoose.model('Thesis', thesisSchema);
