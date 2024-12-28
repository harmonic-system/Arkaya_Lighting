const { Schema, model } = require('mongoose');

const productListSchema = new Schema({
    productfile: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    productname: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    IndoorOutdoor: {
        type: String,
        enum: ['Indoor', 'Outdoor'],
        message: 'It should be either "Indoor" or "Outdoor"'
    },
    price: {
        type: String
    },
    productCategory: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    des: {
        type: Object,
        default: {}
    },
    keywords: {
        type: [String]
    }
}, {
    timestamps: true
});

const ProductList = model('ProductList', productListSchema);

module.exports = ProductList;
