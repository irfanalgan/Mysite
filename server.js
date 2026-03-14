require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const { irfanRules, irfanKnowledge } = require('./src/data/irfanContext');

const isTurkish = (text) =>
  /[çğışöüÇĞİŞÖÜ]/.test(text) ||
  /\b(ve|bir|bu|ben|sen|ne|nasıl|nerede|kim|var|mı|mi|mu|mü|hakkında|neler|nedir)\b/i.test(text);

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Geçersiz istek.' });
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const lang = lastUserMsg && isTurkish(lastUserMsg.content) ? 'Turkish' : 'English';
  const langInstruction = `IMPORTANT: The user is writing in ${lang}. You MUST reply in ${lang} only.`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: irfanRules },
        { role: 'system', content: irfanKnowledge },
        { role: 'system', content: langInstruction },
        ...messages,
      ],
      max_tokens: 180,
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content ?? 'Bir sorun oluştu, tekrar dene.';
    res.json({ reply });
  } catch (err) {
    console.error('Groq API hatası:', err.message);
    res.status(500).json({ error: 'Sunucu hatası. Lütfen tekrar dene.' });
  }
});

app.listen(3001, () => {
  console.log('API sunucusu çalışıyor → http://localhost:3001');
});
