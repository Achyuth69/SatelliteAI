import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="w-full bg-card/50 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-satellite-blue to-satellite-ocean"></div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SatelliteAI</h1>
              <p className="text-xs text-muted-foreground">Feature Detection & Change Analysis</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            v2.1.0
          </Badge>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-satellite-forest/10 text-satellite-forest border-satellite-forest/20">
            <div className="w-2 h-2 bg-satellite-forest rounded-full mr-2"></div>
            System Online
          </Badge>
          <Button variant="satellite" size="sm">
            Export Analysis
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;