// The "NanoBanana" Generator - A robust dummy data generator for CCTV systems

export const generateCameras = (count = 12) => {
    const locations = ['Gate North', 'Gate South', 'Lobby', 'Warehouse A', 'Warehouse B', 'Parking Lot', 'Roof', 'Cafeteria', 'Server Room', 'Elevator 1', 'Elevator 2', 'Corridor'];
    const statuses = ['online', 'online', 'online', 'offline', 'maintenance'];

    return Array.from({ length: count }, (_, i) => ({
        id: `CAM-${1000 + i}`,
        name: locations[i % locations.length] + (i >= locations.length ? ` ${Math.floor(i / locations.length) + 1}` : ''),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        ip: `192.168.1.${100 + i}`,
        resolution: Math.random() > 0.5 ? '4K' : '1080p',
        lastEvent: `${Math.floor(Math.random() * 59)}m ago`,
        image: `https://picsum.photos/seed/${1000 + i}/400/300?grayscale&blur=1`
    }));
};

export const generateStats = () => ({
    total: 24,
    online: 21,
    offline: 2,
    maintenance: 1
});
