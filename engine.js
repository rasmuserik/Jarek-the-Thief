(function(engine, window) {
    var canvas = document.getElementById("canvas"), 
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight,
        storyLine = {},
        lineheight,
        wordspace,
        currentScreen = "start",
        currentImage,
        showWordTimeout,
        screen;

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
        lineheight = 0| (h/15);
        wordspace = 0| (lineheight*.4);
    }

    function show(screenName) {
        screen = storyLine[screenName];

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
            x = xmin,
            y = xmin,
            textpos = 0;
        ctx.font = (0|(.9*lineheight)) + "px sans-serif";
        console.log(ctx.font);

        function showWord() {
            var word = text[textpos];
            var wordlength = ctx.measureText(word).width + wordspace;

            ctx.fillStyle = "#fff";

            if(wordlength + x > xmax) {
                x = xmin;
                y += lineheight;
                ctx.fillRect(x-wordspace, y - lineheight + 2, wordspace, lineheight);
            }

            ctx.fillRect(x, y - lineheight + 4, wordlength, lineheight);
            ctx.fillStyle = "#000";
            ctx.fillText(word, x, y);
            x += wordlength;

            if(++textpos < text.length) {
                showWordTimeout = setTimeout(showWord, Math.random() * 200);
            }
        }
        showWord();

        nextFn = actions;
    }

    function actions() {
        clearTimeout(showWordTimeout);
        ctx.drawImage(currentImage, 0, 0, w, h);
        console.log(screen);
        var next = screen.next;
        var desc = next[0];
        ctx.fillText(desc, wordspace, h - 4);
        for(var i = 1; i < next.length; ++i) {
            var x = next[i][0],
                y = next[i][1],
                label = next[i][2];
            console.log(ctx.measureText(label).width);
            ctx.fillText(label, w*x - ctx.measureText(label).width / 2, h*y - lineheight / 2);
        }

        nextFn = clickButton;
    }

    function clickButton(x,y) {
    }

    function handleTouch(x,y) {
        nextFn(x,y);
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
