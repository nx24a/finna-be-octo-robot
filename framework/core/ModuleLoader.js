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

var ModuleLoader = function (eventIdentifier) {
    this.identifier = eventIdentifier;
};

ModuleLoader.prototype.loadModule = function (moduleInformation) {
    var keeper = document.getElementById('application-scripts');
    var script = documen.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', moduleInformation["include-path"]);
    script.setAttribute('async', true);

    script.onerror = function () {
        script.onerror = null;
    };

    script.onload = script.onreadystatechange = function () {
        if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            script.onload = script.onreadystatechange = null;
            script.setAttribute('identifier', moduleInformation["module-identifier"]);
        }
    };

    keeper.appendChild(script);
    //this.loadStatus.push({'key': moduleInformation["module-identifier"], 'status': -1});
};
