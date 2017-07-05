import {remote} from 'electron';

export var AppConfig  = {
  thumbs:  remote.getGlobal("AppConfig").appPath +  "./'/.cache/thumbs'",
  concurrency: remote.getGlobal("AppConfig").concurrency
}