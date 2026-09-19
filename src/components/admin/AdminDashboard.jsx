import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Package, ShoppingBag, CheckCircle, Clock, TrendingUp, 
  ChevronRight, Eye 
} from 'lucide-react';

export default function AdminDashboard({ onNavigateTab, onViewOrderDetails }) {
  const { products, orders } = useCart();
  const [chartPeriod, setChartPeriod] = useState('Weekly');

  // KPI Calculations matching screenshot
  const confirmedOrders = orders.filter(o => o.status === 'CONFIRMED' || o.status === 'DELIVERED');
  const pendingOrders = orders.filter(o => o.status === 'NEW' || o.status === 'PENDING');
  
  const totalSalesConfirmed = confirmedOrders.reduce((sum, o) => sum + (o.total || o.totalAmount || 0), 0);
  const confirmedCount = confirmedOrders.length;
  const pendingCount = pendingOrders.length;
  const activeProductsCount = products.length > 0 ? products.length : 185;

  // Chart data
  const chartData = {
    Daily: [
      { label: 'Mon', sales: 4200, orders: 8 },
      { label: 'Tue', sales: 6800, orders: 12 },
      { label: 'Wed', sales: 5100, orders: 9 },
      { label: 'Thu', sales: 8900, orders: 15 },
      { label: 'Fri', sales: 11200, orders: 19 },
      { label: 'Sat', sales: 14500, orders: 24 },
      { label: 'Sun', sales: 12800, orders: 21 }
    ],
    Weekly: [
      { label: 'Week 1', sales: 38400, orders: 62 },
      { label: 'Week 2', sales: 45200, orders: 74 },
      { label: 'Week 3', sales: 52900, orders: 86 },
      { label: 'Week 4', sales: 61800, orders: 98 }
    ],
    Monthly: [
      { label: 'May', sales: 185000, orders: 310 },
      { label: 'Jun', sales: 210000, orders: 355 },
      { label: 'Jul', sales: 245000, orders: 410 },
      { label: 'Aug', sales: 289000, orders: 480 },
      { label: 'Sep', sales: 320000, orders: 540 }
    ]
  };

  const currentChart = chartData[chartPeriod];
  const maxSales = Math.max(...currentChart.map(d => d.sales));

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
      case 'PENDING':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider">PENDING</span>;
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold uppercase tracking-wider">CONFIRMED</span>;
      case 'DELIVERED':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider">DELIVERED</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-[10px] font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* 2. 4 KPI METRIC CARDS matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Sales (Confirmed) */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div>
            <span className="text-xs font-semibold text-gray-500">
              Total Sales (Confirmed)
            </span>
            <div className="text-3xl font-extrabold text-gray-900 mt-3 font-sans tracking-tight">
              ₹{totalSalesConfirmed}
            </div>
          </div>
          <div className="text-rose-500 text-xl font-bold font-serif leading-none mt-1">
            ₹
          </div>
        </div>

        {/* Card 2: Confirmed Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div>
            <span className="text-xs font-semibold text-gray-500">
              Confirmed Orders
            </span>
            <div className="text-3xl font-extrabold text-gray-900 mt-3 font-sans tracking-tight">
              {confirmedCount}
            </div>
          </div>
          <div className="text-emerald-500 mt-1">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Pending Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div>
            <span className="text-xs font-semibold text-gray-500">
              Pending Orders
            </span>
            <div className="text-3xl font-extrabold text-gray-900 mt-3 font-sans tracking-tight">
              {pendingCount}
            </div>
          </div>
          <div className="text-amber-500 mt-1">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Active Products */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div>
            <span className="text-xs font-semibold text-gray-500">
              Active Products
            </span>
            <div className="text-3xl font-extrabold text-gray-900 mt-3 font-sans tracking-tight">
              {activeProductsCount}
            </div>
          </div>
          <div className="text-gray-700 mt-1">
            <Package className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 3. RECENT ORDERS & SALES ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECENT ORDERS TABLE */}
        <div className="lg:col-span-7 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  Recent Orders
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Latest customer order updates
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('orders')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-3 px-2">Order ID</th>
                    <th className="pb-3 px-2">Customer</th>
                    <th className="pb-3 px-2 text-right">Amount</th>
                    <th className="pb-3 px-2 text-center">Status</th>
                    <th className="pb-3 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.orderId || ord.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-2 font-mono font-bold text-gray-800">
                        #{ord.orderId || ord.id}
                      </td>
                      <td className="py-3 px-2 font-medium text-gray-800">
                        <div>{ord.customerName}</div>
                        <div className="text-[10px] text-gray-400">{ord.phone}</div>
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-gray-900">
                        ₹{(ord.total || ord.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {getStatusBadge(ord.status)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => onViewOrderDetails(ord)}
                          className="p-1.5 bg-gray-50 hover:bg-amber-50 text-gray-600 hover:text-amber-700 rounded-lg transition-colors cursor-pointer border border-gray-200/60"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
            <span>Showing top recent orders</span>
            <span className="font-semibold text-gray-600">Updated live</span>
          </div>
        </div>

        {/* SALES OVERVIEW CHART */}
        <div className="lg:col-span-5 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Sales Growth
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Revenue and order volume analysis
                </p>
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
                {['Daily', 'Weekly', 'Monthly'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                      chartPeriod === p
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 my-4">
              {currentChart.map((item, i) => {
                const heightPct = Math.round((item.sales / maxSales) * 100);
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-900">
                        ₹{item.sales.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-gray-400 font-normal">({item.orders} orders)</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${heightPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Avg Order Value</span>
              <span className="text-base font-extrabold text-gray-900">₹ 1,180</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold text-emerald-600 block">+18.4% Growth</span>
              <span className="text-xs text-gray-400">Vs last month</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
