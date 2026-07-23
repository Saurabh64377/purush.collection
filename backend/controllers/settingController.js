import Setting from '../models/Setting.js';

// GET /api/settings/:key - Public (for frontend to read settings)
export const getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching setting' });
  }
};

// GET /api/settings - Public (get all settings at once)
export const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    // Convert to a key-value object for easy frontend consumption
    const settingsMap = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching settings' });
  }
};

// PUT /api/settings/:key - Admin
export const updateSetting = async (req, res) => {
  try {
    const { value, description } = req.body;
    const key = req.params.key;

    if (!value) {
      return res.status(400).json({ message: 'Value is required' });
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, description: description || '', key },
      { upsert: true, new: true, runValidators: true }
    );

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating setting' });
  }
};

// PUT /api/settings/bulk - Admin (update multiple settings at once)
export const updateBulkSettings = async (req, res) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ message: 'Settings object is required' });
    }

    const operations = Object.entries(settings).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { key, value } },
        upsert: true,
      },
    }));

    await Setting.bulkWrite(operations);

    const updated = await Setting.find();
    const settingsMap = {};
    updated.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating settings' });
  }
};