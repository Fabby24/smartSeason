const express = require('express');
const { getSchedules, createSchedule } = require('../controllers/scheduleController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', getSchedules);
router.post('/', adminOnly, createSchedule);

module.exports = router;