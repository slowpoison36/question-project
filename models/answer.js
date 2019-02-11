const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answer: { type: String, required: true, min: 5 },
    description: String,
    answerBy: { type: String, required: true },
    created: { type: Date, default: Date.now },
    likes: [{ type: Number, default: 0 }]
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

answerSchema.virtual("totalLikes").get(function () {
    count = 0;
    if (this.likes.length == 0) {
        count = 0;
    } else {
        this.likes.forEach(function (item) {
            count += item;
        })
    }

    return count;
})

module.exports = mongoose.model("Answer", answerSchema);