const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "E-mail is required."],
    unique: true,
  },
  wallet: {
    type: Number,
    min: [0, "Money ammount min 0."],
    max: [100, "Money ammount max 100."],
    default: 0,
  },
  meetingId1: {
    type: String,
    unique: true,
  },
  meetingId2: {
    type: String,
    unique: true,
  },
})

const Client = mongoose.model("Clients", clientSchema)

module.exports = Client
