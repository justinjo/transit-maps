import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { Agency, VehicleType } from '../types';

interface SidebarProps {
  transitAgencies: Agency[];
  vehicleFilters: VehicleType[];
  toggleAgency: (id: string) => void;
  toggleVehicleType: (id: string) => void;
}

const TransitTrackerSidebar: React.FC<SidebarProps> = ({
  transitAgencies,
  vehicleFilters,
  toggleAgency,
  toggleVehicleType
}) => (
  <aside className="sidebar">
    <div className="filter-section">
      <h2 className="filter-heading">Transit Agencies</h2>
      <div className="filter-options">
        {transitAgencies.map(agency => (
          <div key={agency.id} className="filter-option">
            <button onClick={() => toggleAgency(agency.id)} className="checkbox-button">
              {agency.checked 
                ? <CheckSquare size={20} className="checkbox checked" /> 
                : <Square size={20} className="checkbox" />}
            </button>
            <div className="agency-label">
              <div className="color-indicator" style={{ backgroundColor: agency.color }}></div>
              <span>{agency.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="filter-section">
      <h2 className="filter-heading">Vehicle Types</h2>
      <div className="filter-options">
        {vehicleFilters.map(type => (
          <div key={type.id} className="filter-option">
            <button onClick={() => toggleVehicleType(type.id)} className="checkbox-button">
              {type.checked 
                ? <CheckSquare size={20} className="checkbox checked" /> 
                : <Square size={20} className="checkbox" />}
            </button>
            <span>{type.name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="sidebar-footer">
      <p className="update-time">Last updated: {new Date().toLocaleTimeString()}</p>
      <p className="vehicle-count">Showing vehicles for {transitAgencies.filter(a => a.checked).length} agencies</p>
    </div>
  </aside>
);

export default TransitTrackerSidebar;