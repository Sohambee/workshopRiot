const {PATH} =  require("../constants/constants.json")
module.exports = (data)=>{
    switch(data.type){
        case "champion":
            return `${PATH}/img/champion/${data.name}`
        case "sum":
            return `${PATH}/img/spell/${data.name}`
        case "item":
            return `${PATH}/img/item/${data.name}`
    }

}