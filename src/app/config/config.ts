import {remote} from 'electron';
var path = remote.require('path');

function getPath(relative:string){
  return path.join(remote.getGlobal("AppConfig").appPath,  relative) 
}

export var AppConfig  = {
  thumbs:  getPath(".files/cache/thumbs"),
  thumbsSize: 150,
  concurrency: remote.getGlobal("AppConfig").concurrency,
  dbLocation: getPath(".files/db/db.json"),
}