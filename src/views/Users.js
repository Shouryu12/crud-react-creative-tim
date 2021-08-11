import React, {useState, useEffect}  from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText 
} from "reactstrap";

import { Container, Button as FloatingButton} from 'react-floating-action-button'

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { tbody } from "variables/general";

function Users() {

  const thead = ["ID", "Nome", "Data de Nascimento", "Email", "Opções"]
  
  const [users, setUsers] = useState(false);
  const [can, setCan] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [nome, setNome] = useState("");
  const [datanasc, setDatanasc] = useState("");
  const [email, setEmail] = useState("");

  async function getUsers() {
    await fetch('http://localhost:3001').then(response => {
      return response.text();
    }).then(data => {
        const datas = JSON.parse(data);
        setUsers(datas.datas);
      });
  }

  async function deactivateUser(id_user) {
    await fetch(`http://localhost:3001/user/deactivate/${id_user}`, {
      method: 'DELETE',
    }).then(response => {
        return response.text();
      }).then(data => {
        alert(data);
        getUsers();
      });
  }

  function createUser(nome, datanasc, email) {
    fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome, datanasc, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }

  function updateUser(id, nome, datanasc, email) {
    fetch(`http://localhost:3001/user/update/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome, datanasc, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }

  const toggle = () => setModal(!modal);

  const toggleConfig = (titulo, tipo, data) => {
    setModalTitle(titulo)
    if(tipo=="edit"){
      setUserId(data[0])
      setNome(data[1]);
      setDatanasc(data[2]);
      setEmail(data[3]);
    }
    setModal(!modal);
  };

  const clearFields = () => {
    setUserId("")
    setNome("");
    setDatanasc("");
    setEmail("");
  }

  const handleCancel = () => {
    clearFields
    setModal(!modal)
  };

  const handleSubmitCadastro = (e) => {
    e.preventDefault();
    setModal(!modal);
    createUser(nome, datanasc, email);
  }

  const handleSubmitEditar = (e) => {
    e.preventDefault();
    setModal(!modal);
    updateUser(userId,nome, datanasc, email);
  }

  const handleChangeNome = (e) => {
    setNome(e.target.value)
    console.log(e.target.value)
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  };

  const handleChangeDataNasc = (e) => {
    setDatanasc(e.target.value)
  };

  function templateTable(){
    return (
      tbody.map((prop, key) => {
        return (
          <tr key={key}>
            {prop.data.map((prop, key) => {
              if (key === thead.length - 1)
                return (
                  <td key={key} className="text-right">
                    {prop}
                  </td>
                );
              return <td key={key}>{prop}</td>;
            })}
          </tr>
        );
      })
    );
  }

  function loadTable() {
    return (
      users.map((prop, key) => {
        return (
          <tr key={key}>
            {prop.data.map((prop, key) => {
              if(key == 2){
                let aux = prop.split(/-/g);
                let newDateFormat = aux[2] + "/" + aux[1] + "/" + aux[0]
                return <td key={key}>{newDateFormat}</td>;
              }
              return <td key={key}>{prop}</td>;
            })}
            <td className="td-actions text-right">
              <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id="editUserButton"
                type="button"
                onClick={() => toggleConfig("Editar dados","edit", prop.data)}
              >
                <i className="now-ui-icons ui-2_settings-90" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="editUserButton"
              >
                Editar Usuário
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="danger"
                id="deactivateUserButton"
                type="button"
                onClick={() => deactivateUser(prop.data[0])}
              >
                <i className="now-ui-icons ui-1_simple-remove" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="deactivateUserButton"
              >
                Desativar Usuário
              </UncontrolledTooltip>
            </td>
          </tr>
        );
      })
    );
  }

  useEffect(() => {
    if(can){
      setCan(false)
      getUsers();
    }
  });

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
        <Modal isOpen={modal} toggle={toggle} onClosed={clearFields}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomeInput">Nome</Label>
                <Input type="text" name="nome" id="nomeInput" onChange={handleChangeNome} value={nome}/>
              </FormGroup>
              <FormGroup>
                <Label for="datanascInput">Data de Nascimento</Label>
                <Input type="date" name="datanasc" id="datanascInput" onChange={handleChangeDataNasc} value={datanasc}/>
              </FormGroup>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input type="email" name="email" id="emailInput" onChange={handleChangeEmail} value={email}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={userId==""?handleSubmitCadastro:handleSubmitEditar}>Concluir</Button>
            <Button color="danger" onClick={handleCancel}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Usuários cadastrados</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {users?loadTable():templateTable()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Container>
          <FloatingButton
              tooltip="Adicionar Usuários"
              icon="fas fa-plus"
              rotate={false}
              onClick={() => toggleConfig("Cadastrar novo usuário", "create")} />
        </Container>
      </div>
    </>
  );
}

export default Users;
