const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary'); // Import thư viện Cloudinary
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Cấu hình Cloudinary
cloudinary.v2.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY , 
  api_secret: process.env.API_SECRET
});

console.log(process.env.CLOUD_NAME)
// Phục vụ các tệp tin tĩnh từ thư mục 'uploads'

const productRouter  = require('./router/product');
app.use('/products', productRouter);

const farmRouter = require('./router/farm');
app.use('/farm', farmRouter);

const traderRouter = require('./router/trader');
app.use('/traders', traderRouter);

const careProcessRouter = require('./router/careProcess');
app.use('/careProcess', careProcessRouter);

const fertilizerSellerRouter = require('./router/fertilizerSeller');
app.use('/fertilizerSeller', fertilizerSellerRouter);

const fertilizerRouter = require('./router/fertilizer');
app.use('/fertilizer', fertilizerRouter);

const fertilizerAvailabilityRouter = require('./router/fertilizerAvailability');
app.use('/fertilizerAvailability', fertilizerAvailabilityRouter);

const pesticideRouter = require('./router/pesticide');
app.use('/pesticide', pesticideRouter);

const preticideSellerRouter = require('./router/preticideSeller');
app.use('/preticideSeller', preticideSellerRouter);

const pesticideAvailabilityRouter = require('./router/pesticideAvailability');
app.use('/pesticideAvailability', pesticideAvailabilityRouter);

const transporterRouter = require('./router/transporter');
app.use('/transporter', transporterRouter);

const productTransporters = require('./router/productTransporters');
app.use('/productTransporters', productTransporters);

const retailersRouter = require('./router/retailers');
app.use('/retailers', retailersRouter);

const productRetailers = require('./router/productRetailers');
app.use('/productRetailers', productRetailers);

app.get('/', (req, res) => { 
    res.send('hello');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
