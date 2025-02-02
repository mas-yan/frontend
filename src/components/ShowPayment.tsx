import { Payment } from '../types';
import { formatRupiah } from '../utils/currency';

interface ShowPaymentProps {
  payment: Payment;
  onClose: () => void;
}

export const ShowPayment: React.FC<ShowPaymentProps> = ({ payment, onClose }) => {
  const getStatusColor = (status: string) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div></div> {/* Spacer for alignment */}
          <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
          <button
            onClick={onClose}
            className="flex items-center text-red-600 border rounded-md hover:bg-red-200 px-2 border-red-500"
          >
            X
          </button>
        </div>

        {/* Payment ID and Status */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Payment ID</p>
              <p className="text-2xl font-bold text-gray-900">#{payment.penjualan.transaction_number}</p>
            </div>
            <div className={`px-4 py-2 rounded-full border ${getStatusColor(payment.status)} flex items-center`}>
              {/* {getStatusIcon(payment.status)} */}
              <span className="font-medium capitalize">{payment.status}</span>
            </div>
          </div>
        </div>

        {/* Payment Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Amount */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center text-gray-500 mb-2">
              <span className="text-sm">Amount</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatRupiah(payment.amount)}</p>
          </div>

          {/* Due Date */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center text-gray-500 mb-2">
              <span className="text-sm">Due Date</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {new Date(payment.due_date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-medium text-gray-900">#{payment.penjualan.transaction_number}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-900">Bank Transfer</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Created Date</span>
              <span className="font-medium text-gray-900">
                {new Date(payment.due_date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};