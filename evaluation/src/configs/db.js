const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://avinashtest:test_123@cluster0.w0khx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
};