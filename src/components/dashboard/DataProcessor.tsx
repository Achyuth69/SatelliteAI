import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const DataProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const { toast } = useToast();

  const dataSources = {
    sentinel2: {
      name: "Sentinel-2",
      status: "online",
      lastUpdate: "2 hours ago",
      coverage: "Global",
      resolution: "10m",
      available: 1247
    },
    landsat: {
      name: "Landsat 8/9", 
      status: "online",
      lastUpdate: "4 hours ago",
      coverage: "Global",
      resolution: "30m",
      available: 892
    },
    osm: {
      name: "OpenStreetMap",
      status: "online", 
      lastUpdate: "1 hour ago",
      coverage: "Global",
      resolution: "Vector",
      available: "Live"
    }
  };

  const processingSteps = [
    "Downloading satellite imagery from Copernicus Hub...",
    "Applying cloud masking algorithms...",
    "Performing radiometric calibration...",
    "Executing geometric correction...",
    "Generating image tiles (256x256)...",
    "Normalizing spectral bands...",
    "Creating training masks from OSM data...",
    "Preparing data for model inference..."
  ];

  const startProcessing = async () => {
    setProcessing(true);
    setProgress(0);

    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(processingSteps[i]);
      
      // Simulate processing time
      for (let j = 0; j <= 100; j += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(((i * 100) + j) / processingSteps.length);
      }
    }

    setProcessing(false);
    setCurrentStep("Processing complete!");
    
    toast({
      title: "Data Processing Complete",
      description: "Satellite imagery preprocessed and ready for analysis",
    });
  };

  return (
    <div className="space-y-6">
      {/* Data Sources Status */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Data Sources Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(dataSources).map(([key, source]) => (
            <div key={key} className="p-4 bg-secondary/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{source.name}</h3>
                <Badge variant="outline" className="bg-satellite-forest/10 text-satellite-forest border-satellite-forest/20">
                  <div className="w-2 h-2 bg-satellite-forest rounded-full mr-2"></div>
                  {source.status}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Resolution: {source.resolution}</div>
                <div>Available: {source.available}</div>
                <div>Updated: {source.lastUpdate}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Processing Pipeline */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Data Preprocessing Pipeline</h2>
        
        <div className="space-y-4">
          <Button 
            variant="satellite" 
            className="w-full"
            onClick={startProcessing}
            disabled={processing}
          >
            {processing ? "Processing Data..." : "Start Data Processing"}
          </Button>

          {processing && (
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <div className="text-sm text-muted-foreground">
                <div className="font-medium text-foreground mb-1">
                  Step {Math.ceil(progress / 12.5)} of {processingSteps.length}
                </div>
                <div>{currentStep}</div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Data Quality Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Data Quality Assessment</h3>
        
        <Tabs defaultValue="quality" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
            <TabsTrigger value="coverage">Coverage Analysis</TabsTrigger>
            <TabsTrigger value="temporal">Temporal Consistency</TabsTrigger>
          </TabsList>

          <TabsContent value="quality" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cloud Coverage</span>
                  <span className="text-sm font-medium">12.3%</span>
                </div>
                <Progress value={12.3} className="h-2" />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Geometric Accuracy</span>
                  <span className="text-sm font-medium">97.8%</span>
                </div>
                <Progress value={97.8} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Radiometric Quality</span>
                  <span className="text-sm font-medium">94.5%</span>
                </div>
                <Progress value={94.5} className="h-2" />
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Data Completeness</span>
                  <span className="text-sm font-medium">98.9%</span>
                </div>
                <Progress value={98.9} className="h-2" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="coverage" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-satellite-blue mb-1">2,450</div>
                <div className="text-xs text-muted-foreground">Total km²</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-satellite-glacier mb-1">89.7%</div>
                <div className="text-xs text-muted-foreground">Coverage</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-satellite-forest mb-1">15</div>
                <div className="text-xs text-muted-foreground">Regions</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="temporal" className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">2024 Data Availability</span>
                <Badge variant="outline" className="bg-satellite-forest/10 text-satellite-forest border-satellite-forest/20">
                  Complete
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">2023 Data Availability</span>
                <Badge variant="outline" className="bg-satellite-forest/10 text-satellite-forest border-satellite-forest/20">
                  Complete
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">2022 Data Availability</span>
                <Badge variant="outline" className="bg-satellite-terrain/10 text-satellite-terrain border-satellite-terrain/20">
                  87% Complete
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Export Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Data Export & Download</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            Download Raw Data
          </Button>
          <Button variant="outline" size="sm">
            Export Preprocessed
          </Button>
          <Button variant="outline" size="sm">
            Generate Notebooks
          </Button>
          <Button variant="satellite" size="sm">
            Create Training Set
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DataProcessor;