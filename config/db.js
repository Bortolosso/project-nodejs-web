const CONST = require("../constants/constants");

if(process.env.NODE_ENV == CONST.CONFIG.DB.PRODUCTION){
    module.exports ={mongoURI: CONST.CONFIG.DB.MONGOURI.CONNECT_CLUSTER};
}else{
    module.exports = {mongoURI: CONST.CONFIG.DB.MONGOURI.LOCALHOST};
};