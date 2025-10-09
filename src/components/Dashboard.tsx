import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  Filter,
  ChevronDown,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  MousePointer,
  ShoppingCart,
  Zap,
  Sparkles,
  Brain,
  Plus,
  Copy,
  ExternalLink,
  Download,
  Share2,
  RefreshCw,
  Search,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Lightbulb,
  ArrowUpRight,
  X,
  TrendingUp as TrendUp,
  Activity
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PerformanceMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  chartData?: number[];
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  product: string;
  channel: string;
  activationDate: string;
  segmentName: string;
  segmentSize: number;
  description: string;
  spend: number;
  leads: number;
  sales: number;
  cnv: number;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
}

interface DashboardProps {
  onTabChange?: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('last-30-days');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedSpend, setSelectedSpend] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPublishingModal, setShowPublishingModal] = useState(false);
  const [showMonitorModal, setShowMonitorModal] = useState(false);
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignStatuses, setCampaignStatuses] = useState<Record<string, 'active' | 'paused' | 'completed' | 'draft'>>({});

  // Performance metrics for last 90 days
  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Total Spends',
      value: '₹11,00,000',
      change: 'vs ₹9,50,000 last Month',
      trend: 'up',
      icon: DollarSign,
      color: 'blue',
      chartData: [850000, 920000, 980000, 1100000]
    },
    {
      label: 'Total Leads',
      value: '340',
      change: 'vs 303 last month',
      trend: 'up',
      icon: Users,
      color: 'yellow',
      chartData: [280, 295, 303, 340]
    },
    {
      label: 'Total Sales',
      value: '₹83,10,000',
      change: 'vs ₹72,40,000 last Month',
      trend: 'up',
      icon: ShoppingCart,
      color: 'green',
      chartData: [6800000, 7100000, 7240000, 8310000]
    },
    {
      label: 'Conversion Rate',
      value: '7.5%',
      change: '+2.1% from last month',
      trend: 'up',
      icon: Target,
      color: 'purple',
      chartData: [5.2, 5.8, 6.4, 7.5]
    }
  ];

  // Sample campaigns data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campaign #01',
      status: 'active',
      product: 'Nexa',
      channel: 'Instagram',
      activationDate: 'July-01-2025',
      segmentName: 'Millennials',
      segmentSize: 15000,
      description: 'Driving Millennial leads for Nexa Jimmy',
      spend: 280000,
      leads: 120,
      sales: 6,
      cnv: 5,
      performance: {
        impressions: 1200000,
        clicks: 24000,
        conversions: 120,
        ctr: 2.0,
        cpc: 11.67,
        roas: 4.2
      }
    },
    {
      id: '2',
      name: 'Campaign #02',
      status: 'paused',
      product: 'Arena',
      channel: 'Facebook',
      activationDate: 'June-15-2025',
      segmentName: 'Gen Z',
      segmentSize: 22000,
      description: 'Gen Z engagement for Arena products',
      spend: 150000,
      leads: 85,
      sales: 4,
      cnv: 4.7,
      performance: {
        impressions: 800000,
        clicks: 16000,
        conversions: 85,
        ctr: 2.0,
        cpc: 9.38,
        roas: 3.8
      }
    },
    {
      id: '3',
      name: 'Campaign #03',
      status: 'completed',
      product: 'Vitara',
      channel: 'Google Ads',
      activationDate: 'May-20-2025',
      segmentName: 'Professionals',
      segmentSize: 18500,
      description: 'Professional targeting for Vitara launch',
      spend: 320000,
      leads: 180,
      sales: 12,
      cnv: 6.7,
      performance: {
        impressions: 1500000,
        clicks: 30000,
        conversions: 180,
        ctr: 2.0,
        cpc: 10.67,
        roas: 5.1
      }
    }
  ];

  const products = ['All Products', 'Nexa', 'Arena', 'Vitara', 'Swift', 'Baleno'];
  const timeframes = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 6 months', 'Last year'];
  const channels = ['All Channels', 'Instagram', 'Facebook', 'Google Ads', 'YouTube', 'LinkedIn', 'Email'];
  const spendRanges = ['All Budgets', '₹0 - ₹1L', '₹1L - ₹5L', '₹5L - ₹10L', '₹10L+'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play size={14} className="text-green-600" />;
      case 'paused': return <Pause size={14} className="text-yellow-600" />;
      case 'completed': return <CheckCircle size={14} className="text-blue-600" />;
      case 'draft': return <Clock size={14} className="text-gray-600" />;
      default: return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'instagram': return <Instagram size={16} className="text-pink-500" />;
      case 'facebook': return <Facebook size={16} className="text-blue-600" />;
      case 'google ads': return <Globe size={16} className="text-green-600" />;
      case 'youtube': return <Youtube size={16} className="text-red-600" />;
      case 'linkedin': return <Linkedin size={16} className="text-blue-700" />;
      case 'twitter': return <Twitter size={16} className="text-blue-400" />;
      case 'email': return <Mail size={16} className="text-gray-600" />;
      default: return <Globe size={16} className="text-gray-600" />;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesProduct = selectedProduct === 'all' || campaign.product.toLowerCase() === selectedProduct.toLowerCase();
    const matchesChannel = selectedChannel === 'all' || campaign.channel.toLowerCase() === selectedChannel.toLowerCase();
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProduct && matchesChannel && matchesSearch;
  });

  const handleCreateCampaign = () => {
    if (onTabChange) {
      onTabChange('strategy');
    }
  };

  const handleViewPublishing = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowPublishingModal(true);
  };

  const handleMonitorCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowMonitorModal(true);
  };

  const handleViewSegment = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowSegmentModal(true);
  };

  const handleCloneCampaign = (campaign: Campaign) => {
    const clonedCampaign = {
      ...campaign,
      id: `${campaign.id}-clone-${Date.now()}`,
      name: `${campaign.name} (Copy)`,
      status: 'draft' as const
    };
    alert(`Campaign "${campaign.name}" has been cloned successfully as "${clonedCampaign.name}"`);
  };

  const handlePauseCampaign = (campaign: Campaign) => {
    setCampaignStatuses(prev => ({ ...prev, [campaign.id]: 'paused' }));
  };

  const handleResumeCampaign = (campaign: Campaign) => {
    setCampaignStatuses(prev => ({ ...prev, [campaign.id]: 'active' }));
  };

  const getCampaignStatus = (campaign: Campaign) => {
    return campaignStatuses[campaign.id] || campaign.status;
  };

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg} transition-all duration-500`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8 ">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-start mb-2">
            <BarChart3 className={`${themeClasses.text} mr-3 animate-pulse`} size={32} />
            <h2 className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent`}>
              Dashboard
            </h2>
          </div>
          <p className={`${themeClasses.textSecondary} flex items-center justify-start animate-fade-in`}>
            Campaign performance insights and analytics overview
          </p>
        </div>

        {/* Performance Snapshot - Last 90 Days */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border-2 rounded-3xl p-6 md:p-8 ${themeClasses.shadow}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl md:text-2xl font-bold ${themeClasses.text}`}>Last 90 Days Snapshot</h3>
            <div className="flex items-center space-x-2">
              <RefreshCw className={`${themeClasses.textSecondary} cursor-pointer hover:text-blue-600 transition-colors`} size={20} />
              <Download className={`${themeClasses.textSecondary} cursor-pointer hover:text-blue-600 transition-colors`} size={20} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className={`bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 rounded-2xl p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={24} className="text-white/80" />
                      <div className="flex items-center space-x-1">
                        {metric.trend === 'up' ? (
                          <TrendingUp size={16} className="text-white/80" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown size={16} className="text-white/80" />
                        ) : null}
                      </div>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-2">{metric.value}</h4>
                    <p className="text-sm text-white/80">{metric.label}</p>
                    <p className="text-xs text-white/60 mt-2">{metric.change}</p>
                  </div>
                  {/* Mini chart visualization */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/10 rounded-t-lg">
                    <div className="flex items-end h-full px-2 space-x-1">
                      {metric.chartData?.map((value, i) => (
                        <div
                          key={i}
                          className="bg-white/30 rounded-t flex-1"
                          style={{ height: `${(value / Math.max(...metric.chartData!)) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text}`}>Apply Filters and Get Insights</h3>
            <button className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-xl ${themeClasses.text} ${themeClasses.hover} transition-colors`}>
              <Filter size={16} className="mr-2" />
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Product Filter */}
            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Product</label>
              <div className="relative">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                >
                  {products.map((product) => (
                    <option key={product} value={product === 'All Products' ? 'all' : product}>
                      {product}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} pointer-events-none`} size={16} />
              </div>
            </div>

            {/* Timeframe Filter */}
            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Timeframe</label>
              <div className="relative">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                >
                  {timeframes.map((timeframe) => (
                    <option key={timeframe} value={timeframe.toLowerCase().replace(/\s+/g, '-')}>
                      {timeframe}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} pointer-events-none`} size={16} />
              </div>
            </div>

            {/* Channel Filter */}
            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Channel</label>
              <div className="relative">
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                >
                  {channels.map((channel) => (
                    <option key={channel} value={channel === 'All Channels' ? 'all' : channel}>
                      {channel}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} pointer-events-none`} size={16} />
              </div>
            </div>

            {/* Spend Filter */}
            <div className="relative">
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Spend</label>
              <div className="relative">
                <select
                  value={selectedSpend}
                  onChange={(e) => setSelectedSpend(e.target.value)}
                  className={`w-full p-3 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                >
                  {spendRanges.map((range) => (
                    <option key={range} value={range === 'All Budgets' ? 'all' : range}>
                      {range}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} pointer-events-none`} size={16} />
              </div>
            </div>
          </div>

          {/* Applied Filters Display */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className={`text-sm font-medium ${themeClasses.text} mb-2`}>Current Filter:</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              {selectedProduct !== 'all' ? selectedProduct : 'All Products'} • {selectedTimeframe.replace(/-/g, ' ')} • {selectedChannel !== 'all' ? selectedChannel : 'All Channels'} • {selectedSpend !== 'all' ? selectedSpend : 'All Budgets'}
            </p>
          </div>
        </div>

        {/* Performance Metrics Based on Filters */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text} mb-4`}>Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 ${themeClasses.gradient} rounded-xl text-center`}>
              <DollarSign className="mx-auto mb-2 text-blue-600" size={24} />
              <p className={`text-2xl font-bold ${themeClasses.text}`}>₹2,80,000</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Spend</p>
            </div>
            <div className={`p-4 ${themeClasses.gradient} rounded-xl text-center`}>
              <Users className="mx-auto mb-2 text-yellow-600" size={24} />
              <p className={`text-2xl font-bold ${themeClasses.text}`}>120</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Leads</p>
            </div>
            <div className={`p-4 ${themeClasses.gradient} rounded-xl text-center`}>
              <ShoppingCart className="mx-auto mb-2 text-green-600" size={24} />
              <p className={`text-2xl font-bold ${themeClasses.text}`}>6</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Sales</p>
            </div>
            <div className={`p-4 ${themeClasses.gradient} rounded-xl text-center`}>
              <Target className="mx-auto mb-2 text-purple-600" size={24} />
              <p className={`text-2xl font-bold ${themeClasses.text}`}>5%</p>
              <p className={`text-sm ${themeClasses.textSecondary}`}>CNV</p>
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg md:text-xl font-semibold ${themeClasses.text}`}>Campaign Details</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns..."
                  className={`pl-10 pr-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-xl ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 ">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 ${themeClasses.hover} bg-slate-50 hover:shadow-md transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h4 className={`text-lg font-semibold ${themeClasses.text}`}>{campaign.name}</h4>
                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1 capitalize">{campaign.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}>
                      <Copy size={16} className={themeClasses.textSecondary} />
                    </button>
                    <button
                      onClick={() => window.open(`/campaign/${campaign.id}/external`, '_blank')}
                      className={`p-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors`}
                      title="Open in new tab"
                    >
                      <ExternalLink size={16} className={themeClasses.textSecondary} />
                    </button>
                    <button
                      onClick={() => handleViewSegment(campaign)}
                      className={`px-3 py-2 ${themeClasses.accent} text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium`}
                    >
                      View Segment
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                  <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Activation Date</p>
                    <p className={`font-semibold ${themeClasses.text} text-sm`}>{campaign.activationDate}</p>
                  </div>
                  <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Segment Name</p>
                    <p className={`font-semibold ${themeClasses.text} text-sm`}>{campaign.segmentName}</p>
                  </div>
                  <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Segment Size</p>
                    <p className={`font-semibold ${themeClasses.text} text-sm`}>{campaign.segmentSize.toLocaleString()}</p>
                  </div>
                  <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Channels</p>
                    <div className="flex items-center space-x-1">
                      {getChannelIcon(campaign.channel)}
                      <p className={`font-semibold ${themeClasses.text} text-sm`}>{campaign.channel}</p>
                    </div>
                  </div>
                  <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Product</p>
                    <p className={`font-semibold ${themeClasses.text} text-sm`}>{campaign.product}</p>
                  </div>
                  <div className={`p-3 ${themeClasses.gradient} rounded-xl`}>
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Description</p>
                    <p className={`font-semibold ${themeClasses.text} text-sm truncate`}>{campaign.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Spend</p>
                    <p className={`text-lg font-bold ${themeClasses.text}`}>₹{(campaign.spend / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Leads</p>
                    <p className={`text-lg font-bold ${themeClasses.text}`}>{campaign.leads}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>Sales</p>
                    <p className={`text-lg font-bold ${themeClasses.text}`}>{campaign.sales}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-xs ${themeClasses.textSecondary} mb-1`}>CNV</p>
                    <p className={`text-lg font-bold ${themeClasses.text}`}>{campaign.cnv}%</p>
                  </div>
                </div>

                {/* Campaign Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleViewPublishing(campaign)}
                      className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors text-sm font-medium`}
                    >
                      <Eye size={16} className="mr-2" />
                      View Publishing
                    </button>
                    <button
                      onClick={() => handleMonitorCampaign(campaign)}
                      className={`flex items-center px-4 py-2 ${themeClasses.border} border rounded-lg ${themeClasses.hover} transition-colors text-sm font-medium`}
                    >
                      <BarChart3 size={16} className="mr-2" />
                      Monitor Campaign
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCloneCampaign(campaign)}
                      className={`flex items-center px-3 py-2 ${themeClasses.accent} text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium`}
                    >
                      <Copy size={16} className="mr-2" />
                      Clone Campaign
                    </button>
                    {getCampaignStatus(campaign) === 'active' && (
                      <button
                        onClick={() => handlePauseCampaign(campaign)}
                        className={`flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium`}
                      >
                        <Pause size={16} className="mr-2" />
                        Pause
                      </button>
                    )}
                    {getCampaignStatus(campaign) === 'paused' && (
                      <button
                        onClick={() => handleResumeCampaign(campaign)}
                        className={`flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium`}
                      >
                        <Play size={16} className="mr-2" />
                        Resume
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Publishing Modal */}
      {showPublishingModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl`}>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="text-white" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-white">Publishing Details</h2>
                  <p className="text-blue-100 text-sm">{selectedCampaign.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPublishingModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 ${themeClasses.gradient} rounded-xl`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Publishing Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Platform:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.channel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Start Date:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.activationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(getCampaignStatus(selectedCampaign))}`}>
                        {getCampaignStatus(selectedCampaign).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${themeClasses.gradient} rounded-xl`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Content Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Product:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Impressions:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.performance.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Engagement:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.performance.clicks.toLocaleString()} clicks</span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${themeClasses.gradient} rounded-xl md:col-span-2`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Campaign Description</h3>
                  <p className={themeClasses.text}>{selectedCampaign.description}</p>
                </div>

                <div className={`p-6 bg-blue-50 rounded-xl md:col-span-2`}>
                  <h3 className={`text-lg font-semibold text-blue-900 mb-3`}>Publishing Channels</h3>
                  <div className="flex items-center space-x-4">
                    {getChannelIcon(selectedCampaign.channel)}
                    <span className="text-blue-900 font-semibold">{selectedCampaign.channel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 border-t ${themeClasses.border} flex justify-end`}>
              <button
                onClick={() => setShowPublishingModal(false)}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monitor Campaign Modal */}
      {showMonitorModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl`}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="text-white" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-white">Campaign Monitoring</h2>
                  <p className="text-green-100 text-sm">{selectedCampaign.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMonitorModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <Eye className="mx-auto mb-2 text-blue-600" size={32} />
                  <p className="text-2xl font-bold text-blue-900">{selectedCampaign.performance.impressions.toLocaleString()}</p>
                  <p className="text-sm text-blue-700">Impressions</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl text-center">
                  <MousePointer className="mx-auto mb-2 text-yellow-600" size={32} />
                  <p className="text-2xl font-bold text-yellow-900">{selectedCampaign.performance.clicks.toLocaleString()}</p>
                  <p className="text-sm text-yellow-700">Clicks</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <CheckCircle className="mx-auto mb-2 text-green-600" size={32} />
                  <p className="text-2xl font-bold text-green-900">{selectedCampaign.performance.conversions}</p>
                  <p className="text-sm text-green-700">Conversions</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <TrendUp className="mx-auto mb-2 text-purple-600" size={32} />
                  <p className="text-2xl font-bold text-purple-900">{selectedCampaign.performance.ctr}%</p>
                  <p className="text-sm text-purple-700">CTR</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`p-6 ${themeClasses.gradient} rounded-xl`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Budget Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Total Spend:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>₹{selectedCampaign.spend.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>CPC:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>₹{selectedCampaign.performance.cpc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>ROAS:</span>
                      <span className={`font-semibold text-green-600`}>{selectedCampaign.performance.roas}x</span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${themeClasses.gradient} rounded-xl`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Lead Generation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Total Leads:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.leads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Sales:</span>
                      <span className={`font-semibold ${themeClasses.text}`}>{selectedCampaign.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textSecondary}>Conversion Rate:</span>
                      <span className={`font-semibold text-green-600`}>{selectedCampaign.cnv}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl`}>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>Real-time Status</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getCampaignStatus(selectedCampaign) === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                    <span className={`font-semibold ${themeClasses.text}`}>
                      Campaign is {getCampaignStatus(selectedCampaign) === 'active' ? 'running' : getCampaignStatus(selectedCampaign)}
                    </span>
                  </div>
                  <span className={themeClasses.textSecondary}>Last updated: Just now</span>
                </div>
              </div>
            </div>

            <div className={`p-6 border-t ${themeClasses.border} flex justify-end`}>
              <button
                onClick={() => setShowMonitorModal(false)}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Segment Modal */}
      {showSegmentModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`${themeClasses.cardBg} rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl`}>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="text-white" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-white">Audience Segment</h2>
                  <p className="text-purple-100 text-sm">{selectedCampaign.segmentName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSegmentModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`p-6 bg-purple-50 rounded-xl`}>
                  <h3 className={`text-lg font-semibold text-purple-900 mb-4`}>Segment Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Segment Name:</span>
                      <span className="font-semibold text-purple-900">{selectedCampaign.segmentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Segment Size:</span>
                      <span className="font-semibold text-purple-900">{selectedCampaign.segmentSize.toLocaleString()} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Campaign:</span>
                      <span className="font-semibold text-purple-900">{selectedCampaign.name}</span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 bg-blue-50 rounded-xl`}>
                  <h3 className={`text-lg font-semibold text-blue-900 mb-4`}>Engagement Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Reached:</span>
                      <span className="font-semibold text-blue-900">{Math.floor(selectedCampaign.segmentSize * 0.65).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Engaged:</span>
                      <span className="font-semibold text-blue-900">{Math.floor(selectedCampaign.segmentSize * 0.42).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Converted:</span>
                      <span className="font-semibold text-green-600">{selectedCampaign.leads}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 ${themeClasses.gradient} rounded-xl mb-6`}>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Demographic Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">35%</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>18-24 years</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">42%</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>25-34 years</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">18%</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>35-44 years</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">5%</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>45+ years</p>
                  </div>
                </div>
              </div>

              <div className={`p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl`}>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>Segment Targeting</h3>
                <p className={themeClasses.text}>This segment includes {selectedCampaign.segmentName.toLowerCase()} interested in {selectedCampaign.product} products. The audience is highly engaged with automotive content and has shown strong purchase intent signals.</p>
              </div>
            </div>

            <div className={`p-6 border-t ${themeClasses.border} flex justify-end space-x-3`}>
              <button
                onClick={() => setShowSegmentModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSegmentModal(false);
                  alert('Exporting segment data...');
                }}
                className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <Download size={18} />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

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