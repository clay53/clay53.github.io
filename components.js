function Transform (config) {
    this.type = "transform";
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.z = config.z || 0;
    this.translate = function () {
        translate(this.x, this.y, this.z);
    }
}

function Script (config) {
    this.type = 'script';
    this.name = config.name || 'script';
    this.inputs = config.inputs || {};
    this.function = config.function || function () {};
}