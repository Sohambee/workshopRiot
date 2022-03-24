const { LolApi } = new require('twisted')
const api = new LolApi(require("../constants/constants.json").API_KEY)
const champions = require("../constants/champions.json")
const getImage = require("../util/getImage")
const sums = require(`../constants/summs.json`)
module.exports = (req, res, next) => {



    getSummonerMatches(req.userData.puuid, req.params.region).then((res) => {
        let matches = res.response
        summonerMatches = []
        for (let i = 0; i < Math.min(matches.length, 10); i++) {
            getSummonerMatch(matches[i], req.params.region).then((res) => {
                let match = res.response.info
                let matchData = { participants: [], }
                match.participants.forEach((item, index) => {
                    let temp = {}
                    temp.summoner = item["summonerName"]
                    temp.champion = item["championName"]
                    if (item["championName"] == 'MonkeyKing') temp.champion['champion'] = 'Wukong'
                    temp.champUrl = getImage("champion", temp.champion)
                    temp.team = item["teamId"]
                    matchData.participants.push(temp)
                    if (temp.summoner.toLowerCase().replace(" ", "") == req.params.name.toLowerCase().replace(" ", "")) {
                        matchData.champion = item["championName"]
                        matchData.win = item["win"]
                        matchData.champUrl = getImage("champion", temp.champion)
                        matchData.level = item["champLevel"]
                        matchData.deaths = item["deaths"]
                        matchData.kills = item["kills"]
                        matchData.assists = item["assists"]
                        matchData.spellDUrl = getImage("sum", sums[item["summoner1Id"]])
                        matchData.spellDUrl = getImage("sum", sums[item["summoner2Id"]])
                        for (let ind = 0; ind < 6; ind++) {
                            matchData[`item${ind}Url`] = getImage({"type":"item", name:item[`item${ind}`]})
                        }
                    }
                })
                summonerMatches.push(matchData)
                if (i === 9) {
                    req.matches = summonerMatches
                    next()
                }
            }).catch((e) => {
                console.log(e)
                if (i === 9) {
                    req.matches = summonerMatches
                    next()
                }
            })
        }
    }).catch((e) => {
        console.log(e)
        return res.status(401).json({ error: "Summoner doesn't have any matches" })
    })



}


async function getSummonerMatches(id, region) {

    return await api.MatchV5.list(id, 'AMERICAS')
}

async function getSummonerMatch(id, region) {

    return await api.MatchV5.get(id, 'AMERICAS')

}