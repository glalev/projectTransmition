(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.goLabel = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.PlayText[0]);
        this.addChild(instance1);
    });

    lib.readyLabel = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.PlayText[1]);
        this.addChild(instance1);
    });

    lib.whiteProgress = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("whiteProgress"));
        this.addChild(instance1);
    });

    lib.labels = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 98,
            labels: {
                init: 0,
                show: 9,
                hide: 54
            }
        });
        var instance3 = new lib.whiteProgress();
        var instance2 = new lib.readyLabel();
        var instance1 = new lib.goLabel();
        this.addTimedChild(instance3, 0, 98, {
                "0": {
                    x: 121.3,
                    y: 211.2,
                    sx: 0.025,
                    sy: 1.049,
                    r: -1.571,
                    a: 0
                },
                "10": {
                    x: 99.166,
                    y: 211.247,
                    sy: 1.497,
                    a: 0.21
                },
                "11": {
                    x: 79.673,
                    sy: 1.893,
                    a: 0.39
                },
                "12": {
                    x: 62.769,
                    sy: 2.237,
                    a: 0.55
                },
                "13": {
                    x: 48.467,
                    sy: 2.527,
                    a: 0.69
                },
                "14": {
                    x: 36.754,
                    sy: 2.765,
                    a: 0.8
                },
                "15": {
                    x: 27.628,
                    sy: 2.949,
                    a: 0.89
                },
                "16": {
                    x: 21.196,
                    sy: 3.081,
                    a: 0.95
                },
                "17": {
                    x: 17.26,
                    sy: 3.161,
                    a: 0.99
                },
                "18": {
                    x: 15.7,
                    y: 211.2,
                    sy: 3.187,
                    a: 1
                },
                "19": {
                    y: 241.797,
                    sx: 0.095
                },
                "20": {
                    y: 269.13,
                    sx: 0.157
                },
                "21": {
                    x: 15.75,
                    y: 293.275,
                    sx: 0.213
                },
                "22": {
                    y: 314.208,
                    sx: 0.26
                },
                "23": {
                    y: 331.909,
                    sx: 0.301
                },
                "24": {
                    x: 15.8,
                    y: 346.365,
                    sx: 0.334
                },
                "25": {
                    y: 357.631,
                    sx: 0.36
                },
                "26": {
                    y: 365.668,
                    sx: 0.378
                },
                "27": {
                    y: 370.51,
                    sx: 0.389
                },
                "28": {
                    x: 15.7,
                    y: 371.15,
                    sx: 0.393
                },
                "29": {
                    x: 15.8,
                    y: 371.144
                },
                "30": {
                    a: 0.99
                },
                "31": {
                    a: 0.98
                },
                "32": {
                    a: 0.96
                },
                "33": {
                    a: 0.94
                },
                "34": {
                    a: 0.91
                },
                "35": {
                    a: 0.88
                },
                "36": {
                    a: 0.84
                },
                "37": {
                    a: 0.8
                },
                "38": {
                    a: 0.75
                },
                "39": {
                    a: 0.7
                },
                "40": {
                    a: 0.64
                },
                "41": {
                    a: 0.58
                },
                "42": {
                    a: 0.51
                },
                "43": {
                    a: 0.44
                },
                "44": {
                    a: 0.36
                },
                "45": {
                    a: 0.28
                },
                "46": {
                    a: 0.19
                },
                "47": {
                    a: 0.1
                },
                "48": {
                    x: 15.7,
                    y: 371.15,
                    a: 0
                }
            })
            .addTimedChild(instance2, 0, 98, {
                "0": {
                    x: 108.35,
                    y: 194.85,
                    sx: 0.456,
                    sy: 0.194,
                    a: 0
                },
                "19": {
                    x: 97.792,
                    y: 190.491,
                    sx: 0.526,
                    sy: 0.298,
                    a: 0.13
                },
                "20": {
                    x: 87.985,
                    y: 186.391,
                    sx: 0.592,
                    sy: 0.395,
                    a: 0.25
                },
                "21": {
                    x: 78.831,
                    y: 182.616,
                    sx: 0.652,
                    sy: 0.484,
                    a: 0.36
                },
                "22": {
                    x: 70.48,
                    y: 179.149,
                    sx: 0.708,
                    sy: 0.567,
                    a: 0.46
                },
                "23": {
                    x: 62.78,
                    y: 175.954,
                    sx: 0.758,
                    sy: 0.642,
                    a: 0.55
                },
                "24": {
                    x: 55.836,
                    y: 173.083,
                    sx: 0.804,
                    sy: 0.71,
                    a: 0.64
                },
                "25": {
                    x: 49.641,
                    y: 170.522,
                    sx: 0.845,
                    sy: 0.771,
                    a: 0.71
                },
                "26": {
                    x: 44.149,
                    y: 168.249,
                    sx: 0.882,
                    sy: 0.825,
                    a: 0.78
                },
                "27": {
                    x: 39.411,
                    y: 166.284,
                    sx: 0.913,
                    sy: 0.871,
                    a: 0.84
                },
                "28": {
                    x: 35.423,
                    y: 164.626,
                    sx: 0.94,
                    sy: 0.91,
                    a: 0.89
                },
                "29": {
                    x: 32.136,
                    y: 163.242,
                    sx: 0.961,
                    sy: 0.943,
                    a: 0.93
                },
                "30": {
                    x: 29.554,
                    y: 162.183,
                    sx: 0.978,
                    sy: 0.968,
                    a: 0.96
                },
                "31": {
                    x: 27.774,
                    y: 161.432,
                    sx: 0.99,
                    sy: 0.986,
                    a: 0.98
                },
                "32": {
                    x: 26.645,
                    y: 160.969,
                    sx: 0.998,
                    sy: 0.996,
                    a: 1
                },
                "33": {
                    x: 26.3,
                    y: 160.8,
                    sx: 1,
                    sy: 1
                },
                "56": {
                    x: 26.092,
                    y: 161.131,
                    sx: 1.002,
                    sy: 0.992,
                    a: 0.99
                },
                "57": {
                    x: 25.367,
                    y: 162.122,
                    sx: 1.006,
                    sy: 0.97,
                    a: 0.96
                },
                "58": {
                    x: 24.176,
                    y: 163.725,
                    sx: 1.014,
                    sy: 0.932,
                    a: 0.91
                },
                "59": {
                    x: 22.469,
                    y: 165.941,
                    sx: 1.025,
                    sy: 0.879,
                    a: 0.84
                },
                "60": {
                    x: 20.396,
                    y: 168.816,
                    sx: 1.04,
                    sy: 0.81,
                    a: 0.75
                },
                "61": {
                    x: 17.756,
                    y: 172.352,
                    sx: 1.057,
                    sy: 0.727,
                    a: 0.64
                },
                "62": {
                    x: 14.599,
                    y: 176.502,
                    sx: 1.078,
                    sy: 0.628,
                    a: 0.51
                },
                "63": {
                    x: 11.027,
                    y: 181.36,
                    sx: 1.102,
                    sy: 0.515,
                    a: 0.36
                },
                "64": {
                    x: 6.988,
                    y: 186.782,
                    sx: 1.129,
                    sy: 0.386,
                    a: 0.19
                },
                "65": {
                    x: 2.35,
                    y: 192.85,
                    sx: 1.159,
                    sy: 0.242,
                    a: 0
                }
            })
            .addTimedChild(instance1, 0, 98, {
                "0": {
                    x: -3.8,
                    y: 190.65,
                    sx: 1.316,
                    sy: 0.224,
                    a: 0
                },
                "60": {
                    a: 1
                },
                "61": {
                    x: 16.746,
                    y: 164.266,
                    sx: 1.161,
                    sy: 0.603
                },
                "62": {
                    x: 24.565,
                    y: 154.241,
                    sx: 1.103,
                    sy: 0.747
                },
                "63": {
                    x: 29.267,
                    y: 148.138,
                    sx: 1.067,
                    sy: 0.834
                },
                "64": {
                    x: 32.436,
                    y: 144.118,
                    sx: 1.044,
                    sy: 0.892
                },
                "65": {
                    x: 34.583,
                    y: 141.286,
                    sx: 1.027,
                    sy: 0.933
                },
                "66": {
                    x: 36.116,
                    y: 139.338,
                    sx: 1.016,
                    sy: 0.961
                },
                "67": {
                    x: 37.138,
                    y: 138.02,
                    sx: 1.008,
                    sy: 0.98
                },
                "68": {
                    x: 37.802,
                    y: 137.22,
                    sx: 1.003,
                    sy: 0.992
                },
                "69": {
                    x: 38.11,
                    y: 136.771,
                    sx: 1.001,
                    sy: 0.998
                },
                "70": {
                    x: 38.15,
                    y: 136.6,
                    sx: 1,
                    sy: 1
                },
                "73": {
                    a: 0.99
                },
                "74": {
                    a: 0.98
                },
                "75": {
                    a: 0.96
                },
                "76": {
                    a: 0.95
                },
                "77": {
                    a: 0.93
                },
                "78": {
                    a: 0.91
                },
                "79": {
                    a: 0.89
                },
                "80": {
                    a: 0.86
                },
                "81": {
                    a: 0.84
                },
                "82": {
                    a: 0.8
                },
                "83": {
                    a: 0.77
                },
                "84": {
                    a: 0.73
                },
                "85": {
                    a: 0.69
                },
                "86": {
                    a: 0.65
                },
                "87": {
                    a: 0.61
                },
                "88": {
                    a: 0.55
                },
                "89": {
                    a: 0.5
                },
                "90": {
                    a: 0.45
                },
                "91": {
                    a: 0.39
                },
                "92": {
                    a: 0.34
                },
                "93": {
                    a: 0.27
                },
                "94": {
                    a: 0.21
                },
                "95": {
                    a: 0.14
                },
                "96": {
                    a: 0.07
                },
                "97": {
                    a: 0
                }
            })
            .addAction(function () {
                this.stop();
            }, 8)
            .addAction(function () {
                this.stop();
                this.emit('SHOW_END');
            }, 48)
            .addAction(function () {
                this.stop();
                this.emit('HIDE_END');
            }, 97);
    });

    lib.PlayText = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 60,
            loop: false
        });
        var instance1 = new lib.labels()
            .setTransform(-15, 100, 0.8, 0.8);
        this[instance1.name = "instance"] = instance1;
        this.addChild(instance1);
    });

    lib.PlayText.assets = {
        "whiteProgress": "../../assets/images/whiteProgress.png",
        "PlayText": "../../assets/images/PlayText.shapes.txt"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.PlayText,
        background: 0x666666,
        width: 1920,
        height: 1080,
        framerate: 60,
        totalFrames: 1,
        library: lib
    };
}