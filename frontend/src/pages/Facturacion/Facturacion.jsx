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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';


const facturacion = [
    {
      "id": 1,
      "fecha_entrada": "01/02/24",
      "fecha_salida": "06/02/24",
      "nombre_cliente": "Antonio Baez",
      "facturaNo": "1",
      "importe": "100",
      "descuento": "10",
      "pendiente": "90",
      "fecha_limite": "10/02/24",
      "plazo_extra": "15/02/24",
    },

    {
        "id": 2,
        "fecha_entrada": "02/02/24",
        "fecha_salida": "07/02/24",
        "nombre_cliente": "Carlos Ramirez",
        "facturaNo": "2",
        "importe": "200",
        "descuento": "10",
        "pendiente": "180",
        "fecha_limite": "11/02/24",
        "plazo_extra": "16/02/24",
      },

      {
        "id": 3,
        "fecha_entrada": "03/02/24",
        "fecha_salida": "08/02/24",
        "nombre_cliente": "Matias Perez",
        "facturaNo": "3",
        "importe": "300",
        "descuento": "10",
        "pendiente": "260",
        "fecha_limite": "12/02/24",
        "plazo_extra": "17/02/24",
      },
    
  
 
 ]

export default function Facturacion() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <>
        <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Factura</Modal.Title>
        </Modal.Header>
        <Row>
            <Col xs={12}>
                <InputGroup className="mb-3 pt-4 p-2">
                <Form.Control
                  placeholder="factura #"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                </InputGroup>
            </Col>
        </Row>
        <Row>
        <Col md={4} className="mb-3">
        <Form.Select aria-label="Default select example">
      <option>seleccionar cliente </option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
            </Col >
            <Col xs={4}>
                <InputGroup className="mb-3 p-2">
                    <Form.Control
                      placeholder="id cliente "
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col xs={4}>
                <InputGroup className="mb-3 p-2">
                    <Form.Control
                      placeholder="id cliente "
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
        </Row>
        <Row>
        <Col xs={6}>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="fecha de entrada"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </Col>
        <Col xs={6}>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="fecha de salida"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </Col>
        </Row>
        <Row>
        <Col xs={6}>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="fecha limite"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </Col>
        <Col xs={6}>
        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="plazo extra"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        </Col>
        </Row>

        <InputGroup className="mb-3 p-2">
          <Form.Control
            placeholder="saldo"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
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
            Agregar facturacion
          </Button>
        </Nav.Item>
      </Nav>
      <Table striped bordered hover className='p-4'>
        <thead>
          <tr>
            <th>ID</th>
              <th>Fecha de Entrada</th>
              <th>Fecha de Salida</th>
              <th>Nombre Cliente</th>
              <th>Factura No.</th>
              <th>Importe</th>
              <th>Descuento</th>
              <th>Pendiente</th>
              <th>Fecha Límite</th>
              <th>Plazo Extra</th>
          </tr>
        </thead>
        <tbody>
          {
            facturacion.map((e) => {
              return (
                <>
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.fecha_entrada}</td>
                    <td>{e.fecha_salida}</td>
                    <td>{e.nombre_cliente}</td>
                    <td>{e.facturaNo}</td>
                    <td>{e.importe}</td>
                    <td>{e.descuento}</td>
                    <td>{e.pendiente}</td>
                    <td>{e.fecha_limite}</td>
                    <td>{e.plazo_extra}</td>



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
    )
}

    
    