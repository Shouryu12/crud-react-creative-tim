const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reactdb',
  password: 'Teste123',
  port: 5432,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users WHERE ativo=true ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        
        const datas = [];
        
        results.rows.map((item)=>{
          let obj = [];
          for(key in item){
            if(key != "ativo")
              obj.push(item[key].toString());
          }
          let data = {
              className: "table-success",
              data: obj,
            };
          datas.push(data);
        })
        resolve({datas});

      })
    }) 
  }

  const getUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { id } = body
      pool.query('SELECT * FROM users WHERE id=$1 ORDER BY id ASC', [id], (error, results) => {
        if (error) {
          reject(error)
        }

        const datas = [];
        
        results.rows.map((item)=>{
          let obj = [];
          for(key in item){
            if(key != "ativo")
              obj.push(item[key].toString());
          }
          let data = {
              className: "table-success",
              data: obj,
            };
          datas.push(data);
        })
        resolve({datas});
      })
    }) 
  }

  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { nome, datanasc, email } = body
      pool.query('INSERT INTO users (nome, datanasc, email) VALUES ($1, $2, $3)', [nome, datanasc, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Cadastro realizado com sucesso.`)
      })
    })
  }

  const updateUser = (id, body) => {
    return new Promise(function(resolve, reject) {
      const { nome, datanasc, email } = body
      pool.query('UPDATE users SET nome = $1, datanasc = $2, email = $3 WHERE id = $4', [nome, datanasc, email, id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Os dados do usuário foram atualizados.`)
      })
    })
  }

  const deactivateUser = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('UPDATE users SET ativo=false WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`O usuário foi desativado com sucesso.`)
      })
    })
  }
  
  module.exports = {
    getUsers,
    getUser,
    createUser,
    deactivateUser,
    updateUser
  }