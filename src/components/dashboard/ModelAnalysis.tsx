import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModelAnalysisProps {
  activeYear: number;
}

const ModelAnalysis = ({ activeYear }: ModelAnalysisProps) => {
  const [processing, setProcessing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const modelResults = {
    unet: {
      name: "U-Net Glacial Lakes",
      accuracy: 94.2,
      detections: 127,
      changes: [
        { name: "Lake Imja", expansion: 12.3, risk: "high" },
        { name: "Tsho Rolpa", expansion: 8.7, risk: "moderate" },
        { name: "Thulagi", expansion: 15.2, risk: "critical" }
      ]
    },
    maskrcnn: {
      name: "Mask R-CNN Roads",
      accuracy: 89.7,
      detections: 2341,
      changes: [
        { name: "Highway A1", development: "45km new", status: "expanding" },
        { name: "Urban Grid B", development: "12km modified", status: "upgrading" }
      ]
    },
    resunet: {
      name: "ResUNet Drainage",
      accuracy: 87.3,
      detections: 856,
      changes: [
        { name: "Kathmandu Valley", modification: "23 new channels", impact: "flood_reduction" },
        { name: "Pokhara Basin", modification: "8 upgraded systems", impact: "capacity_increase" }
      ]
    }
  };

  const runAnalysis = async () => {
    setProcessing(true);
    setProgress(0);
    setAnalysisComplete(false);

    // Simulate ML processing pipeline
    const steps = [
      "Loading satellite imagery...",
      "Preprocessing and cloud masking...", 
      "Running U-Net segmentation...",
      "Executing Mask R-CNN detection...",
      "Processing ResUNet analysis...",
      "Performing change detection...",
      "Generating results..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / steps.length) * 100);
    }

    setProcessing(false);
    setAnalysisComplete(true);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">AI/ML Model Analysis</h2>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Year: {activeYear}
          </Badge>
        </div>

        <div className="space-y-4">
          <Button 
            variant="analysis" 
            className="w-full"
            onClick={runAnalysis}
            disabled={processing}
          >
            {processing ? "Processing..." : "Run Complete Analysis"}
          </Button>

          {processing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground text-center">
                Processing satellite imagery with AI models...
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Model Results */}
      {(analysisComplete || !processing) && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Model Performance & Results</h3>
          
          <Tabs defaultValue="unet" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="unet">Glacial Lakes</TabsTrigger>
              <TabsTrigger value="maskrcnn">Road Networks</TabsTrigger>
              <TabsTrigger value="resunet">Drainage Systems</TabsTrigger>
            </TabsList>

            <TabsContent value="unet" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{modelResults.unet.name}</h4>
                <Badge variant="outline" className="bg-satellite-glacier/10 text-satellite-glacier border-satellite-glacier/20">
                  {modelResults.unet.accuracy}% Accuracy
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Detected Lakes:</span>
                  <span className="ml-2 font-medium">{modelResults.unet.detections}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">High Risk:</span>
                  <span className="ml-2 font-medium text-satellite-alert">3 areas</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Critical Changes Detected:</h5>
                {modelResults.unet.changes.map((change, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                    <span className="text-sm">{change.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-satellite-alert">+{change.expansion}%</span>
                      <Badge variant={change.risk === 'critical' ? 'destructive' : change.risk === 'high' ? 'destructive' : 'secondary'}>
                        {change.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="maskrcnn" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{modelResults.maskrcnn.name}</h4>
                <Badge variant="outline" className="bg-satellite-terrain/10 text-satellite-terrain border-satellite-terrain/20">
                  {modelResults.maskrcnn.accuracy}% Accuracy
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Road Segments:</span>
                  <span className="ml-2 font-medium">{modelResults.maskrcnn.detections} km</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Active Development:</span>
                  <span className="ml-2 font-medium text-satellite-forest">2 areas</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">Infrastructure Changes:</h5>
                {modelResults.maskrcnn.changes.map((change, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                    <span className="text-sm">{change.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-satellite-forest">{change.development}</span>
                      <Badge variant="outline">{change.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resunet" className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{modelResults.resunet.name}</h4>
                <Badge variant="outline" className="bg-satellite-ocean/10 text-satellite-ocean border-satellite-ocean/20">
                  {modelResults.resunet.accuracy}% Accuracy
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Drainage Features:</span>
                  <span className="ml-2 font-medium">{modelResults.resunet.detections}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Flood Risk:</span>
                  <span className="ml-2 font-medium text-satellite-forest">Reduced</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-medium">System Modifications:</h5>
                {modelResults.resunet.changes.map((change, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                    <span className="text-sm">{change.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-satellite-ocean">{change.modification}</span>
                      <Badge variant="outline">{change.impact.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}

      {/* Model Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Evaluation Metrics</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-satellite-glacier mb-1">0.87</div>
            <div className="text-xs text-muted-foreground">IoU Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-satellite-forest mb-1">0.92</div>
            <div className="text-xs text-muted-foreground">F1-Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-satellite-blue mb-1">0.94</div>
            <div className="text-xs text-muted-foreground">Precision</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ModelAnalysis;