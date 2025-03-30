// Connect to WebSocket server (simulated for demo)
const socket = io('http://localhost:8000');

// Listen for maintenance updates from server
socket.on('maintenance-update', (data) => {
    console.log('Received maintenance update:', data);
    // In a real app, this would update the owner dashboard
});

// Handle connection events
socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

// For demo purposes - simulate receiving data
setTimeout(() => {
    socket.emit('connect'); // Simulate connection
}, 1000);