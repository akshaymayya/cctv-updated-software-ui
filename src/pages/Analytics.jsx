import React, { useState } from 'react';
import { BarChart2, Users, Car, AlertTriangle, Clock, X } from 'lucide-react';

const Analytics = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const timelineData = {
        'Total Events': [
            { time: 'Today, 14:30', event: 'System check completed', type: 'info' },
            { time: 'Today, 12:15', event: 'Motion detected at Back Door', type: 'warning' },
            { time: 'Yesterday, 23:45', event: 'Night vision activated - All Cameras', type: 'info' },
            { time: 'Yesterday, 18:20', event: 'User login: Admin', type: 'success' },
        ],
        'Person Detections': [
            { time: 'Today, 10:42', event: 'Person detected - Lobby', type: 'warning' },
            { time: 'Today, 09:15', event: 'Person detected - Gate North', type: 'warning' },
            { time: 'Yesterday, 16:30', event: 'Person detected - Warehouse', type: 'warning' },
            { time: 'Yesterday, 14:10', event: 'Person detected - Driveway', type: 'warning' },
        ],
        'Vehicle Detections': [
            { time: 'Today, 11:20', event: 'Vehicle detected - Driveway (License: ABC-123)', type: 'info' },
            { time: 'Yesterday, 19:45', event: 'Vehicle detected - Gate North', type: 'info' },
            { time: 'Yesterday, 08:30', event: 'Vehicle detected - Parking Lot', type: 'info' },
        ],
        'Security Alerts': [
            { time: 'Today, 03:15', event: 'Perimeter Breach - Fence South', type: 'error' },
            { time: 'Yesterday, 22:10', event: 'Camera Offline - Warehouse', type: 'error' },
            { time: '2 days ago, 15:40', event: 'Glass Break Detected - Office', type: 'error' },
        ]
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--heading-font)', marginBottom: '24px' }}>Analytics Overview</h2>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <SummaryCard
                    title="Total Events (7d)"
                    value="1,248"
                    icon={<BarChart2 size={20} />}
                    color="#2196F3"
                    onClick={() => setSelectedCategory('Total Events')}
                    active={selectedCategory === 'Total Events'}
                />
                <SummaryCard
                    title="Person Detections"
                    value="843"
                    icon={<Users size={20} />}
                    color="#4CAF50"
                    onClick={() => setSelectedCategory('Person Detections')}
                    active={selectedCategory === 'Person Detections'}
                />
                <SummaryCard
                    title="Vehicle Detections"
                    value="312"
                    icon={<Car size={20} />}
                    color="#FF9800"
                    onClick={() => setSelectedCategory('Vehicle Detections')}
                    active={selectedCategory === 'Vehicle Detections'}
                />
                <SummaryCard
                    title="Security Alerts"
                    value="24"
                    icon={<AlertTriangle size={20} />}
                    color="#F44336"
                    onClick={() => setSelectedCategory('Security Alerts')}
                    active={selectedCategory === 'Security Alerts'}
                />
            </div>

            {/* Detailed Timeline Modal/Section */}
            {selectedCategory && (
                <div style={{
                    background: 'var(--panel)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '24px',
                    border: '1px solid var(--accent)',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Clock size={20} color="var(--accent)" />
                            Timeline: {selectedCategory}
                        </h3>
                        <button onClick={() => setSelectedCategory(null)} className="btn"><X size={18} /></button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {timelineData[selectedCategory].map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                gap: '16px',
                                alignItems: 'center',
                                padding: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    minWidth: '140px',
                                    fontSize: '13px',
                                    color: 'var(--muted)',
                                    fontFamily: 'monospace'
                                }}>{item.time}</div>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: item.type === 'error' ? '#F44336' : item.type === 'warning' ? '#FF9800' : item.type === 'success' ? '#4CAF50' : '#2196F3'
                                }}></div>
                                <div style={{ fontSize: '15px' }}>{item.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>

                {/* Weekly Activity Chart */}
                <div style={{ background: 'var(--panel)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Weekly Activity</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingTop: '20px' }}>
                        <Bar label="Mon" height="40%" />
                        <Bar label="Tue" height="65%" />
                        <Bar label="Wed" height="45%" />
                        <Bar label="Thu" height="80%" />
                        <Bar label="Fri" height="55%" />
                        <Bar label="Sat" height="90%" />
                        <Bar label="Sun" height="30%" />
                    </div>
                </div>

                {/* Storage Usage */}
                <div style={{ background: 'var(--panel)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Storage Usage</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                        <div style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '50%',
                            background: 'conic-gradient(var(--accent) 0% 60%, #2196F3 60% 85%, rgba(255,255,255,0.1) 85% 100%)',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: '20px',
                                background: 'var(--panel)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: '700' }}>60%</div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Used</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Legend label="Recordings" color="var(--accent)" value="2.4 TB" />
                            <Legend label="System" color="#2196F3" value="1.0 TB" />
                            <Legend label="Free Space" color="rgba(255,255,255,0.3)" value="0.6 TB" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const SummaryCard = ({ title, value, icon, color, onClick, active }) => (
    <div
        onClick={onClick}
        style={{
            background: 'var(--panel)',
            padding: '20px',
            borderRadius: '16px',
            border: active ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.03)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            transform: active ? 'translateY(-2px)' : 'none',
            boxShadow: active ? `0 4px 20px rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2)` : 'none'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.1)`, color: color }}>
                {icon}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '99px' }}>+12%</div>
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{value}</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{title}</div>
    </div>
);

const Bar = ({ label, height }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', width: '100%' }}>
        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{ width: '30%', height: height, background: 'var(--accent)', borderRadius: '4px 4px 0 0', opacity: 0.8, transition: 'height 1s ease' }}></div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{label}</div>
    </div>
);

const Legend = ({ label, color, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }}></div>
        <div style={{ fontSize: '13px', color: 'var(--muted)', width: '80px' }}>{label}</div>
        <div style={{ fontSize: '13px', fontWeight: '600' }}>{value}</div>
    </div>
);

export default Analytics;
