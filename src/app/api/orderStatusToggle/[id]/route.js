import dbConnect from '../../../../utility/dbconnection';
import orderModel from '../../../../models/order.model';

export async function POST(req, { params }) {
  const { id } = params;

  try {
    const { status } = await req.json();
    console.log("Status from request body:", status);
    
    await dbConnect();

    // Find the order first
    const order = await orderModel.findById(id);
    if (!order) {
      console.error('Order not found with ID:', id);
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    console.log("Order before update:", order);

    // Update the order status
    order.status = status;
    await order.save();

    // Retrieve the updated order
    const updatedOrder = await orderModel.findById(id);
    console.log("Order after update:", updatedOrder);

    return new Response(JSON.stringify({ message: 'Order status updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return new Response(JSON.stringify({ error: 'Failed to update order status' }), { status: 500 });
  }
}
