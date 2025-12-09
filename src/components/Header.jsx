import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, HelpCircle, LifeBuoy } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="search" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '10px', width: '420px' }}>
                    <Search size={18} style={{ opacity: 0.9 }} />
                    <input
                        placeholder="Search cameras, events, addresses..."
                        style={{ background: 'transparent', border: 0, color: 'inherit', outline: 'none', width: '100%' }}
                    />
                </div>
                <div className="stats" style={{ display: 'flex', gap: '12px' }}>
                    <StatCard title="Active Cameras" value="6" />
                    <StatCard title="Alerts (24h)" value="3" />
                    <StatCard title="Hub Health" value="Good" />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button className="btn" onClick={() => navigate('/docs')}>Docs</button>
                <button className="btn" onClick={() => navigate('/support')}>Support</button>
                <button className="btn primary" onClick={() => window.open('https://catifaal.netlify.app/dashboard', '_blank')}>Join Early Bird</button>
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="stat" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.02),transparent)', padding: '12px', borderRadius: '12px', minWidth: '160px' }}>
        <h3 style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>{title}</h3>
        <p style={{ margin: '6px 0 0', fontWeight: '700', fontSize: '18px' }}>{value}</p>
    </div>
);

export default Header;
