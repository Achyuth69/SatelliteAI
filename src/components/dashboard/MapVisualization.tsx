import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import glacialLakeImage from "@/assets/glacial-lake-sample.jpg";
import urbanInfraImage from "@/assets/urban-infrastructure-sample.jpg";

interface MapVisualizationProps {
  activeYear: number;
  layers: Record<string, boolean>;
}

const MapVisualization = ({ activeYear, layers }: MapVisualizationProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'satellite' | 'analysis'>('satellite');

  // Mock data for detected features
  const detectedFeatures = {
    glacialLakes: [
      { id: 1, name: "Lake Imja", lat: 27.9, lng: 86.9, area: 0.78, change: "+12%" },
      { id: 2, name: "Tsho Rolpa", lat: 27.8, lng: 86.5, area: 1.65, change: "+8%" },
    ],
    roadNetworks: [
      { id: 1, name: "Highway A1", length: 45.2, status: "expanding" },
      { id: 2, name: "Urban Grid B", length: 123.8, status: "stable" },
    ],
    changeAreas: [
      { id: 1, name: "Region Alpha", type: "lake_expansion", severity: "high" },
      { id: 2, name: "Region Beta", type: "road_development", severity: "moderate" },
    ]
  };

  return (
    <div className="flex-1 h-full relative">
      {/* Map Container */}
      <div className="absolute inset-0 bg-background rounded-lg overflow-hidden">
        
        {/* Map Display */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: analysisMode === 'satellite' 
                ? `url(${glacialLakeImage})` 
                : `url(${urbanInfraImage})`,
              filter: analysisMode === 'analysis' ? 'contrast(1.2) brightness(0.9)' : 'none'
            }}
          >
            {/* Overlay for analysis mode */}
            {analysisMode === 'analysis' && (
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
            )}
          </div>

          {/* Feature Overlays */}
          {layers.glacialLakes && (
            <>
              {/* Simulated lake detection overlays */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-6 bg-satellite-glacier/70 rounded-full border-2 border-satellite-glacier animate-pulse"></div>
                <Badge className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-satellite-glacier/90 text-white text-xs">
                  Lake Imja +12%
                </Badge>
              </div>
              <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-4 bg-satellite-glacier/70 rounded-full border-2 border-satellite-glacier animate-pulse"></div>
                <Badge className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-satellite-glacier/90 text-white text-xs">
                  Tsho Rolpa +8%
                </Badge>
              </div>
            </>
          )}

          {layers.roadNetworks && (
            <>
              {/* Simulated road network overlays */}
              <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-satellite-terrain/80 transform rotate-45"></div>
              <div className="absolute bottom-1/3 right-1/4 w-24 h-1 bg-satellite-terrain/80 transform -rotate-12"></div>
            </>
          )}

          {layers.changeDetection && (
            <>
              {/* Change detection highlights */}
              <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-satellite-alert rounded-lg bg-satellite-alert/20 animate-pulse">
                <Badge className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-satellite-alert text-white text-xs">
                  Change Detected
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Card className="p-2 bg-card/90 backdrop-blur-sm">
            <div className="flex space-x-1">
              <Button
                variant={analysisMode === 'satellite' ? 'satellite' : 'ghost'}
                size="sm"
                onClick={() => setAnalysisMode('satellite')}
                className="text-xs"
              >
                Satellite
              </Button>
              <Button
                variant={analysisMode === 'analysis' ? 'analysis' : 'ghost'}
                size="sm"
                onClick={() => setAnalysisMode('analysis')}
                className="text-xs"
              >
                Analysis
              </Button>
            </div>
          </Card>

          <Card className="p-2 bg-card/90 backdrop-blur-sm">
            <div className="flex flex-col space-y-1">
              <Button variant="ghost" size="sm" className="text-xs">+</Button>
              <Button variant="ghost" size="sm" className="text-xs">-</Button>
            </div>
          </Card>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4">
          <Card className="p-3 bg-card/90 backdrop-blur-sm">
            <h4 className="text-sm font-semibold mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              {layers.glacialLakes && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-satellite-glacier"></div>
                  <span>Glacial Lakes</span>
                </div>
              )}
              {layers.roadNetworks && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-satellite-terrain"></div>
                  <span>Road Networks</span>
                </div>
              )}
              {layers.changeDetection && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-satellite-alert"></div>
                  <span>Change Areas</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Analysis Info Panel */}
        <div className="absolute top-4 left-4">
          <Card className="p-4 bg-card/90 backdrop-blur-sm w-64">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Analysis: {activeYear}</h3>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                Live
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region:</span>
                <span className="text-foreground">Himalayas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution:</span>
                <span className="text-foreground">10m/pixel</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage:</span>
                <span className="text-foreground">2,450 km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="text-satellite-forest">94.2%</span>
              </div>
            </div>

            {layers.changeDetection && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-satellite-alert rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-satellite-alert">Active Changes</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  3 areas showing significant change since {activeYear - 1}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;