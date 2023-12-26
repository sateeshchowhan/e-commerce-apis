const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = 4000;

dotenv.config()
main().catch(err => console.log(err));
// Connect to MongoDB (assuming you are using MongoDB)
async function main() {
  await mongoose.connect(process.env.MONGOOSE_URI)
   console.log("database connected")
}

app.use(cors())
app.use(express.json())


// Use routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
