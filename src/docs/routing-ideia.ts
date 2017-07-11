import { MolecularApp, PathEntry } from "app/support/molecular/molecular-app";
import { WindowConfig } from "app/support/molecular/window-manager";

var HomeComponent, ImageThumbComponent,
    ImageDetailComponent, Configure,
    Service, ListenTo, Fires, Params, WalkTo;

class EventManager { }

export var Events = {//exporting to use outside
    FOLDER: {
        CHOOSE: {},
        CHOOSEN: {},
        LOADED: {}
    },
    OPEN_FOLDER: {},

    IMAGE: {
        SHOW_IMAGE: {}, CHANGE_IMAGE: {}, SELECTED: {},
        LIST_ALL: {}, SHOWIMAGE: {}, SELECT_OTHER: {}
    }
};

export var Windows:WindowConfig = {//Set up all app windows. Can fire events? (e.g: close)
    main: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
    },
    openFolderDialog: {//Dialogs can fire and be shown on events
        type: "dialog", listenTo: Events.FOLDER.CHOOSE, 
        fires: Events.FOLDER.CHOOSEN
    },
    image_detail: { parent: Windows.main, modal: true }
};

export var Paths:PathEntry = [ //binds a angular path, to a window and a component
    { path: 'main', window: Windows.main, 
        menu: Menus.mainMenu, component: HomeComponent },
    {
        path: "image/:image", window: Windows.image_detail,
        menu: Menus.imageMenu, component: ImageDetailComponent
    }
];

export var Menus = { //sets up all menus, menus can fire events or open paths?
    //Perhaps is better to have menu entries starting with "_" (better for code completion.)
    mainMenu: {
        _File: { //Menu entry starting with "_" (better for code completion)
            Open: { accelerator: "ctrl+o", fires: Events.OPEN_FOLDER }
        },
        Image: { //Menu configuration starting with "_"
            //Evaluate how to handle enabling/disabling menu items (events perhaps?)

            show: { _navigateTo: "image", _enabledOn: Events.IMAGE.SELECTED },
            edit: {
                _navigateTo: "image/edit", _enabledOn: Events.IMAGE.SELECTED,
                _condition: (folder) => folder != null
            }
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
        _ShowImage: { _navigateTo: "image", params: { image: "image" } }
    }
}

var config = {
    events: Events,
    windows: Windows,
    paths: Paths,
    menus: Menus,
    global: {//global constants 
    }
}


//main.ts
var app = new MolecularApp(config);
app.run();
//end - main.ts

//folder.servide.ts
//Probably necessary due to "this" bind on method decorators
//Implementation can ignore all configuration if not in a electron project
@Configure
class FolderService {
    //require electron.remote.require("fs")
    @Service("fs") private fs: any;

    @ListenTo(Events.FOLDER.CHOOSEN)
    @Fires(Events.FOLDER.LOADED)
    loadFolder(folder) {
        var foldersLoaded = [];
        return foldersLoaded;
    }

    load(...a): any { }

    generateAndListThumbs(...any): any { };
}
//

//folder-list.component.ts
class FolderListComponent {
    folders: any[];
    selected: any;

    //Service injection, controled by framework
    //Allow injection of services or let just use of events?
    //Can be useful if possible to separate service execution in a separate process
    //Should generate angular injection
    @Service(FolderService) privatefolder: FolderService

    //Usual way letting angular inject the service
    constructor(private folderService: FolderService) {

    }

    private getTreeNodeFromFolder(folder: any): any { }

    showFolder(base: string) {
        //Possible conversion from service methods decorated with @Fire (or just @Configure)
        //  to a promisse. Alternative to method with @ListenTo
        this.folderService.load(base).then(this.createTreeNode)
    }

    @ListenTo(Events.FOLDER.LOADED)
    createTreeNode(folder) {
        if (!this.selected) this.folders = this.getTreeNodeFromFolder(folder);
        else this.selected.children = this.getTreeNodeFromFolder(folder);
    }

    @Fires(Events.IMAGE.LIST_ALL)
    selectFolder(folder: string) {
        return this.folderService.generateAndListThumbs(folder);
    }

}
//

//image-list.component.ts
//import { Events } from 'configuration';
//import { EventManager } from 'services';

class ImageListComponent {
    index: number;
    selectedImage: string;
    images: string[];

    constructor(private eventManger: EventManager) { }

    @Fires(Events.IMAGE.SHOWIMAGE) //or
    @WalkTo("image")
    displayImage(index: number) {
        this.index = index;
        this.selectedImage = this.images[index];
        return this.selectedImage;
    }

    @ListenTo(Events.IMAGE.SELECT_OTHER)
    changeImage(direction) {
        var index = this.index;
        if (direction.next) index++;
        else index--;
        this.displayImage(index);
    }

    //listImages will be fired on each async load
    @ListenTo(Events.IMAGE.LIST_ALL, { async: true })
    listImages(image) {
        this.images.push(image);
    }

    //Simpler implementation just let the user subscribe to the flow
    @ListenTo(Events.IMAGE.LIST_ALL)
    listImages2(folder) {
        folder.then((image) => this.images.push(image));
    }

    @Fires(Events.IMAGE.SELECTED)
    selectImage(index:number){
        if(!index || index > this.images.length) return null;
        var index = this.index;
        this.selectedImage = this.images[index];
    }
}
//

//image-detail.component.ts
@Params({ image: "image" })
export class ImageDetailComponent2 {
    private image: string;

    @Fires(Events.IMAGE.CHANGE_IMAGE, ["prev"]) //static parameter
    prev() { }

    @Fires(Events.IMAGE.CHANGE_IMAGE)
    next() {
        return "next"; //dynamic parameter
    }
}

//*/