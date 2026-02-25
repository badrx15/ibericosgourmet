'use client';

import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Stats
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    codOrders: 0,
    cardOrders: 0
  });

  const ADMIN_KEY = 'jamoniberico2024'; // Hardcoded for client-side simplicity, matches env

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?key=${ADMIN_KEY}`);
      if (!res.ok) throw new Error('Error al cargar pedidos');
      const data = await res.json();
      setOrders(data);
      calculateStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalRevenue = data.reduce((acc, order) => acc + order.totalAmount, 0);
    const codOrders = data.filter(o => o.paymentMethod === 'cod').length;
    const cardOrders = data.filter(o => o.paymentMethod === 'card').length;

    setStats({
      totalOrders: data.length,
      totalRevenue,
      codOrders,
      cardOrders
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres borrar este pedido?')) return;
    
    try {
      const res = await fetch(`/api/admin/orders?key=${ADMIN_KEY}&id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchOrders(); // Refresh
      } else {
        alert('Error al borrar');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-black text-stone-900 mb-6 text-center">Panel Admin Ibéricos</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña de acceso"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-jamon outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-jamon transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-stone-900">Panel de Control</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-stone-500 hover:text-jamon font-bold">
            Salir
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Total Pedidos</div>
            <div className="text-3xl font-black text-stone-900">{stats.totalOrders}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Ingresos Totales</div>
            <div className="text-3xl font-black text-jamon">{stats.totalRevenue.toFixed(2)}€</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Contrareembolso</div>
            <div className="text-3xl font-black text-stone-900">{stats.codOrders}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Tarjeta</div>
            <div className="text-3xl font-black text-stone-900">{stats.cardOrders}</div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-900">Últimos Pedidos</h2>
            <button onClick={fetchOrders} className="text-stone-400 hover:text-jamon">
              <i className="fas fa-sync-alt"></i> Actualizar
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-400 text-xs uppercase tracking-widest font-bold">
                <tr>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">ID / Cliente</th>
                  <th className="p-4">Producto</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Pago</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString('es-ES')} <br/>
                      <span className="text-xs">{new Date(order.createdAt).toLocaleTimeString('es-ES')}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-stone-900">#{order.orderId}</span> <br/>
                      <span className="text-stone-600">{order.customerName}</span>
                    </td>
                    <td className="p-4 text-stone-600">
                      {order.productName} <br/>
                      <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">x{order.quantity}</span>
                    </td>
                    <td className="p-4 font-black text-stone-900">
                      {order.totalAmount.toFixed(2)}€
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        order.paymentMethod === 'cod' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.paymentMethod === 'cod' ? 'Contraremb.' : 'Tarjeta'}
                      </span>
                    </td>
                    <td className="p-4 text-stone-500 text-xs">
                      <div>📞 {order.phone}</div>
                      <div>📧 {order.email}</div>
                      <div className="mt-1 font-medium text-stone-600 truncate max-w-[150px]" title={order.address + ', ' + order.city}>
                        📍 {order.city}
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Borrar pedido"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-stone-400">
                      No hay pedidos registrados aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
