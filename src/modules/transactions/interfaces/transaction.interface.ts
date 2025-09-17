export interface Transaction {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  created_at: string;
  updated_at: string;
}