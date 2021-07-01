const Customer = require("../models/customer.model");
const Restaurant = require("../models/restaurant.model");
const Deliveryman = require("../models/deliveryman.model");
const Salesperson = require("../models/salesperson.model");
const Developer = require("../models/developer.model");
const Sponsorship = require("../models/sponsorship.model");
const Thirdparty = require("../models/thirdparty.model");
const Log = require('../models/log.model')
const TokenController = require('./token-verifier')

exports.createUser = async (body, typeOfUser, sponsor) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.createCustomer(body)
            break;
        case 2:
            userData = await Restaurant.createRestaurant(body)
            break;
        case 3:
            userData = await Deliveryman.createDeliveryman(body)
            break;
        case 4:
            userData = await Salesperson.createSalesperson(body)
            break;
        case 5:
            userData = await Developer.createDeveloper(body)
            break;
        case 6:
            userData = await Thirdparty.createThirdparty(body)
            break;
    }
    if(sponsor !== null){
        await sponsorUser(sponsor, userData.id, typeOfUser)
    }

    return userData
}

exports.loginUser = async (body, typeOfUser) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.loginCustomer(body.email, body.password)
            break;
        case 2:
            userData = await Restaurant.loginRestaurant(body.email, body.password)
            break;
        case 3:
            userData = await Deliveryman.loginDeliveryman(body.email, body.password)
            break;
        case 4:
            userData = await Salesperson.loginSalesperson(body.email, body.password)
            break;
        case 5:
            userData = await Developer.loginDeveloper(body.email, body.password)
            break;
    }
    Log.createLog({userID:userData[0].dataValues.id, role:typeOfUser})
    return {token: TokenController.createToken(userData[0].dataValues.id, parseInt(typeOfUser)), userData : userData}
}

// exports.getStats = async () => {
//     const orderCount = await Order.getOrderCount()
//     const totalPrice = await Order.getOrderTotalPrice()
//     const customerCount = await Customer.getCustomerCount()
//     const restaurantCount = await Restaurant.getRestaurantCount()
//
//     let payload = {
//         orderCount: orderCount,
//         totalPrice: totalPrice,
//         customerCount: customerCount,
//         restaurantCount: restaurantCount
//     }
//
//     return payload
// }

 async function sponsorUser(sponsor, sponsored, role){
    let data = {
        sponsor: sponsor,
        sponsored: sponsored,
        status: role
    }
    return response = await Sponsorship.createSponsorship(data)
}
