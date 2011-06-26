(function(engine, window) {
    var canvas = document.getElementById("canvas"), 
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight,
        storyLine = {},
        currentScreen = "start";

    function init() {
        var rotate = false,
            t;
        canvas.width = w;
        canvas.height = h;

        // if we are in portrait mode, force landscape
        if(h>w) {
            rotate = true;
            ctx.rotate(Math.PI/2);
            ctx.translate(0, -w)
            t = w; w = h; h = t;
        }

        // handle touch and click events fast
        // TODO: compatibility
        if ('ontouchstart' in document.documentElement) {
            canvas.addEventListener('touchstart', handleEvent);
        } else {
            canvas.addEventListener('mousedown', handleEvent);
        }
        function handleEvent(e) {
            var y, x;
            if (e.touches) {
                    y = e.touches[0].clientY;
                    x = e.touches[0].clientX;
            } else {
                y = e.clientY;
                x = e.clientX;
            }
            if(rotate) {
                t = x; 
                x = w - y; 
                y = t;
            }
            handleTouch(x,y);
        }
    }

    function show(screenName) {
        var screen = storyLine[screenName];
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, w, h);
        }
        img.src = "images/" + screenName + ".jpg";
    }

    function handleTouch(x,y) {
        alert("(" + x + ", " + y + ")");
    }

    engine.story = function(story) {
        init();
        show("start");
        storyLine = story;
        console.log(story);
    }
    window.engine = engine;
}(window.engine || {}, window))
