/*****************************************************************************

The MIT License (MIT)

Copyright (c) 2015 Til Beisenherz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*****************************************************************************/

var JSFW = function () {
    console.info("JSFW-Information: Initializing");
    //Loading Events
    this.JSFWEventHandler = new EventHandler();
    this.JSFWEventHandler.registerEvent(eventHandlerIdentifiers['jsfw-init'], this.loadFramework.bind(this));

    //Framework loading state
    this.loadState = 0;

    //Intitalizing requiered Objects
   this.JSFWTaskManager = new LoadManager(eventHandlerIdentifiers["jsfw-load-manager"], eventHandlerIdentifiers['jsfw-init']);
   this.JSFWModuleManager = new ModuleManager(eventHandlerIdentifiers["jsfw-load-manager"]);
    
    //Application
    this.JSFWApplication = null;
};

JSFW.prototype.loadFramework = function (data) {
    
    if(data != null) {
        this.loadState = data.detail.status;
    }
    
    switch(this.loadState) {
        case 0:
            console.info("JSFW-Information: loading framework");
            //Support Functions
            this.JSFWTaskManager.moduleLoader.loadFile('framework/support/fastclick.js');
            this.JSFWTaskManager.moduleLoader.loadFile('framework/support/jquery-2.1.4.min.js');

            //Load reuired modules
            this.JSFWTaskManager.moduleLoader.loadFile('configuration/required.modules.js');  
           break;
       case 1:
           console.log("JSFW-Information: waiting for files to load (framework level)");
           break;
       case 2:
           console.info("JSFW-Information: framework loaded");
           this.loadState = 0;
           this.JSFWEventHandler.unregisterEvent(eventHandlerIdentifiers['jsfw-init'], this.loadFramework);
           this.JSFWEventHandler.registerEvent(eventHandlerIdentifiers["jsfw-app-init"], this.loadApplication.bind(this));
           this.loadApplication(null);
           break;  
    }
};

JSFW.prototype.loadApplication = function (data) {
    
    if(data != null) {
        this.loadState = data.detail.status;
    }
    
    switch(this.loadState) {
        case 0:
            console.info('JSFW-Information: loading application');
            //Load Application Configuration
            this.JSFWTaskManager.identifierSuper = eventHandlerIdentifiers["jsfw-app-init"];
            this.JSFWTaskManager.moduleLoader.loadFile('configuration/required.application.config.js');
            break;
        case 1:
            console.log("JSFW-Information: waiting for files to load (application level)");
            break;
        case 2:
            this.JSFWEventHandler.unregisterEvent(eventHandlerIdentifiers["jsfw-app-init"], this.loadApplication);
            this.JSFWEventHandler.registerEvent(eventHandlerIdentifiers["jsfw-app-ready"], this.run.bind(this));
            this.JSFWTaskManager.identifierSuper = eventHandlerIdentifiers["jsfw-app-ready"];
            this.JSFWEventHandler.notify(eventHandlerIdentifiers["jsfw-app-ready"], null);
            break;
    }
};

JSFW.prototype.run = function () {
    this.JSFWModuleManager.access('jsfw-app-bootstrap').run();
};