import pkg from "agora-access-token";

const { RtcTokenBuilder,RtcRole } = pkg

const appID = '16413846c9704944983167509d540afc'
const appCertificate = 'de1d486b2bf7438a8c73b40da133ebfb'


export default ({ req, res, log, error }) => {
if (req.method === 'GET') {
  let response = JSON.parse(req.body)
  const channelName = response.channelName
  if(!channelName) {
    return res.status(500).json({'error' : 'no Channel Name'})
  }
  let uid = response.uid
  if(!uid || uid == ''){
    uid = 0;
  }
  let role = RtcRole.SUBSCRIBER
  if(response.role === 'publisher'){
    role = RtcRole.PUBLISHER
  }
  let expiryTime = response.expiryTime
  if(!expiryTime || expiryTime ==''){
    expiryTime = 3600
  }else{
    expiryTime = parseInt(expiryTime,10)
  }
  const currentTime = Math.floor(Date.now()/1000)
  const privilegeExpiryTime = currentTime + expiryTime

  const token = RtcTokenBuilder.buildTokenWithUid(appID,appCertificate,channelName,uid,role,privilegeExpiryTime)

  log(token)
  return res.json({
    'token': token
  })
}
};
