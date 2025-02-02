import React, { useState } from 'react';
import { Sale } from '../types';
interface CreatePaymentProps {
  onSubmit: (data: { transaction_number: string; jumlah_installment: number }) => void;
  sales: Sale[];
}

export const CreatePayment: React.FC<CreatePaymentProps> = ({ onSubmit, sales }) => {
  const [transaction_number, setPenjualanId] = useState('');
  const [jumlah_installment, setJumlahInstallment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async(e: React.FormEvent) => {
     e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        transaction_number: transaction_number,
        jumlah_installment: Number(jumlah_installment),
      });
      setPenjualanId('');
      setJumlahInstallment('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="transaction_number" className="block text-sm font-medium text-gray-700">
          Transaction Number
        </label>
        <select
          id="penjualan_id"
          value={transaction_number}
          onChange={(e) => setPenjualanId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-indigo-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          disabled={isLoading}
        >
          <option value="">Select a transaction</option>
          {sales.map((sale,key) => (
            <option key={key} value={sale.transaction_number}>
              {sale.transaction_number}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="jumlah_installment" className="block text-sm font-medium text-gray-700">
          Number of Installments
        </label>
        <input
          type="number"
          id="jumlah_installment"
          value={jumlah_installment}
          onChange={(e) => setJumlahInstallment(e.target.value)}
          className="mt-1 block w-full rounded-md border border-indigo-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? (
          <>
            Creating...
          </>
        ) : (
          <>
            Create Payment
          </>
        )}
      </button>
    </form>
  );
};