import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  RefreshCw, 
  Globe, 
  Shield,
  User,
  Database,
  Monitor
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    alerts: boolean;
    reports: boolean;
  };
  dashboard: {
    refreshRate: number;
    autoRefresh: boolean;
    compactView: boolean;
  };
  privacy: {
    analytics: boolean;
    tracking: boolean;
    dataSharing: boolean;
  };
  language: string;
  timezone: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      alerts: true,
      reports: false
    },
    dashboard: {
      refreshRate: 30,
      autoRefresh: true,
      compactView: false
    },
    privacy: {
      analytics: true,
      tracking: false,
      dataSharing: false
    },
    language: 'en',
    timezone: 'UTC'
  });

  const [isSaving, setIsSaving] = useState(false);

  const updateSettings = (category: keyof SettingsState, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [key]: value
      }
    }));
  };

  const updateTopLevel = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you'd show a toast notification here
      console.log('Settings saved successfully');
    }, 1000);
  };

  const resetSettings = () => {
    setSettings({
      theme: 'system',
      notifications: {
        email: true,
        push: true,
        alerts: true,
        reports: false
      },
      dashboard: {
        refreshRate: 30,
        autoRefresh: true,
        compactView: false
      },
      privacy: {
        analytics: true,
        tracking: false,
        dataSharing: false
      },
      language: 'en',
      timezone: 'UTC'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-muted-foreground">Customize your TraceabilitySync experience</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={resetSettings}>
            Reset to Default
          </Button>
          <Button onClick={saveSettings} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-primary" />
          User Profile
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="Manufacturing Manager" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="manager@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" defaultValue="Quality Assurance" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Senior Manager" />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-primary" />
          Appearance
        </h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Theme</Label>
            <p className="text-sm text-muted-foreground mb-3">Choose your preferred color scheme</p>
            <div className="flex space-x-4">
              {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'system', icon: Monitor, label: 'System' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => updateTopLevel('theme', value)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                    settings.theme === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-card-border hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Language</Label>
            <p className="text-sm text-muted-foreground mb-3">Select your preferred language</p>
            <select
              value={settings.language}
              onChange={(e) => updateTopLevel('language', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div>
            <Label className="text-base font-medium">Timezone</Label>
            <p className="text-sm text-muted-foreground mb-3">Set your local timezone</p>
            <select
              value={settings.timezone}
              onChange={(e) => updateTopLevel('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="UTC">UTC (Coordinated Universal Time)</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
              <option value="CET">CET (Central European Time)</option>
              <option value="JST">JST (Japan Standard Time)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          Notifications
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
            { key: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
            { key: 'alerts', label: 'System Alerts', description: 'Critical system notifications' },
            { key: 'reports', label: 'Report Notifications', description: 'Scheduled report updates' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={settings.notifications[key as keyof typeof settings.notifications]}
                onCheckedChange={(checked) => updateSettings('notifications', key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Dashboard */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <RefreshCw className="w-5 h-5 mr-2 text-primary" />
          Dashboard
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Refresh</p>
              <p className="text-sm text-muted-foreground">Automatically update dashboard data</p>
            </div>
            <Switch
              checked={settings.dashboard.autoRefresh}
              onCheckedChange={(checked) => updateSettings('dashboard', 'autoRefresh', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Compact View</p>
              <p className="text-sm text-muted-foreground">Display data in a more compact layout</p>
            </div>
            <Switch
              checked={settings.dashboard.compactView}
              onCheckedChange={(checked) => updateSettings('dashboard', 'compactView', checked)}
            />
          </div>

          <div>
            <Label className="text-base font-medium">Refresh Rate (seconds)</Label>
            <p className="text-sm text-muted-foreground mb-3">How often to update dashboard data</p>
            <select
              value={settings.dashboard.refreshRate}
              onChange={(e) => updateSettings('dashboard', 'refreshRate', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              disabled={!settings.dashboard.autoRefresh}
            >
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={300}>5 minutes</option>
              <option value={900}>15 minutes</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Privacy & Data */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary" />
          Privacy & Data
        </h3>
        
        <div className="space-y-4">
          {[
            { 
              key: 'analytics', 
              label: 'Usage Analytics', 
              description: 'Help improve the platform by sharing usage data' 
            },
            { 
              key: 'tracking', 
              label: 'Activity Tracking', 
              description: 'Track user activity for security purposes' 
            },
            { 
              key: 'dataSharing', 
              label: 'Data Sharing', 
              description: 'Share anonymized data with partners' 
            }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={settings.privacy[key as keyof typeof settings.privacy]}
                onCheckedChange={(checked) => updateSettings('privacy', key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6 shadow-card border-card-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-primary" />
          Data Management
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export All Data</p>
              <p className="text-sm text-muted-foreground">Download a complete copy of your data</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Clear Cache</p>
              <p className="text-sm text-muted-foreground">Clear stored cache and temporary data</p>
            </div>
            <Button variant="outline">Clear</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-danger">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;