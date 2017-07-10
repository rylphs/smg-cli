```javascript
var Events = {
    FOLDER: {
     CHOOSE: {}
     CHOOSEN: {}   
    },
    OPEN_FOLDER: {},

    IMAGE: {SHOW_IMAGE: {}, CHANGE_IMAGE: {}}
}

var config = {
    events: Events,
    windows:{//Set up all app windows. Can fire events?
        main: {
            x: 0,
            y: 0,
            width: 800,
            height: 600,
        },
        openFolderDialog: {//Dialogs can fire and be shown on events
            type: dialog, listenTo: Events.FOLDER.CHOOSE, fires: Events.FOLDER.CHOOSEN
        },
        image-detail: {parent: "main", modal: true}
    },
    paths: [ //binds a angular path, to a window and a component
        {path: 'main', window: "main", mainMenu, component: HomeComponent},
        {path: "image/:image", window: "image-detail", imageMenu, component: ImageDetailComponent}
    ],
    menus: { //sets up all menus, menus can fire events or open paths?
    //Perhaps is better to have menu entries starting with "_" (better for code completion.)
        mainManu: {}
            _File: { //Menu entry starting with "_" (better for code completion)
                Open:{accelerator: "ctrl+o", fires: Events.OPEN_FOLDER}
            },
            Image: { //Menu configuration starting with "_"
                //Evaluate how to handle enabling/disabling menu items (events perhaps?)
                
                show: {_navigateTo: "image", , _enabledOn: Events.SELECT_FOLDER??? },
                edit: {_navigateTo: "image/edit", , _enabledOn: Events.SELECT_FOLDER???, 
                    _condition:(folder)=>folder!=null } 
            }
        },
        imageMenu: {},
        //Contextual menu. Evaluate how to handle mouse position
        //Can be bound to a component (show on click in the component)?
        contextualImageMenu: {
            contextual: true,
            component: ImageThumbComponent,
            showOn: "click", 

            //params will look for "image" property in thumb component
            _ShowImage: {_navigateTo: "image", params: {image:"image"}}
        }
    }
    global: {/*global constants*/}
}

export var Events = config.events; //exporting to use outside
export var Menus = config.menus;

//main.ts
var app = new ElectronAngularApp(config);
app.run();
//end - main.ts

//folder.servide.ts
//Probably necessary due to "this" bind on method decorators
//Implementation can ignore all configuration if not in a electron project
@Configure 
class FolderService{
    //require electron.remote.require("fs")
    private fs: @Service("fs")

    @ListenTo(Events.FOLDER.CHOOSEN)
    @Fire(Events.FOLDER.LOADED)
    loadFolder(folder){
        return foldersLoaded[];
    }
}
//

//folder-list.component.ts
class FolderListComponent{
    folders[];
    selected

    //Service injection, controled by framework
    //Allow injection of services or let just use of events?
    //Can be useful if possible to separate service execution in a separate process
    //Should generate angular injection
    private @Service(Folder) folder:FolderService

    //Usual way letting angular inject the service
    constructor(private folderService:FolderService){

    }

    showFolder(base:string){
        //Possible conversion from service methods decorated with @Fire (or just @Configure)
        //  to a promisse. Alternative to method with @ListenTo
        this.folderService.load(base).then(this.createTreeNode)
    }

    @ListenTo(Events.FOLDER.LOADED)
    createTreeNode(folder){
        if(!selected) this.folders = folderTree;
        else selected.children = folderTree;
    }

    @FiresEvent(Events.IMAGE.LIST_ALL)
    selectFolder(folder:string){
        return this.folderService.generateAndListThumbs(folder);
    }

}
//

//image-list.component.ts
import {Events} from 'configuration';
import {EventManager} from 'services';

class ImageListComponent{
    index:number;
    selectedImage:string;
    images:string[];

    constructor(private eventManger:EventManager)

    @FireEvent(Events.IMAGE.SHOWIMAGE) or @WalkTo("image")
    displayImage(index){
        this.index = index;
        this.selectedImage = images[i];
        return this.selectedImage;
    }

    @ListenTo(Event.IMAGE.SELECT_OTHER)
    changeImage(direction){
        var index = this.index/
        if(direction.next) index++;
        else index--;
        this.displayImage(index);
    }

    //listImages will be fired on each async load
    @ListenTo(Events.IMAGE.IMAGE.LIST_ALL, async:true)
    listImages(image){
        this.images.push(image);
    }

    //Simpler implementation just let the user subscribe to the flow
    @ListenTo(Events.IMAGE.IMAGE.LIST_ALL)
    listImages(folder){
        folder.then((image)=>images.push(image));
    }
}
//

//image-detail.component.ts
@Params({image: "image"})
class ImageDetailComponent{
    private image:string;

    @FireEvent(Event.IMAGE.CHANGE_IMAGE, ["prev"]) //static parameter
    prev(){}

    @FireEvent(Event.IMAGE.CHANGE_IMAGE);
    next(){
        return "next"; //dynamic parameter
    }
}

//
```