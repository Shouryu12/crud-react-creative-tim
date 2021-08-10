const Pool = require('pg').Pool
const pool = new Pool({
  user: 'shouryuu',
  host: 'localhost',
  database: 'reactdb',
  password: 'teste123',
  port: 5432,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
      })
    }) 
  }
  const createUser = (body) => {
    return new Promise(function(resolve, reject) {
      const { nome, sexo, datanasc, email } = body
      pool.query('INSERT INTO users (nome, sexo, datanasc, email) VALUES ($1, $2, $3, $4)', [nome, sexo, datanasc, email], (error, results) => {
        if (error) {
          reject(error)
        }
      })
    })
  }
  const deleteUser = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUser,
    deleteUser,
  }