import React from 'react';
import { Commission } from '../types';
import { formatRupiah } from '../utils/currency';

interface CommissionListProps {
  commissions: Commission[];
}

export const CommissionList: React.FC<CommissionListProps> = ({ commissions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bulan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Omzet</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komisi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komisi Nominal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {commissions.map((commission, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{commission.marketing}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{commission.bulan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="inline-flex items-center text-green-600">
                  {formatRupiah(commission.omzet)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                  {commission.komisi}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatRupiah(commission.komisi_nominal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};