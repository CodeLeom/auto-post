// access environmental variables
import dotenv from "dotenv";
dotenv.config();

// imports
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import chalk from "chalk";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { handlePostContentToTwitter } from "./configs/twitterConfig.js";
import { handlePostContentToFacebook } from "./configs/facebookConfig.js";

// create an instance of google AI with your Google Api Key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// create an instance of Toad scheduler
const scheduler = new ToadScheduler();

// create an async task
const task = new AsyncTask("auto post task", async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const todaysDate = new Date();

  // modify the prompt to suit your own usage
  const prompt = `
    Today's date is ${todaysDate.getDate()} come up with something historical that happened example: 
    On the ${todaysDate.getDate()} ${todaysDate.toLocaleString("en-US", {
    month: "long",
  })}$,
    so so so and so happened... write it like a short twitter post add emoji and #tags to it`;

  // generate the content from google AI
  model
    .generateContent(prompt)
    .then((result) => {
      const contentToPost = result.response.text().replace("**", "");
      console.log(chalk.bgGreen.bold(contentToPost));
      // post the content to your social accounts
      // ** more to be added **
      Promise.allSettled([
        handlePostContentToFacebook(contentToPost),
        handlePostContentToTwitter(contentToPost),
      ]);
      // ****more social media account will be added soon****
    })
    .catch((error) => {
      console.log(error);
    });
});

// Adjust the job interval to suit your usage.
// presently this is going to run at every 5 hours provided the server is always running
const job = new SimpleIntervalJob({ seconds: 5 }, task);

// start up the job
scheduler.addSimpleIntervalJob(job);

// when stopping your app
// scheduler.stop();
