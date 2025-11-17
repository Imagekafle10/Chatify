const arcjet = require("@arcjet/node").default;
const { detectBot, shield, slidingWindow } = require("@arcjet/node");
const { ARCJET_KEY } = require("./constant");
const aj = arcjet({
  key: ARCJET_KEY, // Get your site key from https://app.arcjet.com
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE",
      max: 5,
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});
module.exports = aj;
