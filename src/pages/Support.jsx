import React, { useState } from 'react';
import { ArrowLeft, Search, MessageSquare, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [chatMode, setChatMode] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hello! I am your Catifaal Support Agent. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Static FAQ Data
    const faqs = [
        { q: "How do I reset my camera?", a: "To reset your camera, hold the reset button on the back of the device for 10 seconds until the LED flashes red." },
        { q: "Where can I find the latest firmware?", a: "Firmware updates are available in the Dashboard > Installer Tools section." },
        { q: "My camera is offline, what should I do?", a: "Check your network connection and ensure the camera is powered on. Try restarting your router." },
        { q: "How to enable night mode?", a: "Night mode is automatic by default. You can force it on in Camera Settings > Image > Night Vision." },
        { q: "Can I view multiple cameras at once?", a: "Yes! Go to the Cameras page, click 'Select Multiple', choose your cameras, and click 'Watch Selected'." }
    ];

    const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()));

    const handleAskAI = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Using the user-provided API key
            const API_KEY = 'AIzaSyAACpyWJ4FFshFPEMIw1ZXJ9mw11VGSg3E';
            // Use gemini-1.5-flash as it is the current standard
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a helpful support agent for a CCTV software company called Catifaal. 
              Answer the user's question concisely and professionally. 
              User Question: ${input}`
                        }]
                    }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("AI API Error:", data);
                throw new Error(data.error?.message || `API Error: ${response.status}`);
            }

            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!aiText) {
                throw new Error("No response generated. The AI might be unsure or the content was filtered.");
            }

            setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${error.message}. Please try again.` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className={`btn ${!chatMode ? 'primary' : ''}`}
                        onClick={() => setChatMode(false)}
                    >
                        Knowledge Base
                    </button>
                    <button
                        className={`btn ${chatMode ? 'primary' : ''}`}
                        onClick={() => setChatMode(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Bot size={18} /> Ask AI Agent
                    </button>
                </div>
            </div>

            {!chatMode ? (
                <div className="animate-fade-in">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>How can we help?</h1>
                        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 48px',
                                    borderRadius: '16px',
                                    background: 'var(--panel)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    fontSize: '16px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '16px' }}>
                        {filteredFaqs.map((faq, i) => (
                            <div key={i} style={{ background: 'var(--panel)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ margin: '0 0 8px 0', color: 'var(--accent)' }}>{faq.q}</h3>
                                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.6' }}>{faq.a}</p>
                            </div>
                        ))}
                        {filteredFaqs.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                                No results found. Try asking our AI Agent!
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--panel)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2196F3, #9C27B0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bot size={24} color="#fff" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '600' }}>Catifaal AI Support</div>
                            <div style={{ fontSize: '12px', color: '#4CAF50' }}>Online • Powered by Gemini</div>
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '16px',
                                    borderRadius: '16px',
                                    background: msg.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                                    borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', color: 'var(--muted)' }}>
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleAskAI} style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '12px' }}>
                        <input
                            type="text"
                            placeholder="Type your question..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            style={{ flex: 1, padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
                        />
                        <button type="submit" disabled={loading} className="btn primary" style={{ padding: '0 24px', borderRadius: '12px' }}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Support;
