engine.story({ 
    startBar: {
        text: "You are the thief Jarek, after a series of failed burgleries and heists in upper Everran you are seated in The Grimey Tavern waiting for your good friend Thomas who has asked you to meet him, his letter stated that it was urgent. The banter in the bar is boring and you find yourself having waited for an hour without him showing. What will you do. Wait or go look for him?",
        next: ["Wait or go look for him?",
            [.35, .32, "Go look for him", "waitForThomas"],
            [.7, .4, "Wait", "lookForThomas"]]
    },
    waitForThomasBar: {
        text: "You decide to wait for Thomas, you order another beer and prepare to wait a little longer for your friend. A cloacked figutre steps into the room you can tell it is a woman, and your trained eyes tell you that she is armed. probably handcrossbow and a rapier you are not sure, but here cape is unneceasarry wide at the shoulders. As she turns towards the bar a lock of red hair spills out from under the cloak, there sound of the other patrons conversations and laughter makes her words inaudible but you are able to read her lips as she asks for Thomas... As you are about to decide what to do, Thomas stumbles through the door, blood spilling from a wound in his gut. What do you do?",
        next: ["What do you do?",
        [.3, .3, "Rush to Thomas aid", "rushToAidThomas"],
        [.6, .8, "Wait and watch", "waitAndWatch"]]
    },
    rushToAidBarNoPIC: {
        text: "You quickly run over to Thomas and catch him just before he falls to the ground, you lay him down on his back,  blood is spilling from his wounds and mouth he recognices you and tries to speak but slips into unconsciousness. Out of the corner of your eye you notice that the woman is silently slipping out through the door.",
        next: ["What do you do?",
        [.3, .3, "Rush to Thomas aid", "rushToAid"],
        [.6, .8, "Wait and watch", "waitAndWatch"]]
    },
    waitAndWatchBarNOPIC: {
        text: "Several of the bar partrons and the bartender rush to aid Thomas and everyone seems affected by the occurence including the cloacked woman who seems to rush to Thomas aid with several others only to quickly slip out the door as the rest of the patrons help out Thomas. Meanwhile Thomas is clearly in a bad way and the bar man´s help consisting of shaking and shouting does not seem to help.",
        next: ["What do you do?",
        [.3, .3, "Aid Thomas", "aidThomasLate"],
        [.35, .32, "Follow the Woman", "followTheWomanBar"]]
    },
    aidThomasLateBarNOPIC: {
        text: "You quickly rip the sleves of Thomas shirt and apply dressings to his wounds, you manage to stop the bleeding, but Thomas is in need of immediate medical attention. Someone needs to take Thomas to the hospital, but if you do, tracking the woman will become impossible.",
        next: ["What do you do?",
        [.3, .3, "Take Thomas to a Doctor", "aidThomasLate"],
        [.35, .32, "Follow the Woman", "followTheWomanBar"]]
    },
    lookForThomasNOPIC: {
        text: "Looking for Thomas: You step out into the foggy clouded night, the moon only partially reveals itself through the thick mist and there is a chill in the air. The streets are all but empty, you make your way towards his flat two blocks away. Outside his apartment you hear noices of struggle coming from his apartment. Do you kick in the door, or climb the building to look through the window?"
    }
});
