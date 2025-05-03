const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: {
    type: Date,
    default: Date.now, // this sets the default to current date/time
  },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;