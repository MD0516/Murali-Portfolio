import express from 'express';
import bodyParser from 'body-parser';
import { sendMailToUser, sendMailToCompany } from './Mailer.js';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://murali-portfolio-amber.vercel.app',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.options('/api/contact', cors()); // handle preflight

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendMailToUser( name, email );
    await sendMailToCompany( name, email, message );

    res.status(200).send({ success: true, message: "Emails sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).send({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
