const { LolApi } = new require('twisted')
const api = new LolApi(require("../constants/constants.json").API_KEY)

module.exports = (req, res, next) => {



    getSummonerRanks(req.userData.id, req.params.region).then((res) => {
        let ranked = res.response
        ranked_dictionary = {}

        ranked.forEach((item, i) => {
            let queue = item.queueType
            item.total = item["wins"] + item["losses"]
            item.winrate = item["wins"] / item.total
            if (item.miniSeries) {
                item.promos = item["miniSeries"]["progress"].replace("N", "X")
            }
            ranked_dictionary[queue] = item
        })
        req.userData.ranked = ranked_dictionary
        next()
    }).catch((e) => {
        console.log(e)
        return res.status(401).json({ error: "Summoner doesn't have ranked" })
    })



}


async function getSummonerRanks(id, region) {

    return await api.League.bySummoner(id, region)

}