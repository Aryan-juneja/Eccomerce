import dbConnect from '../../../utility/dbconnection';
import SettingsModel from '../../../models/setting.model';

export async function POST(req) {
  await dbConnect();

  try {
    const { siteName, adminEmail, maintenanceMode } = await req.json(); // Parse JSON body
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {},
      { siteName, adminEmail, maintenanceMode },
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify(updatedSettings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating settings:', error); // Log error for debugging
    return new Response(JSON.stringify({ error: 'Error updating settings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
