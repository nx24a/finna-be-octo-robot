var Templater = function() {
    this.currentTemplateFile = null;
    this.subpart = {subpart: null, contents: null, buffer: ""};
    this.buffer = null;    
};

Templater.prototype.setTemplateData = function(input) {
    this.currentTemplateFile = input;
};

Templater.prototype.getTemplateDataPart = function(action) {
    var pos = -1;
    for(var i=0; i<this.currentTemplateFile.length; i++) {
        if(this.currentTemplateFile[i].action == action) {
            pos = i;
            break;
        }
    }
    
    if(pos > -1) {
        return this.currentTemplateFile[pos].data;
    } else {
        return null;
    }
};

Templater.prototype.flush = function () {
    return this.buffer;
};

Templater.prototype.workSubpart = function(subpart, value) {
    if(this.buffer == null) {
        this.buffer = this.currentTemplateFile;
    }

    this.buffer = this.buffer.replace('{{'+subpart+'}}', value);
};

Templater.prototype.workSubpartExtern = function(data, subpart, value) {
    return data.replace('{{'+subpart+'}}', value);
};

Templater.prototype.getSubpart = function(subpart) {

    var fragmentStart = '{{###'+subpart+'###}}';
    var fragmentEnd = '{{###/'+subpart+'###}}';
    var countStart = fragmentStart.length;
    var countEnd = fragmentEnd.length;
    var start = this.buffer.indexOf(fragmentStart);
    var end = this.buffer.indexOf(fragmentEnd);

    this.subpart.subpart = subpart;
    this.subpart.content = this.buffer.substring(start+countStart, end); 
    this.buffer = this.buffer.substring(0, start)+'{{###currentSubpart###}}'+this.buffer.substring(end+countEnd);
};

Templater.prototype.setSubpart = function() {
    this.buffer = this.buffer.replace('{{###currentSubpart###}}', this.subpart.buffer);
};

Templater.prototype.subpartPut = function(data) {
    var localBuffer = this.subpart.content;
    for(var i=0; i<data.length; i++) {
        localBuffer = this.subpart.content;
        if(this.subpart.content.indexOf(data[i].tag) > 0) {
            localBuffer = localBuffer.replace('{{'+data[i].tag+'}}', data[i].value);
            this.subpart.buffer = this.subpart.buffer+""+localBuffer+"\n";
        }
    }
};

//Callback - Register module
(function () {
    var lref = new Templater();
    var args = {'module-identifier': 'jsfw-templater','module-namespace': 'none', 'status': 'loaded', 'reference': lref};
    Framework.JSFWModuleManager.register(args);
})();