const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ location: '2dsphere' });

userSchema.static('findPoint', function (region) {
    return this.find({
        location: {
            $geoWithin: {
                $geometry: region
            }
        }
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;