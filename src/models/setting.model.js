import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  adminEmail: { type: String, required: true },
  maintenanceMode: { type: Boolean, default: false }
});

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
