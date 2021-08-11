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
  Button
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { tbody } from "variables/general";

function Users() {

  const thead = ["ID", "Nome", "Data de Nascimento", "Email", "Opções"]
  const [users, setUsers] = useState(false);
  const [can, setCan] = useState(true);

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

  /*function updateUser(id,data) {
    fetch(`http://localhost:3001/user/${id}`, {
      method: 'UPDATE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }*/

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
              return <td key={key}>{prop}</td>;
            })}
            <td className="td-actions text-right">
              <Button
                className="btn-round btn-icon btn-icon-mini btn-neutral"
                color="info"
                id="editUserButton"
                type="button"
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
      </div>
    </>
  );
}

export default Users;
