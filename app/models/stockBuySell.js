// create stockBuySell in DB
module.exports = function(sequelize, Sequelize) {
    
        var stockBuySell = sequelize.define('stockBuySell', {
    
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            companyName: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            stockTicker: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            sector: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            epocDate: {
                type: Sequelize.INTEGER,
            },
            purchasePrice: {
                type: Sequelize.FLOAT,
                notEmpty: true
            },
            owned: {
                type: Sequelize.BOOLEAN
            },
            
        });
    
        return stockBuySell;
    
    }