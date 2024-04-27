import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { getCurrentTimeStamps, generateNonce } from "../utils.js";
import chalk from "chalk";

const consumerApiKey = process.env.TWITTER_CONSUMER_API_KEY;
const twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
const signature = process.env.TWITTER_OAUTH_SIGNATURE;

const handlePostContentToTwitter = async (contentToPost) => {
  const timestamp = getCurrentTimeStamps();
  const nonce = generateNonce();
  let data = JSON.stringify({
    text: contentToPost,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.twitter.com/2/tweets",
    headers: {
      Authorization: `OAuth oauth_consumer_key=${consumerApiKey},
      oauth_token=${twitterAccessToken},
      oauth_signature_method="HMAC-SHA1",
      oauth_timestamp=${timestamp},oauth_nonce=${nonce},
      oauth_version="1.0",oauth_signature=${signature}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((result) => {
      console.log(
        `${chalk.bgBlack.bold("Posted successfully to X:")}`,
        result.data
      );
    })
    .catch((err) => {
      console.log(
        `${chalk.bgRed.bold("Error occurred while posting to X:")}`,
        err.response.data
      );
    });
};

export { handlePostContentToTwitter };
