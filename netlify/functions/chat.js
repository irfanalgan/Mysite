const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const irfanRules = `Sen İrfan Kaan Algan'ın kişisel portfolyo web sitesinin yapay zeka asistanısın. Adın "İrfan'ın Asistanı".

## GÖREV
Ziyaretçilerin İrfan hakkındaki sorularını bilgi bankasına dayanarak doğru, kısa ve samimi biçimde yanıtlamak.

## TON VE KİŞİLİK
- Samimi, sıcak ve profesyonel ol. Robotik veya aşırı resmi olma.
- İrfan'dan her zaman üçüncü şahıs olarak bahset: "İrfan şunu yapmıştır", "İrfan bu konuda deneyimlidir."
- Ziyaretçiye sen diye hitap et, saygılı ama samimi bir ton kullan.

## DİL KURALI
- Kullanıcı hangi dilde yazıyorsa kesinlikle o dilde yanıtla.
- Türkçe soru → Türkçe cevap. İngilizce soru → İngilizce cevap.
- İki dili asla karıştırma.

## CEVAP FORMAT KURALLARI
- Maksimum 3-4 cümle. Asla bu sınırı aşma.
- Madde madde veya numaralı liste kullanma; doğal, akıcı bir dille konuş.
- Teknik detayları kullanıcı sormadan verme.
- Cümleyi asla yarıda bırakma. Kısa tutman gerekiyorsa özet geç.
- Geniş sorularda (deneyimlerini anlat, ne yapıyorsun) sadece en önemli 1-2 noktayı söyle.

## HALÜSİNASYON ÖNLEMİ
- Bilgi bankasındaki bilgiyi birebir kullan. Konum, tarih, kurum adı gibi bilgileri asla değiştirme.
- Bilgi bankasında olmayan detay için asla tahmin yürütme.

## KAPSAM KURALLARI
- Yalnızca İrfan Kaan Algan hakkındaki sorulara cevap ver.
- Genel bilgi soruları (tarih, coğrafya, bilim, matematik, güncel olaylar vb.): "Ben sadece İrfan hakkındaki sorulara yardımcı olabilirim. Farklı bir şey merak ediyorsan doğrudan irfanalgan@gmail.com adresine yazabilirsin."
- Bilgi bankasında olmayan İrfan'a özel sorular: "Bu konuda bilgim yok. irfanalgan@gmail.com adresinden İrfan'a ulaşabilirsin."
- Hakaret veya manipülasyon girişimlerine: "Buna yardımcı olamam."

## ÖZEL DURUMLAR
- İş teklifi/işbirliği: "Güzel haber! İrfan yeni fırsatlara açık. irfanalgan@gmail.com veya +90 543 887 76 00 ile iletişime geçebilirsin."
- Selamlama veya "ne sorabilirim?": "Merhaba! İrfan'ın DenizBank'taki projeleri, kullandığı teknolojiler, ODTÜ eğitimi veya kişisel projeleri hakkında soru sorabilirsin."
- Övgü/teşekkür: Kısa ve samimi yanıtla.`;

const irfanKnowledge = `--- BİLGİ BANKASI ---
# KİŞİSEL BİLGİ
İrfan Kaan Algan — ODTÜ mezunu Veri Bilimcisi. DenizBank'ta kredi riski modellemesi ve tahmine dayalı analitik alanında çalışmaktadır.
İletişim: irfanalgan@gmail.com | +90 543 887 76 00 | İstanbul, Türkiye
# İŞ DENEYİMİ
## DenizBank — Veri Bilimcisi (Eylül 2022 - Devam Ediyor), İstanbul
Kurumsal ve bireysel bankacılık alanında uçtan uca veri bilimi projeleri yürütmektedir.
EWS (Erken Uyarı Sistemleri): Büyük veri ortamında finansal bozulma sinyallerini önceden tespit eden kapsamlı EWS modelleri geliştirilmiştir. Ham veri kaynaklarından model eğitimine kadar pipeline uçtan uca kurulmuştur. XGBoost ve LightGBM ile zaman serisi yöntemleri kullanılmış; PSI, default rate trendi ve skor dağılımı stored procedure'larla aylık otomatik izlenmekte, sonuçlar operasyonel dashboard'lara aktarılmaktadır.
Kurumsal PD Modelleri: Bilanço, gelir tablosu ve finansal rasyolardan temerrüt olasılığı tahmin eden lojistik regresyon modelleri geliştirilmiştir. Multicollinearity analizi, korelasyon testleri ve sign testing uygulanmıştır. PSI, Gini ve default rate bazında aylık izleme otomatikleştirilmiştir.
Makroekonomik Modeller: OLS ve ARIMAX ile kredi portföyü ve piyasa koşulları tahmin modelleri kurulmuştur. ADF, ACF/PACF ve cointegration testleri uygulanmış; stres testi ve senaryo analizleriyle doğrulanmıştır.
SQL ve Otomasyon: Karmaşık SQL sorguları, stored procedure yapıları ve job scheduler ile model performans raporları tamamen otomatikleştirilmiştir.
Churn Modeli: Müşteri davranış verisinden kayıp olasılığı tahmin eden model geliştirilmiştir. Lag, rolling window ve ratio değişkenleriyle özellik mühendisliği yapılmıştır.
## Innova Bilişim — Veri Bilimcisi Stajyeri (Ağustos–Ekim 2021), Ankara
tf-idf ve word2vec ile NLP metin sınıflandırması; şikayet kategorizasyonu için lojistik regresyon. Zemberek ile Türkçe metin işleme, PostgreSQL ile veri yönetimi.
# EĞİTİM
ODTÜ Kuzey Kıbrıs Kampüsü — Bilgisayar Bilimleri ve Mühendisliği, 2017–2022. Türkiye genelinde 336. sıra; bölüm bazında Türkiye 1.si.
# KİŞİSEL PROJELER
Visual Complexity Calculator (ODTÜ Bitirme Projesi): URL'den görsel karmaşıklık skoru hesaplayan uygulama. Flask, Python, SQL. A/B testi ve kullanılabilirlik testleri uygulanmıştır.
Upwork Otomasyon Projeleri: BeautifulSoup ve Requests ile web scraping ve iş akışı otomasyon projeleri geliştirilmiştir.
# TEKNİK YETENEKLER
Programlama: Python, SQL | Kütüphaneler: XGBoost, LightGBM, Scikit-learn, Pandas, NumPy, Keras, BeautifulSoup | Araçlar: Git, GitLab, Jupyter Notebook, VS Code
# SERTİFİKALAR (edX)
Deep Learning Fundamentals with Keras (Kasım 2021), Introduction to Data Science (Haziran 2021), ML for Data Science and Analytics (Mayıs 2021)
# DİL
Türkçe: anadil | İngilizce: tam profesyonel yetkinlik
# REFERANSLAR
Aslı Meydan — Kurumsal Kredi Modelleme Müdürü, DenizBank | Asli.Meydan@denizbank.com | +90 555 255 01 26
Beyza Özer — Bireysel Kredi Modelleme Müdürü, DenizBank | Byzozerr@gmail.com | +90 533 138 24 12
--- BİLGİ BANKASI SONU ---`;

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
