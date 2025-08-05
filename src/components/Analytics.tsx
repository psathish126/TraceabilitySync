import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface AnalyticsData {
  productionTrends: {
    labels: string[];
    values: number[];
  };
  materialDistribution: {
    cobalt: number;
    lithium: number;
    nickel: number;
    graphite: number;
  };
  qualityMetrics: {
    averageScore: number;
    defectRate: number;
    reworkRate: number;
    complianceRate: number;
  };
  bottleneckPredictions: {
    stage: string;
    probability: number;
    impact: 'high' | 'medium' | 'low';
    estimatedDelay: number;
  }[];
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    productionTrends: {
      labels: [],
      values: []
    },
    materialDistribution: {
      cobalt: 0,
      lithium: 0,
      nickel: 0,
      graphite: 0
    },
    qualityMetrics: {
      averageScore: 0,
      defectRate: 0,
      reworkRate: 0,
      complianceRate: 0
    },
    bottleneckPredictions: []
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Connect to real API endpoint here
      // const data = await apiService.getAnalyticsData(selectedTimeRange);
      // setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-danger bg-danger/10 border-danger/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  // Simple chart component for production trends
  const ProductionChart = () => {
    const maxValue = Math.max(...analyticsData.productionTrends.values);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Daily Production Output</h4>
          <div className="flex items-center space-x-2 text-sm text-success">
            <TrendingUp className="w-4 h-4" />
            <span>+12.3% vs last week</span>
          </div>
        </div>
        
        <div className="h-48 flex items-end justify-between space-x-2 p-4">
          {analyticsData.productionTrends.values.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div 
                className="w-8 bg-gradient-primary rounded-t"
                style={{ height: `${(value / maxValue) * 150}px` }}
              ></div>
              <span className="text-xs text-muted-foreground">
                {analyticsData.productionTrends.labels[index]}
              </span>
              <span className="text-xs font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Simple donut chart for material distribution
  const MaterialChart = () => {
    const total = Object.values(analyticsData.materialDistribution).reduce((a, b) => a + b, 0);
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold">Material Distribution</h4>
        <div className="space-y-3">
          {Object.entries(analyticsData.materialDistribution).map(([material, percentage]) => (
            <div key={material} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize font-medium">{material}</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Predictive insights and historical trends</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <Button 
            variant="outline" 
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Quality Score</p>
              <p className="text-3xl font-bold text-success">{analyticsData.qualityMetrics.averageScore.toFixed(1)}%</p>
            </div>
            <div className="flex items-center text-success">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+2.1%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Defect Rate</p>
              <p className="text-3xl font-bold text-warning">{analyticsData.qualityMetrics.defectRate.toFixed(1)}%</p>
            </div>
            <div className="flex items-center text-success">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm">-0.3%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rework Rate</p>
              <p className="text-3xl font-bold text-primary">{analyticsData.qualityMetrics.reworkRate.toFixed(1)}%</p>
            </div>
            <div className="flex items-center text-success">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm">-0.1%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
              <p className="text-3xl font-bold text-success">{analyticsData.qualityMetrics.complianceRate.toFixed(1)}%</p>
            </div>
            <div className="flex items-center text-success">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+0.5%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card border-card-border">
          <ProductionChart />
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <MaterialChart />
        </Card>
      </div>

      {/* Bottleneck Predictions */}
      <Card className="p-6 shadow-card border-card-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Bottleneck Predictions
          </h3>
          <span className="text-sm text-muted-foreground">AI-powered insights</span>
        </div>
        
        <div className="space-y-4">
          {analyticsData.bottleneckPredictions.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getImpactColor(prediction.impact)}`}>
                    {prediction.impact.toUpperCase()}
                  </div>
                </div>
                <div>
                  <p className="font-medium">{prediction.stage}</p>
                  <p className="text-sm text-muted-foreground">
                    {prediction.probability}% probability of bottleneck
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{prediction.estimatedDelay} min</p>
                <p className="text-sm text-muted-foreground">Est. delay</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tableau Integration Placeholder */}
      <Card className="p-6 shadow-card border-card-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-primary" />
            Advanced Analytics (Tableau)
          </h3>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-8 text-center border-2 border-dashed border-muted">
          <div className="max-w-md mx-auto">
            <PieChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">Tableau Dashboard Integration</h4>
            <p className="text-muted-foreground mb-4">
              Connect your Tableau workspace to embed advanced analytics and custom dashboards
            </p>
            <Button variant="outline">
              Connect Tableau
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;