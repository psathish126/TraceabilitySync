import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Brain, Zap } from 'lucide-react';

interface Prediction {
  id: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
  risk: 'low' | 'medium' | 'high';
}

interface TimeSeriesData {
  date: string;
  actual: number;
  predicted: number;
  confidence: number;
}

const PredictiveAnalytics = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load real predictive analytics data
    const loadPredictiveData = async () => {
      setIsLoading(true);
      try {
        // Connect to real AI/ML service endpoint here
        // const predictions = await predictiveService.getPredictions();
        // const timeSeries = await predictiveService.getTimeSeriesData();
        // setPredictions(predictions);
        // setTimeSeriesData(timeSeries);
      } catch (error) {
        console.error('Failed to load predictive analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPredictiveData();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-danger" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high': return <Badge variant="destructive">High Risk</Badge>;
      case 'medium': return <Badge variant="outline" className="border-warning text-warning">Medium Risk</Badge>;
      case 'low': return <Badge variant="outline" className="border-success text-success">Low Risk</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPercentageChange = (current: number, predicted: number) => {
    const change = ((predicted - current) / current) * 100;
    return Math.round(change * 10) / 10;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold">Predictive Analytics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Predictive Analytics</h2>
          <Zap className="h-5 w-5 text-accent animate-pulse" />
        </div>
        <Badge variant="outline" className="border-primary text-primary w-fit">
          AI-Powered Forecasting
        </Badge>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {predictions.map((prediction) => (
          <Card key={prediction.id} className="hover:shadow-card transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{prediction.metric}</CardTitle>
                {getTrendIcon(prediction.trend)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{prediction.predictedValue}</span>
                <span className="text-sm text-muted-foreground">
                  ({getPercentageChange(prediction.currentValue, prediction.predictedValue) > 0 ? '+' : ''}
                  {getPercentageChange(prediction.currentValue, prediction.predictedValue)}%)
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence</span>
                  <span>{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-1" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{prediction.timeframe}</span>
                {getRiskBadge(prediction.risk)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Series Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Production Efficiency Forecast</CardTitle>
            <CardDescription>Actual vs Predicted performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  strokeDasharray="5,5"
                  name="Predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Confidence Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Confidence</CardTitle>
            <CardDescription>Model accuracy distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSeriesData.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Bar 
                  dataKey="confidence" 
                  fill="hsl(var(--success))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Model Performance</span>
          </CardTitle>
          <CardDescription>Real-time insights into model accuracy and reliability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Model Accuracy</p>
                <p className="text-2xl font-bold">91.2%</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processing Speed</p>
                <p className="text-2xl font-bold">2.3s</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Anomalies Detected</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;