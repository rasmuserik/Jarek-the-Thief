(function(engine, window) {
    var canvas = document.getElementById("canvas"), 
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight,
        storyLine = {},
        lineheight,
        wordspace,
        currentImage,
        showWordTimeout,
        screen, defaultPage;

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
            console.log("handleEvent", e);
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

    var show = engine.show = function(screenName) {
        screen = storyLine[screenName];
        console.log("show", screenName, screen);
        if(!screen) {
            alert('Internal error: "' + screenName + '" does not exist.');
            return show(defaultPage);
        }

        currentImage = new Image();
        currentImage.onload = function() {
            ctx.drawImage(currentImage, 0, 0, w, h);
            setTimeout(textShow(screen.text), 1000);
        }
        currentImage.src = "images/" + screenName + ".jpg";
        currentImage.onerror = function() {
            alert('Internal error: could not load "' +currentImage.src + '"');
            return show(defaultPage);
        }
    }

    function textShow(text) {
        text = text.split(" ");
        var xmin = w/12,
            xmax = w-xmin,
            x = xmin,
            y = xmin,
            textpos = 0;
        ctx.font = (0|(.9*lineheight)) + "px sans-serif";
        console.log("font", ctx.font);

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
        console.log("actions", screen);
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
        x /= w;
        y /= h;
        console.log("clickButton", x, y);

        function nextDist2(n) {
            return (n[0] - x) * (n[0] - x) + (n[1] - y) * (n[1] - y);
        }

        var result = screen.next[1];
        for(var i = 2; i < screen.next.length; ++i) {
            if(nextDist2(result) > nextDist2(screen.next[i])) {
                result = screen.next[i];
            }
        }
        console.log(result[2], result[3]);
        show(result[3]);
    }

    function handleTouch(x,y) {
        nextFn(x,y);
    }

    engine.story = function(story, start) {
        console.log("story", story);
        storyLine = story;
        init();
        defaultPage = start || "start";
        show(defaultPage);
        console.log(story);
    }
    window.engine = engine;
}(window.engine || {}, window))
