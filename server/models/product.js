const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      requried: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      requried: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      requried: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    // subs: [
    //   {
    //     type: ObjectId,
    //     ref: 'Sub',
    //   },
    // ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    // images: {
    //   type: Array,
    // },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enums: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enums: ['Apple', 'Microsoft', 'Samsung', 'Lenovo', 'Asus'],
    },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: 'User' },
    //   },
    // ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
