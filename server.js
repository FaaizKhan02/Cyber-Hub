const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;
const FEEDBACK_FILE = path.join(__dirname, "feedback-data.json");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname));

function readFeedbackFile() {
  try {
    const raw = fs.readFileSync(FEEDBACK_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeFeedbackFile(items) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(items, null, 2), "utf8");
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Cyber Attack Knowledge Hub backend is healthy.",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/feedback", (req, res) => {
  const body = req.body || {};
  const numericRating = Number(body.rating);
  const safeRating =
    Number.isFinite(numericRating) && numericRating >= 1 && numericRating <= 5
      ? numericRating
      : null;

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name: String(body.name || "").slice(0, 120),
    email: String(body.email || "").slice(0, 160),
    role: String(body.role || "general").slice(0, 40),
    rating: safeRating,
    feedback: String(body.feedback || "").slice(0, 4000),
    userAgent: req.headers["user-agent"] || "",
    createdAt: new Date().toISOString()
  };

  const items = readFeedbackFile();
  items.push(entry);
  try {
    writeFeedbackFile(items);
  } catch (err) {
    return res.status(500).json({ ok: false, message: "Failed to persist feedback." });
  }

  res.status(201).json({ ok: true, message: "Feedback stored.", entryId: entry.id });
});

app.get("/api/feedback/stats", (req, res) => {
  const items = readFeedbackFile();
  const total = items.length;
  const ratings = items.map((i) => i.rating).filter((r) => typeof r === "number");
  const averageRating = ratings.length
    ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2))
    : null;
  const byRole = {};
  items.forEach((i) => {
    const role = i.role || "unknown";
    byRole[role] = (byRole[role] || 0) + 1;
  });

  res.json({
    total,
    averageRating,
    byRole
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Cyber Attack Knowledge Hub listening on http://localhost:${PORT}`);
});

