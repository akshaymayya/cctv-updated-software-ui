import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Box } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Product
    const [formData, setFormData] = useState({ email: '', password: '', product: '' });
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handleFinalSubmit = (productType) => {
        // Simulate account creation
        localStorage.setItem('auth', 'true');
        navigate('/');
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
            {/* Background Ambience */}
            <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(76, 175, 80, 0.15) 0%, transparent 70%)', top: '-20%', right: '-10%', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%)', bottom: '-10%', left: '-10%', borderRadius: '50%' }}></div>

            <div style={{
                width: '100%',
                maxWidth: '480px',
                padding: '40px',
                borderRadius: '32px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden'
            }}>

                {/* Progress Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                    {[1, 2, 3].map(s => (
                        <div key={s} style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: s === step ? '#fff' : 'rgba(255,255,255,0.2)',
                            transition: 'all 0.3s'
                        }}></div>
                    ))}
                </div>

                {step === 1 && (
                    <div className="animate-fade-in">
                        <h1 style={{ fontSize: '32px', fontWeight: '600', margin: '0 0 12px 0', textAlign: 'center' }}>Create Account</h1>
                        <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '32px' }}>Join the secure surveillance network</p>

                        <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Create password"
                                    required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    style={{ width: '100%', padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
                                />
                            </div>
                            <button type="submit" className="btn primary" style={{ padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                Continue <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <h1 style={{ fontSize: '32px', fontWeight: '600', margin: '0 0 12px 0', textAlign: 'center' }}>Verify Email</h1>
                        <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '32px' }}>Enter the code sent to {formData.email}</p>

                        <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                {otp.map((d, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength="1"
                                        className="otp-input"
                                        value={d}
                                        onChange={e => {
                                            const newOtp = [...otp];
                                            newOtp[i] = e.target.value;
                                            setOtp(newOtp);
                                            if (e.target.value && i < 3) document.getElementById(`otp-${i + 1}`).focus();
                                        }}
                                        id={`otp-${i}`}
                                        style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '24px', textAlign: 'center', outline: 'none' }}
                                    />
                                ))}
                            </div>
                            <button type="submit" className="btn primary" style={{ padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: '600' }}>
                                Verify & Continue
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in">
                        <h1 style={{ fontSize: '32px', fontWeight: '600', margin: '0 0 12px 0', textAlign: 'center' }}>Setup Device</h1>
                        <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '32px' }}>Select your primary usage</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <button
                                onClick={() => handleFinalSubmit('firmware')}
                                className="setup-option"
                                style={{
                                    padding: '20px',
                                    borderRadius: '20px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ padding: '12px', background: 'rgba(33, 150, 243, 0.2)', borderRadius: '12px', color: '#2196F3' }}><Box size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px', color: '#fff' }}>I bought a Firmware Model</div>
                                    <div style={{ fontSize: '13px', color: '#ccc' }}>Select model (e.g., Pro-X, Cam-360)</div>
                                </div>
                            </button>

                            <button
                                onClick={() => handleFinalSubmit('camera')}
                                className="setup-option"
                                style={{
                                    padding: '20px',
                                    borderRadius: '20px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ padding: '12px', background: 'rgba(76, 175, 80, 0.2)', borderRadius: '12px', color: '#4CAF50' }}><Smartphone size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px', color: '#fff' }}>Connect Camera Only</div>
                                    <div style={{ fontSize: '13px', color: '#ccc' }}>Quick connect via mobile app</div>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Signup;
