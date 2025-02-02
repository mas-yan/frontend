import React, { useState } from 'react';
import { Sale } from '../types';
import { PaymentsBySale } from './PaymentsBySale';
import { formatRupiah } from '../utils/currency';

interface SaleListProps {
  sales: Sale[];
}

export const SaleList: React.FC<SaleListProps> = ({ sales }) => {
    const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bulan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo Fee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sales.map((sale, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.transaction_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.marketing}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="inline-flex items-center text-green-600">
                  {sale.date}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                  {formatRupiah(sale.cargo_fee)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatRupiah(sale.total_balance)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatRupiah(sale.grand_total)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button
                    onClick={() => setSelectedSaleId(sale.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Payments
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSaleId && (
        <PaymentsBySale
          saleId={selectedSaleId}
          onClose={() => setSelectedSaleId(null)}
        />
      )}
    </div>
  );
};