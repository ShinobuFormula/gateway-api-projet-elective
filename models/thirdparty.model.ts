const { Model, DataTypes } = require('sequelize');
import sequelize from '../mysql.db';


const Thirdparty = sequelize.define('Thirdparty', {
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
    modelName: 'Thirdparty',
    tableName: 'third_party',
    timestamps: false
});

exports.createThirdparty = async (body:JSON) => {
    const thirdparty = await Thirdparty.create(body);
    const response = await thirdparty.save()
    return response
}

exports.loginThirdparty = async (email:string, password:string) => {
    const thirdparty = await Thirdparty.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return thirdparty
}
