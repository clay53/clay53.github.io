var lastClock = 0;
var currentClock = lastClock;
var clock = lastClock-currentClock;

function World (config) {
    this.objects = [
        new GameObject ({
            name: "Sun",
            components: [
                new Transform ({
                    x: 0,
                    y: 0,
                    z: 1,
                }),
                new Script ({
                    name: "renderer",
                    function: function (state) {
                        if (state === "draw") {
                            var transform = this.gameObject.components.transform;
                            push();
                            transform.translate();
                            noStroke();
                            fill(252, 212, 64);
                            let s = (windowWidth+windowHeight)/2;
                            // Draw Sun
                            ellipse(0, 0, s*0.3, s*0.3);
                            // Draw rays
                            for (var i = 0; i < 9; i++) {
                                stroke(252, 212, 64);
                                strokeWeight(3);
                                line(
                                    pocx(0, s*0.2, 360*(i/9)),
                                    pocy(0, s*0.2, 360*(i/9)),
                                    pocx(0, s*0.3, 360*(i/9)),
                                    pocy(0, s*0.3, 360*(i/9))
                                )
                            }
                            pop();
                        }
                    }
                }),
                new Script ({
                    name: "controller",
                    function: function (state) {
                        var transform = this.gameObject.components.transform;
                        if (state === "draw") {
                            if (keyIsDown(UP_ARROW)) {
                                if (transform.y-clock/10 >= -windowHeight/2) {
                                    transform.y -= clock/10;
                                }
                            } else if (keyIsDown(DOWN_ARROW)) {
                                if (transform.y+clock/10 <= windowHeight/2) {
                                    transform.y += clock/10;
                                }
                            }
                        }
                    }
                })
            ]
        }),
        new GameObject ({
            name: "terrain",
            components: [
                new Transform ({
                    x: 0,
                    y: 0,
                    z: 2
                }),
                new Script ({
                    name: 'renderer',
                    function: function (state) {
                        var transform = this.gameObject.components.transform;
                        if (state === "draw") {
                            transform.y = windowHeight*0.125+windowHeight*0.25;
                            push();
                            transform.translate();
                            yGradient(color(109, 168, 74), color(84, 168, 0), 0, 0, 0, windowWidth, windowHeight*0.25, CENTER);
                            pop();
                        }
                    }
                })
            ]
        })
    ],
    this.start = function () {
        for (var i = 0; i < this.objects.length; i++) {
           let o = this.objects[i];
           for (var k in o.components) {
               var c = o.components[k];
               if (typeof c.function === "function") {
                   c.function("start");
               }
           }
       }
    },
    this.draw = function () {
        currentClock = millis();
        clock = currentClock-lastClock;
        background(255);
        push();
        //translate(windowWidth/2, windowHeight/2, 0);
        yGradient(color(135, 206, 235), color(231, 116, 0), this.objects[0].components.transform.y/windowHeight, 0, 0, windowWidth, windowHeight, CENTER);
        for (var i = 0; i < this.objects.length; i++) {
           let o = this.objects[i];
           for (var k in o.components) {
               var c = o.components[k];
               if (typeof c.function === "function") {
                   c.function("draw");
               }
           }
        }
        pop();
        lastClock = currentClock;
    }
}