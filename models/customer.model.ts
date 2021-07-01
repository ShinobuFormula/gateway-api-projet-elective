const { Model, DataTypes } = require('sequelize');
import sequelize from '../mysql.db';


const Customer = sequelize.define('Customer', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customer',
    timestamps: false
});


exports.createCustomer = async (body:JSON) => {
    const customer = await Customer.create(body);
    const response = await customer.save()
    return response
}

exports.loginCustomer = async (email:string, password:string) => {
    const customer = await Customer.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return customer
}

