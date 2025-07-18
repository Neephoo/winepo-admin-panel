import React, { useState } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto A', precio: 10000, stock: 20 },
    { id: 2, nombre: 'Producto B', precio: 15000, stock: 10 }
  ]);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditarId, setProductoEditarId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock) return;
    const nuevoProducto = {
      id: Date.now(),
      nombre: form.nombre,
      precio: parseInt(form.precio),
      stock: parseInt(form.stock)
    };
    setProductos([...productos, nuevoProducto]);
    setForm({ nombre: '', precio: '', stock: '' });
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoEditarId(producto.id);
    setForm({ nombre: producto.nombre, precio: producto.precio, stock: producto.stock });
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    const actualizados = productos.map(p =>
      p.id === productoEditarId
        ? { ...p, nombre: form.nombre, precio: parseInt(form.precio), stock: parseInt(form.stock) }
        : p
    );
    setProductos(actualizados);
    setModoEdicion(false);
    setForm({ nombre: '', precio: '', stock: '' });
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este producto?');
    if (confirm) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="page-container">
      <h2>🛍️ Gestión de Productos</h2>

      <form onSubmit={modoEdicion ? handleActualizar : handleAgregar} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio ($)</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio.toLocaleString()}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEditar(p)}>✏️</button>
                <button onClick={() => handleEliminar(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
