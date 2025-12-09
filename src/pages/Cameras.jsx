import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Grid, List, MoreVertical, Wifi, WifiOff, Activity, CheckSquare, Square, Play } from 'lucide-react';
import { generateCameras } from '../utils/nanoBanana';
import CameraCard from '../components/CameraCard';

const Cameras = () => {
    const navigate = useNavigate();
    const [cameras, setCameras] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [filter, setFilter] = useState('all'); // 'all', 'online', 'offline'
    const [search, setSearch] = useState('');

    // Multi-select state
    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [isMultiViewing, setIsMultiViewing] = useState(false);

    useEffect(() => {
        // Integrate "NanoBanana" tool to generate data
        const data = generateCameras(12);
        setCameras(data);
    }, []);

    const filteredCameras = cameras.filter(cam => {
        const matchesFilter = filter === 'all' || cam.status === filter;
        const matchesSearch = cam.name.toLowerCase().includes(search.toLowerCase()) || cam.id.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleAddCamera = () => {
        const newCam = generateCameras(1)[0];
        newCam.name = `New Camera ${cameras.length + 1}`;
        setCameras(prev => [newCam, ...prev]);
    };

    const toggleSelection = (id) => {
        setSelectedCameras(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const startMultiView = () => {
        if (selectedCameras.length > 0) {
            setIsMultiViewing(true);
        }
    };

    if (isMultiViewing) {
        const viewingCams = cameras.filter(c => selectedCameras.includes(c.id));
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2 style={{ margin: 0 }}>Multi-View Preview ({viewingCams.length})</h2>
                    <button className="btn" onClick={() => setIsMultiViewing(false)}>Exit Multi-View</button>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: viewingCams.length <= 4 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '16px',
                    flex: 1,
                    overflowY: 'auto'
                }}>
                    {viewingCams.map(cam => (
                        <div key={cam.id} style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', position: 'relative', minHeight: '300px' }}>
                            <img src={cam.image} alt={cam.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                            <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff', fontSize: '14px', fontWeight: '600' }}>
                                {cam.name}
                            </div>
                            <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(229, 57, 53, 0.9)', padding: '4px 8px', borderRadius: '4px', color: '#fff', fontSize: '12px', fontWeight: '700' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></div> LIVE
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Header / Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontFamily: 'var(--heading-font)', margin: '0 0 8px 0' }}>Camera Management</h2>
                    <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Managed by NanoBanana Engine</div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    {isMultiSelectMode ? (
                        <>
                            <button className="btn" onClick={() => { setIsMultiSelectMode(false); setSelectedCameras([]); }}>Cancel</button>
                            <button className="btn primary" onClick={startMultiView} disabled={selectedCameras.length === 0} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Play size={18} /> Watch Selected ({selectedCameras.length})
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn" onClick={() => setIsMultiSelectMode(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckSquare size={18} /> Select Multiple
                            </button>
                            <button className="btn primary" onClick={handleAddCamera} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Plus size={18} /> Add Camera
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div style={{ background: 'var(--panel)', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                        <input
                            type="text"
                            placeholder="Search cameras..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 10px 10px 40px',
                                color: '#fff',
                                outline: 'none',
                                width: '240px'
                            }}
                        />
                    </div>

                    <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <FilterBtn label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
                        <FilterBtn label="Online" active={filter === 'online'} onClick={() => setFilter('online')} icon={<Wifi size={14} />} />
                        <FilterBtn label="Offline" active={filter === 'offline'} onClick={() => setFilter('offline')} icon={<WifiOff size={14} />} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                    <button
                        className={`btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        style={{ background: viewMode === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', padding: '6px' }}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        className={`btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        style={{ background: viewMode === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', padding: '6px' }}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', overflowY: 'auto', paddingBottom: '20px' }}>
                    {filteredCameras.map(cam => (
                        <div key={cam.id} style={{ position: 'relative' }}>
                            <CameraCard
                                camera={{ ...cam, last: cam.lastEvent }}
                                onPair={() => alert(`Pairing ${cam.id}`)}
                                onClick={!isMultiSelectMode ? (c) => navigate(`/cameras/${c.id}`) : undefined}
                            />
                            {isMultiSelectMode && (
                                <div
                                    onClick={() => toggleSelection(cam.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        zIndex: 10,
                                        cursor: 'pointer',
                                        background: selectedCameras.includes(cam.id) ? 'var(--accent)' : 'rgba(0,0,0,0.5)',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        border: '2px solid #fff'
                                    }}
                                >
                                    {selectedCameras.includes(cam.id) ? <CheckSquare size={24} color="#fff" /> : <Square size={24} color="#fff" />}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                    {filteredCameras.map(cam => (
                        <div key={cam.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'var(--panel)',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.03)',
                            cursor: isMultiSelectMode ? 'pointer' : 'default'
                        }}
                            onClick={() => isMultiSelectMode && toggleSelection(cam.id)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {isMultiSelectMode && (
                                    <div>
                                        {selectedCameras.includes(cam.id) ? <CheckSquare size={20} color="var(--accent)" /> : <Square size={20} color="var(--muted)" />}
                                    </div>
                                )}
                                <div style={{
                                    width: '48px',
                                    height: '36px',
                                    background: '#000',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img src={cam.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{cam.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{cam.ip} • {cam.resolution}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div className={`badge-status ${cam.status === 'online' ? 'online' : 'offline'}`}>
                                    {cam.status}
                                </div>
                                {!isMultiSelectMode && (
                                    <button className="btn" onClick={() => navigate(`/cameras/${cam.id}`)}>View</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FilterBtn = ({ label, active, onClick, icon }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: active ? '1px solid var(--accent)' : '1px solid transparent',
            background: active ? 'rgba(229, 57, 53, 0.1)' : 'transparent',
            color: active ? 'var(--accent)' : 'var(--muted)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s'
        }}
    >
        {icon}
        {label}
    </button>
);

export default Cameras;
