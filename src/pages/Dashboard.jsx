import React, { useState } from 'react';
import Header from '../components/Header';
import CameraCard from '../components/CameraCard';
import EventList from '../components/EventList';
import { X, CheckCircle, Wifi, Upload } from 'lucide-react';

const Dashboard = () => {
    const [cams] = useState([
        { id: 1, name: 'Gate - North', status: 'online', last: '2m ago', image: 'https://picsum.photos/seed/cctv1/400/300?grayscale' },
        { id: 2, name: 'Driveway', status: 'online', last: '5m ago', image: 'https://picsum.photos/seed/cctv2/400/300?grayscale' },
        { id: 3, name: 'Lobby', status: 'online', last: '1h ago', image: 'https://picsum.photos/seed/cctv3/400/300?grayscale' },
        { id: 4, name: 'Warehouse', status: 'offline', last: '2d ago', image: 'https://picsum.photos/seed/cctv4/400/300?grayscale&blur=2' },
        { id: 5, name: 'Bus Dashcam - #102', status: 'online', last: '3m ago', image: 'https://picsum.photos/seed/cctv5/400/300?grayscale' },
        { id: 6, name: 'Roof - East', status: 'online', last: '7m ago', image: 'https://picsum.photos/seed/cctv6/400/300?grayscale' }
    ]);

    const [events] = useState([
        { cam: 1, txt: 'Person detected at gate', time: 'Today • 20:12' },
        { cam: 5, txt: 'Hard brake - Bus #102', time: 'Today • 19:54' },
        { cam: 2, txt: 'Vehicle detected', time: 'Today • 19:21' }
    ]);

    const [activeTool, setActiveTool] = useState(null); // 'pairing', 'network', 'firmware'
    const [toolProgress, setToolProgress] = useState(0);
    const [toolStatus, setToolStatus] = useState('idle'); // 'idle', 'running', 'success'

    const handlePair = (id) => {
        alert(`Pairing demo: Camera ${id} paired (simulated)`);
    };

    const runTool = (tool) => {
        setActiveTool(tool);
        setToolStatus('idle');
        setToolProgress(0);

        if (tool === 'pairing') {
            // Immediate show
        } else if (tool === 'network' || tool === 'firmware') {
            setToolStatus('running');
            let p = 0;
            const int = setInterval(() => {
                p += 5;
                setToolProgress(p);
                if (p >= 100) {
                    clearInterval(int);
                    setToolStatus('success');
                }
            }, 100);
        }
    };

    const closeTool = () => {
        setActiveTool(null);
        setToolStatus('idle');
        setToolProgress(0);
    };

    return (
        <div className="dashboard" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', height: '100%' }}>
            <Header />

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, overflow: 'hidden' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                    <section className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px', overflowY: 'auto', paddingRight: '4px' }}>
                        {cams.map(cam => (
                            <CameraCard key={cam.id} camera={cam} onPair={handlePair} />
                        ))}
                    </section>

                    <div className="timeline" style={{ background: 'var(--panel)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h3 style={{ margin: 0 }}>Timeline</h3>
                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Drag to scrub through event highlights</div>
                        <input type="range" min="0" max="100" defaultValue="0" style={{ width: '100%' }} />
                    </div>
                </div>

                <aside className="right" style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="panel" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)', padding: '14px', borderRadius: '12px' }}>
                        <h3 style={{ margin: '0 0 8px 0' }}>Hub Status</h3>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8ee08e' }}></div>
                            <div>Online • UPS Healthy</div>
                        </div>
                        <div style={{ marginTop: '10px', color: 'var(--muted)', fontSize: '13px' }}>Storage: 1.6TB free of 4TB</div>
                    </div>

                    <div className="panel" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)', padding: '14px', borderRadius: '12px' }}>
                        <h3 style={{ margin: '0 0 8px 0' }}>Recent Events</h3>
                        <EventList events={events} />
                    </div>

                    <div className="panel" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)', padding: '14px', borderRadius: '12px' }}>
                        <h3 style={{ margin: '0 0 8px 0' }}>Installer Tools</h3>
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                            <button className="btn" onClick={() => runTool('pairing')}>Generate Pairing Code</button>
                            <button className="btn" onClick={() => runTool('network')}>Run Network Test</button>
                            <button className="btn" onClick={() => runTool('firmware')}>Upload Firmware</button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Tool Modal */}
            {activeTool && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div style={{ background: '#1a1c20', padding: '24px', borderRadius: '16px', width: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0 }}>
                                {activeTool === 'pairing' && 'Pairing Code'}
                                {activeTool === 'network' && 'Network Diagnostic'}
                                {activeTool === 'firmware' && 'Firmware Update'}
                            </h3>
                            <button onClick={closeTool} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        {activeTool === 'pairing' && (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '12px' }}>Enter this code on the camera:</div>
                                <div style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '4px', color: 'var(--accent)' }}>829 401</div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '20px' }}>Expires in 04:59</div>
                            </div>
                        )}

                        {(activeTool === 'network' || activeTool === 'firmware') && (
                            <div style={{ padding: '10px 0' }}>
                                {toolStatus === 'running' && (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            {activeTool === 'network' ? <Wifi className="spin" /> : <Upload className="bounce" />}
                                            <div>{activeTool === 'network' ? 'Testing connection...' : 'Uploading firmware...'}</div>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${toolProgress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.1s' }}></div>
                                        </div>
                                    </>
                                )}
                                {toolStatus === 'success' && (
                                    <div style={{ textAlign: 'center', color: '#8ee08e' }}>
                                        <CheckCircle size={48} style={{ marginBottom: '12px' }} />
                                        <div style={{ fontSize: '18px', fontWeight: '600' }}>Success!</div>
                                        <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>
                                            {activeTool === 'network' ? 'Network speed: 124 Mbps. Latency: 12ms.' : 'Firmware v2.4.2 installed successfully.'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
