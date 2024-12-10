const { z } = require('zod');

// Esquema para validar os dados de um departamento
const departmentSchema = z.object({
  name: z.string().min(1, 'O nome do departamento é obrigatório'),
});

// Esquema para validar os dados de um funcionário
const employeeSchema = z.object({
  first_name: z.string().min(1, 'O primeiro nome é obrigatório'),
  last_name: z.string().min(1, 'O sobrenome é obrigatório'),
  email: z.string().email('O email precisa ser válido').min(1, 'O email é obrigatório'),
  position: z.string().min(1, 'A posição é obrigatória'),
  salary: z.number().positive('O salário deve ser um valor positivo'),
  department_id: z.number().int('O departamento deve ser um número inteiro'),
});

module.exports = { departmentSchema, employeeSchema };
