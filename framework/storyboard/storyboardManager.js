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

var StoryboardManager = function () {
    this.Storyboards = [];
    this.lastActiveStoryboard = {action: null, direction: null};
    this.activeStoryboard = {action: null, direction: null};
    this.StoryboardEvents = new EventHandler();
    this.StoryboardLoader = new LoadManager(eventHandlerIdentifiers["jsfw-storyboard-load"], eventHandlerIdentifiers['jsfw-storyboard-manager']);
    this.StoryboardEvents.registerEvent(eventHandlerIdentifiers['jsfw-storyboard-manager'], this.createStoryboard.bind(this));
};

StoryboardManager.prototype.createStoryboard = function(identifier) {  
    if(this.getStoryboard(identifier) == null) {
        var nextStoryboard = {'identifier': identifier, 'controller': null, 'model': null, 'repository': null, 'template': null};
        this.Storyboards.push(nextStoryboard);
        //
        this.loadStoryboardDependencies(identifier);
    } else {
        console.log("JSFW-Error: Storyboard '"+identifier+"' already exists!");
    }
};

StoryboardManager.prototype.loadStoryboardDependencies = function(identifier) {
    this.StoryboardLoader.moduleLoader.loadFile('content/storyboards/'+identifier+'/Resources/css/'+identifier+'Style.css')
    this.StoryboardLoader.moduleLoader.loadFile('content/storyboards/'+identifier+'/Domain/Model/'+identifier+'Model.js');
    this.StoryboardLoader.moduleLoader.loadFile('content/storyboards/'+identifier+'/Domain/Repository/'+identifier+'Repository.js');
    this.StoryboardLoader.moduleLoader.loadFile('content/storyboards/'+identifier+'/Resources/Templates/'+identifier+'Template.js');
    //
    this.StoryboardLoader.moduleLoader.loadFile('content/storyboards/'+identifier+'/Controller/'+identifier+'Controller.js');
};

StoryboardManager.prototype.registerStoryboardComponent = function(data) {
    
    var pos = -1;
    
    for(var i=0; i< this.Storyboards.length; i++) {
        if(this.Storyboards[i].identifier == data.identifier) {
            pos = i;
            break;
        }
    }
    
    if(pos > -1) {
        switch(data.component) {
            case 'controller': 
                this.Storyboards[pos].controller = data.reference;
                console.log("JSFW-Information: registered controller for " + data.identifier);
                this.StoryboardEvents.notify(eventHandlerIdentifiers['jsfw-app-state'], {'state': 1});
            break;
            case 'model': 
                this.Storyboards[pos].model = data.reference;
                console.log("JSFW-Information: registered model for " + data.identifier);    
            break;
            case 'repository': 
                this.Storyboards[pos].repository = data.reference;
                console.log("JSFW-Information: registered repository for " + data.identifier);    
            break;
            case 'template': 
                this.Storyboards[pos].template = data.reference;
                console.log("JSFW-Information: registered template for " + data.identifier);     
            break;
        }
    }
    
};

StoryboardManager.prototype.getStoryboard = function (identifier) {
    
    var pos = -1;
    
    for(var i=0; i< this.Storyboards.length; i++) {
        if(this.Storyboards[i].identifier == identifier) {
            pos = i;
            break;
        }
    }
    
    if(pos>-1) {
        return this.Storyboards[i];
    }
    else {
        return null;
    }
};

StoryboardManager.prototype.setActiveAction = function(actionObject) {
    
    var lAction = $(actionObject).attr("section");
    var lDirection = $(actionObject).attr("direction");
    
    if(lDirection == null) {
        lDirection = "forward";
    }

    if(this.activeStoryboard.action != lAction) {
        this.lastActiveStoryboard = this.activeStoryboard;
        this.activeStoryboard = {action: lAction, direction: lDirection};
    }
};
    
StoryboardManager.prototype.animateAction = function() {

    lLastAction = this.lastActiveStoryboard;
    lDeviceWidth = Framework.JSFWDisplayInformation.width;
    lDeviceHeight = Framework.JSFWDisplayInformation.height;

    var entry = this.getStoryboard(this.activeStoryboard.action);
    var action = 'show';
    entry.controller[action]();


    $("#"+this.lastActiveStoryboard.action).css({"z-index": 0});
    $("#"+this.activeStoryboard.action).css({"z-index": 100});
    
    $("#"+this.activeStoryboard.action).css('display', 'block');

    switch(this.activeStoryboard.direction) {
        case "forward":
            $("#"+this.activeStoryboard.action).css({top:0});
            $("#"+this.activeStoryboard.action).animate({left: 0}, {
                queue: false,
                duration: 200,
                complete: function() {
                if(lLastAction != null) {
                    $("#"+lLastAction.action).css({left: lDeviceWidth+"px"});
                }
                }
            }); 
        break;
        case "backward":    
                $("#"+this.activeStoryboard.action).css({left: "-"+lDeviceWidth+"px", top:0});
                $("#"+this.activeStoryboard.action).animate({left: 0}, {
                queue: false,
                duration: 200,
                complete: function() {
                if(lLastAction != null) {
                    $("#"+lLastAction.action).css({left: lDeviceWidth+"px"});
                }
                }
            }); 
        break;
        case "upward":
                $("#"+this.activeStoryboard.action).css({left: 0, top: lDeviceHeight+"px"});
                $("#"+this.activeStoryboard.action).animate({top: 0}, {
                queue: false,
                duration: 200,
                complete: function() {
                if(lLastAction != null) {
                    $("#"+lLastAction.action).css({left: lDeviceWidth+"px"});
                }
                }
            });
        break;
        case "downward":
                $("#"+this.activeStoryboard.action).css({left: 0, top: "-"+lDeviceHeight+"px"});
                $("#"+this.activeStoryboard.action).animate({top: 0}, {
                queue: false,
                duration: 200,
                complete: function() {
                if(lLastAction != null) {
                    $("#"+lLastAction.action).css({left: lDeviceWidth+"px"});
                }
                }
            });
        break;
    }

};

StoryboardManager.prototype.positionAction = function(identifier, direction) {

    lDeviceWidth = Framework.JSFWDisplayInformation.width;
    lDeviceHeight = Framework.JSFWDisplayInformation.height;

    switch(direction) {
        case "forward":
            $("#"+identifier).css({top:0, left: lDeviceWidth+"px"});
        break;
        case "backward":    
            $("#"+identifier).css({top:0, left: "-"+lDeviceWidth+"px"});
        break;
        case "upward":
                $("#"+identifier).css({top:0, left: "-"+lDeviceHeight+"px"});
        break;
        case "downward":
                $("#"+identifier).css({left: 0, top: "-"+lDeviceHeight+"px"});
        break;
    }    
};

StoryboardManager.prototype.resizeStoryboard = function(identifier) {
    
        var windowHeight = Framework.JSFWDisplayInformation.height;
        var x = $(".nav-item").outerHeight(true);
        var y = $("#"+ identifier + " .head-navigation").outerHeight(true);

        var n = windowHeight - (x+y);
        $("#"+ identifier + " .sb-content").css("height", n+"px");
        $("#"+ identifier + " .sb-content .touch").css("height", n+"px");   
};
    
//Callback - Register module
(function () {
    var lref = new StoryboardManager();
    var args = {'module-identifier': 'jsfw-storyboad-mamager','module-namespace': 'none', 'status': 'loaded', 'reference': lref};
    Framework.JSFWModuleManager.register(args);
})();
