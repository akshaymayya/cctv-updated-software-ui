import React from 'react';
import { LayoutDashboard, Camera, BarChart2, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar" style={{
      width: '220px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
      borderRadius: '16px',
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" style={{ width: '46px', height: '46px', objectFit: 'contain' }} />
        <div>
          <h1 style={{ margin: 0, fontFamily: 'var(--heading-font)', fontSize: '18px', letterSpacing: '1px' }}>CATIFAAL</h1>
          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Privacy-first CCTV</div>
        </div>
      </div>

      <nav className="nav" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem to="/cameras" icon={<Camera size={18} />} label="Cameras" />
        <NavItem to="/analytics" icon={<BarChart2 size={18} />} label="Analytics" />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>

      <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--muted)' }}>
        Pilot region: Mangalore • v1.0-beta
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-item ${isActive ? 'active' : ''}`
    }
    style={({ isActive }) => ({
      color: isActive ? '#fff' : 'var(--muted)',
      textDecoration: 'none',
      padding: '10px',
      borderRadius: '10px',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      background: isActive ? 'var(--glass)' : 'transparent',
      transition: 'all 0.2s'
    })}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
