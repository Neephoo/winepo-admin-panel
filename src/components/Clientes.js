import React, { useState } from 'react';


const CLIENTES_INICIALES = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com', telefono: '555-1234', direccion: 'Av. Siempre Viva 123', comuna: 'Santiago' },
  { id: 2, nombre: 'María Gómez', email: 'maria@mail.com', telefono: '555-5678', direccion: 'Calle Falsa 456', comuna: 'Valparaíso' },
];

export default function Clientes() {
  const [clientes, setClientes] = useState(CLIENTES_INICIALES);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', direccion: '', comuna: '' });
  const [editarId, setEditarId] = useState(null);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarCliente = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    if (editarId !== null) {
      // Editar cliente existente
      setClientes(clientes.map(c => (c.id === editarId ? { id: editarId, ...formData } : c)));
      setEditarId(null);
    } else {
      // Agregar nuevo cliente
      const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
      setClientes([...clientes, { id: nuevoId, ...formData }]);
    }
    setFormData({ nombre: '', email: '', telefono: '', direccion: '', comuna: '' });
  };

  const editarCliente = (cliente) => {
    setEditarId(cliente.id);
    setFormData({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      comuna: cliente.comuna,
    });
  };

  const eliminarCliente = (id) => {
    if (window.confirm('¿Seguro quieres eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
      if (editarId === id) {
        setEditarId(null);
        setFormData({ nombre: '', email: '', telefono: '', direccion: '', comuna: '' });
      }
    }
  };

  return (
    <div>
      <h2>👥 Gestión de Clientes</h2>

      <form onSubmit={guardarCliente} style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={manejarCambio}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Número de teléfono"
          value={formData.telefono}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="comuna"
          placeholder="Comuna"
          value={formData.comuna}
          onChange={manejarCambio}
        />
        <button type="submit">{editarId !== null ? 'Actualizar Cliente' : 'Agregar Cliente'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Comuna</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.comuna}</td>
              <td>
                <button onClick={() => editarCliente(cliente)} style={{ marginRight: 8 }}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No hay clientes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
