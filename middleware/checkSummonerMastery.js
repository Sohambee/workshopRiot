const { LolApi } = new require('twisted')
const api = new LolApi(require("../constants/constants.json").API_KEY)
const champions = require("../constants/champions.json")
const getImage = require("../util/getImage")
module.exports = (req, res, next) => {



    getSummonerMastery(req.userData.id, req.params.region).then((res) => {
        let mastery = res.response

        let arr = []
        for (let i = 0; i <= Math.min(10, mastery.length); i++) {
            let temp = {}
            let champ=mastery[i]
            temp.champion = champions[champ.championId]
            if (temp.champion == 'MonkeyKing')
                temp.champion="Wukong"
            temp.level = champ.championLevel
            temp.points = champ.championPoints
            temp.url = getImage({type:"champion",name:temp.champion})
            arr.push(temp)
        }
        req.mastery=arr
        next()
    }).catch((e) => {
        console.log(e)
        return res.status(401).json({ error: "Summoner doesn't have any mastery" })
    })



}


async function getSummonerMastery(id, region) {

    return  await api.Champion.masteryBySummoner(id, region)

}