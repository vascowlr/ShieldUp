const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shieldup')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Models
const ReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: String,
    institutionType: String,
    institutionName: String,
    isAnonymous: { type: Boolean, default: true },
    authorName: { type: String, default: 'Anônimo' },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', ReportSchema);

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes

// 1. Create Report
app.post('/api/reports', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, location, institutionType, institutionName, isAnonymous, authorName } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newReport = new Report({
            title,
            description,
            category,
            location,
            institutionType,
            institutionName,
            isAnonymous: isAnonymous === 'true',
            authorName: isAnonymous === 'true' ? 'Anônimo' : (authorName || 'Identificado'),
            imageUrl
        });

        await newReport.save();
        res.status(201).json(newReport);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get Reports (Recent Feed & Admin)
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Admin Registration (using code ShieldUpADM1)
app.post('/api/admin/register', async (req, res) => {
    try {
        const { username, password, registrationCode } = req.body;

        if (registrationCode !== 'ShieldUpADM1') {
            return res.status(401).json({ error: 'Código de registro inválido.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Administrador criado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin) return res.status(404).json({ error: 'Administrador não encontrado.' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: 'Senha incorreta.' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
        res.json({ token, username: admin.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
