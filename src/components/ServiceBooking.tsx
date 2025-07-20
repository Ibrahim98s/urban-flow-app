import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, DollarSign, CheckCircle, Phone, Star, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  pricing: string;
  emergency: boolean;
}

interface ServiceBookingProps {
  service: Service;
  onBack: () => void;
  userName: string;
}

interface BookingForm {
  fullName: string;
  phone: string;
  address: string;
  serviceType: string;
  urgency: string;
  description: string;
  containerCount?: string;
  containerSize?: string;
  wasteType?: string;
  manholeSize?: string;
  accessDifficulty?: string;
  preferredTime: string;
}

export const ServiceBooking = ({ service, onBack, userName }: ServiceBookingProps) => {
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    fullName: userName,
    phone: "",
    address: "",
    serviceType: "",
    urgency: "routine",
    description: "",
    preferredTime: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const updateForm = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    let basePrice = 75;
    if (service.id === "sewerage") basePrice = 150;
    if (service.id === "garbage") basePrice = 45;
    
    if (bookingForm.urgency === "emergency") basePrice *= 1.5;
    if (bookingForm.urgency === "urgent") basePrice *= 1.2;
    
    return basePrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    
    toast({
      title: "Booking Successfully Confirmed!",
      description: "You will receive an email confirmation shortly.",
    });
  };

  const IconComponent = service.icon;

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-service-light flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-0 bg-white/80 backdrop-blur-sm shadow-elegant animate-fade-in">
          <CardHeader className="text-center pb-4">
            <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Booking Confirmed!</CardTitle>
            <CardDescription>Your service has been successfully scheduled</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-eco-light/20 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Service Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium text-foreground">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency:</span>
                  <Badge 
                    variant={bookingForm.urgency === "emergency" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {bookingForm.urgency.charAt(0).toUpperCase() + bookingForm.urgency.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="font-semibold text-foreground">${calculatePrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Arrival:</span>
                  <span className="font-medium text-foreground">
                    {bookingForm.urgency === "emergency" ? "15-30 min" : "30-60 min"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-service-light/20 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Service Provider Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-service" />
                  <span className="text-sm text-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="text-sm text-muted-foreground">Mike Johnson - 4.9/5 rating</span>
                </div>
              </div>
            </div>
            
            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">Payment Reminder</p>
                  <p className="text-xs text-muted-foreground">Payment is due upon service completion. We accept cash, card, or mobile payments.</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Book Another Service
              </Button>
              <Button variant="eco" onClick={onBack} className="flex-1">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-service-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${service.color}/10`}>
                <IconComponent className={`w-6 h-6 text-${service.color}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{service.title}</h1>
                <p className="text-sm text-muted-foreground">Book Your Service</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Service Information</CardTitle>
                <CardDescription>Please provide details for your service request</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={bookingForm.fullName}
                          onChange={(e) => updateForm("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingForm.phone}
                          onChange={(e) => updateForm("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Service Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={bookingForm.address}
                          onChange={(e) => updateForm("address", e.target.value)}
                          placeholder="Enter your service location"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Service Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Service Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency Level</Label>
                        <Select value={bookingForm.urgency} onValueChange={(value) => updateForm("urgency", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="routine">Routine Service</SelectItem>
                            <SelectItem value="urgent">Urgent (Same Day)</SelectItem>
                            <SelectItem value="emergency">Emergency (24/7)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Select value={bookingForm.preferredTime} onValueChange={(value) => updateForm("preferredTime", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                            <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                            <SelectItem value="asap">ASAP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Service-specific fields */}
                    {service.id === "garbage" && (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="containerCount">Number of Containers</Label>
                          <Select value={bookingForm.containerCount} onValueChange={(value) => updateForm("containerCount", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-3">1-3 containers</SelectItem>
                              <SelectItem value="4-6">4-6 containers</SelectItem>
                              <SelectItem value="7+">7+ containers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="containerSize">Container Size</Label>
                          <Select value={bookingForm.containerSize} onValueChange={(value) => updateForm("containerSize", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small (32 gal)</SelectItem>
                              <SelectItem value="medium">Medium (64 gal)</SelectItem>
                              <SelectItem value="large">Large (96 gal)</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="wasteType">Waste Type</Label>
                          <Select value={bookingForm.wasteType} onValueChange={(value) => updateForm("wasteType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="household">Household</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="hazardous">Hazardous</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {service.id === "sewerage" && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="manholeSize">Manhole Size</Label>
                          <Select value={bookingForm.manholeSize} onValueChange={(value) => updateForm("manholeSize", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small (2-4 ft)</SelectItem>
                              <SelectItem value="medium">Medium (4-6 ft)</SelectItem>
                              <SelectItem value="large">Large (6+ ft)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="accessDifficulty">Access Difficulty</Label>
                          <Select value={bookingForm.accessDifficulty} onValueChange={(value) => updateForm("accessDifficulty", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy Access</SelectItem>
                              <SelectItem value="moderate">Moderate Difficulty</SelectItem>
                              <SelectItem value="difficult">Difficult Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="description">Problem Description</Label>
                      <Textarea
                        id="description"
                        value={bookingForm.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                        placeholder={`Describe your ${service.title.toLowerCase()} needs in detail...`}
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="eco" size="lg" className="w-full">
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & Summary Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-semibold text-foreground">
                    ${service.id === "sewerage" ? "150" : service.id === "garbage" ? "45" : "75"}
                  </span>
                </div>
                
                {bookingForm.urgency === "emergency" && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Emergency Fee</span>
                    <span className="font-semibold text-destructive">+50%</span>
                  </div>
                )}
                
                {bookingForm.urgency === "urgent" && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Urgent Fee</span>
                    <span className="font-semibold text-warning">+20%</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total Estimate</span>
                  <span className="text-xl font-bold text-primary">${calculatePrice()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    Estimated arrival: {bookingForm.urgency === "emergency" ? "15-30 min" : "30-60 min"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground">Professional service provider</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground">All necessary equipment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground">Service guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground">Clean-up after service</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};