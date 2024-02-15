// Importa los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Conecta con la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'K4i!5Zd"6:5!',
  database: 'sistema_cobranzas'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// RUTAS SUBPESTAÑA CLIENTES PESTAÑA CLIENTES

// Ruta para guardar un nuevo cliente
app.post('/api/clientes', (req, res) => {
  console.log(req.body);
  const { nombre, tipoCliente, identificacionCliente, direccionCliente, telefonoCliente, saldo } = req.body;

  const sql = `INSERT INTO clientes (nombre, tipo_cliente, rif, direccion, telefono, saldo) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nombre, tipoCliente, identificacionCliente, direccionCliente, telefonoCliente, saldo], (err, result) => {
    if (err) {
      console.error('Error al guardar el cliente:', err);
      return res.status(500).json({ message: 'Error al guardar el cliente', error: err.message });
    } else {
      console.log('Cliente guardado exitosamente');
      return res.json({ message: 'Cliente guardado exitosamente' });
    }
  });
});

// Ruta para borrar clientes seleccionados
app.delete('/api/clientes', (req, res) => {
  const idsClientes = req.body.ids;

  // Verificar si se proporcionaron IDs de clientes
  if (!idsClientes || !Array.isArray(idsClientes) || idsClientes.length === 0) {
    return res.status(400).json({ message: 'Se requiere al menos un ID de cliente para borrar' });
  }

  // Construir la consulta para borrar los clientes
  const sql = `DELETE FROM clientes WHERE id_cliente IN (?)`;

  // Ejecutar la consulta para borrar los clientes seleccionados
  db.query(sql, [idsClientes], (err, result) => {
    if (err) {
      console.error('Error al borrar los clientes:', err);
      return res.status(500).json({ message: 'Error al borrar los clientes', error: err.message });
    } else {
      console.log('Clientes borrados exitosamente');
      return res.json({ message: 'Clientes borrados exitosamente' });
    }
  });
});

// Ruta para buscar clientes
app.get('/api/clientes/buscar', (req, res) => {
  const buscarTexto = req.query.buscar;

  // Construir la consulta para buscar clientes en la base de datos
  const sql = `SELECT * FROM clientes WHERE nombre LIKE ? OR tipo_cliente LIKE ? OR rif LIKE ?`;

  // Ejecutar la consulta
  db.query(sql, [`%${buscarTexto}%`, `%${buscarTexto}%`, `%${buscarTexto}%`], (err, results) => {
    if (err) {
      console.error('Error al buscar clientes:', err);
      return res.status(500).json({ message: 'Error al buscar clientes' });
    }
    res.json(results); // Devolver los resultados de la búsqueda
  });
});

// Ruta para obtener todos los clientes
app.get('/api/clientes', (req, res) => {
  const sql = `SELECT id_cliente, nombre , tipo_cliente , rif , direccion , telefono , saldo FROM clientes`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      return res.status(500).json({ message: 'Error al obtener clientes' });
    }
    return res.status(200).json({ data: results, message: "Clientes obtenidos correctamente" });
  });
});

// Ruta para editar un cliente existente
app.put('/api/clientes/:id', (req, res) => {
  const idCliente = req.params.id;
  const { nombreCliente, tipoCliente, rifCliente, direccionCliente, telefonoCliente, saldoCliente } = req.body;

  const sql = `UPDATE clientes SET nombre = ?, tipo_cliente = ?, rif = ?, direccion = ?, telefono = ?, saldo = ? WHERE id_cliente = ?`;

  db.query(sql, [nombreCliente, tipoCliente, rifCliente, direccionCliente, telefonoCliente, saldoCliente, idCliente], (err, result) => {
    if (err) {
      console.error('Error al editar el cliente:', err);
      return res.status(500).json({ message: 'Error al editar el cliente', error: err.message });
    } else {
      console.log('Cliente editado exitosamente');
      return res.json({ message: 'Cliente editado exitosamente' });
    }
  });
});



app.get('/api/clientes', (req, res) => {
  // Implementar lógica para obtener todos los clientes desde la base de datos
  // y enviar la respuesta en formato JSON
  res.json({ message: 'Obtener todos los clientes' });
});

// Ruta para guardar una nueva facturas

// RUTAS SUBPESTAÑA FACTURA PESTAÑA CLIENTES

app.post('/api/facturas', (req, res) => {
  const { fechaEntrada, fechaSalida, idClienteFactura, nombreClienteFactura, facturaNo, importe, descuento, pendiente, fechaLimite, plazoExtra } = req.body;

  console.log('Datos recibidos del formulario:', req.body);

  // Validar si algún dato está llegando como nulo
  if (!fechaEntrada || !fechaSalida || !idClienteFactura || !nombreClienteFactura || !facturaNo || !importe || !descuento || !pendiente || !fechaLimite || !plazoExtra) {
    console.error('Algunos datos llegaron como nulos');
    return res.status(400).json({ message: 'Algunos datos llegaron como nulos' });
  }

  // Obtener el nombre del cliente a partir del ID
  const sqlCliente = `SELECT nombre FROM clientes WHERE id_cliente = ?`;

  db.query(sqlCliente, [idClienteFactura], (err, result) => {
    if (err) {
      console.error('Error al obtener nombre del cliente:', err);
      return res.status(500).json({ message: 'Error al obtener nombre del cliente' });
    }

    const nombreCliente = result[0].nombre;

    // Convertir el nombre del cliente a formato adecuado para la base de datos
    const nombreClienteDB = nombreCliente.replace(/'/g, "''");

    // Insertar la nueva factura en la base de datos
    const sql = `INSERT INTO facturas (fecha_entrada, fecha_salida, id_cliente, nombre_cliente, factura_no, importe, descuento, pendiente, fecha_limite, plazo_extra) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [fechaEntrada, fechaSalida, idClienteFactura, nombreClienteDB, facturaNo, importe, descuento, pendiente, fechaLimite, plazoExtra], (err, result) => {
      if (err) {
        console.error('Error al guardar la factura en la base de datos:', err);
        return res.status(500).json({ message: 'Error al guardar la factura', error: err.message });
      } else {
        console.log('Factura guardada exitosamente');
        return res.json({ message: 'Factura guardada exitosamente' });
      }
    });
  });
});

