const winston = require('winston');

// Configuração básica do Winston
const logger = winston.createLogger({
  level: 'info', // Nível de log padrão (pode ser ajustado)
  transports: [
    new winston.transports.Console({ format: winston.format.combine(
      winston.format.colorize(), 
      winston.format.simple()) }), // Exibir no console
    new winston.transports.File({ filename: 'logs/app.log', format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()) }), // Salvar em arquivo
  ],
});

module.exports = logger;
