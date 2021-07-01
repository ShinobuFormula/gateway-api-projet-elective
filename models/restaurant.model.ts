const { Model, DataTypes } = require('sequelize');
import sequelize from '../mysql.db';


const Restaurant = sequelize.define('Restaurant', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'restaurant',
    timestamps: false
});


exports.createRestaurant = async (body:JSON) => {
    const restaurant = await Restaurant.create(body);
    const response = await restaurant.save()
    return response
}

exports.loginRestaurant = async (email:string, password:string) => {
    const restaurant = await Restaurant.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return restaurant
}