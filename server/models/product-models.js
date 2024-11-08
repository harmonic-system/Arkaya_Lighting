const { Schema, model } = require('mongoose');

const productSchema = new Schema({

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
    IndoorOutdoor: {
        type: String,
        // required: true,
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
        default: false,
    },
    description: {
        des: {
            type: String,
        },
        moduleSize: {
            type: String,
        },
        pixelPitch: {
            type: String,
        },
        pixelDensity: {
            type: String,
        },
        configuration: {
            type: String,
        },
        mode: {
            type: String,
        },
        resolution: {
            type: String,
        },
        driveType: {
            type: String,
        },
        refFreq: {
            type: String,
        },
        scanMode: {
            type: String,
        },
        portType: {
            type: String,
        },
        brightness: {
            type: String,
        },
        renFix: {
            type: String,
        },
        spec1: {
            type: String,
        },
        spec2: {
            type: String,
        },
        spec3: {
            type: String,
        },
        spec4: {
            type: String,
        },
        spec5: {
            type: String,
        },
        spec6: {
            type: String,
        },
        spec7: {
            type: String,
        },
        spec8: {
            type: String,
        },
        spec9: {
            type: String,
        },
        spec10: {
            type: String,
        },
    }
}, { timestamps: true });

const Product = new model('Product', productSchema);

module.exports = Product;