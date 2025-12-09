import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, Maximize, Settings, MoreVertical, Calendar, Rewind, FastForward } from 'lucide-react';
import { generateCameras } from '../utils/nanoBanana';

const CameraView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [camera, setCamera] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLive, setIsLive] = useState(true);
    const [progress, setProgress] = useState(100);
    const [speed, setSpeed] = useState('1x');
    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Simulate fetching camera details
        const cams = generateCameras(20);
        const found = cams.find(c => c.id === id) || {
            id: id,
            name: 'Unknown Camera',
            status: 'offline',
            image: 'https://picsum.photos/seed/error/800/600'
        };
        found.image = `https://picsum.photos/seed/${id}/1280/720?grayscale`;
        setCamera(found);
    }, [id]);

    const handleRewind = () => {
        setIsLive(false);
        setProgress(prev => Math.max(0, prev - 10));
    };

    const handleForward = () => {
        setProgress(prev => {
            const newProgress = Math.min(100, prev + 10);
            if (newProgress === 100) setIsLive(true);
            return newProgress;
        });
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    if (!camera) return <div style={{ padding: 20 }}>Loading...</div>;

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ padding: '8px' }}><ArrowLeft size={20} /></button>
                <div>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>{camera.name}</h2>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge-status ${camera.status === 'online' ? 'online' : 'offline'}`} style={{ width: '8px', height: '8px', padding: 0 }}></span>
                        {isLive ? 'LIVE' : 'PLAYBACK'} • {camera.id}
                    </div>
                </div>
            </div>

            {/* Main Player */}
            <div style={{ flex: 1, background: '#000', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                {/* Video Area */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <img src={camera.image} alt="Feed" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />

                    {/* Overlay Controls (Play/Pause center) */}
                    {!isPlaying && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                            <button onClick={() => setIsPlaying(true)} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Play size={32} fill="#fff" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Controls Bar (YouTube Style) */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>

                    {/* Timeline Scrubber */}
                    <div className="scrubber-container" style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '24px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative', cursor: 'pointer' }}>
                            {/* Buffered/Played bar */}
                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: '2px', position: 'relative' }}>
                                <div style={{ position: 'absolute', right: '-6px', top: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <button
                                    onClick={handleRewind}
                                    title="Rewind 10s"
                                    style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <Rewind size={20} />
                                </button>
                                <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                                </button>
                                <button
                                    onClick={handleForward}
                                    title="Forward 10s"
                                    style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <FastForward size={20} />
                                </button>
                            </div>

                            <div
                                onClick={() => setIsMuted(!isMuted)}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', cursor: 'pointer' }}
                            >
                                <Volume2 size={20} style={{ opacity: isMuted ? 0.5 : 1 }} />
                                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
                                    <div style={{ width: isMuted ? '0%' : '70%', height: '100%', background: '#fff', borderRadius: '2px', transition: 'width 0.2s' }}></div>
                                </div>
                            </div>

                            {/* Speed Controls */}
                            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '8px' }}>
                                {['1x', '2x', '4x'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSpeed(s)}
                                        style={{
                                            background: speed === s ? 'rgba(255,255,255,0.3)' : 'transparent',
                                            border: 'none',
                                            color: '#fff',
                                            fontSize: '12px',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontWeight: speed === s ? 'bold' : 'normal'
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <div style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'monospace' }}>
                                {isLive ? 'LIVE' : '-05:23'} / LIVE
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isLive ? '#ff0000' : 'var(--muted)' }}></div>
                                <span style={{ fontWeight: '600', color: isLive ? '#fff' : 'var(--muted)', fontSize: '14px' }}>
                                    {isLive ? 'LIVE' : 'DVR'}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}><Calendar size={20} /></button>
                            <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}><Settings size={20} /></button>
                            <button onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}><Maximize size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CameraView;
