import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import dashboardBg from "@/assets/dashboard-background.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-background text-foreground relative"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm">
        <div className="min-h-screen flex flex-col">
          
          {/* Header */}
          <header className="w-full bg-card/50 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-satellite-blue to-satellite-ocean"></div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">SatelliteAI</h1>
                    <p className="text-sm text-muted-foreground">Automated Feature Detection & Change Analysis</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-satellite-forest/10 text-satellite-forest border-satellite-forest/20">
                    v2.1.0 Beta
                  </Badge>
                  <Link to="/dashboard">
                    <Button variant="satellite">
                      Launch Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <main className="flex-1 container mx-auto px-6 py-12">
            <div className="max-w-6xl mx-auto">
              
              {/* Hero Content */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>AI-Powered Satellite Analysis</span>
                </div>
                
                <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                  Automated Detection of
                  <br />
                  <span className="bg-gradient-to-r from-satellite-blue to-satellite-glacier bg-clip-text text-transparent">
                    Glacial Lakes, Roads & Drainage
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Advanced AI/ML models analyze multi-source satellite imagery to detect and monitor changes in 
                  glacial lakes, road networks, and urban drainage systems for climate research and infrastructure planning.
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="satellite" size="lg" className="text-lg px-8 py-3">
                      Start Analysis
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    View Documentation
                  </Button>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="p-6 bg-card/60 backdrop-blur-sm border-satellite-glacier/20">
                  <div className="w-12 h-12 rounded-lg bg-satellite-glacier/20 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-satellite-glacier"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Glacial Lake Detection</h3>
                  <p className="text-muted-foreground mb-4">
                    U-Net and DeepLabV3+ models identify glacial lakes and monitor expansion for GLOF risk assessment.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-satellite-glacier/10 text-satellite-glacier border-satellite-glacier/20">
                      94.2% Accuracy
                    </Badge>
                  </div>
                </Card>

                <Card className="p-6 bg-card/60 backdrop-blur-sm border-satellite-terrain/20">
                  <div className="w-12 h-12 rounded-lg bg-satellite-terrain/20 flex items-center justify-center mb-4">
                    <div className="w-8 h-2 bg-satellite-terrain rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Road Network Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Mask R-CNN and LinkNet models map road infrastructure changes for urban development monitoring.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-satellite-terrain/10 text-satellite-terrain border-satellite-terrain/20">
                      89.7% Accuracy
                    </Badge>
                  </div>
                </Card>

                <Card className="p-6 bg-card/60 backdrop-blur-sm border-satellite-ocean/20">
                  <div className="w-12 h-12 rounded-lg bg-satellite-ocean/20 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 border-2 border-satellite-ocean rounded"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Drainage Systems</h3>
                  <p className="text-muted-foreground mb-4">
                    ResUNet models detect urban drainage patterns for flood risk assessment and city planning.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-satellite-ocean/10 text-satellite-ocean border-satellite-ocean/20">
                      87.3% Accuracy
                    </Badge>
                  </div>
                </Card>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-satellite-blue mb-2">127</div>
                  <div className="text-sm text-muted-foreground">Glacial Lakes Detected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-satellite-terrain mb-2">2,341</div>
                  <div className="text-sm text-muted-foreground">Road Kilometers Mapped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-satellite-forest mb-2">92.1%</div>
                  <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-satellite-alert mb-2">23</div>
                  <div className="text-sm text-muted-foreground">Change Areas Found</div>
                </div>
              </div>

              {/* Technology Stack */}
              <Card className="p-8 bg-card/40 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-center mb-8">Powered by Advanced AI/ML</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-satellite-blue to-satellite-ocean rounded-lg flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-lg">U</span>
                    </div>
                    <div className="font-medium">U-Net</div>
                    <div className="text-sm text-muted-foreground">Semantic Segmentation</div>
                  </div>
                  <div>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-satellite-terrain to-satellite-forest rounded-lg flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <div className="font-medium">R-CNN</div>
                    <div className="text-sm text-muted-foreground">Object Detection</div>
                  </div>
                  <div>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-satellite-glacier to-satellite-blue rounded-lg flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div className="font-medium">Siamese Net</div>
                    <div className="text-sm text-muted-foreground">Change Detection</div>
                  </div>
                  <div>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-satellite-alert to-satellite-terrain rounded-lg flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <div className="font-medium">Transformers</div>
                    <div className="text-sm text-muted-foreground">Feature Analysis</div>
                  </div>
                </div>
              </Card>
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full bg-card/30 backdrop-blur-sm border-t border-border py-8">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-satellite-blue to-satellite-ocean"></div>
                  <span className="text-sm text-muted-foreground">© 2024 SatelliteAI Research Team</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Data Sources: Sentinel-2, Landsat, OpenStreetMap</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;