const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let startups = [
    { id: 1, name: 'Startup One', progress: '50%', reports: [], messages: [] },
    { id: 2, name: 'Startup Two', progress: '75%', reports: [], messages: [] }
];

// API: Get startup progress
app.get('/api/startups', (req, res) => {
    res.json(startups);
});

// API: Collect monthly reports for a startup
app.post('/api/startups/:id/report', (req, res) => {
    const { id } = req.params;
    const { report } = req.body;
    const startup = startups.find(s => s.id == id);
    
    if (startup) {
        startup.reports.push(report);
        res.json({ message: 'Report added successfully' });
    } else {
        res.status(404).json({ message: 'Startup not found' });
    }
});

// API: Send messages to startups
app.post('/api/startups/:id/message', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const startup = startups.find(s => s.id == id);
    
    if (startup) {
        startup.messages.push(message);
        res.json({ message: 'Message sent successfully' });
    } else {
        res.status(404).json({ message: 'Startup not found' });
    }
});

// Start server on port 5000
app.listen(5000, () => {
    console.log('Backend API server running on port 5000');
});
