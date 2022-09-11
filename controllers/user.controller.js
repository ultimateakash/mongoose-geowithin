const User = require('../models/user.model');

exports.nearByUsersExample1 = async (req, res) => {
    const region = {
        type: 'Polygon',
        coordinates: [[
            [79.7613606, 28.7187879], 
            [79.6954426, 28.6055167], 
            [79.8918232, 28.5633101], 
            [79.9316487, 28.6934932], 
            [79.7613606, 28.7187879]
        ]]
    };

    const users = await User.find({
        location: {
            $geoWithin: {
                $geometry: region
            }
        }
    });
    return res.json(users);
}

exports.nearByUsersExample2 = async (req, res) => {
    const region = {
        type: 'Polygon',
        coordinates: [[
            [79.4908223, 28.6971071], 
            [79.5622334, 28.5826066], 
            [79.6748433, 28.6549373], 
            [79.4908223, 28.6971071]
        ]]
    };

    const users = await User.findPoint(region);
    return res.json(users);
}

exports.nearByUsersExample3 = async (req, res) => {
    const region = {
        type: 'Polygon',
        coordinates: [[
            [79.4908223, 28.6971071], 
            [79.5622334, 28.5826066], 
            [79.6748433, 28.6549373], 
            [79.4908223, 28.6971071]
        ]]
    };

    const users = await User.aggregate([
        {
            $match: {
                location: {
                    $geoWithin: {
                        $geometry: region
                    }
                }
            }
        }
    ]);
    return res.json(users);
}

exports.dummyData = async (req, res) => {
    const users = await User.insertMany([
        {
            name: 'User 1',
            location: {
                type: 'Point',
                coordinates: [79.5636015, 28.6453172]
            }
        },
        {
            name: 'User 2',
            location: {
                type: 'Point',
                coordinates: [79.8552963, 28.6547708]
            }
        },
        {
            name: 'User 3',
            location: {
                type: 'Point',
                coordinates: [79.7687766, 28.6354746]
            }
        },
        {
            name: 'User 4',
            location: {
                type: 'Point',
                coordinates: [79.8443076, 28.6185988]
            }
        },
        {
            name: 'User 5',
            location: {
                type: 'Point',
                coordinates: [79.7674028, 28.7089722]
            }
        } 
    ]);
    return res.json(users);
}
