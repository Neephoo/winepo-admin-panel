import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Dashboard() {
  const productosMasVendidos = [
    { nombre: 'Producto A', ventas: 120 },
    { nombre: 'Producto B', ventas: 95 },
    { nombre: 'Producto C', ventas: 80 },
    { nombre: 'Producto D', ventas: 60 }
  ];

  const comunasDespachos = [
    { comuna: 'Santiago', despachos: 140 },
    { comuna: 'Providencia', despachos: 90 },
    { comuna: 'Ñuñoa', despachos: 70 },
    { comuna: 'La Florida', despachos: 60 }
  ];

  const colores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="dashboard-container">
      <h1>📊 Panel de Control</h1>

      <div className="card-grid">
        <Link to="/productos" className="card"><h2>📦 Productos</h2><p>Gestiona tu catálogo</p></Link>
        <Link to="/clientes" className="card"><h2>🧑‍🤝‍🧑 Clientes</h2><p>Lista y contactos</p></Link>
        <Link to="/pedidos" className="card"><h2>📬 Pedidos</h2><p>Ordenes recientes</p></Link>
        <Link to="/ventas" className="card"><h2>💰 Ventas</h2><p>Historial y totales</p></Link>
        <Link to="/inventario" className="card"><h2>📦 Inventario</h2><p>Stock actual</p></Link>
        <Link to="/despachos" className="card"><h2>🚚 Despachos</h2><p>Envíos en curso</p></Link>
        <Link to="/descuentos" className="card"><h2>🏷️ Descuentos</h2><p>Promociones activas</p></Link>
      </div>

      <div className="recent-box">
        <h3>📅 Últimas acciones</h3>
        <ul>
          <li>🧾 Última venta: $25.000 - 18/07/2025</li>
          <li>📬 Último pedido: Cliente Juan Pérez</li>
          <li>🚚 Último despacho: N° 10234</li>
        </ul>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>📈 Productos más vendidos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productosMasVendidos}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>🗺️ Comunas con más despachos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={comunasDespachos}
                dataKey="despachos"
                nameKey="comuna"
                cx="50%" cy="50%"
                outerRadius={80}
                label
              >
                {comunasDespachos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
