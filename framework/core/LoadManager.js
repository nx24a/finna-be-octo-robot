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

var LoadManager = function (eventIdentifier) {
    this.loadQueue = [];
    this.moduleLoader = null;
    this.eventIdentifier = eventIdentifier;

    this.registerEvent(eventIdentifier, this.eventStatusCallback);
};

LoadManager.prototype.registerEvent = function(eventIdentifier, callback) {
    document.addEventListener(eventIdentifier, callback, false);
};

LoadManager.prototype.unregisterEvent = function (eventIdentifier, callback) {
    document.removeEventListener(eventIdentifier, callback, false);
};

LoadManager.prototype.notify = function(eventIdentifier, data) {
    var event = new CustomEvent(eventIdentifier, {'detail': data});
    document.dispatchEvent(event);
};

LoadManager.prototype.addToQueue = function(key) {
    try {
        this.loadQueue.push({'key': key, 'status': -1});
    } catch(e) {
        console.log(e);
    }
};

LoadManager.prototype.updateQueueItemStatus = function(responseData) {
    try {
        var queueLength = LoadManager.getQueueLength();
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
        var queueLength = LoadManager.getQueueLength();
        var sum = 0;

        for(var i=0; i<queueLength; i++) {
            if(this.loadQueue[i].status == 1) {
                sum++;
            }
        }

        if(sum == queueLength) {
            this.notify(this.eventIdentifier, {'status': '1'});
        } else {
            this.notify(this.eventIdentifier, {'status': '-1'});
        }

    } catch (e) {
        console.log(e);
    }
};

LoadManager.prototype.getQueueLength = function() {
    return this.loadQueue.length;
};

LoadManager.prototype.eventStatusCallback = function(event) {
    console.log(event.detail.status);
};
