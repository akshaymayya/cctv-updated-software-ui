import React from 'react';
import { ArrowLeft, Shield, Target, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Docs = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: '#fff' }}>
            <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '48px', fontFamily: 'var(--heading-font)', marginBottom: '16px', background: 'linear-gradient(135deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    CATIFAAL Documentation
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Building the future of privacy-first surveillance technology. Secure, intelligent, and user-centric.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                <DocCard
                    icon={<Shield size={32} color="#4CAF50" />}
                    title="Privacy First"
                    desc="Our core mission is to provide security without compromising individual privacy. All data is encrypted locally."
                />
                <DocCard
                    icon={<Target size={32} color="#2196F3" />}
                    title="Company Goals"
                    desc="To become the global standard for ethical surveillance, empowering users with total control over their data."
                />
                <DocCard
                    icon={<Users size={32} color="#FFC107" />}
                    title="Community Driven"
                    desc="We build what you need. Our roadmap is defined by our user community and their real-world challenges."
                />
            </div>

            <div style={{ background: 'var(--panel)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ marginTop: 0 }}>Product Manuals</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                    <ManualItem title="Quick Start Guide: Pro-X Series" size="2.4 MB" />
                    <ManualItem title="Network Configuration & Port Forwarding" size="1.1 MB" />
                    <ManualItem title="AI Detection Calibration Guide" size="3.8 MB" />
                    <ManualItem title="Firmware Update v2.4 Release Notes" size="0.5 MB" />
                </div>
            </div>
        </div>
    );
};

const DocCard = ({ icon, title, desc }) => (
    <div style={{ background: 'var(--panel)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>{icon}</div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.5' }}>{desc}</p>
    </div>
);

const ManualItem = ({ title, size }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s' }} className="hover-bg">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Globe size={20} color="var(--muted)" />
            <span>{title}</span>
        </div>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>PDF • {size}</span>
    </div>
);

export default Docs;
