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

var LoadManager = function (eventIdentifier, eventIdentifierSuper) {
    this.loadQueue = [];
    this.identifier = eventIdentifier;
    this.identifierSuper = eventIdentifierSuper;
    this.moduleLoader = new ModuleLoader(eventIdentifier);
    this.eventHandler = new EventHandler();
    this.eventHandler.registerEvent(eventIdentifier, this.eventStatusCallback.bind(this));
};

LoadManager.prototype.addToQueue = function(meta) {
    try {
        this.loadQueue.push({'key': meta["module-identifier"], 'status': -1});
        this.moduleLoader.loadModule(meta);
    } catch(e) {
        console.log(e);
    }
};

LoadManager.prototype.updateQueueItemStatus = function(responseData) {
    try {
        var queueLength = this.loadQueue.length;
        for(var i=0; i<queueLength; i++) {
            if(this.loadQueue[i].key == responseData.key) {
                this.loadQueue[i].status = responseData.status;
            }
        }
    } catch (e) {
        console.log(e);
    }
};

LoadManager.prototype.QueueStatus = function() {
    try {
        var queueLength = this.loadQueue.length;
        var sum = 0;

        for(var i=0; i<queueLength; i++) {
            if(this.loadQueue[i].status == 1) {
                sum++;
            }
        }
        if(sum == queueLength) {
            return true;
        } else {
            return false;
        }

    } catch (e) {
        console.log(e);
    }
};

LoadManager.prototype.eventStatusCallback = function(event) {
    if(event != null)
        this.updateQueueItemStatus({key: event.detail.key, status: event.detail.status});
    if(this.QueueStatus() == true) {
        this.eventHandler.unregisterEvent(this.identifier, this.eventStatusCallback);
        this.eventHandler.notify(this.identifierSuper, {'status': 2});
    } else {
        
        this.eventHandler.notify(this.identifierSuper, {'status': 1});
    }
};