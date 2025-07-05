import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface AlertData {
  id: string;
  type: "glof" | "infrastructure" | "drainage";
  severity: "low" | "moderate" | "high" | "critical";
  location: string;
  description: string;
  timestamp: Date;
  status: "active" | "acknowledged" | "resolved";
  confidence: number;
  coordinates: [number, number];
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: "glof_001",
      type: "glof",
      severity: "critical",
      location: "Lake Imja, Everest Region",
      description: "Rapid lake expansion detected: +15.2% increase in surface area. Immediate monitoring required.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "active",
      confidence: 97.3,
      coordinates: [27.9, 86.9]
    },
    {
      id: "glof_002",
      type: "glof",
      severity: "high",
      location: "Tsho Rolpa, Rolwaling Valley",
      description: "Significant volume increase observed. Lake expansion rate accelerating.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: "acknowledged",
      confidence: 89.1,
      coordinates: [27.8, 86.5]
    },
    {
      id: "infra_001",
      type: "infrastructure",
      severity: "moderate",
      location: "Highway A1, Kathmandu Valley",
      description: "New road construction detected. Infrastructure development monitoring.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      status: "active",
      confidence: 94.7,
      coordinates: [27.7, 85.3]
    }
  ]);

  const [monitoring, setMonitoring] = useState(true);
  const { toast } = useToast();

  const getSeverityColor = (severity: AlertData['severity']) => {
    switch (severity) {
      case 'critical': return 'text-destructive border-destructive bg-destructive/10';
      case 'high': return 'text-satellite-alert border-satellite-alert bg-satellite-alert/10';
      case 'moderate': return 'text-satellite-terrain border-satellite-terrain bg-satellite-terrain/10';
      case 'low': return 'text-satellite-forest border-satellite-forest bg-satellite-forest/10';
      default: return 'text-muted-foreground border-border bg-secondary/10';
    }
  };

  const getBadgeVariant = (severity: AlertData['severity']) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'moderate': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "acknowledged" as const }
        : alert
    ));
    
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged and will continue monitoring.",
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "resolved" as const }
        : alert
    ));
    
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved.",
    });
  };

  const generateTestAlert = () => {
    const testAlert: AlertData = {
      id: `test_${Date.now()}`,
      type: "glof",
      severity: "high",
      location: "Test Lake, Demo Region",
      description: "Simulated alert: Lake expansion detected during testing. This is a demonstration alert.",
      timestamp: new Date(),
      status: "active",
      confidence: 92.5,
      coordinates: [28.0, 86.0]
    };

    setAlerts(prev => [testAlert, ...prev]);
    
    toast({
      title: "Test Alert Generated",
      description: "A demonstration alert has been created for testing purposes.",
    });
  };

  // Simulate real-time monitoring
  useEffect(() => {
    if (!monitoring) return;

    const interval = setInterval(() => {
      // Simulate occasional new alerts (very low probability)
      if (Math.random() < 0.05) { // 5% chance every 30 seconds
        const locations = [
          "Thulagi Lake, Manaslu",
          "Dig Tsho, Everest Region", 
          "Longda Lake, Tibet",
          "Raphstreng Tsho, Bhutan"
        ];
        
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        
        const newAlert: AlertData = {
          id: `auto_${Date.now()}`,
          type: "glof",
          severity: Math.random() > 0.7 ? "high" : "moderate",
          location: randomLocation,
          description: `Automated detection: Changes observed in lake parameters. Confidence: ${Math.floor(Math.random() * 15 + 85)}%`,
          timestamp: new Date(),
          status: "active",
          confidence: Math.floor(Math.random() * 15 + 85),
          coordinates: [27 + Math.random(), 86 + Math.random()]
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [monitoring]);

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const acknowledgedAlerts = alerts.filter(alert => alert.status === 'acknowledged');

  return (
    <div className="space-y-6">
      {/* Alert System Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">GLOF Risk Alert System</h2>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-satellite-forest/10 text-satellite-forest border-satellite-forest/20">
              <div className="w-2 h-2 bg-satellite-forest rounded-full mr-2 animate-pulse"></div>
              {monitoring ? 'Monitoring Active' : 'Monitoring Paused'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMonitoring(!monitoring)}
            >
              {monitoring ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive mb-1">{activeAlerts.length}</div>
            <div className="text-xs text-muted-foreground">Active Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-satellite-alert mb-1">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-satellite-terrain mb-1">
              {acknowledgedAlerts.length}
            </div>
            <div className="text-xs text-muted-foreground">Acknowledged</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-satellite-forest mb-1">
              {alerts.filter(a => a.status === 'resolved').length}
            </div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
        </div>
      </Card>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-destructive">Active Critical Alerts</h3>
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                <AlertDescription>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={getBadgeVariant(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {alert.confidence}% confidence
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleDateString()} {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="font-medium mb-1">{alert.location}</div>
                      <div className="text-sm">{alert.description}</div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        Acknowledge
                      </Button>
                      <Button
                        variant="satellite"
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </Card>
      )}

      {/* Alert History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Alert History</h3>
          <Button variant="outline" size="sm" onClick={generateTestAlert}>
            Generate Test Alert
          </Button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant={getBadgeVariant(alert.severity)} className="text-xs">
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {alert.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-medium">{alert.location}</div>
                <div className="text-xs text-muted-foreground">{alert.description}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                {alert.confidence}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alert Configuration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Alert Configuration</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">GLOF Risk Thresholds</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lake Expansion Rate:</span>
                <span className="font-medium">&gt;10% = High Risk</span>
              </div>
              <div className="flex justify-between">
                <span>Volume Change:</span>
                <span className="font-medium">&gt;15% = Critical</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence Threshold:</span>
                <span className="font-medium">&gt;85%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Notification Settings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Real-time Monitoring:</span>
                <Badge variant={monitoring ? "outline" : "secondary"}>
                  {monitoring ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Auto-resolve After:</span>
                <span className="font-medium">7 days</span>
              </div>
              <div className="flex justify-between">
                <span>Email Notifications:</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AlertSystem;