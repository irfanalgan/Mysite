const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const isTurkish = (text) =>
  /[çğışöüÇĞİŞÖÜ]/.test(text) ||
  /\b(ve|bir|bu|ben|sen|ne|nasıl|nerede|kim|var|mı|mi|mu|mü|hakkında|neler|nedir)\b/i.test(text);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Geçersiz istek.' }) };
    }

    const irfanRules = process.env.IRFAN_RULES;
    const irfanKnowledge = process.env.IRFAN_CONTEXT;
    if (!irfanRules || !irfanKnowledge) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Context yapılandırılmamış.' }) };
    }

    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    const lang = lastUserMsg && isTurkish(lastUserMsg.content) ? 'Turkish' : 'English';
    const langInstruction = `IMPORTANT: The user is writing in ${lang}. You MUST reply in ${lang} only.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: irfanRules },
        { role: 'system', content: irfanKnowledge },
        { role: 'system', content: langInstruction },
        ...messages,
      ],
      max_tokens: 200,
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content ?? 'Bir sorun oluştu, tekrar dene.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('Groq API hatası:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Sunucu hatası. Lütfen tekrar dene.' }),
    };
  }
};
