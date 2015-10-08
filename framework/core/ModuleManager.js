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

var ModuleManager = function (eventIdentifier) {
    this.identifier = eventIdentifier;
    this.registeredModules = [{'module-identifier': 'moduleManager','module-namespace': 'com.easyFramework.module', 'status': 'loaded', 'reference': moduleManager},];
};

ModuleManager.prototype.register = function (args) {
        var newModule =  {'module-identifier': '','module-namespace': '', 'status': '', 'reference': null};

        if(args["module-identifier"]) {
            newModule["module-identifier"] = args["module-identifier"];
        }

        if(args["module-namespace"]) {
            newModule["module-namespace"] = args["module-namespace"];
        }

        if(args.reference) {
            newModule.reference = args.reference;
        }

        if(typeof newModule.reference == 'object') {
            newModule.status = 'loaded';
            this.notify(this.identifier,{key: args["module-identifier"], 'status': 1});
        } else {
            newModule.status = 'not loaded';
        }

        if(this.registeredModules.push(newModule)) {
            console.log('module ' + newModule["module-identifier"] + ' has status: '+newModule.status);
        }
};

ModuleManager.prototype.registerBypass = function (args) {
        var newModule = args;
        if(this.registeredModules.push(newModule)) {
            console.log('module(bypassed) ' + newModule["module-identifier"] + ' has status: '+newModule.status);
        }
};

ModuleManager.prototype.unregister = function (key) {
    console.log(key);
};

ModuleManager.prototype.access = function (key) {
        var pos = 0;
        for(var i=0; i<this.registeredModules.length; i++) {
            if(this.registeredModules[i]["module-identifier"] == moduleID && this.registeredModules[i]["status"] == 'loaded') {
                pos = i;
                break;
            }
        }
        return this.registeredModules[i].reference;
};

ModuleManager.prototype.notify = function (identifier, data) {
        var event = new CustomEvent(identifier, { 'detail': data });
        document.dispatchEvent(event);
};
