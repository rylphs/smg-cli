import {remote} from 'electron';

export var AppConfig  = {
  thumbs:  remote.getGlobal("AppConfig").appPath +  "/.cache/thumbs",
  thumbsSize: 150,
  concurrency: remote.getGlobal("AppConfig").concurrency
}