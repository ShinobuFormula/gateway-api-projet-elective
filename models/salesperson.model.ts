const { Model, DataTypes } = require('sequelize');
import sequelize from '../mysql.db';


const Salesperson = sequelize.define('Salesperson', {
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
}, {
    sequelize,
    modelName: 'Salesperson',
    tableName: 'salesperson',
    timestamps: false
});


exports.createSalesperson = async (body:JSON) => {
    const salesperson = await Salesperson.create(body);
    const response = await salesperson.save()
    return response
}

exports.loginSalesperson = async (email:string, password:string) => {
    const salesperson = await Salesperson.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return salesperson
}