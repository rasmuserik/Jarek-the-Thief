(function(engine, window) {
    var canvas = document.getElementById("canvas"), 
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight,
        storyLine = {},
        currentScreen = "start",
        currentImage;

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

        currentImage = new Image();
        currentImage.onload = function() {
            ctx.drawImage(currentImage, 0, 0, w, h);
            setTimeout(textShow(screen.text), 1000);
        }
        currentImage.src = "images/" + screenName + ".jpg";
    }

    function textShow(text) {
        text = text.split(" ");
        var xmin = w/12,
            xmax = w-xmin,
            lineheight = 12,
            wordspace = 5,
            x = xmin,
            y = xmin,
            textpos = 0;

        function showWord() {
            var word = text[textpos];
            var wordlength = ctx.measureText(word).width + wordspace;

            if(wordlength + x > xmax) {
                x = xmin;
                y += lineheight;
            }

            ctx.fillText(word, x, y);
            x += wordlength;

            if(++textpos < text.length) {
                setTimeout(showWord, Math.random() * 100);
            }
        }
        showWord();
    }

    function handleTouch(x,y) {
        alert("(" + x + ", " + y + ")");
    }

    engine.story = function(story) {
        storyLine = story;
        init();
        show("start");
        console.log(story);
        console.log(ctx.measureText("foo bar baz"));
    }
    window.engine = engine;
}(window.engine || {}, window))
