import React, { useState } from "react";
import { CheckCircle, Calendar, Play, Pause, TrendingUp, Eye, MousePointer, DollarSign, Target, Sparkles, Image as ImageIcon, Video, FileText, Download, CreditCard as Edit3, Copy, Trash2, Settings, BarChart3, AlertTriangle, ThumbsUp, Clock, Users, Globe, Activity, Zap, Bot, ArrowRight, ChevronRight, ExternalLink, Filter, Search, CalendarCheck, FolderOpen, TrendingDown, AlertCircle, Plus } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { PromotionCalendar } from "./PromotionCalendar";

interface Creative {
  id: string;
  type: "image" | "video" | "text";
  name: string;
  thumbnail?: string;
  status: "approved" | "pending" | "rejected";
  performance?: {
    impressions: number;
    clicks: number;
    ctr: number;
  };
}

interface Campaign {
  id: string;
  name: string;
  status: "approved" | "running" | "paused" | "completed";
  objective: string;
  budget: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  audience: string;
  creatives: Creative[];
}

export const MarketingStudio: React.FC = () => {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [activeSection, setActiveSection] = useState<"details" | "scheduler" | "execution" | "performance">("details");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignStatus, setCampaignStatus] = useState<"paused" | "running">("paused");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sections = [
    { id: "details", label: "Campaign Overview", icon: FolderOpen },
    { id: "scheduler", label: "Campaign Scheduler", icon: CalendarCheck },
    { id: "execution", label: "Run Campaign", icon: Play },
    { id: "performance", label: "Performance Monitor", icon: BarChart3 },
  ];

  const approvedCampaigns: Campaign[] = [
    {
      id: "camp-001",
      name: "Summer Sale 2025",
      status: "approved",
      objective: "Drive conversions and increase sales",
      budget: 50000,
      startDate: "2025-10-15",
      endDate: "2025-11-15",
      platforms: ["Facebook", "Instagram", "Google Ads", "LinkedIn"],
      audience: "Age 25-45, Urban, Tech-savvy professionals",
      creatives: [
        {
          id: "cr-001",
          type: "image",
          name: "Hero Banner - Desktop",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
          id: "cr-002",
          type: "video",
          name: "Product Showcase 30s",
          status: "approved",
        },
        {
          id: "cr-003",
          type: "image",
          name: "Mobile Banner",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
          id: "cr-004",
          type: "text",
          name: "Ad Copy - Primary",
          status: "approved",
        },
      ],
    },
    {
      id: "camp-002",
      name: "Brand Awareness Q4",
      status: "running",
      objective: "Increase brand visibility and engagement",
      budget: 35000,
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      platforms: ["YouTube", "TikTok", "Instagram"],
      audience: "Age 18-35, Social media active users",
      creatives: [
        {
          id: "cr-005",
          type: "video",
          name: "Brand Story Video",
          status: "approved",
        },
        {
          id: "cr-006",
          type: "image",
          name: "Social Media Card",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
      ],
    },
    {
      id: "camp-003",
      name: "Product Launch Teaser",
      status: "approved",
      objective: "Generate buzz for new product launch",
      budget: 25000,
      startDate: "2025-10-20",
      endDate: "2025-11-10",
      platforms: ["Twitter", "LinkedIn", "Facebook"],
      audience: "Tech enthusiasts, Early adopters",
      creatives: [
        {
          id: "cr-007",
          type: "video",
          name: "Teaser Video 15s",
          status: "approved",
        },
        {
          id: "cr-008",
          type: "image",
          name: "Product Teaser Banner",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
      ],
    },
    {
      id: "camp-004",
      name: "Holiday Special Promotion",
      status: "paused",
      objective: "Drive holiday season sales",
      budget: 60000,
      startDate: "2025-11-01",
      endDate: "2025-12-25",
      platforms: ["Facebook", "Instagram", "Google Ads", "Pinterest"],
      audience: "Shoppers, Gift buyers",
      creatives: [
        {
          id: "cr-009",
          type: "image",
          name: "Holiday Banner Set",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
          id: "cr-010",
          type: "video",
          name: "Holiday Promo 30s",
          status: "approved",
        },
      ],
    },
    {
      id: "camp-005",
      name: "Customer Retention Campaign",
      status: "completed",
      objective: "Increase customer loyalty and repeat purchases",
      budget: 18000,
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      platforms: ["Email", "Facebook", "Instagram"],
      audience: "Existing customers",
      creatives: [
        {
          id: "cr-011",
          type: "image",
          name: "Loyalty Program Banner",
          status: "approved",
          thumbnail: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
      ],
    },
  ];

  const performanceMetrics = [
    {
      title: "Impressions",
      value: "2.4M",
      change: "+18.2%",
      icon: Eye,
      color: "blue",
    },
    {
      title: "Clicks",
      value: "67.8K",
      change: "+12.5%",
      icon: MousePointer,
      color: "green",
    },
    {
      title: "CTR",
      value: "2.82%",
      change: "+0.4%",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Spend",
      value: "$12,450",
      change: "+8.7%",
      icon: DollarSign,
      color: "orange",
    },
  ];

  const aiSuggestions = [
    {
      id: "1",
      type: "optimization",
      title: "Increase Facebook Budget",
      description: "Facebook ads showing 15% higher CTR. Consider reallocating 20% budget from LinkedIn.",
      impact: "high",
      action: "Optimize Budget",
    },
    {
      id: "2",
      type: "creative",
      title: "Refresh Creative Assets",
      description: "Creative fatigue detected. Video creative performance dropped 12% in last 3 days.",
      impact: "medium",
      action: "Generate New Creative",
    },
    {
      id: "3",
      type: "timing",
      title: "Optimal Schedule Window",
      description: "Peak engagement detected 6-9 PM. Increase bid adjustments during these hours.",
      impact: "high",
      action: "Adjust Schedule",
    },
  ];

  const platformPerformance = [
    {
      platform: "Facebook",
      impressions: "1.2M",
      clicks: "32.4K",
      ctr: "2.7%",
      spend: "$4,200",
      roas: "4.2x",
      status: "excellent",
    },
    {
      platform: "Instagram",
      impressions: "850K",
      clicks: "21.5K",
      ctr: "2.5%",
      spend: "$3,800",
      roas: "3.8x",
      status: "good",
    },
    {
      platform: "Google Ads",
      impressions: "280K",
      clicks: "11.2K",
      ctr: "4.0%",
      spend: "$3,200",
      roas: "5.1x",
      status: "excellent",
    },
    {
      platform: "LinkedIn",
      impressions: "70K",
      clicks: "2.7K",
      ctr: "3.9%",
      spend: "$1,250",
      roas: "2.8x",
      status: "good",
    },
  ];

  React.useEffect(() => {
    if (approvedCampaigns.length > 0) {
      setSelectedCampaign(approvedCampaigns[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "running":
        return "bg-blue-100 text-blue-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-blue-500 bg-blue-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const filteredCampaigns = approvedCampaigns.filter((campaign) => {
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const campaignStats = {
    total: approvedCampaigns.length,
    approved: approvedCampaigns.filter((c) => c.status === "approved").length,
    running: approvedCampaigns.filter((c) => c.status === "running").length,
    paused: approvedCampaigns.filter((c) => c.status === "paused").length,
    completed: approvedCampaigns.filter((c) => c.status === "completed").length,
    totalBudget: approvedCampaigns.reduce((sum, c) => sum + c.budget, 0),
  };

  const renderCampaignDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FolderOpen className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-blue-600">{campaignStats.total}</span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Total Campaigns</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>All campaigns in system</p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-green-600">{campaignStats.approved}</span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Approved</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Ready to launch</p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Play className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-blue-600">{campaignStats.running}</span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Running</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Currently live</p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-5 hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              ${(campaignStats.totalBudget / 1000).toFixed(0)}K
            </span>
          </div>
          <h3 className={`font-semibold ${themeClasses.text}`}>Total Budget</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Across all campaigns</p>
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-1`}>Campaign List</h3>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64`}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="running">Running</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className={`p-5 rounded-xl cursor-pointer transition-all border-2 ${
                selectedCampaign?.id === campaign.id
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : `${themeClasses.border} ${themeClasses.hover}`
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className={`font-bold ${themeClasses.text} text-lg`}>{campaign.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>

              <p className={`text-sm ${themeClasses.textSecondary} mb-4 line-clamp-2`}>
                {campaign.objective}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${themeClasses.textSecondary}`}>Budget</span>
                  <span className={`text-sm font-bold ${themeClasses.text}`}>
                    ${campaign.budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${themeClasses.textSecondary}`}>Duration</span>
                  <span className={`text-sm font-semibold ${themeClasses.text}`}>
                    {Math.ceil(
                      (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-1">
                  <Globe className="text-gray-400" size={14} />
                  <span className={`text-xs ${themeClasses.textSecondary}`}>
                    {campaign.platforms.length} platforms
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ImageIcon className="text-gray-400" size={14} />
                  <span className={`text-xs ${themeClasses.textSecondary}`}>
                    {campaign.creatives.length} creatives
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
            <p className={`text-lg font-semibold ${themeClasses.text} mb-1`}>No campaigns found</p>
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {selectedCampaign && (
        <div className="space-y-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-2xl font-bold ${themeClasses.text}`}>
                    {selectedCampaign.name}
                  </h3>
                  <p className={`${themeClasses.textSecondary} mt-1`}>
                    {selectedCampaign.objective}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(selectedCampaign.status)}`}>
                  {selectedCampaign.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${themeClasses.hover}`}>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Budget</p>
                  <p className={`text-xl font-bold ${themeClasses.text}`}>
                    ${selectedCampaign.budget.toLocaleString()}
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${themeClasses.hover}`}>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Duration</p>
                  <p className={`text-xl font-bold ${themeClasses.text}`}>
                    {Math.ceil((new Date(selectedCampaign.endDate).getTime() - new Date(selectedCampaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${themeClasses.hover}`}>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Platforms</p>
                  <p className={`text-xl font-bold ${themeClasses.text}`}>
                    {selectedCampaign.platforms.length}
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${themeClasses.hover}`}>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Creatives</p>
                  <p className={`text-xl font-bold ${themeClasses.text}`}>
                    {selectedCampaign.creatives.length}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${themeClasses.text} mb-2`}>Target Audience</h4>
                <p className={`${themeClasses.textSecondary}`}>{selectedCampaign.audience}</p>
              </div>

              <div>
                <h4 className={`text-sm font-semibold ${themeClasses.text} mb-2`}>Selected Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>
                Approved Creatives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCampaign.creatives.map((creative) => (
                  <div
                    key={creative.id}
                    className={`${themeClasses.border} border rounded-xl overflow-hidden ${themeClasses.hover} transition-all`}
                  >
                    {creative.thumbnail ? (
                      <img
                        src={creative.thumbnail}
                        alt={creative.name}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        {creative.type === "video" ? (
                          <Video className="text-blue-500" size={48} />
                        ) : creative.type === "text" ? (
                          <FileText className="text-purple-500" size={48} />
                        ) : (
                          <ImageIcon className="text-green-500" size={48} />
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${themeClasses.text} text-sm`}>
                          {creative.name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(creative.status)}`}>
                          {creative.status}
                        </span>
                      </div>
                      <p className={`text-xs ${themeClasses.textSecondary} capitalize`}>
                        {creative.type}
                      </p>
                      <div className="flex items-center space-x-2 mt-3">
                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                          <Download size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                          <Edit3 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );

  const renderScheduler = () => (
    <div className="space-y-6">
      {selectedCampaign && (
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
                Schedule Campaign: {selectedCampaign.name}
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Plan optimal timing for maximum impact
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              <span>Add to Calendar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Calendar className="mr-2 text-blue-600" size={20} />
                Campaign Dates
              </h4>
              <div className="space-y-3">
                <div>
                  <label className={`text-xs ${themeClasses.textSecondary} mb-1 block`}>Start Date</label>
                  <input
                    type="date"
                    value={selectedCampaign.startDate}
                    className={`w-full px-3 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg text-sm ${themeClasses.text}`}
                  />
                </div>
                <div>
                  <label className={`text-xs ${themeClasses.textSecondary} mb-1 block`}>End Date</label>
                  <input
                    type="date"
                    value={selectedCampaign.endDate}
                    className={`w-full px-3 py-2 ${themeClasses.cardBg} ${themeClasses.border} border rounded-lg text-sm ${themeClasses.text}`}
                  />
                </div>
                <div className="pt-2">
                  <p className={`text-xs ${themeClasses.textSecondary}`}>Duration</p>
                  <p className={`text-lg font-bold ${themeClasses.text}`}>
                    {Math.ceil(
                      (new Date(selectedCampaign.endDate).getTime() -
                        new Date(selectedCampaign.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </p>
                </div>
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Globe className="mr-2 text-purple-600" size={20} />
                Selected Platforms
              </h4>
              <div className="space-y-2">
                {selectedCampaign.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
                  >
                    <span className={`font-medium text-sm ${themeClasses.text}`}>{platform}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5`}>
              <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Sparkles className="mr-2 text-orange-600" size={20} />
                AI Recommendations
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 p-2 rounded-lg bg-green-50">
                  <ThumbsUp className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className={`text-xs font-medium ${themeClasses.text}`}>Best Launch Window</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>Oct 15-18 recommended</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-2 rounded-lg bg-blue-50">
                  <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className={`text-xs font-medium ${themeClasses.text}`}>Peak Hours</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>6-9 PM weekdays</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-2 rounded-lg bg-purple-50">
                  <Target className="text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className={`text-xs font-medium ${themeClasses.text}`}>Avoid Conflicts</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>2 campaigns overlap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PromotionCalendar />
    </div>
  );

  const renderExecution = () => (
    <div className="space-y-6">
      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Play className="text-green-600" size={24} />
            <div>
              <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
                Campaign Execution
              </h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Launch and manage your campaigns
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {campaignStatus === "running" ? (
              <button
                onClick={() => setCampaignStatus("paused")}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Pause size={18} />
                <span>Pause Campaign</span>
              </button>
            ) : (
              <button
                onClick={() => setCampaignStatus("running")}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play size={18} />
                <span>Launch Campaign</span>
              </button>
            )}
          </div>
        </div>

        {campaignStatus === "running" && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className={`font-semibold ${themeClasses.text}`}>Campaign is Live</p>
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  Running across {selectedCampaign?.platforms.length} platforms
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5`}>
            <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
              <Activity className="mr-2 text-blue-600" size={20} />
              Campaign Status
            </h4>
            <div className="space-y-3">
              {selectedCampaign?.platforms.map((platform, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className={`font-medium ${themeClasses.text}`}>{platform}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaignStatus === "running"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {campaignStatus === "running" ? "Live" : "Paused"}
                    </span>
                    <ExternalLink className="text-gray-400 cursor-pointer hover:text-blue-600" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-5`}>
            <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
              <Settings className="mr-2 text-purple-600" size={20} />
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                <span className="font-medium">Adjust Budget</span>
                <ChevronRight size={18} />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">
                <span className="font-medium">Update Creative</span>
                <ChevronRight size={18} />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                <span className="font-medium">Modify Targeting</span>
                <ChevronRight size={18} />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors">
                <span className="font-medium">View Reports</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {campaignStatus === "running" && (
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
          <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>
            Live Campaign Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-4`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`text-${metric.color}-600`} size={20} />
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      metric.change.startsWith("+")
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${themeClasses.text}`}>{metric.value}</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{metric.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isPositive = metric.change.startsWith("+");
          return (
            <div
              key={idx}
              className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6 hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                  <Icon className={`text-${metric.color}-600`} size={24} />
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isPositive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{metric.value}</h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>{metric.title}</p>
            </div>
          );
        })}
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6`}>
          Platform Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${themeClasses.border}`}>
                <th className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}>
                  Platform
                </th>
                <th className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}>
                  Impressions
                </th>
                <th className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}>
                  Clicks
                </th>
                <th className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}>
                  CTR
                </th>
                <th className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}>
                  Spend
                </th>
                <th className={`text-right py-3 px-4 font-semibold ${themeClasses.text}`}>
                  ROAS
                </th>
                <th className={`text-center py-3 px-4 font-semibold ${themeClasses.text}`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {platformPerformance.map((platform, idx) => (
                <tr
                  key={idx}
                  className={`border-b ${themeClasses.border} ${themeClasses.hover} transition-colors`}
                >
                  <td className="py-4 px-4">
                    <span className={`font-medium ${themeClasses.text}`}>{platform.platform}</span>
                  </td>
                  <td className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}>
                    {platform.impressions}
                  </td>
                  <td className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}>
                    {platform.clicks}
                  </td>
                  <td className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}>
                    {platform.ctr}
                  </td>
                  <td className={`py-4 px-4 text-right font-medium ${themeClasses.text}`}>
                    {platform.spend}
                  </td>
                  <td className={`py-4 px-4 text-right font-bold text-green-600`}>
                    {platform.roas}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        platform.status === "excellent"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {platform.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3 mb-6">
          <Bot className="text-purple-600" size={24} />
          <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
            AI Performance Agent Suggestions
          </h3>
        </div>
        <div className="space-y-4">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`border-l-4 rounded-lg p-5 ${getImpactColor(suggestion.impact)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="text-purple-500" size={18} />
                    <h4 className={`font-semibold ${themeClasses.text}`}>{suggestion.title}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        suggestion.impact === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {suggestion.impact} impact
                    </span>
                  </div>
                  <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>
                    {suggestion.description}
                  </p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    <Zap size={16} />
                    <span>{suggestion.action}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen max-h-screen overflow-auto ${themeClasses.bg}`}>
      <div className="space-y-6 md:space-y-8 p-6 md:p-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Target className={`${themeClasses.text}`} size={32} />
            <h2
              className={`text-3xl font-bold ${themeClasses.text} bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent`}
            >
              Marketing Studio
            </h2>
          </div>
          <p className={`${themeClasses.textSecondary}`}>
            Execute, monitor, and optimize your approved campaigns
          </p>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-2`}>
          <div className="flex space-x-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? `${themeClasses.accent} text-white shadow-lg`
                      : `${themeClasses.text} ${themeClasses.hover}`
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeSection === "details" && renderCampaignDetails()}
        {activeSection === "scheduler" && renderScheduler()}
        {activeSection === "execution" && renderExecution()}
        {activeSection === "performance" && renderPerformance()}
      </div>
    </div>
  );
};
