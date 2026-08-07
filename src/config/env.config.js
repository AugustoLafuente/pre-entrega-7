//Valida la existencia de las variables requeridas.
//Si alguna variable requerida no está presente, el proceso se detiene.

import dotenv from 'dotenv';

dotenv.config();

const requiredEnvs = ['PORT', 'NODE_ENV', 'MONGO_URI'];
const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

if (missingEnvs.length > 0) {
  console.error(`❌ Error crítico: Faltan variables de entorno obligatorias: ${missingEnvs.join(', ')}`);
  process.exit(1);
}

// Exportacion por defecto de la configuración de entorno para ser utilizada en otras partes de la aplicación
export const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI,
};

export default config;