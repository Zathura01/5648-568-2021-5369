const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 4500;


app.use(cors());
app.use(express.json());    


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch(err => console.log("Failed to connect to DB", err));


app.use(`/${process.env.apiKeyWebapp}/user`, require('./routes/user/User'));

//accounting - new entry routes
app.use(`/${process.env.apiKeyWebapp}/entry/newincome`, require('./routes/accounting/new/Income'))
app.use(`/${process.env.apiKeyWebapp}/entry/newinvest`, require('./routes/accounting/new/Invest'))
app.use(`/${process.env.apiKeyWebapp}/entry/newexpense`, require('./routes/accounting/new/Expense'))
app.use(`/${process.env.apiKeyWebapp}/entry/newsaving`, require('./routes/accounting/new/Saving'))
// app.use(`/${process.env.apiKeyWebapp}/entry/newwithdrawal`, require('./routes/accounting/new/Withdrawal'))


//dealing with transactions
app.use(`/${process.env.apiKeyWebapp}/transaction`, require('./routes/accounting/transactionList/Transactiondetails'))


//getting dashboard
app.use(`/${process.env.apiKeyWebapp}/dashboard`, require('./routes/accounting/dashboard/GetDashboard'))


app.use(`/${process.env.apiKeyWebapp}/logger/newVideo`, require('./routes/logger/Uploadvideo'))
app.use(`/${process.env.apiKeyWebapp}/logger/videos`, require('./routes/logger/Aroundvideo'))




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});