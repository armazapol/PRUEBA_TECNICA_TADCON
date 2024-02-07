import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {nationalities} from './../data'

function EditModal({ showEditModal, toogleShowModal, selectedUsers, editUser }) {
  const [form, setForm] = useState(selectedUsers[0]);

  const handleChange = (e) => {
    setForm((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditUser = () => {
    editUser(form)
  }
  
  return (
    <>
      <Modal show={showEditModal} onHide={toogleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="name"
                onChange={(e) => handleChange(e)}
                value={form.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Select
                onChange={(e) => handleChange(e)}
                name="gender"
                value={form.gender}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control name="email" type="email"  onChange={(e) => handleChange(e)} value={form.email} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Celular</Form.Label>
              <Form.Control name="cell" type="text"  onChange={(e) => handleChange(e)} value={form.cell} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Select name="nat" value={form.nat}  onChange={(e) => handleChange(e)}>
                {
                  nationalities.map((nat) => {
                    return <option value={nat} key={nat}>{nat}</option>
                  })

                }
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toogleShowModal}>
            Salir
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
