
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import Groq from 'groq-sdk';

@Injectable()
export class ChatService {
    private groq: Groq;
    private prisma: PrismaClient;

    constructor() {
        this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        this.prisma = new PrismaClient();
    }

    async generateResponse(userMessage: string): Promise<string> {
        const rooms = await this.prisma.room.findMany({
            where: { isAvailable: true },
        });

        const roomContext = rooms
            .map(
                (room) =>
                    `- Room ${room.number} (${room.type}): $${room.price}/night. Image: ${room.image || 'No image'}. ${room.description}`,
            )
            .join('\n');

        const systemPrompt = `
You are a helpful hotel concierge assistant. 
Here is a list of currently available rooms:
${roomContext}

Answer the user's question based on this information. 
If they ask for recommendations, suggest the best option from the list.
IMPORTANT: When you recommend a room, YOU MUST display its image using Markdown syntax: ![Room Number](image_url).
Example: ![Room 101](https://example.com/image.jpg)
If they ask about amenities not listed, say you don't have that information but can check with the front desk.
Keep answers concise and polite.
`;

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage },
                ],
                model: 'llama-3.1-8b-instant',
            });

            return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
        } catch (error) {
            console.error('Groq API Error:', error);
            return "I'm having trouble connecting to the AI service right now. Please try again later.";
        }
    }
}
