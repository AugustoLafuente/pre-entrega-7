// Importaciones necesarias para la configuración del servidor y la gestión de servicios
import { config as env } from "./config/env.config.js";
import { ServiceManager } from "./managers/ServiceManager.js";

const manager = new ServiceManager("./src/data/services.json");


// Bloque de pruebas asíncronas para comprobar los criterios de aceptación
const runTests = async () => {
  console.log('\n--- 1. Agregando servicio válido ---');
  const nuevoServicio = await manager.addService({
    name: "Corte de Cabello",
    description: "Corte moderno estilo Fade",
    duration: 30,
    price: 1500,
    category: "Barbería",
    available: true
  });
  console.log('Servicio creado:', nuevoServicio);

  console.log('\n--- 2. Intentando agregar servicio incompleto ---');
  const servicioIncompleto = await manager.addService({ name: "Incompleto" });
  console.log('Resultado (Debe ser null):', servicioIncompleto);

  console.log('\n--- 3. Listar todos los servicios ---');
  console.log(await manager.getServices());

  console.log('\n--- 4. Buscar por ID existente (ID: 1) ---');
  console.log(await manager.getServiceById(1));

  console.log('\n--- 5. Actualizar servicio (Sin cambiar ID) ---');
  const actualizado = await manager.updateService(1, { price: 1800 });
  console.log('Servicio modificado:', actualizado);

  console.log('\n--- 6. Intentar modificar el ID (Debe rechazar/retornar null) ---');
  const intentoId = await manager.updateService(1, { id: 99, price: 2000 });
  console.log('Resultado del hack de ID:', intentoId);
};

runTests();


