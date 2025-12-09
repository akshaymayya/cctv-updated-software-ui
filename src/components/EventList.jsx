import React from 'react';

const EventList = ({ events }) => {
    return (
        <div className="events" style={{ maxHeight: '320px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {events.map((e, i) => (
                <div key={i} className="event" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)' }}>
                    <div className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600' }}>{e.txt}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{e.time}</div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Cam {e.cam}</div>
                </div>
            ))}
        </div>
    );
};

export default EventList;
