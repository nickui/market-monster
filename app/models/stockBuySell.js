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
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            stockTicker: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            sector: {
                type: Sequelize.INTEGER,
                notEmpty: true
            },
            epocDate: {
                type: Sequelize.INTEGER,
            },
            purchaesPrice: {
                type: Sequelize.FLOAT,
                notEmpty: true
            },
            owned: {
                type: Sequelize.BOOLEAN
            },
            
        });
    
        return stockBuySell;
    
    }