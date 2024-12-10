const app = require('./app');
const { PORT } = process.env;

app.listen(PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${PORT || 3000}`);
});
