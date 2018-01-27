(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.tileContainer = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.Button[0]);
        this.addChild(instance1);
    });

    lib.buttons = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 115,
            labels: {
                init: 0,
                show: 9,
                idle: 35,
                "hit100": 55,
                "hit50": 85,
                miss: 100
            }
        });
        var instance1 = new lib.tileContainer();
        this[instance1.name = "container"] = instance1;
        this.addTimedChild(instance1, 0, 115, {
                "0": {
                    x: 0,
                    sx: 1,
                    sy: 1,
                    a: 0
                },
                "9": {
                    a: 1
                },
                "10": {
                    sx: 1.013,
                    sy: 1.013
                },
                "11": {
                    sx: 1.025,
                    sy: 1.025
                },
                "12": {
                    sx: 1.036,
                    sy: 1.036
                },
                "13": {
                    sx: 1.045,
                    sy: 1.045
                },
                "14": {
                    sx: 1.052,
                    sy: 1.052
                },
                "15": {
                    sx: 1.059,
                    sy: 1.059
                },
                "16": {
                    sx: 1.064,
                    sy: 1.064
                },
                "17": {
                    sx: 1.067,
                    sy: 1.067
                },
                "18": {
                    sx: 1.069,
                    sy: 1.069
                },
                "19": {
                    sx: 1.07,
                    sy: 1.07
                },
                "20": {
                    sx: 1.061,
                    sy: 1.061
                },
                "21": {
                    sx: 1.053,
                    sy: 1.053
                },
                "22": {
                    sx: 1.045,
                    sy: 1.045
                },
                "23": {
                    sx: 1.038,
                    sy: 1.038
                },
                "24": {
                    sx: 1.031,
                    sy: 1.031
                },
                "25": {
                    sx: 1.025,
                    sy: 1.025
                },
                "26": {
                    sx: 1.02,
                    sy: 1.02
                },
                "27": {
                    sx: 1.015,
                    sy: 1.015
                },
                "28": {
                    sx: 1.011,
                    sy: 1.011
                },
                "29": {
                    sx: 1.008,
                    sy: 1.008
                },
                "30": {
                    sx: 1.005,
                    sy: 1.005
                },
                "31": {
                    sx: 1.003,
                    sy: 1.003
                },
                "32": {
                    sx: 1.001,
                    sy: 1.001
                },
                "33": {
                    sx: 1,
                    sy: 1
                },
                "36": {
                    sx: 1.001,
                    sy: 1.001
                },
                "37": {
                    sx: 1.003,
                    sy: 1.003
                },
                "38": {
                    sx: 1.007,
                    sy: 1.007
                },
                "39": {
                    sx: 1.012,
                    sy: 1.012
                },
                "40": {
                    sx: 1.018,
                    sy: 1.018
                },
                "41": {
                    sx: 1.023,
                    sy: 1.023
                },
                "42": {
                    sx: 1.027,
                    sy: 1.027
                },
                "43": {
                    sx: 1.029,
                    sy: 1.029
                },
                "44": {
                    sx: 1.03,
                    sy: 1.03
                },
                "45": {
                    sx: 1.029,
                    sy: 1.029
                },
                "46": {
                    sx: 1.027,
                    sy: 1.027
                },
                "47": {
                    sx: 1.024,
                    sy: 1.024
                },
                "48": {
                    sx: 1.02,
                    sy: 1.02
                },
                "49": {
                    sx: 1.015,
                    sy: 1.015
                },
                "50": {
                    sx: 1.01,
                    sy: 1.01
                },
                "51": {
                    sx: 1.006,
                    sy: 1.006
                },
                "52": {
                    sx: 1.003,
                    sy: 1.003
                },
                "53": {
                    sx: 1.001,
                    sy: 1.001
                },
                "54": {
                    sx: 1,
                    sy: 1
                },
                "56": {
                    x: 0.85
                },
                "57": {
                    x: 1.6
                },
                "58": {
                    x: 2.2
                },
                "59": {
                    x: 2.75
                },
                "60": {
                    x: 3.2
                },
                "61": {
                    x: 3.55
                },
                "62": {
                    x: 3.8
                },
                "63": {
                    x: 3.95
                },
                "64": {
                    x: 4
                },
                "65": {
                    x: -0.3
                },
                "66": {
                    x: -3.7
                },
                "67": {
                    x: -6.1
                },
                "68": {
                    x: -7.5
                },
                "69": {
                    x: -8
                },
                "70": {
                    x: -0.8
                },
                "71": {
                    x: 4.8
                },
                "72": {
                    x: 8.8
                },
                "73": {
                    x: 11.2
                },
                "74": {
                    x: 12
                },
                "75": {
                    x: 4.8
                },
                "76": {
                    x: -0.8
                },
                "77": {
                    x: -4.8
                },
                "78": {
                    x: -7.2
                },
                "79": {
                    x: -8
                },
                "80": {
                    x: -5.132,
                    sx: 1.054,
                    sy: 1.054,
                    a: 0.64
                },
                "81": {
                    x: -2.918,
                    sx: 1.096,
                    sy: 1.096,
                    a: 0.36
                },
                "82": {
                    x: -1.308,
                    sx: 1.126,
                    sy: 1.126,
                    a: 0.16
                },
                "83": {
                    x: -0.302,
                    sx: 1.144,
                    sy: 1.144,
                    a: 0.04
                },
                "84": {
                    x: 0,
                    sx: 1.15,
                    sy: 1.15,
                    a: 0
                },
                "85": {
                    sx: 1,
                    sy: 1,
                    a: 1
                },
                "86": {
                    sx: 1.001,
                    sy: 1.001
                },
                "87": {
                    sx: 1.003,
                    sy: 1.003,
                    a: 0.98
                },
                "88": {
                    sx: 1.007,
                    sy: 1.007,
                    a: 0.95
                },
                "89": {
                    sx: 1.012,
                    sy: 1.012,
                    a: 0.92
                },
                "90": {
                    sx: 1.019,
                    sy: 1.019,
                    a: 0.87
                },
                "91": {
                    sx: 1.028,
                    sy: 1.028,
                    a: 0.82
                },
                "92": {
                    sx: 1.037,
                    sy: 1.038,
                    a: 0.75
                },
                "93": {
                    sx: 1.049,
                    sy: 1.049,
                    a: 0.67
                },
                "94": {
                    sx: 1.062,
                    sy: 1.062,
                    a: 0.59
                },
                "95": {
                    sx: 1.077,
                    sy: 1.077,
                    a: 0.49
                },
                "96": {
                    sx: 1.093,
                    sy: 1.093,
                    a: 0.38
                },
                "97": {
                    sx: 1.11,
                    sy: 1.11,
                    a: 0.27
                },
                "98": {
                    sx: 1.129,
                    sy: 1.129,
                    a: 0.14
                },
                "99": {
                    sx: 1.15,
                    sy: 1.15,
                    a: 0
                },
                "100": {
                    sx: 1,
                    sy: 1,
                    a: 1
                },
                "101": {
                    sx: 0.986,
                    sy: 0.986,
                    a: 0.86
                },
                "102": {
                    sx: 0.973,
                    sy: 0.973,
                    a: 0.73
                },
                "103": {
                    sx: 0.962,
                    sy: 0.962,
                    a: 0.62
                },
                "104": {
                    sx: 0.951,
                    sy: 0.951,
                    a: 0.51
                },
                "105": {
                    sx: 0.941,
                    sy: 0.941,
                    a: 0.41
                },
                "106": {
                    sx: 0.933,
                    sy: 0.933,
                    a: 0.33
                },
                "107": {
                    sx: 0.925,
                    sy: 0.925,
                    a: 0.25
                },
                "108": {
                    sx: 0.918,
                    sy: 0.918,
                    a: 0.18
                },
                "109": {
                    sx: 0.913,
                    sy: 0.913,
                    a: 0.13
                },
                "110": {
                    sx: 0.908,
                    sy: 0.908,
                    a: 0.08
                },
                "111": {
                    sx: 0.905,
                    sy: 0.905,
                    a: 0.05
                },
                "112": {
                    sx: 0.902,
                    sy: 0.902,
                    a: 0.02
                },
                "113": {
                    sx: 0.9,
                    sy: 0.9,
                    a: 0
                }
            })
            .addAction(function () {
                this.stop();
                this.emit('SHOW_END');
            }, 34)
            .addAction(function () {
                this.stop();
                this.gotoAndPlay('idle');
            }, 54)
            .addAction(function () {
                this.stop();
                this.emit('HIDE_END');
            }, 84)
            .addAction(function () {
                this.stop();
                this.emit('HIDE_END');
            }, 99)
            .addAction(function () {
                this.stop();
                this.emit('HIDE_END');
            }, 114);
    });

    lib.Button = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 60
        });
        var instance1 = new lib.buttons();
        this[instance1.name = "instance"] = instance1;
        this.addChild(instance1);
    });

    lib.Button.assets = {
        "Button": "../../assets/images/Button.shapes.txt"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.Button,
        background: 0x666666,
        width: 1920,
        height: 1080,
        framerate: 60,
        totalFrames: 1,
        library: lib
    };
}