import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Payment, Commission, Sale } from './types';
import { getPayments, createPayment, updatePaymentStatus, getCommissions, getsales } from './api';
import { PaymentList } from './components/PaymentList';
import { CommissionList } from './components/CommissionList';
import { CreatePayment } from './components/CreatePayment';
import { SaleList } from './components/SaleList';

function App() {
  const [activeTab, setActiveTab] = useState<'payments' | 'commissions'|'sales'>('payments');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [sales, setsales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data);
    } catch (error) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommissions = async () => {
    try {
      const response = await getCommissions();
      setCommissions(response.data);
    } catch (error) {
      toast.error('Failed to fetch commissions');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSales = async () => {
    try {
      const response = await getsales();
      setsales(response.data);
    } catch (error) {
      toast.error('Failed to fetch sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'payments') {
      fetchPayments();
      fetchSales();
    } else if (activeTab === 'commissions') {
      fetchCommissions();
    }else{
      fetchSales();
    }
  }, [activeTab]);

  const handleCreatePayment = async (data: { transaction_number: string; jumlah_installment: number }) => {
    try {
      await createPayment(data);
      toast.success('Payment created successfully');
      fetchPayments();
    } catch (error) {
      toast.error('Failed to create payment');
    }
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      await updatePaymentStatus(id, 'paid');
      toast.success('Payment status updated');
      fetchPayments();
    } catch (error) {
      toast.error('Failed to update payment status');
    }
  };

  const handleRefresh = () => {
    if (activeTab === 'payments') {
      fetchPayments();
    } else if (activeTab === 'commissions') {
      
      fetchCommissions();
    }else{
      fetchSales();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeTab === 'payments' ? 'Payment Management' : activeTab === 'commissions' ? 'Commission Management' : 'Sales Management'}
            </h1>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Refresh
            </button>
          </div>

          <div className="mb-6">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('payments')}
                className={`${
                  activeTab === 'payments'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`${
                  activeTab === 'sales'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
              >
                Sales
              </button>
              <button
                onClick={() => setActiveTab('commissions')}
                className={`${
                  activeTab === 'commissions'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md flex items-center`}
              >
                Commissions
              </button>
            </nav>
          </div>

          {activeTab === 'payments' && (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Payment</h2>
                <CreatePayment onSubmit={handleCreatePayment} sales={sales}  />
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment List</h2>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <PaymentList payments={payments} onUpdateStatus={handleUpdateStatus} />
                )}
              </div>
            </>
          )}

          {activeTab === 'sales' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Sales List</h2>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <SaleList sales={sales} />
              )}
            </div>
          )}
          {activeTab === 'commissions' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Commission List</h2>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <CommissionList commissions={commissions} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;