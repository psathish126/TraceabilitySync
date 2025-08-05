import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Zap, Target } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'anomaly' | 'prediction' | 'optimization' | 'risk';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  action?: string;
}

interface AIMetrics {
  anomaliesDetected: number;
  predictiveAccuracy: number;
  riskScore: number;
  optimizationPotential: number;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [metrics, setMetrics] = useState<AIMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI-powered insights
    setTimeout(() => {
      setInsights([
        {
          id: '1',
          type: 'anomaly',
          title: 'Material Quality Deviation',
          description: 'Cobalt batch CB-2024-157 shows 15% variance from quality standards',
          confidence: 94,
          impact: 'high',
          action: 'Recommend immediate quality inspection'
        },
        {
          id: '2',
          type: 'prediction',
          title: 'Supply Chain Disruption Risk',
          description: 'Lithium supplier delivery delay predicted with 87% confidence',
          confidence: 87,
          impact: 'medium',
          action: 'Activate backup supplier protocol'
        },
        {
          id: '3',
          type: 'optimization',
          title: 'Production Efficiency Opportunity',
          description: 'Optimizing Line 3 sequence could increase throughput by 12%',
          confidence: 79,
          impact: 'medium',
          action: 'Schedule production line optimization'
        },
        {
          id: '4',
          type: 'risk',
          title: 'Compliance Risk Assessment',
          description: 'EU Battery Regulation compliance score: 92% - minor gaps identified',
          confidence: 96,
          impact: 'low',
          action: 'Review documentation requirements'
        }
      ]);

      setMetrics({
        anomaliesDetected: 3,
        predictiveAccuracy: 91.5,
        riskScore: 23,
        optimizationPotential: 15.7
      });

      setIsLoading(false);
    }, 1500);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'anomaly': return <AlertTriangle className="h-5 w-5" />;
      case 'prediction': return <TrendingUp className="h-5 w-5" />;
      case 'optimization': return <Target className="h-5 w-5" />;
      case 'risk': return <CheckCircle className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'anomaly': return 'text-danger';
      case 'prediction': return 'text-warning';
      case 'optimization': return 'text-success';
      case 'risk': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high': return <Badge variant="destructive">High Impact</Badge>;
      case 'medium': return <Badge variant="outline" className="border-warning text-warning">Medium Impact</Badge>;
      case 'low': return <Badge variant="secondary">Low Impact</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
        <Zap className="h-5 w-5 text-accent animate-pulse" />
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Anomalies Detected</p>
                <p className="text-2xl font-bold text-danger">{metrics?.anomaliesDetected}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-danger" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predictive Accuracy</p>
                <p className="text-2xl font-bold text-success">{metrics?.predictiveAccuracy}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-2xl font-bold text-warning">{metrics?.riskScore}/100</p>
              </div>
              <Target className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Optimization Potential</p>
                <p className="text-2xl font-bold text-primary">+{metrics?.optimizationPotential}%</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className="hover:shadow-card transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getInsightColor(insight.type)}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </div>
                {getImpactBadge(insight.impact)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {insight.description}
              </CardDescription>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">AI Confidence</span>
                  <span className="font-medium">{insight.confidence}%</span>
                </div>
                <Progress 
                  value={insight.confidence} 
                  className="h-2"
                />
              </div>

              {insight.action && (
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm font-medium text-accent">Recommended Action:</p>
                  <p className="text-sm text-muted-foreground mt-1">{insight.action}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;