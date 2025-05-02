import React from 'react';
import { Menu, X, Settings, Info } from 'lucide-react';

interface TransitTrackerHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const TransitTrackerHeader: React.FC<TransitTrackerHeaderProps> = ({ sidebarOpen, toggleSidebar }) => (
  <header className="header">
    <div className="header-left">
      <button 
        onClick={toggleSidebar}
        className="sidebar-toggle"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="title">Bay Area Transit Tracker</h1>
    </div>
    <div className="header-right">
      <button className="header-button"><Settings size={20} /></button>
      <button className="header-button"><Info size={20} /></button>
    </div>
  </header>
);

export default TransitTrackerHeader;