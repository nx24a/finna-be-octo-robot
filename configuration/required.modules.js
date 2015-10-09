//Contents
var modules = [
    {'module-identifier': 'storyboard-dispatch', 'include-path': 'com/easyFramework/module/storyboard/module-storyboard-dispatcher.js'},
    {'module-identifier': 'module-storyboard', 'include-path': 'com/easyFramework/module/storyboard/module-storyboard.js'},
];

//Callback
(function () {
    for(var i=0; i<modules.length; i++) {
        Framework.JSFWInitialLoadManager.addToQueue(modules[i]);
    }
})();
