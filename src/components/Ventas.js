import React, { useState } from 'react';

const Ventas = () => {
  const [productos] = useState([
    { id: 1, nombre: 'Producto A', precio: 1000 },
    { id: 2, nombre: 'Producto B', precio: 2500 },
    { id: 3, nombre: 'Producto C', precio: 3000 }
  ]);

  const [clientes] = useState([
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana Gómez' }
  ]);

  const [venta, setVenta] = useState({
    clienteId: '',
    productosVendidos: [],
    productoId: '',
    cantidad: 1
  });

  const [ventas, setVentas] = useState([]);

  const agregarProducto = () => {
    const producto = productos.find(p => p.id === parseInt(venta.productoId));
    if (!producto) return;
    setVenta(prev => ({
      ...prev,
      productosVendidos: [...prev.productosVendidos, {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: parseInt(venta.cantidad)
      }],
      productoId: '',
      cantidad: 1
    }));
  };

  const calcularTotal = () => {
    return venta.productosVendidos.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const registrarVenta = () => {
    if (!venta.clienteId || venta.productosVendidos.length === 0) {
      alert('Debes seleccionar un cliente y al menos un producto.');
      return;
    }

    const nuevaVenta = {
      id: Date.now(),
      cliente: clientes.find(c => c.id === parseInt(venta.clienteId)).nombre,
      productos: venta.productosVendidos,
      total: calcularTotal(),
      fecha: new Date().toLocaleString()
    };

    setVentas(prev => [nuevaVenta, ...prev]);

    // Reset
    setVenta({ clienteId: '', productosVendidos: [], productoId: '', cantidad: 1 });
  };

  return (
    <div>
      <h2>🧾 Registro de Ventas</h2>

      <div>
        <label>Cliente: </label>
        <select value={venta.clienteId} onChange={(e) => setVenta({ ...venta, clienteId: e.target.value })}>
          <option value="">Seleccione un cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto: </label>
        <select value={venta.productoId} onChange={(e) => setVenta({ ...venta, productoId: e.target.value })}>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>

        <input
          type="number"
          value={venta.cantidad}
          min="1"
          onChange={(e) => setVenta({ ...venta, cantidad: e.target.value })}
        />
        <button onClick={agregarProducto}>Agregar producto</button>
      </div>

      <div>
        <h4>🧺 Productos en esta venta</h4>
        <ul>
          {venta.productosVendidos.map((item, idx) => (
            <li key={idx}>
              {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
            </li>
          ))}
        </ul>
        <strong>Total: ${calcularTotal()}</strong>
      </div>

      <button onClick={registrarVenta}>💾 Registrar Venta</button>

      <hr />

      <h3>📈 Ventas Recientes</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.fecha}</td>
              <td>{v.cliente}</td>
              <td>
                {v.productos.map((p, i) => (
                  <div key={i}>{p.nombre} x{p.cantidad}</div>
                ))}
              </td>
              <td>${v.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
