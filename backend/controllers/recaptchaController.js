const axios = require("axios");

// Verify the reCAPTCHA token using the Google reCAPTCHA API
async function googleReCaptchaVerify(token) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );
    const data = response.data;
    return {
      success: data.success,
      score: data.score,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      score: null,
    };
  }
}

// Verify the Recaptcha token provided by the user
const verifyRecaptcha = async (request, response) => {
  try {
    const { token } = request.body;
    const result = await googleReCaptchaVerify(token);
    console.log(result,"res")
    response.status(200).send(result);
  } catch (error) {
    console.error("Error verifying secret:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  verifyRecaptcha,
};
