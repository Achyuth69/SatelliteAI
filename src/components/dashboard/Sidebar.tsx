import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  onLayerToggle: (layer: string, enabled: boolean) => void;
  onTimeChange: (year: number) => void;
  activeYear: number;
}

const Sidebar = ({ onLayerToggle, onTimeChange, activeYear }: SidebarProps) => {
  const [layers, setLayers] = useState({
    glacialLakes: true,
    roadNetworks: true,
    drainageSystems: false,
    changeDetection: true,
  });

  const handleLayerToggle = (layer: string) => {
    const newState = !layers[layer as keyof typeof layers];
    setLayers(prev => ({ ...prev, [layer]: newState }));
    onLayerToggle(layer, newState);
  };

  return (
    <aside className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        
        {/* Analysis Controls */}
        <Card className="p-4 bg-secondary/20 border-accent/20">
          <h3 className="font-semibold text-foreground mb-4">Analysis Controls</h3>
          
          <div className="space-y-4">
            <Button variant="analysis" className="w-full">
              Run New Analysis
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Load Data
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Time Controls */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Temporal Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Year</span>
                <span className="text-satellite-blue font-medium">{activeYear}</span>
              </div>
              <Slider
                value={[activeYear]}
                onValueChange={(value) => onTimeChange(value[0])}
                min={2015}
                max={2024}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2015</span>
              <span>2024</span>
            </div>
          </div>
        </Card>

        {/* Layer Controls */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Feature Layers</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-satellite-glacier"></div>
                <span className="text-sm">Glacial Lakes</span>
              </div>
              <Switch
                checked={layers.glacialLakes}
                onCheckedChange={() => handleLayerToggle('glacialLakes')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-satellite-terrain"></div>
                <span className="text-sm">Road Networks</span>
              </div>
              <Switch
                checked={layers.roadNetworks}
                onCheckedChange={() => handleLayerToggle('roadNetworks')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-satellite-ocean"></div>
                <span className="text-sm">Drainage Systems</span>
              </div>
              <Switch
                checked={layers.drainageSystems}
                onCheckedChange={() => handleLayerToggle('drainageSystems')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-satellite-alert"></div>
                <span className="text-sm">Change Detection</span>
              </div>
              <Switch
                checked={layers.changeDetection}
                onCheckedChange={() => handleLayerToggle('changeDetection')}
              />
            </div>
          </div>
        </Card>

        {/* Analysis Stats */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Detection Results</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Glacial Lakes</span>
              <Badge variant="outline" className="bg-satellite-glacier/10 text-satellite-glacier border-satellite-glacier/20">
                127 detected
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Road Segments</span>
              <Badge variant="outline" className="bg-satellite-terrain/10 text-satellite-terrain border-satellite-terrain/20">
                2,341 km
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Changes Detected</span>
              <Badge variant="outline" className="bg-satellite-alert/10 text-satellite-alert border-satellite-alert/20">
                23 areas
              </Badge>
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-4 bg-destructive/5 border-destructive/20">
          <h3 className="font-semibold text-destructive mb-3">GLOF Risk Alert</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Lake expansion detected in Himalayas region. Monitoring required.
          </p>
          <Button variant="alert" size="sm" className="w-full">
            View Details
          </Button>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;