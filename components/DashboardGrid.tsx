
import React from 'react';
import { Property } from '../types';
import EnvironmentalModule from './modules/EnvironmentalModule';
import SecurityModule from './modules/SecurityModule';
import HVACModule from './modules/HVACModule';
import PowerModule from './modules/PowerModule';
import StaffModule from './modules/StaffModule';
import AlertsModule from './modules/AlertsModule';
import FalconryModule from './modules/FalconryModule';
import CollectionsModule from './modules/CollectionsModule';
import WineCellarModule from './modules/WineCellarModule';

interface DashboardGridProps {
  property: Property;
  theme: 'dark' | 'light';
  tempUnit: 'C' | 'F';
  lang: 'en' | 'ar' | 'fr';
  onOpenHistory: () => void;
  onOpenBroadcast: () => void;
  onOpenHVAC: () => void;
  onOpenWine: () => void;
  onOpenFalconry: () => void;
  onOpenPower: () => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ 
  property, 
  theme, 
  tempUnit, 
  lang,
  onOpenHistory,
  onOpenBroadcast,
  onOpenHVAC,
  onOpenWine,
  onOpenFalconry,
  onOpenPower
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Column 1: Environmental, Security, Power */}
      <div className="lg:col-span-4 space-y-6 lg:space-y-8">
        <EnvironmentalModule data={property.environmental} theme={theme} tempUnit={tempUnit} lang={lang} />
        <SecurityModule data={property.security} theme={theme} lang={lang} />
        <PowerModule 
            data={property.power} 
            theme={theme} 
            lang={lang} 
            onOpenDiagnostic={onOpenPower}
        />
      </div>

      {/* Column 2: Climate (HVAC), Falconry OR Wine */}
      <div className="lg:col-span-4 space-y-6 lg:space-y-8">
        <HVACModule 
          zones={property.hvac} 
          theme={theme} 
          tempUnit={tempUnit} 
          lang={lang}
          onOpenConfig={onOpenHVAC}
        />
        {property.falconry?.enabled && (
          <FalconryModule 
            data={property.falconry} 
            theme={theme} 
            tempUnit={tempUnit}
            lang={lang}
            onOpenDetails={onOpenFalconry}
          />
        )}
        {property.wineCellar && !property.falconry?.enabled && (
           <WineCellarModule 
             data={property.wineCellar}
             theme={theme}
             tempUnit={tempUnit}
             lang={lang}
             onOpenInventory={onOpenWine}
           />
        )}
      </div>

      {/* Column 3: Collections, Staff, Alerts */}
      <div className="lg:col-span-4 space-y-6 lg:space-y-8">
        <AlertsModule alerts={property.alerts} theme={theme} lang={lang} />
        <CollectionsModule collections={property.collections} theme={theme} lang={lang} />
        <StaffModule 
          staff={property.staff} 
          theme={theme} 
          lang={lang}
          onOpenBroadcast={onOpenBroadcast}
        />
      </div>
    </div>
  );
};

export default DashboardGrid;
