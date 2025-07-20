import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bell, User, Settings, Droplets, Truck, Recycle, ChevronRight, Phone, Star } from "lucide-react";
import { ServiceBooking } from "./ServiceBooking";

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  pricing: string;
  emergency: boolean;
}

const services: Service[] = [
  {
    id: "plumbing",
    title: "Plumbing Services",
    description: "Emergency and routine plumbing solutions",
    icon: Droplets,
    color: "service",
    pricing: "Starting at $75",
    emergency: true
  },
  {
    id: "sewerage",
    title: "Sewerage Disposal", 
    description: "Septic tank and sewage truck services",
    icon: Truck,
    color: "primary",
    pricing: "From $150",
    emergency: false
  },
  {
    id: "garbage",
    title: "Garbage Disposal",
    description: "Waste collection and eco-friendly disposal",
    icon: Recycle,
    color: "eco",
    pricing: "Starting at $45",
    emergency: false
  }
];

export const Dashboard = ({ userName, onLogout }: DashboardProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);

  if (selectedService) {
    return (
      <ServiceBooking 
        service={selectedService}
        onBack={() => setSelectedService(null)}
        userName={userName}
      />
    );
  }

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationEnabled(true);
        },
        () => {
          setLocationEnabled(false);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-service-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-primary to-service p-2 rounded-lg">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Waste Wise</h1>
                <p className="text-sm text-muted-foreground">Welcome, {userName}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Location Card */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    {locationEnabled ? "Location Enabled" : "Enable Location Services"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {locationEnabled ? "We can provide accurate service quotes" : "For accurate service delivery and pricing"}
                  </p>
                </div>
              </div>
              {!locationEnabled && (
                <Button variant="eco" size="sm" onClick={requestLocation}>
                  Enable GPS
                </Button>
              )}
              {locationEnabled && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Active
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency Service</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-service">500+</div>
              <div className="text-sm text-muted-foreground">Service Providers</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco">4.9</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">30min</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Services */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => setSelectedService(service)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg bg-${service.color}/10`}>
                        <IconComponent className={`w-8 h-8 text-${service.color}`} />
                      </div>
                      {service.emergency && (
                        <Badge variant="destructive" className="text-xs">
                          24/7 Emergency
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Starting Price</span>
                        <span className="font-semibold text-foreground">{service.pricing}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-sm text-muted-foreground ml-2">4.9 (1,200+ reviews)</span>
                      </div>
                      
                      <Button 
                        variant={service.color as any} 
                        className="w-full group-hover:scale-105 transition-transform"
                      >
                        Book Service
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Contact */}
        <Card className="border-0 bg-gradient-to-r from-primary/10 to-service/10 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Need Emergency Service?</h3>
                <p className="text-muted-foreground">
                  Call our 24/7 emergency hotline for immediate assistance
                </p>
              </div>
              <Button variant="hero" size="lg" className="gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};