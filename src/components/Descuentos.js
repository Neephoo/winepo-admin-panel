import React, { useState } from 'react';

const Descuentos = () => {
  const [descuentos, setDescuentos] = useState([
    { id: 1, nombre: 'Navidad', porcentaje: 15, vence: '2025-12-25' },
    { id: 2, nombre: 'CyberDay', porcentaje: 30, vence: '2025-10-05' }
  ]);
  const [form, setForm] = useState({ nombre: '', porcentaje: '', vence: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.porcentaje || !form.vence) return;
    const nuevoDescuento = {
      id: Date.now(),
      nombre: form.nombre,
      porcentaje: parseFloat(form.porcentaje),
      vence: form.vence
    };
    setDescuentos([...descuentos, nuevoDescuento]);
    setForm({ nombre: '', porcentaje: '', vence: '' });
  };

  const handleEditar = (d) => {
    setModoEdicion(true);
    setIdEditar(d.id);
    setForm({ nombre: d.nombre, porcentaje: d.porcentaje, vence: d.vence });
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    const actualizados = descuentos.map(d =>
      d.id === idEditar
        ? { ...d, nombre: form.nombre, porcentaje: parseFloat(form.porcentaje), vence: form.vence }
        : d
    );
    setDescuentos(actualizados);
    setModoEdicion(false);
    setForm({ nombre: '', porcentaje: '', vence: '' });
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm('¿Eliminar este descuento?');
    if (confirm) {
      setDescuentos(descuentos.filter(d => d.id !== id));
    }
  };

  return (
    <div className="page-container">
      <h2>🏷️ Gestión de Descuentos</h2>

      <form onSubmit={modoEdicion ? handleActualizar : handleAgregar} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del descuento"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="porcentaje"
          placeholder="% Descuento"
          min="1"
          max="100"
          value={form.porcentaje}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="vence"
          value={form.vence}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>%</th>
            <th>Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {descuentos.map(d => (
            <tr key={d.id}>
              <td>{d.nombre}</td>
              <td>{d.porcentaje}%</td>
              <td>{d.vence}</td>
              <td>
                <button onClick={() => handleEditar(d)}>✏️</button>
                <button onClick={() => handleEliminar(d.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Descuentos;
