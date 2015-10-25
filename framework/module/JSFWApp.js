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

var App = function(applicationConfiguration) {
    this.Configuration = applicationConfiguration;
    this.StoryboardManager = new StoryboardManager();
    this.eventHandler = new EventHandler();
    this.eventHandler.registerEvent(eventHandlerIdentifiers['jsfw-app-state'], this.state.bind(this));
    
    console.log('loading App');
    //basic styles
    this.StoryboardManager.StoryboardLoader.moduleLoader.loadFile('content/common/css/style.css');
    //avoid delay
    document.title = this.Configuration.appName + ' ('+ this.Configuration.appVersion +')';
    $('#application-content').css('height', Framework.JSFWDisplayInformation.height+"px");
    $('#application-content').css('width', Framework.JSFWDisplayInformation.width +"px");

    FastClick.attach(document.body);
    
    this.createStoryboards();
    
};

App.prototype.run = function() {
};

App.prototype.state = function (event) {     
    var entry = this.StoryboardManager.getStoryboard(this.Configuration.entrypoint);
    var action = this.getDefaultAction(this.Configuration.entrypoint);
    $('#'+this.Configuration.entrypoint).css('display', 'block');
    entry.controller[action]();
};

App.prototype.getDefaultAction = function (identifier) {
    var pos = -1;
    for(var i=0; i<this.Configuration.storyboards.length; i++) {
        if(this.Configuration.storyboards[i].identifier == identifier) {
            pos = i;
            break;
        }
    }
    
    if(pos > -1) {
        return this.Configuration.storyboards[pos].action;
    } else {
        return null;
    }    
};

App.prototype.createStoryboards = function () {
    try {
        for(var i=0; i<this.Configuration.storyboards.length; i++) {
            this.StoryboardManager.createStoryboard(this.Configuration.storyboards[i].identifier);
        } 
    } catch (e) {
        console.log("JSFW-Error: " + e);
    }
};


//Callback - Register module
(function () {
    var lref = new App(applicationConfiguration);
    var args = {'module-identifier': 'jsfw-app-bootstrap','module-namespace': 'none', 'status': 'loaded', 'reference': lref};
    Framework.JSFWModuleManager.register(args);
})();