const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string()
    .pattern(/^[a-zA-Z\s]{3,50}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Fullname must contain only letters and spaces (3-50 chars)",
      "string.empty": "Fullname is required",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
    }),
});

// Middleware function
const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(new Error("Validation Failed"));
  }

  next();
};

const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
    }),
});

// Middleware function
const validateLogin = (req, res, next) => {
  const { error } = LoginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(new Error("Validation Failed"));
  }

  next();
};

module.exports = { validateSignup, validateLogin };
