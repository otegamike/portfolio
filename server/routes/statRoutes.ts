import express from 'express';
import Stat from '../models/Stats.js';

const router = express.Router();

// Get the main stats object (assuming one record for portfolio stats)
router.get('/', async (req, res, next) => {
    try {
        let stats = await Stat.findOne();
        if (!stats) {
            stats = await Stat.create({
                siteViews: 0,
                projectsCompleted: 0,
                messagesReceived: 0,
                yearsOfExperience: 0
            });
        }
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
});

// Add/update stats
router.post('/', async (req, res, next) => {
    try {
        const { siteViews, projectsCompleted, messagesReceived, yearsOfExperience } = req.body;
        let stats = await Stat.findOne();
        
        if (stats) {
            if (siteViews !== undefined) stats.siteViews = siteViews;
            if (projectsCompleted !== undefined) stats.projectsCompleted = projectsCompleted;
            if (messagesReceived !== undefined) stats.messagesReceived = messagesReceived;
            if (yearsOfExperience !== undefined) stats.yearsOfExperience = yearsOfExperience;
            await stats.save();
        } else {
            stats = await Stat.create({
                siteViews: siteViews || 0,
                projectsCompleted: projectsCompleted || 0,
                messagesReceived: messagesReceived || 0,
                yearsOfExperience: yearsOfExperience || 0
            });
        }

        res.status(201).json(stats);
    } catch (error) {
        next(error);
    }
});

export default router;
