const {LolApi} =new require('twisted')
const api = new LolApi(require("../constants/constants.json").API_KEY)

module.exports =(req,res,next)=>{
    summonerByNameExample(req.params).then((res)=>{

        req.userData=res.response
        next()
    }).catch((e)=>{
        return res.status(401).json({error:"Summoner doesn't exist"})
    })
    
   

}


async function summonerByNameExample ({name:summonerName,region}) {
  return await api.Summoner.getByName(summonerName,region)
}