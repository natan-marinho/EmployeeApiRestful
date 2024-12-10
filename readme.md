# API de Funcionários e Departamentos

## Configuração
1. Clone o repositório.
2. Instale as dependências:
3. Configure o arquivo `.env` com base no `.env.example`.

## Execução
1. npm start

## Endpoints

### Departamentos
- `GET /departments` - Lista todos os departamentos.
- `POST /departments` - Cria um novo departamento.

### Funcionários
- `GET /employees` - Lista todos os funcionários.
- `POST /employees` - Cria um novo funcionário.

# DATABASE SCHEMA

CREATE DATABASE company;
USE company;

-- Criação da tabela de departamentos
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Criação da tabela de funcionários
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) -- Chave estrangeira para o departamento
);

-- Inserindo alguns dados de exemplo

-- Inserir departamentos
INSERT INTO departments (name) VALUES ('TI');
INSERT INTO departments (name) VALUES ('RH');
INSERT INTO departments (name) VALUES ('Marketing');

-- Inserir funcionários
INSERT INTO employees (first_name, last_name, email, position, salary, department_id) 
VALUES ('João', 'Silva', 'joao.silva@empresa.com', 'Desenvolvedor', 5000.00, 1);

INSERT INTO employees (first_name, last_name, email, position, salary, department_id) 
VALUES ('Maria', 'Oliveira', 'maria.oliveira@empresa.com', 'Analista de RH', 4000.00, 2);

INSERT INTO employees (first_name, last_name, email, position, salary, department_id) 
VALUES ('Carlos', 'Santos', 'carlos.santos@empresa.com', 'Analista de Marketing', 4500.00, 3);

