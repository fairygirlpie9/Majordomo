
import React from 'react';
import { Property, Status } from '../types';
import StatusCard from './StatusCard';
import EnvironmentalModule from './modules/EnvironmentalModule';
import SecurityModule from './modules/SecurityModule';
import HVACModule from './modules/HVACModule';
import PowerModule from './modules/PowerModule';
import WineCellarModule from './modules/WineCellarModule';
import StaffModule from './modules/StaffModule';
import AlertsModule from './modules/AlertsModule';
import ActivityModule from './modules/ActivityModule';

interface DashboardGridProps {
  property: Property;
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  onOpenInventory: () => void;
  onOpenHistory: () => void;
  onOpenBroadcast: () => void;
  onOpenHVAC: () => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ 
  property, 
  theme, 
  tempUnit, 
  onOpenInventory, 
  onOpenHistory,
  onOpenBroadcast,
  onOpenHVAC
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Column 1: Environmental, Security, Power */}
      <div className="lg:col-span-4 space-y-6 lg:space-y-8">
        <EnvironmentalModule data={property.environmental} theme={theme} tempUnit={tempUnit} />
        <SecurityModule data={property.security} theme={theme} />
        <PowerModule data={property.power} theme={theme} />
      </div>

      {/* Column 2: Climate (HVAC), Wine Cellar */}
      <div className="lg:col-span-4 space-y-6 lg:space-y-8">
        <HVACModule 
          zones={property.hvac} 
          theme={theme} 
          tempUnit={tempUnit} 
          onOpenConfig={onOpenHVAC}
        />
        {property.wineCellar.enabled && (
          <WineCellarModule 
            data={property.wineCellar} 
            theme={theme} 
            tempUnit={tempUnit}
            onOpenInventory={onOpenInventory}
          />
        )}
      </div>

      {/* Column 3: Staff, Alerts, Activity */}
      <div className="lg:col-span-4 space-y-6 lg:space-y-8">
        <AlertsModule alerts={property.alerts} theme={theme} />
        <StaffModule 
          staff={property.staff} 
          theme={theme} 
          onOpenBroadcast={onOpenBroadcast}
        />
        <ActivityModule theme={theme} onOpenHistory={onOpenHistory} />
      </div>
    </div>
  );
};

export default DashboardGrid;
