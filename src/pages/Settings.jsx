import React, { useState } from 'react';
import { Bell, HardDrive, Moon, Shield, Save, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        notifications: true,
        autoRecord: true,
        resolution: '1080p',
        retention: '30',
        theme: 'dark'
    });

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--heading-font)', marginBottom: '24px' }}>System Settings</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Notifications */}
                <Section title="Notifications" icon={<Bell size={20} />}>
                    <Toggle
                        label="Push Notifications"
                        desc="Receive alerts on your mobile device"
                        checked={settings.notifications}
                        onChange={v => handleChange('notifications', v)}
                    />
                </Section>

                {/* Recording */}
                <Section title="Recording & Storage" icon={<HardDrive size={20} />}>
                    <Toggle
                        label="Auto-Recording"
                        desc="Start recording when motion is detected"
                        checked={settings.autoRecord}
                        onChange={v => handleChange('autoRecord', v)}
                    />
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '16px 0' }}></div>
                    <Select
                        label="Video Resolution"
                        value={settings.resolution}
                        options={[
                            { label: '720p (HD)', value: '720p' },
                            { label: '1080p (FHD)', value: '1080p' },
                            { label: '4K (UHD)', value: '4k' }
                        ]}
                        onChange={v => handleChange('resolution', v)}
                    />
                    <div style={{ height: '16px' }}></div>
                    <Select
                        label="Storage Retention"
                        value={settings.retention}
                        options={[
                            { label: '7 Days', value: '7' },
                            { label: '30 Days', value: '30' },
                            { label: '90 Days', value: '90' }
                        ]}
                        onChange={v => handleChange('retention', v)}
                    />
                </Section>

                {/* System */}
                <Section title="System" icon={<Shield size={20} />}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '600' }}>Firmware Version</div>
                            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>v2.4.1 (Latest)</div>
                        </div>
                        <button className="btn" style={{ fontSize: '13px' }}><RefreshCw size={14} style={{ marginRight: '6px' }} /> Check for Updates</button>
                    </div>
                </Section>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '12px' }}>
                    <button
                        onClick={handleLogout}
                        className="btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 24px',
                            background: 'rgba(255, 59, 48, 0.1)',
                            color: '#FF3B30',
                            border: '1px solid rgba(255, 59, 48, 0.2)'
                        }}
                    >
                        <LogOut size={18} /> Log Out
                    </button>
                    <button className="btn primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}>
                        <Save size={18} /> Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};

const Section = ({ title, icon, children }) => (
    <div style={{ background: 'var(--panel)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--accent)' }}>{icon}</div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>{title}</h3>
        </div>
        {children}
    </div>
);

const Toggle = ({ label, desc, checked, onChange }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <div style={{ fontWeight: '500' }}>{label}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{desc}</div>
        </div>
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '48px',
                height: '26px',
                background: checked ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                borderRadius: '99px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: checked ? '25px' : '3px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}></div>
        </div>
    </div>
);

const Select = ({ label, value, options, onChange }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '500' }}>{label}</div>
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                outline: 'none',
                minWidth: '140px',
                cursor: 'pointer'
            }}
        >
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </div>
);

export default Settings;
