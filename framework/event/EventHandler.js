var EventHandler = function () {

};

EventHandler.prototype.registerEvent = function(eventIdentifier, callback) {
    document.addEventListener(eventIdentifier, callback, false);
    console.info('JSFW-Events: New Eventlistener: '+eventIdentifier);
};

EventHandler.prototype.unregisterEvent = function (eventIdentifier, callback) {
    document.removeEventListener(eventIdentifier, callback, false);
};

EventHandler.prototype.notify = function(eventIdentifier, data) {
    var event = new CustomEvent(eventIdentifier, {'detail': data});
    document.dispatchEvent(event);
};
