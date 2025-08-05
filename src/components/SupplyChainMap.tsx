import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Truck, Factory, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface SupplyNode {
  id: string;
  name: string;
  type: 'origin' | 'supplier' | 'processing' | 'manufacturing' | 'distribution';
  location: string;
  status: 'active' | 'warning' | 'critical' | 'completed';
  materials: string[];
  coordinates: { x: number; y: number };
  connections: string[];
}

const SupplyChainMap = () => {
  const [nodes, setNodes] = useState<SupplyNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<SupplyNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate supply chain data
    setTimeout(() => {
      setNodes([
        {
          id: 'origin-1',
          name: 'DRC Cobalt Mine',
          type: 'origin',
          location: 'Democratic Republic of Congo',
          status: 'active',
          materials: ['Cobalt Ore'],
          coordinates: { x: 15, y: 25 },
          connections: ['supplier-1']
        },
        {
          id: 'origin-2', 
          name: 'Chile Lithium Mine',
          type: 'origin',
          location: 'Atacama Desert, Chile',
          status: 'active',
          materials: ['Lithium Carbonate'],
          coordinates: { x: 10, y: 70 },
          connections: ['supplier-2']
        },
        {
          id: 'supplier-1',
          name: 'RefineCorpCobalt',
          type: 'supplier',
          location: 'Belgium',
          status: 'warning',
          materials: ['Refined Cobalt'],
          coordinates: { x: 30, y: 35 },
          connections: ['processing-1']
        },
        {
          id: 'supplier-2',
          name: 'LithiumTech Solutions',
          type: 'supplier', 
          location: 'Shanghai, China',
          status: 'active',
          materials: ['Lithium Hydroxide'],
          coordinates: { x: 70, y: 40 },
          connections: ['processing-1']
        },
        {
          id: 'processing-1',
          name: 'Advanced Materials Inc',
          type: 'processing',
          location: 'South Korea',
          status: 'active',
          materials: ['Battery Precursors'],
          coordinates: { x: 75, y: 35 },
          connections: ['manufacturing-1']
        },
        {
          id: 'manufacturing-1',
          name: 'EV Battery Facility',
          type: 'manufacturing',
          location: 'Tesla Gigafactory, Nevada',
          status: 'active',
          materials: ['EV Battery Cells'],
          coordinates: { x: 85, y: 50 },
          connections: []
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'origin': return <MapPin className="h-4 w-4" />;
      case 'supplier': return <Factory className="h-4 w-4" />;
      case 'processing': return <Factory className="h-4 w-4" />;
      case 'manufacturing': return <Factory className="h-4 w-4" />;
      case 'distribution': return <Truck className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success border-success text-success-foreground';
      case 'warning': return 'bg-warning border-warning text-warning-foreground';
      case 'critical': return 'bg-danger border-danger text-danger-foreground';
      case 'completed': return 'bg-muted border-muted text-muted-foreground';
      default: return 'bg-secondary border-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3" />;
      case 'warning': return <AlertTriangle className="h-3 w-3" />;
      case 'critical': return <AlertTriangle className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Global Supply Chain Map</h2>
        <Card className="h-96 animate-pulse">
          <CardContent className="p-6 flex items-center justify-center">
            <div className="text-muted-foreground">Loading supply chain data...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Global Supply Chain Map</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-success text-success">Active</Badge>
          <Badge variant="outline" className="border-warning text-warning">Warning</Badge>
          <Badge variant="outline" className="border-danger text-danger">Critical</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Supply Chain Flow</CardTitle>
            <CardDescription>Click on nodes to view detailed information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border overflow-hidden">
              {/* Supply Chain Connections */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {nodes.map((node) => 
                  node.connections.map((connectionId) => {
                    const targetNode = nodes.find(n => n.id === connectionId);
                    if (!targetNode) return null;
                    
                    return (
                      <line
                        key={`${node.id}-${connectionId}`}
                        x1={`${node.coordinates.x}%`}
                        y1={`${node.coordinates.y}%`}
                        x2={`${targetNode.coordinates.x}%`}
                        y2={`${targetNode.coordinates.y}%`}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    );
                  })
                )}
              </svg>
              
              {/* Supply Chain Nodes */}
              {nodes.map((node) => (
                <button
                  key={node.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${getStatusColor(node.status)}`}
                  style={{ 
                    left: `${node.coordinates.x}%`, 
                    top: `${node.coordinates.y}%`,
                    zIndex: 2 
                  }}
                  onClick={() => setSelectedNode(node)}
                >
                  {getNodeIcon(node.type)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Node Details */}
        <Card>
          <CardHeader>
            <CardTitle>Node Details</CardTitle>
            <CardDescription>
              {selectedNode ? 'Selected supply chain node' : 'Select a node to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{selectedNode.name}</h3>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedNode.status)}`}>
                    {getStatusIcon(selectedNode.status)}
                    <span className="capitalize">{selectedNode.status}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedNode.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {getNodeIcon(selectedNode.type)}
                    <span className="capitalize">{selectedNode.type} Facility</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Materials Handled</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.materials.map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedNode.connections.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Connected To</h4>
                    <div className="space-y-1">
                      {selectedNode.connections.map((connectionId) => {
                        const targetNode = nodes.find(n => n.id === connectionId);
                        return targetNode ? (
                          <div key={connectionId} className="text-sm text-muted-foreground">
                            → {targetNode.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Select a node on the map to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyChainMap;