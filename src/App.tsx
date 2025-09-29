import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StrategyStudio } from './components/StrategyStudio';
import { StrategyStudio1 } from './components/StrategyStudio1';
import { CreatorStudio } from './components/CreatorStudio';
import { Simulations } from './components/Simulations';
import { AgentManagement } from './components/AgentManagement';
import { PerformanceCockpit } from './components/PerformanceCockpit';
import { AdminControls } from './components/AdminControls';
import { BrandKit } from './components/BrandKit';
import { Integrations } from './components/Integrations';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
        case 'strategy':
        return <StrategyStudio />;
      case 'strategy1':
        return <StrategyStudio1 />;
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'creator':
        return <CreatorStudio />;
      case 'brandkit':
        return <BrandKit />;
      case 'integrations':
        return <Integrations />;
      case 'simulations':
        return <Simulations />;
      case 'agents':
        return <AgentManagement />;
      case 'performance':
        return <PerformanceCockpit />;
      case 'admin':
        return <AdminControls />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto w-full">
          <div className="w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;