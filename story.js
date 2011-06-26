engine.story({ 
    start: {
        text: "You are the thief Jarek, after a successfull burglery in upper Everran you are seated in a tavern waiting for your good friend Thomas who has asked you to meet him, his letter stated that it was urgent. The banter in the bar is boring and you find yourself having waited for an hour without him showing. What will you do. Wait or go look for him?",
        next: ["Wait or go look for him?",
            [.3, .3, "wait", "waitForThomas"],
            [.8, .3, "look", "lookForThomas"]]
    },
    waitForThomas: {
        text: "You decide to wait for Thomas, you order another beer and prepare to wait a little longer for your friend. A cloacked figutre steps into the room you can tell it is a woman, and your trained eyes tell you that she is armed. probably handcrossbow and a rapier you are not sure, but here cape is unneceasarry wide at the shoulders. As she turns towards the bar a lock of red hair spills out from under the cloak, there sound of the other patrons conversations and laughter makes her words inaudible but you are able to read her lips as she asks for Thomas... As you are about to decide what to do, Thomas stumbles through the door, blood spilling from a wound in his gut. What do you do?",
        next: ["What do you do?",
        [.3, .3, "Rush to Thomas aid", "rushToAid"],
        [.6, .8, "Wait and watch", "waitAndWatch"]]
    },
    lookForThomas: {
        text: "Looking for Thomas: You step out into the foggy clouded night, the moon only partially reveals itself through the thick mist and there is a chill in the air. The streets are all but empty, you make your way towards his flat two blocks away. Outside his apartment you hear noices of struggle coming from his apartment. Do you kick in the door, or climb the building to look through the window?"
    }
});
