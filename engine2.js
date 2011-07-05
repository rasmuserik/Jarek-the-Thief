(function(engine, window) {
   var storyLine = {},
        lineheight,
        wordspace,
        currentImage,
        showWordTimeout,
        screen, defaultPage;

    function init() {
        w = $("#bg").width();
        h = $("#bg").height();

        // handle touch and click events fast
        // TODO: compatibility
        if ('ontouchstart' in document.documentElement) {
            document.addEventListener('touchstart', handleEvent);
        } else {
            document.addEventListener('mousedown', handleEvent);
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
            /*
            if(rotate) {
                t = x; 
                x = w - y; 
                y = t;
            }
            */
            handleTouch(x,y);
        }
        lineheight = 0| (h/15);
        wordspace = 0| (lineheight*.4);
    }

    var show = engine.show = function(screenName) {
        screen = storyLine[screenName];
        $("#options").text("");
        $("#desc").text("");
        console.log("show", screenName, screen);
        if(!screen) {
            alert('Internal error: "' + screenName + '" does not exist.');
            return show(defaultPage);
        }
        $("#bg").attr("src", "images/" + screenName + ".jpg");
        textShow(screen.text);
    }

    function textShow(text) {
        text = text.split(" ");
        var textpos = 0;

        function showWord() {
            var word = text[textpos];
            $("#text").text($("#text").text() + " " + word);

            if(++textpos < text.length) {
                showWordTimeout = setTimeout(showWord, Math.random() * 200);
            }
        }
        showWord();

        nextFn = actions;
    }

    function drawText(x,y,text) {
        var $text = $("<div>").text(text);
        $("#options").append($text);
        $text.css("position", "absolute")
             .css("top", (y - $text.height() / 2) + "px")
             .css("left", (x - $text.width() / 2) + "px");
    }

    function actions() {
        console.log("actions", screen);

        clearTimeout(showWordTimeout);
        $("#text").text("");
        $("#options").html();

        var next = screen.next;
        $("#desc").text(next[0]);
        for(var i = 1; i < next.length; ++i) {
            var x = next[i][0],
                y = next[i][1],
                label = next[i][2];
                drawText(x*w,y*h,label);
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
