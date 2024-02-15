INSERT INTO clientes (nombre, tipo_cliente, rif, direccion, telefono, saldo) VALUES
('Nombre del Cliente', 'Tipo del Cliente', 'J-12345678-9', 'Dirección del Cliente', '04141234567', 100.00);

INSERT INTO facturas (fecha_entrada, fecha_salida, id_cliente, nombre_cliente, factura_no, importe, descuento, pendiente, fecha_limite, plazo_extra) VALUES
('2024-02-01', '2024-02-15', 65, 'Nombre del Cliente', 'FAC-001', 500.00, 50.00, 450.00, '2024-03-01', 15);