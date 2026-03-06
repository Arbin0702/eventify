const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validations/authValidation");

exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = value;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user"
    });

    res.status(201).json({ message: "User registered", id: user._id });
  } catch (e) {
    next(e);
  }
};
exports.login = async (req, res, next) => {
  try {
    console.log("✅ LOGIN BODY:", req.body);

    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = value;

    console.log("✅ LOGIN EMAIL:", email);
    console.log("✅ MONGO DB NAME:", req.app.locals.dbName);

    const user = await User.findOne({ email });
    console.log("✅ USER FOUND:", !!user);

    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    console.log("✅ STORED HASH:", user.password);

    const ok = await bcrypt.compare(password, user.password);
    console.log("✅ PASSWORD MATCH:", ok);

    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    next(e);
  }
};
