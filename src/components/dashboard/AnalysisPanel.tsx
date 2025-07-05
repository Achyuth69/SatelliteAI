import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const AnalysisPanel = () => {
  const analysisResults = [
    {
      type: "Glacial Lake Detection",
      status: "completed",
      confidence: 94.2,
      detected: 127,
      changes: 23,
      risk: "moderate"
    },
    {
      type: "Road Network Analysis",
      status: "completed", 
      confidence: 89.7,
      detected: 2341,
      changes: 45,
      risk: "low"
    },
    {
      type: "Drainage System Mapping",
      status: "processing",
      confidence: 76.3,
      detected: 856,
      changes: 12,
      risk: "low"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "GLOF Risk Alert",
      location: "Lake Imja, Nepal",
      severity: "high",
      change: "+12% expansion",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "Infrastructure Change",
      location: "Kathmandu Valley",
      severity: "moderate",
      change: "New road development",
      timestamp: "6 hours ago"
    }
  ];

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        
        {/* Analysis Status */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Analysis Status</h3>
          
          <div className="space-y-4">
            {analysisResults.map((analysis, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{analysis.type}</span>
                  <Badge variant={analysis.status === 'completed' ? 'default' : 'secondary'}>
                    {analysis.status}
                  </Badge>
                </div>
                
                <Progress value={analysis.confidence} className="h-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence: {analysis.confidence}%</span>
                  <span>{analysis.detected} detected</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Recent Alerts</h3>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg bg-secondary/20 border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium">{alert.type}</span>
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.severity}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-1">{alert.location}</p>
                <p className="text-xs text-satellite-alert font-medium mb-2">{alert.change}</p>
                <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
              </div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Alerts
          </Button>
        </Card>

        {/* Model Performance */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Model Performance</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Overall Accuracy</span>
              <div className="text-right">
                <div className="text-sm font-medium text-satellite-forest">92.1%</div>
                <div className="text-xs text-muted-foreground">+2.3% vs last month</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Processing Speed</span>
              <div className="text-right">
                <div className="text-sm font-medium">1.2s/km²</div>
                <div className="text-xs text-muted-foreground">-15% improvement</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">False Positives</span>
              <div className="text-right">
                <div className="text-sm font-medium">3.8%</div>
                <div className="text-xs text-muted-foreground">-1.2% reduction</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Export Data</h3>
          
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              GeoJSON Export
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              KML Export  
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              CSV Report
            </Button>
            <Button variant="satellite" size="sm" className="w-full">
              Generate Report
            </Button>
          </div>
        </Card>

        {/* System Info */}
        <Card className="p-4 bg-secondary/10">
          <h3 className="font-semibold text-foreground mb-3">System Status</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Update:</span>
              <span className="text-foreground">2 min ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Sources:</span>
              <span className="text-satellite-forest">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GPU Usage:</span>
              <span className="text-foreground">67%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisPanel;