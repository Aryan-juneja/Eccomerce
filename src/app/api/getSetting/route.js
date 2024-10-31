import dbConnect from '../../../utility/dbconnection';
import SettingsModel from '../../../models/setting.model';

export async function GET(req) {
  await dbConnect();

  try {
    const settings = await SettingsModel.findOne();
    return new Response(JSON.stringify(settings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching settings:', error); // Log error for debugging
    return new Response(JSON.stringify({ error: 'Error fetching settings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
