import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Factory, 
  Truck,
  Battery,
  Gauge
} from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import heroImage from '../assets/hero-manufacturing.jpg';

interface DashboardMetrics {
  ethicalSourcing: number;
  productionEfficiency: number;
  defectRate: number;
  activeMaterials: number;
  completedBatches: number;
  pendingShipments: number;
}

interface MaterialFlow {
  stage: string;
  count: number;
  status: 'normal' | 'warning' | 'critical';
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    ethicalSourcing: 0,
    productionEfficiency: 0,
    defectRate: 0,
    activeMaterials: 0,
    completedBatches: 0,
    pendingShipments: 0
  });

  const [materialFlow, setMaterialFlow] = useState<MaterialFlow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load real data from API
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Connect to real API endpoints here
        // const metrics = await apiService.getDashboardMetrics();
        // const flow = await apiService.getMaterialFlow();
        // setMetrics(metrics);
        // setMaterialFlow(flow);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-danger';
      default:
        return 'text-success';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-hero">
        <img 
          src={heroImage} 
          alt="Manufacturing Facility" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-4xl font-bold mb-2">TraceabilitySync Dashboard</h1>
            <p className="text-xl opacity-90">Real-time material tracking for EV battery production</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ethical Sourcing</p>
              <p className="text-3xl font-bold text-success">{metrics.ethicalSourcing}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <Progress value={metrics.ethicalSourcing} className="mt-3" />
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Production Efficiency</p>
              <p className="text-3xl font-bold text-primary">{metrics.productionEfficiency}%</p>
            </div>
            <Gauge className="w-8 h-8 text-primary" />
          </div>
          <Progress value={metrics.productionEfficiency} className="mt-3" />
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Defect Rate</p>
              <p className="text-3xl font-bold text-warning">{metrics.defectRate}%</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-warning" />
          </div>
          <Progress value={metrics.defectRate} className="mt-3" />
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Materials</p>
              <p className="text-3xl font-bold text-foreground">{metrics.activeMaterials.toLocaleString()}</p>
            </div>
            <Factory className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Material Flow Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card border-card-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Material Flow Status
          </h3>
          <div className="space-y-4">
            {materialFlow.map((flow, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(flow.status)}
                  <span className="font-medium">{flow.stage}</span>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${getStatusColor(flow.status)}`}>
                    {flow.count}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">units</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Battery className="w-5 h-5 mr-2 text-primary" />
            Production Summary
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Completed Batches</span>
              </div>
              <span className="text-2xl font-bold text-success">{metrics.completedBatches}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-primary" />
                <span>Pending Shipments</span>
              </div>
              <span className="text-2xl font-bold text-primary">{metrics.pendingShipments}</span>
            </div>

            <div className="pt-4 border-t border-card-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">
                  {((metrics.completedBatches / (metrics.completedBatches + metrics.pendingShipments)) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
          Recent Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div>
              <p className="font-medium">Quality Check Bottleneck</p>
              <p className="text-sm text-muted-foreground">89 materials pending quality verification</p>
            </div>
            <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <p className="font-medium">Batch #B2025-0730 Completed</p>
              <p className="text-sm text-muted-foreground">156 EV battery units ready for shipment</p>
            </div>
            <span className="text-xs text-muted-foreground ml-auto">15 min ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;