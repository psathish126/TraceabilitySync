import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Thermometer, 
  Zap, 
  Activity,
  Settings
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import digitalTwinImage from '../assets/digital-twin-view.jpg';

interface ProcessStage {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'maintenance' | 'error';
  progress: number;
  temperature: number;
  powerConsumption: number;
  throughput: number;
  materialCount: number;
}

interface SimulationData {
  isRunning: boolean;
  speed: number;
  totalMaterials: number;
  processedToday: number;
  efficiency: number;
}

const DigitalTwin: React.FC = () => {
  const [simulationData, setSimulationData] = useState<SimulationData>({
    isRunning: true,
    speed: 1.0,
    totalMaterials: 1247,
    processedToday: 856,
    efficiency: 88.5
  });

  const [processStages, setProcessStages] = useState<ProcessStage[]>([
    {
      id: 'raw-intake',
      name: 'Raw Material Intake',
      status: 'active',
      progress: 75,
      temperature: 22,
      powerConsumption: 45,
      throughput: 120,
      materialCount: 542
    },
    {
      id: 'processing',
      name: 'Material Processing',
      status: 'active',
      progress: 92,
      temperature: 85,
      powerConsumption: 180,
      throughput: 95,
      materialCount: 318
    },
    {
      id: 'quality-check',
      name: 'Quality Verification',
      status: 'maintenance',
      progress: 45,
      temperature: 25,
      powerConsumption: 30,
      throughput: 0,
      materialCount: 89
    },
    {
      id: 'assembly',
      name: 'Battery Assembly',
      status: 'active',
      progress: 88,
      temperature: 32,
      powerConsumption: 220,
      throughput: 85,
      materialCount: 156
    },
    {
      id: 'packaging',
      name: 'Final Packaging',
      status: 'active',
      progress: 95,
      temperature: 24,
      powerConsumption: 65,
      throughput: 110,
      materialCount: 73
    }
  ]);

  const [selectedStage, setSelectedStage] = useState<ProcessStage | null>(null);

  useEffect(() => {
    if (!simulationData.isRunning) return;

    const interval = setInterval(() => {
      setProcessStages(prev => prev.map(stage => {
        if (stage.status === 'maintenance' || stage.status === 'error') return stage;
        
        return {
          ...stage,
          progress: Math.min(100, stage.progress + Math.random() * 2),
          temperature: stage.temperature + (Math.random() - 0.5) * 2,
          powerConsumption: stage.powerConsumption + (Math.random() - 0.5) * 10,
          throughput: Math.max(0, stage.throughput + (Math.random() - 0.5) * 5)
        };
      }));

      setSimulationData(prev => ({
        ...prev,
        processedToday: prev.processedToday + Math.floor(Math.random() * 3),
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [simulationData.isRunning]);

  const toggleSimulation = () => {
    setSimulationData(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetSimulation = () => {
    setSimulationData(prev => ({ ...prev, processedToday: 0, efficiency: 88.5 }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'maintenance':
        return 'text-warning';
      case 'error':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success animate-pulse';
      case 'maintenance':
        return 'bg-warning';
      case 'error':
        return 'bg-danger animate-pulse';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Digital Twin View</h2>
          <p className="text-muted-foreground">Real-time 3D visualization of manufacturing processes</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant={simulationData.isRunning ? "secondary" : "default"}
            onClick={toggleSimulation}
          >
            {simulationData.isRunning ? (
              <><Pause className="w-4 h-4 mr-2" />Pause</>
            ) : (
              <><Play className="w-4 h-4 mr-2" />Start</>
            )}
          </Button>
          <Button variant="outline" onClick={resetSimulation}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline">
            <Maximize className="w-4 h-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Simulation Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-card border-card-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className={`font-bold ${simulationData.isRunning ? 'text-success' : 'text-warning'}`}>
                {simulationData.isRunning ? 'Running' : 'Paused'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${simulationData.isRunning ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
          </div>
        </Card>

        <Card className="p-4 shadow-card border-card-border">
          <div>
            <p className="text-sm text-muted-foreground">Total Materials</p>
            <p className="text-2xl font-bold text-foreground">{simulationData.totalMaterials.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="p-4 shadow-card border-card-border">
          <div>
            <p className="text-sm text-muted-foreground">Processed Today</p>
            <p className="text-2xl font-bold text-primary">{simulationData.processedToday.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="p-4 shadow-card border-card-border">
          <div>
            <p className="text-sm text-muted-foreground">Efficiency</p>
            <p className="text-2xl font-bold text-success">{simulationData.efficiency.toFixed(1)}%</p>
          </div>
        </Card>
      </div>

      {/* Main Digital Twin View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Visualization */}
        <div className="lg:col-span-2">
          <Card className="shadow-card border-card-border overflow-hidden">
            <div className="relative h-96 bg-gradient-subtle">
              <img 
                src={digitalTwinImage} 
                alt="Digital Twin Factory Floor" 
                className="w-full h-full object-cover"
              />
              
              {/* Interactive Process Points */}
              <div className="absolute inset-0">
                {processStages.map((stage, index) => (
                  <div 
                    key={stage.id}
                    className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-110`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 2) * 20}%`
                    }}
                    onClick={() => setSelectedStage(stage)}
                  >
                    <div className={`w-4 h-4 rounded-full ${getStatusDot(stage.status)} shadow-glow`}></div>
                    <div className="mt-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
                      {stage.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulation Controls Overlay */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Live Simulation</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Process Stages List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Settings className="w-5 h-5 mr-2 text-primary" />
            Process Stages
          </h3>
          
          {processStages.map((stage) => (
            <Card 
              key={stage.id} 
              className={`p-4 shadow-card border-card-border cursor-pointer transition-all duration-300 hover:shadow-glow ${
                selectedStage?.id === stage.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedStage(stage)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusDot(stage.status)}`}></div>
                  <span className="font-medium text-sm">{stage.name}</span>
                </div>
                <span className={`text-xs font-bold ${getStatusColor(stage.status)}`}>
                  {stage.status.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{stage.progress.toFixed(0)}%</span>
                </div>
                <Progress value={stage.progress} className="h-2" />
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="w-3 h-3 text-primary" />
                    <span>{stage.temperature.toFixed(0)}°C</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-warning" />
                    <span>{stage.powerConsumption.toFixed(0)}kW</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stage Details Modal */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
            <Card className="p-6 shadow-glow border-card-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{selectedStage.name}</h3>
                <Button variant="ghost" onClick={() => setSelectedStage(null)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${getStatusDot(selectedStage.status)}`}></div>
                      <span className={`font-bold ${getStatusColor(selectedStage.status)}`}>
                        {selectedStage.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Progress</label>
                    <div className="mt-1">
                      <Progress value={selectedStage.progress} className="h-3" />
                      <p className="text-right text-sm mt-1">{selectedStage.progress.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Material Count</label>
                    <p className="text-2xl font-bold text-primary">{selectedStage.materialCount}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Temperature</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Thermometer className="w-4 h-4 text-primary" />
                      <span className="text-lg font-bold">{selectedStage.temperature.toFixed(1)}°C</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Power Consumption</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Zap className="w-4 h-4 text-warning" />
                      <span className="text-lg font-bold">{selectedStage.powerConsumption.toFixed(1)} kW</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Throughput</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Activity className="w-4 h-4 text-success" />
                      <span className="text-lg font-bold">{selectedStage.throughput.toFixed(1)} units/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTwin;