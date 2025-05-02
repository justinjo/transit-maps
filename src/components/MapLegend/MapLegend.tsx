import { Agency } from '../types';

interface MapLegendProps {
  transitAgencies: Agency[];
}

const MapLegend: React.FC<MapLegendProps> = ({
  transitAgencies
}) => {

  return (
    <>
      <div className="map-legend">
        <h3 className="legend-title">Legend</h3>
        <div className="legend-items">
          {transitAgencies
            .filter(agency => agency.checked)
            .map(agency => (
              <div key={agency.id} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: agency.color }}
                ></div>
                <span className="legend-label">{agency.name}</span>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default MapLegend;