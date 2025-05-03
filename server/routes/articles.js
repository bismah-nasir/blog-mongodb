const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Get all articles
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
});

// Get one article
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
});

// POST /articles
router.post("/", async (req, res) => {
  try {
    const { title, body } = req.body;
    const article = new Article({ title, body }); // auto-sets date
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST /articles error:", err);
    res.status(500).json({ message: "Failed to create article" });
  }
});

// Update article
router.put("/:id", async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(article);
});

// Delete article
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;