// Ruta para obtener todas las facturas desde la base de datos
app.get('/api/facturas', (req, res) => {
  const sql = 'SELECT * FROM facturas'; // Consulta SQL para obtener todas las facturas

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener las facturas:', err);
      return res.status(500).json({ message: 'Error al obtener las facturas' });
    }

    console.log('Datos de las facturas enviados al cliente:', result); // Agregar este console.log

    res.json(result); // Devolver las facturas en formato JSON
  });
});



// Ruta para editar una factura en la base de datos
app.put('/api/facturas/:id', (req, res) => {
  const facturaId = req.params.id;
  const { fechaEntrada, fechaSalida, idClienteFactura, nombreClienteFactura, facturaNo, importe, descuento, pendiente, fechaLimite, plazoExtra } = req.body;

  console.log('Datos recibidos para editar la factura:', req.body);

  // Validar si algún dato está llegando como nulo
  if (!fechaEntrada || !fechaSalida || !idClienteFactura || !nombreClienteFactura || !facturaNo || !importe || !descuento || !pendiente || !fechaLimite || !plazoExtra) {
    console.error('Algunos datos llegaron como nulos');
    return res.status(400).json({ message: 'Algunos datos llegaron como nulos' });
  }

  // Obtener el nombre del cliente a partir del ID
  const sqlCliente = `SELECT nombre FROM clientes WHERE id_cliente = ?`;

  db.query(sqlCliente, [idClienteFactura], (err, result) => {
    if (err) {
      console.error('Error al obtener nombre del cliente:', err);
      return res.status(500).json({ message: 'Error al obtener nombre del cliente' });
    }

    const nombreCliente = result[0].nombre;

    // Convertir el nombre del cliente a formato adecuado para la base de datos
    const nombreClienteDB = nombreCliente.replace(/'/g, "''");

    // Actualizar la factura en la base de datos
    const sql = `UPDATE facturas SET fecha_entrada = ?, fecha_salida = ?, id_cliente = ?, nombre_cliente = ?, factura_no = ?, importe = ?, descuento = ?, pendiente = ?, fecha_limite = ?, plazo_extra = ? WHERE id = ?`;

    db.query(sql, [fechaEntrada, fechaSalida, idClienteFactura, nombreClienteDB, facturaNo, importe, descuento, pendiente, fechaLimite, plazoExtra, facturaId], (err, result) => {
      if (err) {
        console.error('Error al actualizar la factura en la base de datos:', err);
        return res.status(500).json({ message: 'Error al actualizar la factura', error: err.message });
      } else {
        console.log('Factura actualizada exitosamente');
        return res.json({ message: 'Factura actualizada exitosamente' });
      }
    });
  });
});

// Ruta para eliminar facturas
app.delete('/api/facturas', (req, res) => {
  const idsFacturas = req.body.ids; // Obtener los IDs de las facturas a eliminar desde el cuerpo de la solicitud
  // Aquí deberías implementar la lógica para eliminar las facturas con los IDs proporcionados
  // Supongamos que tienes una función en tu base de datos llamada eliminarFacturasPorIds que recibe un arreglo de IDs y los elimina de la base de datos
  eliminarFacturasPorIds(idsFacturas)
    .then(() => {
      res.status(200).json({ message: 'Facturas eliminadas exitosamente' });
    })
    .catch(error => {
      console.error('Error al eliminar las facturas:', error);
      res.status(500).json({ message: 'Error al eliminar las facturas' });
    });
});






// Ruta para cargar el HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
