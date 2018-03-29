function confToComponents (gameObject, conf) {
    let components = {};
    for (var i = 0; i < conf.length; i++) {
        let c = conf[i];
        c.gameObject = gameObject;
        if (c.type === "script") {
            components[c.name] = c;
        } else {
            components[c.type] = c;
        }
    }
    return components;
}

function GameObject (config) {
    this.components = confToComponents(this, config.components) || {};
}

var player = new GameObject ({
    components: this.components = [
        new Transform ({
            x: 0,
            y: 0,
            z: 0,
        })
    ]
});