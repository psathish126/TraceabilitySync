// Mock API service for TraceabilitySync
// Simulates real-time data fetching from IoT devices and blockchain sources

export interface Material {
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

export interface DashboardMetrics {
  ethicalSourcing: number;
  productionEfficiency: number;
  defectRate: number;
  activeMaterials: number;
  completedBatches: number;
  pendingShipments: number;
}

export interface MaterialFlow {
  stage: string;
  count: number;
  status: 'normal' | 'warning' | 'critical';
}

class ApiService {
  private baseUrl = '/api'; // In a real app, this would be your actual API endpoint
  
  // Simulate network delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate mock data with realistic variations
  private generateMockMaterials(): Material[] {
    const materialTypes = ['Cobalt', 'Lithium', 'Nickel', 'Graphite', 'Manganese'];
    const origins = [
      'DRC Mine X', 'Chile Mine Y', 'Indonesia Mine Z', 
      'China Mine W', 'Canada Mine V', 'Australia Mine T'
    ];
    const suppliers = ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E'];
    const statuses: Material['status'][] = [
      'In Processing', 'Assembled', 'Quality Check', 'Shipped', 'Pending Verification'
    ];
    const locations = [
      'Processing Plant Alpha', 'Assembly Line 3', 'Quality Lab 1', 
      'Warehouse B', 'Receiving Dock', 'Processing Plant Beta'
    ];

    const materials: Material[] = [];
    
    for (let i = 1; i <= 50; i++) {
      const materialType = materialTypes[Math.floor(Math.random() * materialTypes.length)];
      const material: Material = {
        id: `MAT${i.toString().padStart(3, '0')}`,
        type: materialType,
        origin: origins[Math.floor(Math.random() * origins.length)],
        supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        compliance: Math.random() > 0.2 ? 'EU Battery Passport Compliant' : 'Pending Verification',
        location: locations[Math.floor(Math.random() * locations.length)],
        batchNumber: `${materialType.substring(0, 2).toUpperCase()}-2025-${i.toString().padStart(3, '0')}`,
        quantity: Math.floor(Math.random() * 800) + 200,
        qualityScore: Math.floor(Math.random() * 20) + 80 // 80-100%
      };
      materials.push(material);
    }

    return materials;
  }

  // Get all materials with filtering options
  async getMaterials(filters?: {
    search?: string;
    status?: string;
    materialType?: string;
    supplier?: string;
  }): Promise<Material[]> {
    await this.delay();
    
    let materials = this.generateMockMaterials();
    
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        materials = materials.filter(m => 
          m.id.toLowerCase().includes(searchLower) ||
          m.type.toLowerCase().includes(searchLower) ||
          m.supplier.toLowerCase().includes(searchLower) ||
          m.origin.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.status && filters.status !== 'all') {
        materials = materials.filter(m => m.status === filters.status);
      }
      
      if (filters.materialType && filters.materialType !== 'all') {
        materials = materials.filter(m => m.type === filters.materialType);
      }
      
      if (filters.supplier && filters.supplier !== 'all') {
        materials = materials.filter(m => m.supplier === filters.supplier);
      }
    }
    
    return materials;
  }

  // Get specific material by ID
  async getMaterial(id: string): Promise<Material | null> {
    await this.delay();
    const materials = this.generateMockMaterials();
    return materials.find(m => m.id === id) || null;
  }

  // Get dashboard metrics
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    await this.delay();
    
