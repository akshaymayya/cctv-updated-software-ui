import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => navigate('/login'), 3000);
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            fontFamily: 'var(--ui-font)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                borderRadius: '32px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
            }}>
                <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={18} /> Back to Login
                </button>

                {!sent ? (
                    <>
                        <h1 style={{ fontSize: '28px', fontWeight: '600', margin: '0 0 12px 0' }}>Reset Password</h1>
                        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Enter your email to receive recovery instructions.</p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ position: 'relative', marginBottom: '24px' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    required
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
                                />
                            </div>
                            <button type="submit" className="btn primary" style={{ width: '100%', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: '600' }}>
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Mail size={32} />
                        </div>
                        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Check your email</h2>
                        <p style={{ color: 'var(--muted)' }}>We've sent a recovery link to your inbox.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
