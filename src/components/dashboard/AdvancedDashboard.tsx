import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MapVisualization from "./MapVisualization";
import AnalysisPanel from "./AnalysisPanel";
import ModelAnalysis from "./ModelAnalysis";
import DataProcessor from "./DataProcessor";
import AlertSystem from "./AlertSystem";
import dashboardBg from "@/assets/dashboard-background.jpg";

const AdvancedDashboard = () => {
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
            
            {/* Central Content Area */}
            <div className="flex-1 p-6">
              <Tabs defaultValue="visualization" className="h-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="visualization">Map Visualization</TabsTrigger>
                  <TabsTrigger value="models">AI/ML Models</TabsTrigger>
                  <TabsTrigger value="processing">Data Processing</TabsTrigger>
                  <TabsTrigger value="alerts">Alert System</TabsTrigger>
                  <TabsTrigger value="analysis">Deep Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="visualization" className="h-full">
                  <div className="flex h-full space-x-6">
                    <div className="flex-1">
                      <MapVisualization
                        activeYear={activeYear}
                        layers={layers}
                      />
                    </div>
                    <div className="w-80">
                      <AnalysisPanel />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="models" className="h-full overflow-y-auto">
                  <ModelAnalysis activeYear={activeYear} />
                </TabsContent>

                <TabsContent value="processing" className="h-full overflow-y-auto">
                  <DataProcessor />
                </TabsContent>

                <TabsContent value="alerts" className="h-full overflow-y-auto">
                  <AlertSystem />
                </TabsContent>

                <TabsContent value="analysis" className="h-full overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ModelAnalysis activeYear={activeYear} />
                    <DataProcessor />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;