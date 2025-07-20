import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Recycle, Droplets, Truck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-waste-wise.jpg";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-service-light">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary to-service p-3 rounded-full shadow-lg animate-eco-pulse">
                <Recycle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-service bg-clip-text text-transparent">
                Waste Wise
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium">
              "From Trash to Drains We Handle It"
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your comprehensive waste management and utility service booking platform. 
              Professional, reliable, and eco-friendly solutions at your fingertips.
            </p>
            
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-4 animate-slide-up"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center border-0 bg-gradient-card shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="bg-service/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-service animate-service-bounce" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Plumbing Services</h3>
            <p className="text-muted-foreground">Emergency and routine plumbing solutions with certified professionals</p>
          </Card>
          
          <Card className="p-6 text-center border-0 bg-gradient-card shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-primary animate-service-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Sewerage Disposal</h3>
            <p className="text-muted-foreground">Septic tank and sewage truck services for residential and commercial</p>
          </Card>
          
          <Card className="p-6 text-center border-0 bg-gradient-card shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="bg-eco/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="w-8 h-8 text-eco animate-service-bounce" style={{ animationDelay: '1s' }} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Garbage Disposal</h3>
            <p className="text-muted-foreground">Waste collection and eco-friendly disposal for all property types</p>
          </Card>
        </div>
      </div>
    </div>
  );
};