import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { authService } from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.login('admin@catifaal.com', 'password');
            localStorage.setItem('auth', 'true');
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authService.signInWithGoogle();
            localStorage.setItem('auth', 'true');
            navigate('/');
        } catch (error) {
            console.error("Google Sign In Failed", error);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505', // Darker background for contrast
            fontFamily: 'var(--ui-font)'
        }}>
            {/* Ambient Glow - Reduced opacity for better text contrast */}
            <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', top: '-20%', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%' }}></div>

            <div style={{
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                borderRadius: '32px',
                background: 'rgba(20, 20, 20, 0.6)', // Darker panel
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}>
                {/* Top Shine */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.5px', color: '#ffffff' }}>Welcome back</h1>
                    <p style={{ color: '#a0a0a0', margin: 0, fontWeight: '500' }}>Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            defaultValue="admin@catifaal.com"
                            placeholder="Email"
                            style={{
                                width: '100%',
                                padding: '18px 60px 18px 24px',
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.15)',
                                background: 'rgba(0,0,0,0.4)',
                                color: '#ffffff',
                                outline: 'none',
                                fontSize: '16px',
                                transition: 'border 0.2s',
                                fontWeight: '500'
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '8px',
                                bottom: '8px',
                                width: '48px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #4CAF50, #81C784)',
                                border: 'none',
                                color: '#000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {loading ? <div className="spin" style={{ width: '20px', height: '20px', border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%' }}></div> : <ArrowRight size={24} />}
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '10px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>OR</div>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        style={{
                            padding: '16px',
                            borderRadius: '20px',
                            background: '#ffffff', // White background for Google button
                            border: 'none',
                            color: '#1f1f1f', // Dark text
                            fontSize: '15px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'transform 0.2s',
                            fontWeight: '600'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <button type="button" style={{
                        padding: '16px',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        fontSize: '15px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'background 0.2s',
                        fontWeight: '600'
                    }}>
                        <span style={{ fontWeight: '700' }}>X</span> Continue with X
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '14px', color: '#a0a0a0' }}>
                    Don't have an account? <span onClick={() => window.open('#/signup', '_blank')} style={{ color: '#4CAF50', fontWeight: '600', cursor: 'pointer' }}>Sign up</span>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>
                    <span onClick={() => navigate('/forgot-password')} style={{ color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>Forgot password?</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
