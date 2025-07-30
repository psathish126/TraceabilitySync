import React, { useState } from 'react';
import { 
  Shield, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Calendar,
  Zap,
  Globe
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ComplianceReport {
  id: string;
  name: string;
  status: 'compliant' | 'pending' | 'non-compliant';
  lastUpdated: string;
  validUntil: string;
  coverage: number;
  regulations: string[];
}

interface ComplianceMetric {
  name: string;
  value: number;
  target: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const Compliance: React.FC = () => {
  const [reports] = useState<ComplianceReport[]>([
    {
      id: 'EU-BP-2025-001',
      name: 'EU Battery Passport',
      status: 'compliant',
      lastUpdated: '2025-07-30T10:00:00Z',
      validUntil: '2025-12-31T23:59:59Z',
      coverage: 98.5,
      regulations: ['EU Battery Regulation 2023/1542', 'REACH Regulation', 'RoHS Directive']
    },
    {
      id: 'OECD-DD-2025-002',
      name: 'OECD Due Diligence',
      status: 'compliant',
      lastUpdated: '2025-07-29T15:30:00Z',
      validUntil: '2025-11-30T23:59:59Z',
      coverage: 95.2,
      regulations: ['OECD Guidelines', 'Conflict Minerals Regulation']
    },
    {
      id: 'ISO-14001-2025-003',
      name: 'ISO 14001 Environmental',
      status: 'pending',
      lastUpdated: '2025-07-28T09:15:00Z',
      validUntil: '2025-10-15T23:59:59Z',
      coverage: 87.3,
      regulations: ['ISO 14001:2015', 'Environmental Management Systems']
    },
    {
      id: 'GHG-2025-004',
      name: 'GHG Protocol Reporting',
      status: 'non-compliant',
      lastUpdated: '2025-07-25T14:20:00Z',
      validUntil: '2025-09-30T23:59:59Z',
      coverage: 72.1,
      regulations: ['GHG Protocol Scope 1-3', 'Carbon Footprint Standards']
    }
  ]);

  const [metrics] = useState<ComplianceMetric[]>([
    {
      name: 'Ethical Sourcing',
      value: 95.8,
      target: 95.0,
      status: 'good',
      trend: 'up'
    },
    {
      name: 'Carbon Footprint',
      value: 78.2,
      target: 85.0,
      status: 'warning',
      trend: 'down'
    },
    {
      name: 'Supply Chain Transparency',
      value: 92.4,
      target: 90.0,
      status: 'good',
      trend: 'stable'
    },
    {
      name: 'Regulatory Compliance',
      value: 88.7,
      target: 95.0,
      status: 'warning',
      trend: 'up'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'good':
        return 'text-success';
      case 'pending':
      case 'warning':
        return 'text-warning';
      case 'non-compliant':
      case 'critical':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'compliant':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'non-compliant':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'good':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'non-compliant':
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const generateReport = (reportId: string) => {
    // Simulate report generation
    console.log(`Generating report for ${reportId}`);
    // In a real application, this would trigger a download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Compliance Dashboard</h2>
          <p className="text-muted-foreground">Regulatory compliance and sustainability reporting</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Generate Master Report
        </Button>
      </div>

      {/* Compliance Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6 shadow-card border-card-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(1)}%
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
              </div>
              {getStatusIcon(metric.status)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Target: {metric.target}%</span>
                <span className={getStatusColor(metric.status)}>
                  {metric.value >= metric.target ? 'On Track' : 'Below Target'}
                </span>
              </div>
              <Progress value={(metric.value / metric.target) * 100} className="h-2" />
            </div>
          </Card>
        ))}
      </div>

      {/* Compliance Reports */}
      <Card className="shadow-card border-card-border">
        <div className="p-6 border-b border-card-border">
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            Compliance Reports
          </h3>
        </div>
        
        <div className="divide-y divide-card-border">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-muted/20 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(report.status)}
                    <h4 className="font-semibold text-lg">{report.name}</h4>
                    <Badge variant={getStatusVariant(report.status)}>
                      {report.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Report ID:</span>
                      <p className="font-medium">{report.id}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span>
                      <p className="font-medium">{formatDate(report.lastUpdated)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Valid Until:</span>
                      <p className="font-medium">{formatDate(report.validUntil)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">{report.coverage}%</span>
                    </div>
                    <Progress value={report.coverage} className="h-2" />
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-muted-foreground text-sm">Regulations:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {report.regulations.map((regulation, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {regulation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 lg:ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateReport(report.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Regulatory Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card border-card-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-primary" />
            Recent Regulatory Updates
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">EU Battery Regulation Update</p>
                  <p className="text-sm text-muted-foreground">
                    New carbon footprint declaration requirements effective January 2025
                  </p>
                  <span className="text-xs text-muted-foreground">July 28, 2025</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">OECD Due Diligence Guidelines</p>
                  <p className="text-sm text-muted-foreground">
                    Enhanced supply chain transparency requirements for critical minerals
                  </p>
                  <span className="text-xs text-muted-foreground">July 25, 2025</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">ISO 14001 Standard Revision</p>
                  <p className="text-sm text-muted-foreground">
                    Environmental management system certification requirements updated
                  </p>
                  <span className="text-xs text-muted-foreground">July 22, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card border-card-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-primary" />
            Action Items
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-danger/10 rounded-lg border border-danger/20">
              <div>
                <p className="font-medium text-danger">Update GHG Protocol Report</p>
                <p className="text-sm text-muted-foreground">Due in 15 days</p>
              </div>
              <Button size="sm" variant="outline">
                Start
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div>
                <p className="font-medium text-warning">Renew ISO 14001 Certification</p>
                <p className="text-sm text-muted-foreground">Due in 45 days</p>
              </div>
              <Button size="sm" variant="outline">
                Schedule
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
              <div>
                <p className="font-medium text-success">Submit OECD Due Diligence</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Compliance;