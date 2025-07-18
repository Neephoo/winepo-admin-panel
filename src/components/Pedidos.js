import React, { useState } from 'react';

const Pedidos = () => {
  const [clientes] = useState([
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana Gómez' }
  ]);

  const [productos] = useState([
    { id: 1, nombre: 'Producto A' },
    { id: 2, nombre: 'Producto B' },
    { id: 3, nombre: 'Producto C' }
  ]);

  const [pedido, setPedido] = useState({
    clienteId: '',
    items: [],
    productoId: '',
    cantidad: 1,
    estado: 'pendiente'
  });

  const [pedidos, setPedidos] = useState([]);

  const agregarProducto = () => {
    const producto = productos.find(p => p.id === parseInt(pedido.productoId));
    if (!producto) return;

    setPedido(prev => ({
      ...prev,
      items: [...prev.items, {
        productoId: producto.id,
        nombre: producto.nombre,
        cantidad: parseInt(pedido.cantidad)
      }],
      productoId: '',
      cantidad: 1
    }));
  };

  const guardarPedido = () => {
    if (!pedido.clienteId || pedido.items.length === 0) {
      alert('Debes seleccionar un cliente y al menos un producto.');
      return;
    }

    const nuevoPedido = {
      id: Date.now(),
      cliente: clientes.find(c => c.id === parseInt(pedido.clienteId)).nombre,
      items: pedido.items,
      estado: pedido.estado,
      fecha: new Date().toLocaleString()
    };

    setPedidos(prev => [nuevoPedido, ...prev]);

    // Reset
    setPedido({
      clienteId: '',
      items: [],
      productoId: '',
      cantidad: 1,
      estado: 'pendiente'
    });
  };

  return (
    <div>
      <h2>📦 Registro de Pedidos</h2>

      <div>
        <label>Cliente:</label>
        <select value={pedido.clienteId} onChange={(e) => setPedido({ ...pedido, clienteId: e.target.value })}>
          <option value="">Seleccione un cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto:</label>
        <select value={pedido.productoId} onChange={(e) => setPedido({ ...pedido, productoId: e.target.value })}>
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <input
          type="number"
          value={pedido.cantidad}
          min="1"
          onChange={(e) => setPedido({ ...pedido, cantidad: e.target.value })}
        />

        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>

      <div>
        <label>Estado:</label>
        <select value={pedido.estado} onChange={(e) => setPedido({ ...pedido, estado: e.target.value })}>
          <option value="pendiente">🕒 Pendiente</option>
          <option value="despachado">🚚 Despachado</option>
          <option value="cancelado">❌ Cancelado</option>
        </select>
      </div>

      <div>
        <h4>🧺 Productos en el pedido</h4>
        <ul>
          {pedido.items.map((item, idx) => (
            <li key={idx}>{item.nombre} x{item.cantidad}</li>
          ))}
        </ul>
      </div>

      <button onClick={guardarPedido}>💾 Guardar Pedido</button>

      <hr />

      <h3>📋 Pedidos Recientes</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.fecha}</td>
              <td>{p.cliente}</td>
              <td>
                {p.items.map((item, i) => (
                  <div key={i}>{item.nombre} x{item.cantidad}</div>
                ))}
              </td>
              <td>{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedidos;
