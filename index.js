import {GoogleGenAI} from '@google/genai';
// di terminal jalankan npm install dotenv
import 'dotenv/config';
import express from 'express';
import multer from 'multer';

// const interaction = await ai.interactions.create({
//   model: model,
//   input: 'what is the capital of indonesia?',
// });
// console.log(interaction.output_text);
const model = process.env.MODEL;
const key = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: key,
});

const app = express();
const upload = multer();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Beruang!');
});

app.post('/ask', upload.none(), async (req, res) => {
  const question = req.body.question;
  try {
    const result = await ai.generateContent(GEMINI_MODEL, question);
    res.json({ answer: result.response });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});