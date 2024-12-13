API de Funcionários e Departamentos
<div align="center">
  <img src="./banner.svg" alt="API Banner" />
</div>
API RESTful para gerenciamento de funcionários e departamentos de uma empresa.
🚀 Instalação

Clone o repositório

bashCopygit clone [url-do-repositorio]

Instale as dependências

bashCopynpm install

Configure as variáveis de ambiente

bashCopycp .env.example .env
⚙️ Configuração do Banco de Dados
Execute o seguinte script SQL para criar e popular o banco de dados:
sqlCopyCREATE DATABASE company;
USE company;

-- Tabela de departamentos
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabela de funcionários
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Dados iniciais
INSERT INTO departments (name) VALUES 
    ('TI'),
    ('RH'),
    ('Marketing');

INSERT INTO employees (first_name, last_name, email, position, salary, department_id) VALUES 
    ('João', 'Silva', 'joao.silva@empresa.com', 'Desenvolvedor', 5000.00, 1),
    ('Maria', 'Oliveira', 'maria.oliveira@empresa.com', 'Analista de RH', 4000.00, 2),
    ('Carlos', 'Santos', 'carlos.santos@empresa.com', 'Analista de Marketing', 4500.00, 3);
🔧 Execução
bashCopynpm start
📡 Endpoints
Departamentos

GET /departments - Lista todos os departamentos
POST /departments - Cria um novo departamento

Funcionários

GET /employees - Lista todos os funcionários
POST /employees - Cria um novo funcionário

🛠️ Tecnologias

Node.js
Express
MySQL

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
