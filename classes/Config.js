module.exports = {
    fps: 24,
    maxPlayersPerGame: 6,
    radPrecision: 1,

    player: {
        baseSpeed: 1.25,
        collider: { radius: 20 }
    },

    bullet: {
        baseSpeed: 15,
        baseDamage: 10,
        collider: { radius: 3 },
        deathTime: 24 //at 24 fps
    }

}
