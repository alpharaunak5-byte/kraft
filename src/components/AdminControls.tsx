import React, { useState } from 'react';
import { Shield, Users, Database, Settings, Activity, AlertTriangle, CheckCircle, Lock, Wrench, Brain, Zap, Network, Key } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const AdminControls: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeSection, setActiveSection] = useState('overview');

  const systemHealth = {
    database: 'healthy',
    apis: 'healthy',
    agents: 'warning',
    storage: 'healthy'
  };

  const recentActivities = [
    { id: 1, action: 'Agent permissions updated', user: 'Admin', timestamp: '2 hours ago', type: 'security' },
    { id: 2, action: 'New knowledge graph node created', user: 'System', timestamp: '4 hours ago', type: 'system' },
    { id: 3, action: 'Campaign approval workflow modified', user: 'Manager', timestamp: '6 hours ago', type: 'workflow' },
    { id: 4, action: 'Database backup completed', user: 'System', timestamp: '12 hours ago', type: 'system' },
  ];

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'error': return <AlertTriangle className="text-red-500" size={20} />;
      default: return <Activity className="text-gray-500" size={20} />;
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="text-red-500" size={16} />;
      case 'system': return <Database className="text-blue-500" size={16} />;
      case 'workflow': return <Settings className="text-green-500" size={16} />;
      default: return <Activity className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
         <div className="text-center flex-1">
                            <div className="flex items-center justify-start mb-2">
                              <Shield className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
                              <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
                           Admin Controls
                              </h2>
                              {/* <Rocket className={`${themeClasses.text} ml-3 animate-bounce`} size={32} /> */}
                            </div>
                            <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
                             System administration and security management
                            </p>
                          </div>

        {/* Admin Navigation */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'agents', label: 'Agents', icon: Users },
              { id: 'tools', label: 'Tools', icon: Wrench },
              { id: 'guardrails', label: 'Guardrails', icon: Shield },
              { id: 'models', label: 'Models', icon: Brain },
              { id: 'workflows', label: 'Workflows', icon: Zap },
              { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center px-2 md:px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
                    activeSection === tab.id
                      ? `${themeClasses.accent} text-white`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={14} className="mr-1 md:mr-2" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.id === 'overview' ? 'Over' : tab.id === 'agents' ? 'Agnt' : tab.id === 'tools' ? 'Tool' : tab.id === 'guardrails' ? 'Guard' : tab.id === 'models' ? 'Model' : tab.id === 'workflows' ? 'Work' : tab.id === 'knowledge' ? 'Know' : tab.id === 'security' ? 'Sec' : 'Set'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Health Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {Object.entries(systemHealth).map(([component, status]) => (
                <div key={component} className={`border rounded-xl p-3 ${getHealthColor(status)} ${themeClasses.hover} transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getHealthIcon(status)}
                    </div>
                    <span className={`text-sm md:text-base font-bold capitalize ${themeClasses.text}`}>
                      {component}
                    </span>
                  </div>
                  <p className={`text-xs capitalize font-medium ${
                    status === 'healthy' ? 'text-green-700' :
                    status === 'warning' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {status}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-3 md:p-4`}>
              <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text} mb-3 md:mb-4`}>Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={`flex items-center justify-between p-2 md:p-3 ${themeClasses.cardBg} rounded-lg ${themeClasses.hover} transition-colors`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium ${themeClasses.text}`}>{activity.action}</h4>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>by {activity.user}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${themeClasses.textSecondary} hidden md:inline`}>{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Graph Status */}
            <div className={`${themeClasses.gradient} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Knowledge Graph Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
                  <h4 className={`font-medium ${themeClasses.text} mb-2`}>Total Nodes</h4>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>2,847</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>+127 this week</p>
                </div>
                <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
                  <h4 className={`font-medium ${themeClasses.text} mb-2`}>Connections</h4>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>8,932</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>+445 this week</p>
                </div>
                <div className={`${themeClasses.cardBg}/70 rounded-xl p-4`}>
                  <h4 className={`font-medium ${themeClasses.text} mb-2`}>Insights Generated</h4>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>156</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>+23 this week</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agents Management */}
        {activeSection === 'agents' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Agent Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add New Agent
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Active Agents</h4>
                  <p className="text-3xl font-bold text-blue-600">8</p>
                  <p className="text-sm text-blue-700">+2 this week</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Tasks Completed</h4>
                  <p className="text-3xl font-bold text-green-600">1,247</p>
                  <p className="text-sm text-green-700">Today</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Success Rate</h4>
                  <p className="text-3xl font-bold text-yellow-600">94.2%</p>
                  <p className="text-sm text-yellow-700">Average</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Agent Types & Permissions</h4>
              <div className="space-y-3">
                {['Content Creator', 'Performance Optimizer', 'Strategy Analyst', 'Quality Assurance'].map((agent) => (
                  <div key={agent} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{agent}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {agent === 'Content Creator' ? '2' : agent === 'Performance Optimizer' ? '2' : agent === 'Strategy Analyst' ? '2' : '2'} agents
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tools Management */}
        {activeSection === 'tools' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Tools Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add New Tool
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Active Tools</h4>
                  <p className="text-3xl font-bold text-green-600">12</p>
                  <p className="text-sm text-green-700">All systems</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Usage Today</h4>
                  <p className="text-3xl font-bold text-green-600">2,847</p>
                  <p className="text-sm text-green-700">API calls</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Success Rate</h4>
                  <p className="text-3xl font-bold text-orange-600">98.7%</p>
                  <p className="text-sm text-orange-700">Last 24h</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Available Tools</h4>
              <div className="space-y-3">
                {['Image Generator', 'Text Analyzer', 'Performance Tracker', 'Data Processor'].map((tool) => (
                  <div key={tool} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{tool}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Guardrails Management */}
        {activeSection === 'guardrails' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Guardrails Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add Guardrail
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Active Rules</h4>
                  <p className="text-3xl font-bold text-red-600">15</p>
                  <p className="text-sm text-red-700">Safety checks</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Violations Today</h4>
                  <p className="text-3xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-yellow-700">Blocked actions</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Compliance Rate</h4>
                  <p className="text-3xl font-bold text-green-600">99.2%</p>
                  <p className="text-sm text-green-700">This month</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Safety Rules</h4>
              <div className="space-y-3">
                {['Content Moderation', 'Budget Limits', 'Brand Safety', 'Data Privacy'].map((rule) => (
                  <div key={rule} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{rule}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Enabled
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Models Management */}
        {activeSection === 'models' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Models Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Deploy Model
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Active Models</h4>
                  <p className="text-3xl font-bold text-blue-600">6</p>
                  <p className="text-sm text-blue-700">In production</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Avg Accuracy</h4>
                  <p className="text-3xl font-bold text-green-600">94.7%</p>
                  <p className="text-sm text-green-700">All models</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Inference Time</h4>
                  <p className="text-3xl font-bold text-green-600">45ms</p>
                  <p className="text-sm text-green-700">Average</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Model Registry</h4>
              <div className="space-y-3">
                {['GPT-4 Turbo', 'Claude-3 Sonnet', 'Gemini Pro', 'Custom Model v2.1'].map((model) => (
                  <div key={model} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{model}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Healthy
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Monitor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workflows Management */}
        {activeSection === 'workflows' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Workflows Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Create Workflow
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Active Workflows</h4>
                  <p className="text-3xl font-bold text-indigo-600">8</p>
                  <p className="text-sm text-indigo-700">Running</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Executions Today</h4>
                  <p className="text-3xl font-bold text-green-600">156</p>
                  <p className="text-sm text-green-700">Completed</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Success Rate</h4>
                  <p className="text-3xl font-bold text-orange-600">97.3%</p>
                  <p className="text-sm text-orange-700">This week</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Workflow Templates</h4>
              <div className="space-y-3">
                {['Campaign Creation', 'Content Approval', 'Performance Review', 'Budget Optimization'].map((workflow) => (
                  <div key={workflow} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{workflow}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Template
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Use
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Graph Management */}
        {activeSection === 'knowledge' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Knowledge Graph Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Add Knowledge
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-cyan-900 mb-2">Knowledge Nodes</h4>
                  <p className="text-3xl font-bold text-cyan-600">15,847</p>
                  <p className="text-sm text-cyan-700">Total entries</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Connections</h4>
                  <p className="text-3xl font-bold text-blue-600">8,932</p>
                  <p className="text-sm text-blue-700">Relationships</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Query Success</h4>
                  <p className="text-3xl font-bold text-green-600">96.8%</p>
                  <p className="text-sm text-green-700">Accuracy</p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Knowledge Categories</h4>
              <div className="space-y-3">
                {['Campaign Strategies', 'Creative Assets', 'Performance Data', 'Market Insights'].map((category) => (
                  <div key={category} className={`flex items-center justify-between p-3 ${themeClasses.cardBg} rounded-xl ${themeClasses.hover} transition-colors`}>
                    <span className={`font-medium ${themeClasses.text}`}>{category}</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {category === 'Campaign Strategies' ? '2,847' : 
                         category === 'Creative Assets' ? '4,123' :
                         category === 'Performance Data' ? '6,234' : '2,643'} nodes
                      </span>
                      <button className={`${themeClasses.accent} text-white px-3 py-1 rounded-xl hover:opacity-90 transition-colors text-xs`}>
                        Explore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>Security Configuration</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Lock className="text-green-600" size={24} />
                    <div>
                      <h4 className="font-medium text-green-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-green-700">Enabled for all admin accounts</p>
                    </div>
                  </div>
                  <div className="text-green-600">
                    <CheckCircle size={24} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="text-blue-600" size={24} />
                    <div>
                      <h4 className="font-medium text-blue-900">API Security</h4>
                      <p className="text-sm text-blue-700">Rate limiting and authentication active</p>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <CheckCircle size={24} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <Database className="text-yellow-600" size={24} />
                    <div>
                      <h4 className="font-medium text-yellow-900">Data Encryption</h4>
                      <p className="text-sm text-yellow-700">AES-256 encryption for sensitive data</p>
                    </div>
                  </div>
                  <div className="text-yellow-600">
                    <AlertTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Security Monitoring</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <h5 className="font-medium text-red-900 mb-2">Failed Login Attempts</h5>
                  <p className="text-2xl font-bold text-red-600">12</p>
                  <p className="text-sm text-red-700">Last 24 hours</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h5 className="font-medium text-blue-900 mb-2">Active Sessions</h5>
                  <p className="text-2xl font-bold text-blue-600">18</p>
                  <p className="text-sm text-blue-700">Currently online</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>System Settings</h3>
              
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Auto-scaling</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Automatically scale resources based on demand</p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    Enabled
                  </button>
                </div>

                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Backup Schedule</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Daily backups at 2:00 AM UTC</p>
                  </div>
                  <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                    Configure
                  </button>
                </div>

                <div className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                  <div>
                    <h4 className={`font-medium ${themeClasses.text}`}>Maintenance Mode</h4>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>Temporarily disable public access</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors">
                    Disabled
                  </button>
                </div>
              </div>
            </div>

            {/* API Keys Section */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>API Keys Management</h3>
                <button className={`px-4 py-2 ${themeClasses.accent} text-white rounded-xl hover:opacity-90 transition-colors`}>
                  Generate Key
                </button>
              </div>
              
              <div className="space-y-4">
                {['OpenAI API Key', 'Claude API Key', 'Google Analytics Key', 'Facebook Ads Key'].map((keyName) => (
                  <div key={keyName} className={`flex items-center justify-between p-4 ${themeClasses.cardBg} rounded-2xl ${themeClasses.hover} transition-colors`}>
                    <div className="flex items-center space-x-3">
                      <Key className="text-blue-600" size={20} />
                      <div>
                        <h4 className={`font-medium ${themeClasses.text}`}>{keyName}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>sk-...{Math.random().toString(36).substr(2, 8)}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                      <button className={`px-3 py-1 ${themeClasses.border} border rounded-xl ${themeClasses.hover} transition-colors text-xs`}>
                        Rotate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4`}>Resource Usage</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h5 className="font-medium text-blue-900 mb-2">CPU Usage</h5>
                  <p className="text-2xl font-bold text-blue-600">45%</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <h5 className="font-medium text-green-900 mb-2">Memory Usage</h5>
                  <p className="text-2xl font-bold text-green-600">62%</p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <h5 className="font-medium text-green-900 mb-2">Storage Usage</h5>
                  <p className="text-2xl font-bold text-green-600">38%</p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};