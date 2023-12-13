const Transformer = require("../../../transformer/models/transformer");

const createNewDummy = ({ uuid }) => {
    const transformer = new Transformer()
        .setUuid(uuid)
        .setName(null)
        .setDescription(null)
        .setAbilities([].sort((a, b) => a - b))
        .setFaction(null)
        .setImage(null)
        .setObjectShape(null)
        .generateCreatedAt()
        .generateUpdatedAt();
    transformer.frameNumber = null;
    return transformer;
};

const createNewDummyOptimus = ({ uuid }) => {
    const transformer = new Transformer()
        .setUuid(uuid)
        .setName("Optimus Prime")
        .setDescription(
            "Optimus Prime (formerly known as Orion Pax) has strong moral character, excellent leadership, and sound decision-making skills. Optimus Prime has a strong sense of honor and justice, being dedicated to building peaceful and mutually beneficial co-existence with humans, the protection of life and liberty of all sentient species."
        )
        .setAbilities(["Brilliant military tactics", "Powerful martial arts", "Advanced extraterrestrial weaponry"].sort((a, b) => a - b))
        .setFaction({ uuid: "4ut0b0t0-70ed-493b-a715-8efe5a2a4282", name: "Autobot" })
        .setImage("https://static.printler.com/cache/c/c/6/2/e/7/cc62e7c9ed2bf39cf102dd6ad870ed2e03220060.jpg")
        .setObjectShape("Peterbilt 379")
        .generateCreatedAt()
        .generateUpdatedAt();
    transformer.frameNumber = "WVGZZZ5NZJM131395";
    return transformer;
};

const createNewDummyBumblebee = ({ uuid }) => {
    const transformer = new Transformer()
        .setUuid(uuid)
        .setName("Bumblebee")
        .setDescription(
            "One of the bravest Autobots among the Autobot troops, Bumblebee is a formidable soldier standing alongside his comrades, remembering that you to be a large 'bot to defeat stronger enemies. During the conflict in the war against the Decepticons, Bumblebee's voice box suffered great damage, forcing him to speak through frequencies he finds on the radio."
        )
        .setAbilities(["Kick ass expert", "Durability", "Acrobatic Agility", "Quick Reaction"].sort((a, b) => a - b))
        .setFaction({ uuid: "4ut0b0t0-70ed-493b-a715-8efe5a2a4282", name: "Autobot" })
        .setImage(
            "https://cdn.vox-cdn.com/thumbor/zpZxdoDwTomlIjDrmg3rLF9Z_xA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13681791/transformers_lastknight_bumblebee_worldwar2.jpg"
        )
        .setObjectShape("Chevrolet Camaro 2016")
        .generateCreatedAt()
        .generateUpdatedAt();
    transformer.frameNumber = "WVGZZZ5NZJM131396";
    return transformer;
};

const createNewDummyMegatron = ({ uuid }) => {
    const transformer = new Transformer()
        .setUuid(uuid)
        .setName("Megatron")
        .setDescription(
            "Megatron was a Decepticon who was previously part of the Cybertronian body called Defense Force, where he found a mysterious artifact that led him to communicate with The Fallen, the first Decepticon. He was persuaded by The Fallen to form a new incarnation of Decepticons under his power. Megatron simply wants everything, relying on Peace through Tyranny, becoming the fierce nemesis of Optimus Prime (who once considered Megatron a brother), the leader of the opposing faction to the Decepticons, the Autobots."
        )
        .setAbilities(["Fusion Cannon", "Crushing claw", "Flamethrower", "Sword", "Plasma gun"].sort((a, b) => a - b))
        .setFaction({ uuid: "d3c3pt1c-0na3-4724-83e1-191b52acf673", name: "Decepticon" })
        .setImage("https://tfwiki.net/mediawiki/images2/thumb/b/b7/Movie_Megatron_Defiance3.jpg/300px-Movie_Megatron_Defiance3.jpg")
        .setObjectShape("Customized 2014 Freightliner Argosy Truck")
        .generateCreatedAt()
        .generateUpdatedAt();
    transformer.frameNumber = "WVGZZZ5NZJM131397";
    return transformer;
};

module.exports = { createNewDummy, createNewDummyOptimus, createNewDummyBumblebee, createNewDummyMegatron };
