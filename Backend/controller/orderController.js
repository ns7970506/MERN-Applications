const Order = require("../model/Order");

const sendEmail = require("../utils/Sendmail");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        
         if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: "Invalid order data" });
         }
         else{
            const newOrder = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId,
            });
            await newOrder.save();
            const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully placed.\n\nOrder Details:\nOrder ID: ${newOrder._id}\nTotal Amount: ${newOrder.totalAmount}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopKaro Team`;


            await sendEmail(req.user.email, "Order Confirmation",message );
            res.status(201).json({ message: "Order created successfully", order: newOrder });
         }
        }
        catch (error) {
            res.status(500).json({ message: "Error creating order", error: error.message });
        }
    }


    const myorders = async (req, res) => {
        try {
            const orders = await Order.find({ user: req.user._id })
                .populate('items.productId', 'name price')
                .sort({ createdAt: -1 });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: "Order not found", error: error.message });
        }
    }


    const getOrders = async (req, res) => {
        try {
            const orders = await Order.find({}).populate('user', 'id name')
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: "Order not found", error: error.message });
        }
    }

    const updateOrderStatus = async (req, res) => {
        try {
            const status = String(req.body.status || '').toLowerCase();
            const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid order status' });
            }
            const order = await Order.findById(req.params.id);
            if (order){
                order.status = status;
                await order.save();
                res.json({ message: "Order status updated successfully", order });
            } 
            else{
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating order status", error: error.message });
        }
    }

    module.exports = {
    createOrder,myorders,getOrders,updateOrderStatus}
