const order = require("../model/Order");
const user = require("../model/User");
const product = require("../model/Product");

    const getAdminStats = async (req, res) => {
        try {
            const totalUsers = await user.countDocuments({role: "user"});
            const totalOrders = await order.countDocuments({});
            const totalProducts = await product.countDocuments({});

            // Order documents store revenue in `totalAmount`, not `totalPrice`.
            // Coercing invalid legacy values to zero keeps the API numeric.
            const orders = await order.find({});
            const totalRevenueData = orders.reduce(
                (total, currentOrder) => total + (Number(currentOrder.totalAmount) || 0),
                0
            );

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
