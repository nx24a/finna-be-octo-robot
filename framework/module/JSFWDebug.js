var Debug = function () {
    this.debugEnabled = false;
};

Debug.prototype.debugTrackingEnabled = function(isEnabled) {
    this.debugEnabled = isEnabled;
};

Debug.log = function(info) {
    if(this.debugEnabled) {
        console.log('JSFW log: '+info);
    }
};

//Callback - Register module
(function () {
    var lref = new Debug();
    var args = {'module-identifier': 'jsfw-debug-console','module-namespace': 'none', 'status': 'loaded', 'reference': lref};
    Framework.JSFWModuleManager.register(args);
})();
