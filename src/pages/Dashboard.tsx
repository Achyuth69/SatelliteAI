import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import MapVisualization from "@/components/dashboard/MapVisualization";
import AnalysisPanel from "@/components/dashboard/AnalysisPanel";
import dashboardBg from "@/assets/dashboard-background.jpg";

const Dashboard = () => {
  const [activeYear, setActiveYear] = useState(2024);
  const [layers, setLayers] = useState({
    glacialLakes: true,
    roadNetworks: true,
    drainageSystems: false,
    changeDetection: true,
  });

  const handleLayerToggle = (layer: string, enabled: boolean) => {
    setLayers(prev => ({ ...prev, [layer]: enabled }));
  };

  const handleTimeChange = (year: number) => {
    setActiveYear(year);
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col h-screen">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <Sidebar
              onLayerToggle={handleLayerToggle}
              onTimeChange={handleTimeChange}
              activeYear={activeYear}
            />
            
            {/* Map Visualization */}
            <MapVisualization
              activeYear={activeYear}
              layers={layers}
            />
            
            {/* Right Analysis Panel */}
            <AnalysisPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;