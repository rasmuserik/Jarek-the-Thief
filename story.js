engine.story({ 
    startBar: {
        text: "You are the thief Jarek, after a series of failed burgleries and heists in upper Everran you are seated in The Grimey Tavern waiting for your good friend Thomas who has asked you to meet him, his letter stated that it was urgent. The banter in the bar is boring and you find yourself having waited for an hour without him showing. What will you do. Wait or go look for him?",
        next: ["Wait or go look for him?",
            [.35, .32, "Go look for him", "lookForThomasStreet"],
            [.7, .4, "Wait", "waitForThomasBar"]]
    },
    waitForThomasBar: {
        text: "You decide to wait for Thomas, you order another beer and prepare to wait a little longer for your friend. A cloacked figutre steps into the room you can tell it is a woman, and your trained eyes tell you that she is armed. probably handcrossbow and a rapier you are not sure, but here cape is unneceasarry wide at the shoulders. As she turns towards the bar a lock of red hair spills out from under the cloak, there sound of the other patrons conversations and laughter makes her words inaudible but you are able to read her lips as she asks for Thomas... As you are about to decide what to do, Thomas stumbles through the door, blood spilling from a wound in his gut. What do you do?",
        next: ["What do you do?",
        [.3, .3, "Rush to Thomas aid", "aidThomasFastBar"],
        [.6, .8, "Wait and watch", "waitAndWatchBar"]]
    },
    aidThomasFastBar: {
        text: "You quickly run over to Thomas and catch him just before he falls to the ground, you lay him down on his back,  blood is spilling from his wounds and mouth he recognices you and tries to speak but slips into unconsciousness. While you quickly stop his bleeding you notice out of the corner of your eye that the woman is silently slipping out through the door. Thomas condition is stable but he needs a doctor, you can either take him personally or leave it to the barman while you follow the woman",
        next: ["What do you do?",
        [.3, .3, "Follow the Woman", "followTheWomanStreetNOPIC"],
        [.6, .8, "Take Thomas to Doctor", "thomasToDoctorNOPIC"]]
    },
    waitAndWatchBar: {
        text: "Several of the bar partrons and the bartender rush to aid Thomas and everyone seems affected by the occurence including the cloacked woman who seems to rush to Thomas aid with several others only to quickly slip out the door as the rest of the patrons help out Thomas. Meanwhile Thomas is clearly in a bad way and the bar man´s help consisting of shaking and shouting does not seem to help.",
        next: ["What do you do?",
        [.4, .8, "Aid Thomas", "aidThomasSlowBar"],
        [.35, .32, "Follow the Woman", "followTheWomanStreetNOPIC"]]
    },
    aidThomasSlowBar: {
        text: "You quickly rip the sleves of Thomas shirt and apply dressings to his wounds, you manage to stop the bleeding, but Thomas is in need of immediate medical attention. Thomas needs a doctor fast, but if you take him there, tracking the woman will become impossible.",
        next: ["What do you do?",
        [.6, .8, "Take Thomas to a Doctor", "thomasToDoctorNOPIC"],
        [.35, .32, "Follow the Woman", "followTheWomanBarNOPIC"]]
    },
    lookForThomasStreet: {
        text: "You step out into the foggy clouded night, the moon only partially reveals itself through the thick mist and there is a chill in the air. The streets are all but empty, you make your way towards his flat two blocks away." 
 next: ["What do you do?",
       [.35, .32, "Follow the Woman", "followTheWomanBarNOPIC"]]
    },    
frontOfApartmentNOPIC: {
        text: "Outside his apartment you hear noices coming from his apartment, someone is clearly fighting in there, you can see patch of the rough wall that you will be able to scale and get on to Thomas terrasse, the door in front of you has beens kicked open. Do you go through the front door or climb the building to look through the terrasse door?",
        next: ["What do you do?",
        [.6, .8, "Storm through front Door!", "AidThomasApsrtmenNOPIC"],
        [.35, .32, "Climb the terrasse", "thomasTerrasseApartmentNOPIC"]]
    }
}, "startBar");
