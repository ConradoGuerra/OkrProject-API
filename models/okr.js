const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const okrSchema = new Schema(
  {
    okrName: {
      type: String,
      required: true,
    },
    planned: {
      type: Number,
      required: true,
    },
    done: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Okr', okrSchema)
