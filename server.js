const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));
// Route for root URL
app.get('/', (req, res) => {
  res.redirect('/driver-dashboard.html');
});
// Ensure HTML files are served with proper content-type
app.get('*.html', (req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

// API endpoint for maintenance logs
app.post('/api/log-maintenance', express.json(), (req, res) => {
    console.log('Received maintenance data:', req.body);
    
    // Broadcast to all connected clients
    io.emit('maintenance-update', req.body);
    
    res.status(200).json({ 
        success: true,
        message: 'Maintenance data received'
    });
});

// WebSocket connection handler
io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Handle maintenance data from drivers
    socket.on('maintenance-data', (data) => {
        console.log('Received maintenance data via WebSocket:', data);
        // Broadcast to all connected owners
        io.emit('maintenance-log', {
            ...data,
            timestamp: new Date().toLocaleString()
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the app at:
    - Driver Dashboard: http://localhost:${PORT}/driver-dashboard.html
    - Owner Dashboard: http://localhost:${PORT}/owner-dashboard.html`);
});