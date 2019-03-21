const mongoose = require('mongoose');
const { Schema } = mongoose;
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title field is requried'],
    },
    category: {
      type: String,
      required: [true, 'category field is requried'],
    },
    description: {
      type: String,
      required: [true, 'description field is requried'],
    },
  },
  { timestamps: true },
);

// Ensure virtual fields are serialised.
BookSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
