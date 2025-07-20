import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { AuthScreen } from "@/components/AuthScreen";
import { Dashboard } from "@/components/Dashboard";

type AppState = "welcome" | "auth" | "dashboard";

interface UserData {
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen("auth");
  };

  const handleAuthSuccess = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentScreen("welcome");
  };

  const handleBackToWelcome = () => {
    setCurrentScreen("welcome");
  };

  if (currentScreen === "welcome") {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (currentScreen === "auth") {
    return (
      <AuthScreen 
        onBack={handleBackToWelcome}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentScreen === "dashboard" && userData) {
    return (
      <Dashboard 
        userName={userData.name}
        onLogout={handleLogout}
      />
    );
  }

  return <WelcomeScreen onGetStarted={handleGetStarted} />;
};

export default Index;
