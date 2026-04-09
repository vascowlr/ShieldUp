// For demonstration and easy running without MongoDB setup, we'll use an in-memory array.
// If you configure MongoDB later, you can replace this with Report model imports.
const Report = require('../models/Report');

let mockReports = [
    {
        id: "1",
        title: "Agressões verbais no pátio",
        description: "Um grupo de alunos do 2º ano estava xingando um aluno mais novo durante o intervalo.",
        category: "Verbal",
        location: "Pátio Principal",
        isAnonymous: true,
        authorName: "Anônimo",
        date: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Mensagens ofensivas no grupo",
        description: "Fizeram montagens ofensivas de uma colega e postaram no grupo da sala no WhatsApp.",
        category: "Cyberbullying",
        location: "Online",
        isAnonymous: false,
        authorName: "Maria Eduarda",
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    }
];

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
const getReports = async (req, res) => {
    try {
        // If using real MongoDB:
        // const reports = await Report.find().sort({ date: -1 });
        // res.status(200).json(reports);

        // Using mock:
        res.status(200).json(mockReports);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar denúncias.' });
    }
};

// @desc    Create a report
// @route   POST /api/reports
// @access  Public
const createReport = async (req, res) => {
    try {
        const { title, description, category, location, isAnonymous, authorName } = req.body;

        const newReport = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            category,
            location,
            isAnonymous: isAnonymous !== undefined ? isAnonymous : true,
            authorName: isAnonymous ? 'Anônimo' : (authorName || 'Anônimo'),
            date: new Date().toISOString(),
        };

        // If using real MongoDB:
        // const report = await Report.create(newReport);
        // res.status(201).json(report);

        // Using mock:
        mockReports = [newReport, ...mockReports];
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar denúncia.' });
    }
};

module.exports = {
    getReports,
    createReport
};
