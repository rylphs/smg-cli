import {Subject} from 'rxjs/Subject';

export class Events {
  static SHOW_IMAGE =  {
    CHANGE_IMAGE: new Subject<string>()
  }
}