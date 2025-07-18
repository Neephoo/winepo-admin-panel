import React, { useState } from 'react';

const Inventario = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto A', stock: 10 },
    { id: 2, nombre: 'Producto B', stock: 5 },
    { id: 3, nombre: 'Producto C', stock: 0 }
  ]);

  const [movimiento, setMovimiento] = useState({
    productoId: '',
    tipo: 'entrada',
    cantidad: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovimiento(prev => ({ ...prev, [name]: value }));
  };

  const registrarMovimiento = (e) => {
    e.preventDefault();
    const cantidad = parseInt(movimiento.cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0.');
      return;
    }

    const index = productos.findIndex(p => p.id === parseInt(movimiento.productoId));
    if (index === -1) {
      alert('Producto no encontrado.');
      return;
    }

    const nuevosProductos = [...productos];
    const producto = nuevosProductos[index];

    if (movimiento.tipo === 'salida' && producto.stock < cantidad) {
      alert('No hay suficiente stock.');
      return;
    }

    producto.stock += movimiento.tipo === 'entrada' ? cantidad : -cantidad;
    setProductos(nuevosProductos);

    setMovimiento({ productoId: '', tipo: 'entrada', cantidad: 1 });
  };

  return (
    <div>
      <h2>📦 Gestión de Inventario</h2>

      <form onSubmit={registrarMovimiento} style={{ marginBottom: '1.5rem' }}>
        <select
          name="productoId"
          value={movimiento.productoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <select
          name="tipo"
          value={movimiento.tipo}
          onChange={handleChange}
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>

        <input
          type="number"
          name="cantidad"
          value={movimiento.cantidad}
          onChange={handleChange}
          min="1"
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <h3>📋 Estado Actual del Inventario</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id} style={{ backgroundColor: p.stock <= 5 ? '#ffe5e5' : 'transparent' }}>
              <td>{p.nombre}</td>
              <td>
                {p.stock} {p.stock <= 5 && <span style={{ color: 'red' }}>⚠️ Bajo</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;
