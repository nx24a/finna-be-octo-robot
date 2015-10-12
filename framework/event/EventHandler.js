var EventHandler = function () {

};

EventHandler.prototype.registerEvent = function(eventIdentifier, callback) {
    window.addEventListener(eventIdentifier, callback, false);
    console.info('JSFW-Events: New Eventlistener: '+eventIdentifier);
};

EventHandler.prototype.unregisterEvent = function (eventIdentifier, callback) {
    window.removeEventListener(eventIdentifier, callback, false);
};

EventHandler.prototype.notify = function(eventIdentifier, data) {
    var event = new CustomEvent(eventIdentifier, {'detail': data});
    if(window.dispatchEvent(event)) {
        return true;
    } else {
        return false;
    }
};
