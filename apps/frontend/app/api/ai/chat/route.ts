import { NextResponse } from 'next/server'
import openai from '@/lib/openai'

interface ChatRequest {
  message: string;
}

const SYSTEM_PROMPT = `You are a knowledgeable and friendly tea expert working for an online tea store. Your role is to help customers discover the perfect teas, provide brewing guidance, and share tea knowledge.

KEY INFORMATION ABOUT OUR TEA STORE:
- We specialize in premium single-origin teas
- Our signature product is "Darjeeling First Flush" with spring pluck, floral notes
- We carry: Black teas (Earl Grey, English Breakfast, Assam, Ceylon, Darjeeling), Green teas (Sencha, Matcha, Jasmine Green, Gunpowder, Dragon Well), White teas (Silver Needle, White Peony, Moonlight White), Oolong teas (Tie Guan Yin, Da Hong Pao, Milk Oolong), Herbal teas (Chamomile, Peppermint, Rooibos, Hibiscus, Ginger)

BREWING GUIDELINES:
- Water temperatures: 175°F for green, 185°F for white, 195°F for oolong, 212°F for black
- Steeping times: 2-3 min for green, 3-4 min for white, 4-5 min for oolong, 3-5 min for black
- Always use fresh, filtered water and quality loose leaf tea

YOUR PERSONALITY:
- Enthusiastic and knowledgeable about tea
- Helpful and personalized in recommendations
- Conversational but concise (keep responses under 150 words)
- Use tea-related emojis occasionally 🍃☕🫖

GUIDELINES:
- Ask follow-up questions to better understand customer preferences
- Provide specific tea recommendations from our inventory
- Include brewing tips when relevant
- Share interesting tea facts or origins when appropriate
- If asked about non-tea topics, politely redirect to tea-related discussion`

async function generateAITeaResponse(message: string): Promise<string> {
  console.log('🔍 DEBUG: generateAITeaResponse called with message:', message);
  console.log('🔍 DEBUG: OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
  console.log('🔍 DEBUG: OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0);

  if (!process.env.OPENAI_API_KEY) {
    console.log('❌ No OpenAI API key found');
    // Fallback response when OpenAI API key is not configured
    return "Hi! I'm your tea expert assistant. I'd love to help you discover the perfect tea, but I need an OpenAI API key to provide personalized recommendations. Please configure your API key to unlock my full tea expertise! 🍃";
  }

  try {
    console.log('🤖 Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again!";
    console.log('✅ OpenAI response received:', response.substring(0, 100) + '...');
    return response;
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    throw error;
  }
}

// Add a simple GET endpoint for testing
export async function GET() {
  console.log('🔍 GET request to chat API - route is working!');
  return NextResponse.json({ 
    status: 'Chat API route is working!',
    timestamp: new Date().toISOString(),
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
}

export async function POST(req: Request) {
  console.log('🚀 POST request received at chat API route!');
  
  try {
    const { message }: ChatRequest = await req.json();
    
    if (!message || typeof message !== 'string') {
      console.log('❌ Invalid message received:', message);
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    console.log('📨 POST request received for chat API with message:', message);
    const reply = await generateAITeaResponse(message.trim());
    console.log('📤 Sending reply:', reply.substring(0, 100) + '...');
    
    const response = NextResponse.json({ reply });
    
    // Prevent caching to ensure fresh responses
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('❌ Chat API error:', error);
    return NextResponse.json({ 
      reply: 'Sorry, I encountered an issue connecting to our tea expert AI. Please try again! I\'m here to help you discover amazing teas. 🍃☕' 
    }, { status: 500 });
  }
}

