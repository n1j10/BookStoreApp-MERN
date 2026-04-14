const auth = require("../auth/middleware");

// routes/auth.js
const router = require("express").Router();


// رجّع بيانات المستخدم من الـ JWT المخزّن بالكوكي/الهيدر
router.get("/me", auth(), (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role });
});

module.exports = router;
