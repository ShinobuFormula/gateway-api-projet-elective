const { Model, DataTypes } = require('sequelize');
import sequelize from '../mysql.db';


const Developer = sequelize.define('Developer', {
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
    modelName: 'Developer',
    tableName: 'developer',
    timestamps: false
});

exports.createDeveloper = async (body:JSON) => {
    const developer = await Developer.create(body);
    const response = await developer.save()
    return response
}

exports.loginDeveloper = async (email:string, password:string) => {
    const developer = await Developer.findAll({
        where: {
            email: email,
            password: password
        },
        attributes: { exclude: ['password'] }
    });
    return developer
}