import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import MaterialTraceability from '../components/MaterialTraceability';
import DigitalTwin from '../components/DigitalTwin';
import Analytics from '../components/Analytics';
import Compliance from '../components/Compliance';
import Settings from '../components/Settings';
import AIInsights from '../components/AIInsights';
import SupplyChainMap from '../components/SupplyChainMap';
import PredictiveAnalytics from '../components/PredictiveAnalytics';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'traceability':
        return <MaterialTraceability />;
      case 'ai-insights':
        return <AIInsights />;
      case 'supply-chain':
        return <SupplyChainMap />;
      case 'predictive':
        return <PredictiveAnalytics />;
      case 'digital-twin':
        return <DigitalTwin />;
      case 'analytics':
        return <Analytics />;
      case 'compliance':
        return <Compliance />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;
