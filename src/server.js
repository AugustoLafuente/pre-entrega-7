import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { config as env } from './config/env.config.js';
import { connectDB } from './config/db.config.js';

const PORT = env.port || 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);

// Inyectar io en app para usarlo en controladores
app.set('socketio', io);

io.on('connection', (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`🔌 Cliente desconectado: ${socket.id}`);
  });
});

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(`🌍 Entorno actual: ${env.env}`);
  });
});