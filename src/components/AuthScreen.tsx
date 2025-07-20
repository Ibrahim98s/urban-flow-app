import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthScreenProps {
  onBack: () => void;
  onAuthSuccess: (userData: { name: string; email: string; phone: string }) => void;
}

export const AuthScreen = ({ onBack, onAuthSuccess }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }));
    if (!isLogin) checkPasswordStrength(value);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 2) return "bg-destructive";
    if (passwordStrength === 3) return "bg-warning";
    return "bg-success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Enter password";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Simulate auth process
    toast({
      title: isLogin ? "Welcome Back!" : "Account Created Successfully!",
      description: isLogin ? "You have been signed in." : "Your Waste Wise account is ready.",
    });

    onAuthSuccess({
      name: formData.fullName || formData.username,
      email: formData.email,
      phone: formData.phone
    });
  };

  const handleSocialAuth = (provider: string) => {
    toast({
      title: `${provider} Authentication`,
      description: `Signing in with ${provider}...`,
    });
    
    // Simulate social auth
    setTimeout(() => {
      onAuthSuccess({
        name: `User from ${provider}`,
        email: `user@${provider.toLowerCase()}.com`,
        phone: "+1234567890"
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-service-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
        <CardHeader className="space-y-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="self-start p-2 hover:bg-eco-light"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin 
                ? "Sign in to access your Waste Wise dashboard" 
                : "Join Waste Wise for reliable service booking"
              }
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Authentication */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSocialAuth("Gmail")}
              className="hover:border-eco hover:text-eco"
            >
              <Mail className="w-4 h-4 mr-2" />
              Gmail
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSocialAuth("Phone")}
              className="hover:border-service hover:text-service"
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Choose a unique username"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    required={!isLogin}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              
              {!isLogin && formData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Password strength:</span>
                    <span className={`font-medium ${passwordStrength >= 3 ? 'text-success' : 'text-muted-foreground'}`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-success" />
                  )}
                </div>
              </div>
            )}

            <Button type="submit" variant="eco" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle between login/signup */}
          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground hover:text-primary"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>

          {isLogin && (
            <div className="text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot Password?
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};