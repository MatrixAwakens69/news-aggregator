import { exec } from "child_process";

export const analyzeSentiment = async (req, res, next) => {
  const { text } = req.body;
  exec(`python spacy/analyze_sentiment.py "${text}"`, (error, stdout) => {
    if (error) {
      console.error("Error executing Python script:", error);
      res.status(500).send("Error executing Python script");
      return;
    }
    res.json({ sentiment: stdout.trim() });
  });
};
