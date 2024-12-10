const connection = require('../../config/connection');
const { departmentSchema } = require('../../utils/validation');
const { successResponse, errorResponse } = require('../../utils/responseHandler');
const logger = require('../../utils/logger');

// Função para listar departamentos com paginação e filtragem
const getDepartments = (req, res) => {
  const { page = 1, limit = 10, name } = req.query; // Recebe parâmetros de query para paginação e filtragem

  // Converte os parâmetros de página e limite para números inteiros
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Filtragem de departamentos (opcional)
  let query = 'SELECT * FROM departments';
  let params = [];

  if (name) {
    query += ' WHERE name LIKE ?';
    params.push(`%${name}%`); // Filtra por nome do departamento
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  // Executa a consulta no banco
  connection.query(query, params, (err, results) => {
    if (err) {
      logger.error(`Erro ao listar departamentos: ${err.message}`);
      return errorResponse(res, err);
    }

    // Retorna os resultados com informações de paginação
    logger.info(`Departamentos listados com sucesso, página ${page}`);
    successResponse(res, results, 'Departamentos listados com sucesso');
  });
};

// Cria um novo departamento
const createDepartment = (req, res) => {
  // Validação dos dados usando o Zod
  const validation = departmentSchema.safeParse(req.body);
  if (!validation.success) {
    logger.error(`Erro na validação de dados para departamento: ${validation.error.errors[0].message}`);
    return errorResponse(res, validation.error.errors[0].message, 400);
  }

  const { name } = req.body;
  connection.query('INSERT INTO departments (name) VALUES (?)', [name], (err) => {
    if (err) {
      logger.error(`Erro ao criar departamento: ${err.message}`);
      return errorResponse(res, err);
    }

    logger.info(`Departamento criado com sucesso: ${name}`);
    successResponse(res, null, 'Departamento criado com sucesso');
  });
};


module.exports = { getDepartments, createDepartment };
