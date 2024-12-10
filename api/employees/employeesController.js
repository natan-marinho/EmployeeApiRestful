const connection = require('../../config/connection');
const { employeeSchema } = require('../../utils/validation');
const { successResponse, errorResponse } = require('../../utils/responseHandler');
const logger = require('../../utils/logger');

// Função para listar funcionários com paginação e filtragem
const getEmployees = (req, res) => {
  const { page = 1, limit = 10, name, department_id } = req.query;

  // Converte os parâmetros de página e limite para números inteiros
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Filtragem de funcionários (opcional)
  let query = 'SELECT * FROM employees';
  let params = [];

  if (name) {
    query += ' WHERE first_name LIKE ? OR last_name LIKE ?';
    params.push(`%${name}%`, `%${name}%`); // Filtra por nome (primeiro ou último)
  }

  if (department_id) {
    if (params.length === 0) {
      query += ' WHERE department_id = ?';
    } else {
      query += ' AND department_id = ?';
    }
    params.push(department_id); // Filtra pelo ID do departamento
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  // Executa a consulta no banco
  connection.query(query, params, (err, results) => {
    if (err) {
      logger.error(`Erro ao listar funcionários: ${err.message}`);
      return errorResponse(res, err);
    }

    // Retorna os resultados com informações de paginação
    logger.info(`Funcionários listados com sucesso, página ${page}`);
    successResponse(res, results, 'Funcionários listados com sucesso');
  });
};

// Cria um novo funcionário
const createEmployee = (req, res) => {
  // Validação dos dados usando o Zod
  const validation = employeeSchema.safeParse(req.body);
  if (!validation.success) {
    logger.error(`Erro na validação de dados para funcionário: ${validation.error.errors[0].message}`);
    return errorResponse(res, validation.error.errors[0].message, 400);
  }

  const { first_name, last_name, email, position, salary, department_id } = req.body;
  const query = `
    INSERT INTO employees (first_name, last_name, email, position, salary, department_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(query, [first_name, last_name, email, position, salary, department_id], (err) => {
    if (err) {
      logger.error(`Erro ao criar funcionário: ${err.message}`);
      return errorResponse(res, err);
    }

    logger.info(`Funcionário criado com sucesso: ${first_name} ${last_name}`);
    successResponse(res, null, 'Funcionário criado com sucesso');
  });
};

module.exports = { getEmployees, createEmployee };
