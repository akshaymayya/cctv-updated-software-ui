import React from 'react';

const CameraCard = ({ camera, onPair, onClick }) => {
    if (!camera) return null;
    const { id, name, status, last, image } = camera;

    return (
        <div
            className="camera"
            onClick={() => onClick && onClick(camera)}
            style={{
                background: 'var(--panel)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative',
                overflow: 'hidden',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s',
                border: '1px solid rgba(255,255,255,0.03)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = onClick ? 'translateY(-2px)' : 'none'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '600' }}>{name}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{last}</div>
            </div>

            <div className="cam-preview" style={{ height: '180px', background: '#000', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                {/* Simulated Footage */}
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    />
                ) : (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(45deg, #1a1a1a 25%, #2a2a2a 25%, #2a2a2a 50%, #1a1a1a 50%, #1a1a1a 75%, #2a2a2a 75%, #2a2a2a 100%)',
                        backgroundSize: '40px 40px',
                        opacity: 0.3
                    }}></div>
                )}

                {/* Live Badge */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(229, 57, 53, 0.9)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></div>
                    LIVE
                </div>

                {/* Timestamp */}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    {new Date().toLocaleTimeString()}
                </div>

                {!image && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="cam-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className={`badge-status ${status === 'online' ? 'online' : 'offline'}`}>{status}</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)' }}>ID {id}</div>
                </div>
                <div className="btns" style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn" onClick={(e) => { e.stopPropagation(); onClick && onClick(camera); }}>View</button>
                    <button className="btn" onClick={(e) => e.stopPropagation()}>Events</button>
                    <button className="btn primary" onClick={(e) => { e.stopPropagation(); onPair(id); }}>Pair</button>
                </div>
            </div>
        </div>
    );
};

export default CameraCard;
