function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username !== "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username !== "" && username !== null) {
            setCookie("username", username, 365);
        }
    }
}

var sind = function (angle) {
    return Math.sin(angle/180*Math.PI);
    
};

var cosd = function (angle) {
    return Math.cos(angle/180*Math.PI);
};

var pocx = function (oX, r, angle) {
    return oX+r*sind(angle);
};

var pocy = function (oY, r, angle) {
    return oY+r*cosd(angle);
};

function yGradient (c1, c2, o, x, y, w, h, mode) {
    fill(0);
    stroke(0);
    for (var i = 0; i < h; i++) {
        stroke(lerpColor(c1, c2, (i+h*o)/h));
        if (mode === CORNER) {
            line(x, y+i, x+w, y+i);
        } else if (mode === CENTER) {
            line(x-w/2, y+i-h/2, x+w/2, y+i-h/2);
        }
    }
}