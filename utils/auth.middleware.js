const sessionIdToUserMap = new Map()

function setUser(sessionid, user){
  sessionIdToUserMap.set(sessionid, user);
}

function getUser(sessionid, user){
  sessionIdToUserMap.get(sessionid);
}

export { setUser, getUser}