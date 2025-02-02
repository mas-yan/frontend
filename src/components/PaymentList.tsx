import React, { useState } from 'react';
import { Payment } from '../types';
import { formatRupiah } from '../utils/currency';
import { ShowPayment } from './ShowPayment';

interface PaymentListProps {
  payments: Payment[];
  onUpdateStatus: (id: number) => void;
}

export const PaymentList: React.FC<PaymentListProps> = ({ payments, onUpdateStatus }) => {
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const toggleAction = (id: number) => {
    setOpenActionId(openActionId === id ? null : id);
  };

  const handleUpdateStatus = async (id: number) => {
    setLoadingId(id);
    try {
      await onUpdateStatus(id);
    } finally {
      setLoadingId(null);
      setOpenActionId(null);
    }
  };

  const handleShowPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpenActionId(null);
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.penjualan.transaction_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatRupiah(payment.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                  payment.status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {payment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(payment.due_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
              {loadingId === payment.id ? (
                  "Loading..."
                ) : (
                  <div className="flex space-x-2">
                      <button
                        onClick={() => handleShowPayment(payment)}
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        title="View Details"
                      >Details</button>
                      <button
                        onClick={() => toggleAction(payment.id)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        disabled={loadingId !== null}
                      >Update
                      </button>
                    </div>
                )}
                
                {openActionId === payment.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {payment.status === 'unpaid' && (
                        <button
                        onClick={() => handleUpdateStatus(payment.id)}
                        disabled={loadingId !== null}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          Mark as Paid
                        </button>
                      )}
                      {payment.status === 'paid' && (
                        <button
                          disabled
                          className="w-full text-left px-4 py-2 text-sm text-gray-400 flex items-center cursor-not-allowed"
                          role="menuitem"
                        >
                          Already Paid
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPayment && (
        <ShowPayment 
          payment={selectedPayment} 
          onClose={() => setSelectedPayment(null)} 
        />
      )}
    </div>
  );
};