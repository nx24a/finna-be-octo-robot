//Contents
var modules = [
    {'module-identifier': 'jsfw-debug-console', 'include-path': 'framework/module/JSFWDebug.js'},
];

//Callback
(function () {
    for(var i=0; i<modules.length; i++) {
        Framework.JSFWInitialLoadManager.addToQueue(modules[i]);
    }
})();
