export interface Commission {
  marketing: string;
  bulan: string;
  omzet: number;
  komisi: number;
  komisi_nominal: number;
}

export interface Payment {
  id: number;
  amount: number;
  status: 'unpaid' | 'paid';
  due_date: string;
  penjualan: Sale;
}

export interface Sale {
  id: number;
  transaction_number: string;
  marketing: string;
  date: string;
  cargo_fee: number;
  total_balance: number;
  grand_total: number;
}

export interface CreatePaymentRequest {
  transaction_number: string;
  jumlah_installment: number;
}