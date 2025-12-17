
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatWidget() {
    const t = useTranslations('Chat');
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: t('greeting'),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data.response },
            ]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: t('error') },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:opacity-90 transition-all font-bold flex items-center justify-center w-16 h-16"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} fill="currentColor" className="text-white" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] z-50 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border">
                    {/* Header */}
                    <div className="p-4 bg-primary text-white font-semibold flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20">
                            <Image
                                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=100&q=80"
                                alt="AI Avatar"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        {t('title')}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                                        <Image
                                            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=100&q=80"
                                            alt="Bot"
                                            width={24}
                                            height={24}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                        }`}
                                >
                                    <ReactMarkdown
                                        components={{
                                            img: ({ node, ...props }) => (
                                                <img {...props} className="rounded-lg max-w-full h-auto mt-2 mb-2" style={{ maxHeight: '200px' }} />
                                            ),
                                            p: ({ node, ...props }) => <p {...props} className="mb-1 last:mb-0" />
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none text-sm animate-pulse">
                                    {t('typing')}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder={t('placeholder')}
                            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading}
                            className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
                        >
                            {t('send')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