    return {
      ethicalSourcing: 95 + Math.random() * 4, // 95-99%
      productionEfficiency: 85 + Math.random() * 10, // 85-95%
      defectRate: 1 + Math.random() * 3, // 1-4%
      activeMaterials: 1200 + Math.floor(Math.random() * 100),
      completedBatches: 85 + Math.floor(Math.random() * 20),
      pendingShipments: 10 + Math.floor(Math.random() * 10)
    };
  }

  // Get material flow status
  async getMaterialFlow(): Promise<MaterialFlow[]> {
    await this.delay();
    
    return [
      { 
        stage: 'Raw Materials', 
        count: 500 + Math.floor(Math.random() * 100), 
        status: 'normal' 
      },
      { 
        stage: 'In Processing', 
        count: 300 + Math.floor(Math.random() * 50), 
        status: 'normal' 
      },
      { 
        stage: 'Quality Check', 
        count: 80 + Math.floor(Math.random() * 20), 
        status: Math.random() > 0.7 ? 'warning' : 'normal' 
      },
      { 
        stage: 'Assembly', 
        count: 150 + Math.floor(Math.random() * 30), 
        status: 'normal' 
      },
      { 
        stage: 'Ready to Ship', 
        count: 70 + Math.floor(Math.random() * 15), 
        status: 'normal' 
      }
    ];
  }

  // Get analytics data
  async getAnalyticsData(timeRange: string = '7d') {
    await this.delay();
    
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const labels: string[] = [];
    const values: number[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString());
      values.push(700 + Math.floor(Math.random() * 300));
    }
    
    return {
      productionTrends: { labels, values },
      materialDistribution: {
        cobalt: 35 + Math.floor(Math.random() * 10),
        lithium: 28 + Math.floor(Math.random() * 8),
        nickel: 22 + Math.floor(Math.random() * 6),
        graphite: 15 + Math.floor(Math.random() * 5)
      },
      qualityMetrics: {
        averageScore: 93 + Math.random() * 5,
        defectRate: 1.5 + Math.random() * 1.5,
        reworkRate: 1.2 + Math.random() * 1.3,
        complianceRate: 97 + Math.random() * 2.5
      },
      bottleneckPredictions: [
        {
          stage: 'Quality Verification',
          probability: 75 + Math.floor(Math.random() * 15),
          impact: 'high' as const,
          estimatedDelay: 40 + Math.floor(Math.random() * 20)
        },
        {
          stage: 'Material Processing',
          probability: 30 + Math.floor(Math.random() * 20),
          impact: 'medium' as const,
          estimatedDelay: 10 + Math.floor(Math.random() * 15)
        },
        {
          stage: 'Final Packaging',
          probability: 5 + Math.floor(Math.random() * 15),
          impact: 'low' as const,
          estimatedDelay: 5 + Math.floor(Math.random() * 10)
        }
      ]
    };
  }

  // Simulate real-time updates with WebSocket-like behavior
  subscribeToRealTimeUpdates(callback: (data: any) => void): () => void {
    const interval = setInterval(async () => {
      const metrics = await this.getDashboardMetrics();
      const materialFlow = await this.getMaterialFlow();
      
      callback({
        type: 'UPDATE',
        data: {
          metrics,
          materialFlow,
          timestamp: new Date().toISOString()
        }
      });
    }, 10000); // Update every 10 seconds
    
    // Return unsubscribe function
    return () => clearInterval(interval);
  }

  // Generate compliance report
  async generateComplianceReport(reportType: string): Promise<Blob> {
    await this.delay(2000); // Simulate longer processing time for report generation
    
    const reportData = {
      reportType,
      generatedAt: new Date().toISOString(),
      summary: {
        totalMaterials: 1247,
        compliantMaterials: 1186,
        pendingVerification: 45,
        nonCompliant: 16
      },
      details: 'Detailed compliance report content would be here...'
    };
    
    // Convert to blob for download
    const jsonString = JSON.stringify(reportData, null, 2);
    return new Blob([jsonString], { type: 'application/json' });
  }

  // Blockchain verification simulation
  async verifyMaterialOnBlockchain(materialId: string): Promise<{
    verified: boolean;
    blockHash: string;
    timestamp: string;
    transactionId: string;
  }> {
    await this.delay(1500);
    
    return {
      verified: Math.random() > 0.1, // 90% success rate
      blockHash: `0x${Math.random().toString(16).substring(2, 18)}`,
      timestamp: new Date().toISOString(),
      transactionId: `tx_${Math.random().toString(36).substring(2, 15)}`
    };
  }
}

export const apiService = new ApiService();
export default apiService;