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
    //Loading Events
    this.JSFWEventHandler = new EventHandler();
    this.JSFWEventHandler.registerEvent(eventHandlerIdentifiers["jsfw-init"], this.loadFrameWork);
    this.JSFWEventHandler.registerEvent(eventHandlerIdentifiers["jsfw-app-init"], this.loadApplication);
    this.JSFWEventHandler.registerEvent(eventHandlerIdentifiers["jsfw-app-ready"], this.run);

    //Intitalizing requiered Objects
    this.JSFWInitialLoadManager = new LoadManager(eventHandlerIdentifiers["jsfw-load-manager"]);
    this.JSFWModuleManager = new ModuleManager(eventHandlerIdentifiers["jsfw-module-manager"]);
    this.JSFWModuleLoader = new ModuleLoader(eventHandlerIdentifiers["jsfw-module-loader"]);
};

JSFW.prototype.loadFramework = function (event) {

    var status = -1;
    if(event != null) {
        status = event.detail.status;
    }

    switch(status) {
        default:
            //
            console.log("loading framework");
            //Support Functions
            this.JSFWModuleLoader.loadFile('framework/support/fastclick.js');
            this.JSFWModuleLoader.loadFile('framework/support/jquery-2.1.4.min.js');

            //Load reuired modules
            this.JSFWModuleLoader.loadFile('configuration/required.modules.js');
        break;
        case 1:
            console.log('1');
        break;
    }
};

JSFW.prototype.loadApplication = function (envent) {

    //Load Application Configuration
    Framework.JSFWModuleLoader.loadFile('configuration/required.application.config.js');

}

JSFW.prototype.run = function (event) {

}
