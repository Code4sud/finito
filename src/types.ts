export interface Incident {
  id: number;
  type: string;
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}