import React from 'react'

import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useState, useEffect } from 'react';


// const customers = [
//   {
//     "id": 1,
//     "nombre": "Jose",
//     "tipo_cliente": "v",
//     "identificacion_cliente": "545464654",
//     "direccion": "calle 12",
//     "saldo": "4512"
//   },
//   {
//     "id": 2,
//     "nombre": "Maria",
//     "tipo_cliente": "v",
//     "identificacion_cliente": "545464654",
//     "direccion": "calle 12",
//     "saldo": "4512"
//   },
//   {
//     "id": 3,
//     "nombre": "Jesus",
//     "tipo_cliente": "v",
//     "identificacion_cliente": "545464654",
//     "direccion": "calle 12",
//     "saldo": "4512"
//   },
//   {
//     "id": 4,
//     "nombre": "Pedro",
//     "tipo_cliente": "v",
//     "identificacion_cliente": "545464654",
//     "direccion": "calle 12",
//     "saldo": "4512"
//   },
// ]

export default function Clientes() {

  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState('');
  const [tipoCliente, setTipoCliente] = useState('');
  const [identificacionCliente, setIdentificacionCliente] = useState('');
  const [direccionCliente, setDireccionCliente] = useState('');
  const [saldo, setSaldo] = useState('');

  const [customers, setCustomers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/clientes/")
      .then((response) => response.json())
      .then((data) => setCustomers(data.data))
      .catch((err) => console.log(err))
  }, []);

  const enviarDatosAlBackend = () => {
    // Aquí deberías enviar los datos al backend. Este es solo un ejemplo.
    const data = {
      nombre,
      tipoCliente,
      identificacionCliente,
      direccionCliente,
      saldo,
    };
    // Suponiendo que tengas una función `enviarDatos` para interactuar con tu backend
    // enviarDatos({ nombre, tipoCliente, identificacionCliente, direccionCliente, saldo });

    fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especificar el tipo de contenido como JSON
        'Accept': 'application/json',
      },
      body: JSON.stringify(data) // Convertir el objeto JSON a cadena JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data); // Puedes manejar la respuesta del servidor aquí
      })
      .catch(error => console.error('Error al enviar la factura al servidor:', error));


    handleClose(); // Cerrar el modal después de enviar los datos
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <InputGroup className="mb-3 pt-4 p-2">
          <Form.Control
            placeholder="nombre"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="tipo de cliente"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="identificación de cliente"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={identificacionCliente}
            onChange={(e) => setIdentificacionCliente(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="dirección del cliente"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={direccionCliente}
            onChange={(e) => setDireccionCliente(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="saldo"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
          />
        </InputGroup>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={enviarDatosAlBackend}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Cuentas por cobrar" id="basic-nav-dropdown">
                <NavDropdown.Item href="/clientes">clientes</NavDropdown.Item>
                <NavDropdown.Item href="/facturacion">facturacion</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Nav variant="pills" defaultActiveKey="/home" className='p-4'>
        <Nav.Item>
          <Button variant="primary" onClick={handleShow}>
            Agregar clientes
          </Button>
        </Nav.Item>
      </Nav>

      <Table striped bordered hover className='p-4'>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Tipo de cliente</th>
            <th>identificación cliente</th>
            <th>dirección</th>
            <th>saldo</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map((e) => {
              return (
                <>
                  <tr>
                    <td>{e.id_cliente}</td>
                    <td>{e.nombre}</td>
                    <td>{e.tipo_cliente}</td>
                    <td>{e.rif}</td>
                    <td>{e.direccion}</td>
                    <td>{e.saldo}</td>
                    <td>
                      <Button variant="outline-danger">Delete</Button>{' '}
                      <Button variant="outline-primary">update</Button>{' '}
                    </td>
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </Table>
    </>
  );
}
