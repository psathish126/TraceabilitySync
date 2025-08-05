import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Material {
  id: string;
  type: string;
  origin: string;
  supplier: string;
  status: 'In Processing' | 'Assembled' | 'Quality Check' | 'Shipped' | 'Pending Verification';
  timestamp: string;
  compliance: string;
  location: string;
  batchNumber: string;
  quantity: number;
  qualityScore: number;
}

const MaterialTraceability: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  useEffect(() => {
    // Load real materials data
    const loadMaterials = async () => {
      setIsLoading(true);
      try {
        // Connect to real API endpoint here
        // const materialsData = await apiService.getMaterials();
        // setMaterials(materialsData);
        // setFilteredMaterials(materialsData);
      } catch (error) {
        console.error('Failed to load materials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterials();
  }, []);

  useEffect(() => {
    let filtered = materials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(material => material.status === selectedFilter);
    }

    setFilteredMaterials(filtered);
  }, [searchTerm, selectedFilter, materials]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Assembled':
      case 'Shipped':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Pending Verification':
        return <XCircle className="w-4 h-4 text-danger" />;
      case 'Quality Check':
      case 'In Processing':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Assembled':
      case 'Shipped':
        return 'default';
      case 'Pending Verification':
        return 'destructive';
      case 'Quality Check':
      case 'In Processing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'text-success';
    if (score >= 90) return 'text-warning';
    return 'text-danger';
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const uniqueStatuses = [...new Set(materials.map(m => m.status))];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Material Traceability</h2>
          <p className="text-muted-foreground">Track raw materials from origin to final product</p>
        </div>
        <Button className="w-fit">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 shadow-card border-card-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, type, supplier, or origin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="all">All Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Materials Table */}
      <Card className="shadow-card border-card-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Material ID</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Origin</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-left p-4 font-semibold">Quality Score</th>
                <th className="text-left p-4 font-semibold">Last Updated</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((material) => (
                <tr key={material.id} className="border-t border-card-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{material.id}</p>
                      <p className="text-sm text-muted-foreground">{material.batchNumber}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{material.type}</p>
                      <p className="text-sm text-muted-foreground">{material.quantity} kg</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{material.origin}</p>
                        <p className="text-sm text-muted-foreground">{material.supplier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(material.status)}
                      <Badge variant={getStatusVariant(material.status)}>
                        {material.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-lg font-bold ${getQualityColor(material.qualityScore)}`}>
                      {material.qualityScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(material.timestamp)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedMaterial(material)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Material Details Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <Card className="p-6 shadow-glow border-card-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Material Details</h3>
                <Button variant="ghost" onClick={() => setSelectedMaterial(null)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Material ID</label>
                    <p className="text-lg font-bold">{selectedMaterial.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-lg">{selectedMaterial.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Origin</label>
                    <p className="text-lg">{selectedMaterial.origin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Supplier</label>
                    <p className="text-lg">{selectedMaterial.supplier}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(selectedMaterial.status)}
                      <Badge variant={getStatusVariant(selectedMaterial.status)}>
                        {selectedMaterial.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Quality Score</label>
                    <p className={`text-lg font-bold ${getQualityColor(selectedMaterial.qualityScore)}`}>
                      {selectedMaterial.qualityScore}%
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Compliance</label>
                    <p className="text-lg">{selectedMaterial.compliance}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Location</label>
                    <p className="text-lg">{selectedMaterial.location}</p>
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

export default MaterialTraceability;