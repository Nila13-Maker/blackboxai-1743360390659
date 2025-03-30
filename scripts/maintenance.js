function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded-lg shadow-lg';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function validateForm() {
    const oil = document.getElementById('oil-level').value;
    const water = document.getElementById('water-level').value;
    const fuel = document.getElementById('fuel-level').value;
    const tire = document.getElementById('tire-pressure').value;

    if (oil < 20) {
        showError("⚠️ Oil level critically low! Minimum 20% required");
        return false;
    }
    if (water < 30) {
        showError("⚠️ Water level too low! Minimum 30% required");
        return false;
    }
    if (fuel < 10) {
        showError("⚠️ Fuel level too low! Refuel soon");
        return false;
    }
    if (tire < 25 || tire > 40) {
        showError("⚠️ Tire pressure should be between 25-40 PSI");
        return false;
    }
    return true;
}

function resetForm() {
    document.getElementById('oil-level').value = 50;
    document.getElementById('water-level').value = 50;
    document.getElementById('fuel-level').value = 50;
    document.getElementById('tire-pressure').value = 32;
    document.getElementById('oil-value').textContent = '50%';
    document.getElementById('water-value').textContent = '50%';
    document.getElementById('fuel-value').textContent = '50%';
}

function submitMaintenance() {
    if (!validateForm()) return;

    const data = {
        oil: document.getElementById('oil-level').value,
        water: document.getElementById('water-level').value,
        fuel: document.getElementById('fuel-level').value,
        tire: document.getElementById('tire-pressure').value,
        timestamp: new Date().toLocaleString()
    };

    // In a real app, this would send to your backend API
    console.log('Submitting maintenance data:', data);
    
    // For demo purposes, we'll simulate API call
    setTimeout(() => {
        showSuccess("✅ Maintenance check submitted successfully!");
        resetForm();
        
        // Broadcast to owner dashboard (simulated)
        if (typeof socket !== 'undefined') {
            socket.emit('maintenance-data', data);
        }
    }, 1000);
}