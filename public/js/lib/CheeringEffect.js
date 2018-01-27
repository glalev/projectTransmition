(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.allWords = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 9
        });
        var instance1 = new Sprite(fromFrame("word1"));
        var instance2 = new Sprite(fromFrame("word2"));
        var instance3 = new Sprite(fromFrame("word3"));
        var instance4 = new Sprite(fromFrame("word4"));
        var instance5 = new Sprite(fromFrame("word5"));
        var instance6 = new Sprite(fromFrame("word6"));
        var instance7 = new Sprite(fromFrame("word7"));
        var instance8 = new Sprite(fromFrame("word8"));
        var instance9 = new Sprite(fromFrame("word9"))
            .setTransform(-209.75, -46.85);
        this.addTimedChild(instance1, 0, 1, {
                "0": {
                    x: -260.35,
                    y: -48.1
                }
            })
            .addTimedChild(instance2, 1, 1, {
                "1": {
                    x: -130.65,
                    y: -48.3
                }
            })
            .addTimedChild(instance3, 2, 1, {
                "2": {
                    x: -281.45,
                    y: -43.25
                }
            })
            .addTimedChild(instance4, 3, 1, {
                "3": {
                    x: -389,
                    y: -45.25
                }
            })
            .addTimedChild(instance5, 4, 1, {
                "4": {
                    x: -420.65,
                    y: -45.25
                }
            })
            .addTimedChild(instance6, 5, 1, {
                "5": {
                    x: -193.35,
                    y: -43.3
                }
            })
            .addTimedChild(instance7, 6, 1, {
                "6": {
                    x: -199.25,
                    y: -45.3
                }
            })
            .addTimedChild(instance8, 7, 1, {
                "7": {
                    x: -315.45,
                    y: -42.7
                }
            })
            .addTimedChild(instance9, 8, 1)
            .addAction(function () {
                this.stop();
            }, 0)
            .addAction(function () {
                this.stop();
            }, 1)
            .addAction(function () {
                this.stop();
            }, 2)
            .addAction(function () {
                this.stop();
            }, 3)
            .addAction(function () {
                this.stop();
            }, 4)
            .addAction(function () {
                this.stop();
            }, 5)
            .addAction(function () {
                this.stop();
            }, 6)
            .addAction(function () {
                this.stop();
            }, 7)
            .addAction(function () {
                this.stop();
            }, 8);
    });

    lib.whiteWordsEffect = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("whiteWordsEffect"));
        this.addChild(instance1);
    });

    lib.cheeringEffect = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 94,
            labels: {
                init: 0,
                show: 9
            }
        });
        var instance2 = new lib.whiteWordsEffect();
        var instance1 = new lib.allWords();
        this[instance1.name = "text"] = instance1;
        this.addTimedChild(instance2, 0, 30, {
                "0": {
                    x: 883.3,
                    y: 357.4,
                    sx: 0.18,
                    sy: 0.082,
                    a: 0
                },
                "9": {
                    a: 1
                },
                "10": {
                    x: 872.313,
                    y: 357.401,
                    sx: 0.205
                },
                "11": {
                    x: 839.282,
                    y: 357.292,
                    sx: 0.281,
                    sy: 0.085
                },
                "12": {
                    x: 784.188,
                    y: 357.125,
                    sx: 0.408,
                    sy: 0.088
                },
                "13": {
                    x: 707.051,
                    y: 356.853,
                    sx: 0.585,
                    sy: 0.093
                },
                "14": {
                    x: 607.9,
                    y: 356.5,
                    sx: 0.813,
                    sy: 0.1
                },
                "15": {
                    x: 586.411,
                    y: 344.809,
                    sx: 0.863,
                    sy: 0.339
                },
                "16": {
                    x: 568.194,
                    y: 334.898,
                    sx: 0.905,
                    sy: 0.541
                },
                "17": {
                    x: 553.264,
                    y: 326.799,
                    sx: 0.939,
                    sy: 0.706
                },
                "18": {
                    x: 541.657,
                    y: 320.526,
                    sx: 0.966,
                    sy: 0.835
                },
                "19": {
                    x: 533.386,
                    y: 316.019,
                    sx: 0.985,
                    sy: 0.927
                },
                "20": {
                    x: 528.429,
                    y: 313.292,
                    sx: 0.996,
                    sy: 0.982
                },
                "21": {
                    x: 526.75,
                    y: 312.4,
                    sx: 1,
                    sy: 1
                },
                "22": {
                    a: 0.88
                },
                "23": {
                    a: 0.75
                },
                "24": {
                    a: 0.63
                },
                "25": {
                    a: 0.5
                },
                "26": {
                    a: 0.38
                },
                "27": {
                    a: 0.25
                },
                "28": {
                    a: 0.13
                },
                "29": {
                    a: 0
                }
            })
            .addTimedChild(instance1, 0, 94, {
                "0": {
                    x: 957.8,
                    y: 365.65,
                    sx: 0.465,
                    sy: 0.166,
                    a: 0
                },
                "14": {
                    a: 1
                },
                "15": {
                    x: 957.853,
                    y: 365.67,
                    sx: 0.566,
                    sy: 0.325
                },
                "16": {
                    x: 957.814,
                    y: 365.661,
                    sx: 0.657,
                    sy: 0.466
                },
                "17": {
                    x: 957.8,
                    y: 365.702,
                    sx: 0.738,
                    sy: 0.592
                },
                "18": {
                    x: 957.839,
                    y: 365.691,
                    sx: 0.807,
                    sy: 0.7
                },
                "19": {
                    x: 957.809,
                    y: 365.702,
                    sx: 0.866,
                    sy: 0.792
                },
                "20": {
                    x: 957.861,
                    y: 365.684,
                    sx: 0.914,
                    sy: 0.867
                },
                "21": {
                    x: 957.815,
                    y: 365.66,
                    sx: 0.952,
                    sy: 0.925
                },
                "22": {
                    x: 957.83,
                    y: 365.656,
                    sx: 0.979,
                    sy: 0.967
                },
                "23": {
                    x: 957.818,
                    y: 365.691,
                    sx: 0.995,
                    sy: 0.992
                },
                "24": {
                    x: 957.8,
                    y: 365.65,
                    sx: 1,
                    sy: 1
                },
                "89": {
                    x: 957.841,
                    y: 365.676,
                    sx: 1.009,
                    sy: 0.967,
                    a: 0.96
                },
                "90": {
                    x: 957.815,
                    y: 365.692,
                    sx: 1.035,
                    sy: 0.867,
                    a: 0.84
                },
                "91": {
                    x: 957.836,
                    y: 365.693,
                    sx: 1.08,
                    sy: 0.7,
                    a: 0.64
                },
                "92": {
                    x: 957.889,
                    y: 365.651,
                    sx: 1.142,
                    sy: 0.467,
                    a: 0.36
                },
                "93": {
                    x: 957.8,
                    y: 365.65,
                    sx: 1.222,
                    sy: 0.167,
                    a: 0
                }
            })
            .addAction(function () {
                this.stop();
            }, 93);
    });

    lib.CheeringEffect = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 60
        });
        var instance1 = new lib.cheeringEffect();
        this.addChild(instance1);
    });

    lib.CheeringEffect.assets = {
        "word1": "../../assets/images/word1.png",
        "word2": "../../assets/images/word2.png",
        "word3": "../../assets/images/word3.png",
        "word4": "../../assets/images/word4.png",
        "word5": "../../assets/images/word5.png",
        "word6": "../../assets/images/word6.png",
        "word7": "../../assets/images/word7.png",
        "word8": "../../assets/images/word8.png",
        "word9": "../../assets/images/word9.png",
        "whiteWordsEffect": "../../assets/images/whiteWordsEffect.png"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.CheeringEffect,
        background: 0x666666,
        width: 1920,
        height: 1080,
        framerate: 60,
        totalFrames: 1,
        library: lib
    };
}