//Define
var applicationConfiguration = {
    'appName': 'framework-test',
    'appVersion': '0.1.1 - test',
    'frameworkVersion': '0.1.1 - alpha',
    'splashScreen': 'resource/public/...',
    'entrypoint': 'main',
    'storyboards': [
        {'identifier': 'main'},
        {'identifier': 'about'},
    ]
};

//Contents
var modules = [
    {'module-identifier': 'jsfw-app-bootstrap', 'include-path': 'framework/module/JSFWApp.js'},
];

//Callback
(function () {
    for(var i=0; i<modules.length; i++) {
        Framework.JSFWTaskManager.addToQueue(modules[i]);
    }
})();
