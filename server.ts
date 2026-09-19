import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// AI Companion Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getAI();
    if (!ai) {
      // Graceful fallback if no GEMINI_API_KEY is configured
      res.json({
        reply: getCareFallbackReply(message),
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction:
          'You are CompanionCare AI, a gentle, warm, patient, and highly accessible voice companion for 74-year-old Eleanor Vance. ' +
          'Always respond in 2 to 3 calm, reassuring, large-print-friendly sentences. Avoid medical jargon. ' +
          "Her schedule today includes: Aspirin 81mg (due now with water), Vitamin D3 (after lunch), Metformin 500mg (dinner), Chair Yoga at 10:30 AM, Dr. Harrison video check-in at 4:30 PM, and daughter Sarah Vance.",
      },
    });

    const reply = response.text || getCareFallbackReply(message);
    res.json({ reply });
  } catch (error) {
    console.error('Gemini chat error:', error);
    res.json({ reply: getCareFallbackReply(req.body?.message || '') });
  }
});

// Fallback logic
function getCareFallbackReply(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('aspirin') || lower.includes('pill') || lower.includes('medication')) {
    return 'Your morning Aspirin 81 milligrams is due now with breakfast. Be sure to drink a full glass of water with it.';
  }
  if (lower.includes('schedule') || lower.includes('routine') || lower.includes('next')) {
    return 'Next on your calendar is gentle Chair Yoga at 10:30 AM in the living room, followed by grocery delivery at 2:00 PM.';
  }
  if (lower.includes('sarah') || lower.includes('daughter')) {
    return 'Sarah left you a lovely voice note this morning. You can tap the 1-Tap Video Call button anytime to reach her.';
  }
  return 'I am right here with you Eleanor. Your schedule is calm, medications are on track, and your family circle is notified that you are doing well.';
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'CompanionCare AI' });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CompanionCare AI server running on port ${PORT}`);
  });
}

startServer();
