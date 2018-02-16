module.exports = {
    fps: 24,
    maxPlayersPerGame: 6,
    radPrecision: 1,

    newUserConfig:{
            username: null, //Overwritten dynamically
            password: null,
            email: null,
            wallet: 1000,
            premiumWallet: 10,
            loggedIn: false
    },

    player: {
        baseSpeed: 2.5,
        collider: { radius: 20 }
    },

    bullet: {
        baseSpeed: 15,
        baseDamage: 10,
        collider: { radius: 3 },
        deathTime: 24 //at 24 fps
    },

    aws: {
    }
}
