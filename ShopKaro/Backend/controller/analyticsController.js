const order = require("../model/Order");
const user = require("../model/User");
const product = require("../model/Product");

    const getAdminStats = async (req, res) => {
        try {
            const totalUsers = await user.countDocuments({role: "user"});
            const totalOrders = await order.countDocuments({});
            const totalProducts = await product.countDocuments({});

            const orders = await order.find({user: req.user._id})
            
            const totalRevenueData =  orders.reduce((acc, order) => acc + order.totalPrice, 0);

            res.json({
                totalUsers,
                totalOrders,
                totalProducts,
                totalRevenue: totalRevenueData
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching admin stats", error: error.message });
        }
    };

    module.exports = { getAdminStats };