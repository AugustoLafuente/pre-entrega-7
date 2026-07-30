import app from './app.js';
import { config as env } from './config/env.config.js';

const PORT = env.port || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
  console.log(`🌍 Entorno actual: ${env.env}`);
});