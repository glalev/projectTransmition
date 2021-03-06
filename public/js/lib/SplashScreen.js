(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.buttonInner = Container.extend(function () {
        Container.call(this);
        var instance2 = new Sprite(fromFrame("buttonPlatform"));
        var instance1 = new Sprite(fromFrame("normal"))
            .setTransform(470, 38);
        this.addChild(instance2, instance1);
    });

    lib.button = Container.extend(function () {
        Container.call(this);
        var instance1 = new lib.buttonInner();
        this[instance1.name = "button"] = instance1;
        this.addChild(instance1);
    });

    lib.splashImage = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("info"))
            .setTransform(0, 0, 0.66, 0.66);
        this.addChild(instance1);
    });

    lib.stars = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("stars"))
            .setTransform(0, 0, 0.856, 0.856);
        this.addChild(instance1);
    });

    lib.splashScreen = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 775,
            labels: {
                init: 0,
                show: 15,
                hide: 755
            }
        });
        var instance4 = new Graphics()
            .drawCommands(shapes.SplashScreen[0]);
        var instance3 = new lib.stars();
        var instance2 = new lib.splashImage();
        var instance1 = new lib.button();
        this[instance1.name = "buttonContainer"] = instance1;
        this.addTimedChild(instance4)
            .addTimedChild(instance3, 0, 775, {
                "0": {
                    x: -3.95,
                    y: 17,
                    a: 0
                },
                "16": {
                    a: 0.01
                },
                "17": {
                    a: 0.02
                },
                "18": {
                    a: 0.04
                },
                "19": {
                    a: 0.05
                },
                "21": {
                    a: 0.07
                },
                "22": {
                    a: 0.08
                },
                "23": {
                    a: 0.09
                },
                "24": {
                    a: 0.1
                },
                "25": {
                    a: 0.11
                },
                "26": {
                    a: 0.13
                },
                "27": {
                    a: 0.14
                },
                "29": {
                    a: 0.16
                },
                "30": {
                    a: 0.17
                },
                "31": {
                    a: 0.18
                },
                "32": {
                    a: 0.19
                },
                "33": {
                    a: 0.2
                },
                "34": {
                    a: 0.21
                },
                "35": {
                    a: 0.23
                },
                "37": {
                    a: 0.25
                },
                "38": {
                    a: 0.26
                },
                "39": {
                    a: 0.27
                },
                "40": {
                    a: 0.28
                },
                "41": {
                    a: 0.29
                },
                "42": {
                    a: 0.3
                },
                "43": {
                    a: 0.32
                },
                "45": {
                    a: 0.34
                },
                "46": {
                    a: 0.35
                },
                "47": {
                    a: 0.36
                },
                "48": {
                    a: 0.37
                },
                "49": {
                    a: 0.38
                },
                "50": {
                    a: 0.39
                },
                "51": {
                    a: 0.41
                },
                "53": {
                    a: 0.43
                },
                "54": {
                    a: 0.44
                },
                "55": {
                    a: 0.45
                },
                "56": {
                    a: 0.46
                },
                "57": {
                    a: 0.47
                },
                "58": {
                    a: 0.48
                },
                "59": {
                    a: 0.5
                },
                "61": {
                    a: 0.52
                },
                "62": {
                    a: 0.53
                },
                "63": {
                    a: 0.54
                },
                "64": {
                    a: 0.55
                },
                "65": {
                    a: 0.56
                },
                "66": {
                    a: 0.57
                },
                "67": {
                    a: 0.59
                },
                "69": {
                    a: 0.61
                },
                "70": {
                    a: 0.62
                },
                "71": {
                    a: 0.63
                },
                "72": {
                    a: 0.64
                },
                "73": {
                    a: 0.65
                },
                "74": {
                    a: 0.66
                },
                "75": {
                    a: 0.68
                },
                "77": {
                    a: 0.7
                },
                "78": {
                    a: 0.71
                },
                "79": {
                    a: 0.72
                },
                "80": {
                    a: 0.73
                },
                "81": {
                    a: 0.74
                },
                "82": {
                    a: 0.75
                },
                "83": {
                    a: 0.77
                },
                "85": {
                    a: 0.79
                },
                "86": {
                    a: 0.8
                },
                "87": {
                    a: 0.81
                },
                "88": {
                    a: 0.82
                },
                "89": {
                    a: 0.83
                },
                "90": {
                    a: 0.84
                },
                "91": {
                    a: 0.86
                },
                "93": {
                    a: 0.88
                },
                "94": {
                    a: 0.89
                },
                "95": {
                    a: 0.9
                },
                "96": {
                    a: 0.91
                },
                "97": {
                    a: 0.92
                },
                "98": {
                    a: 0.93
                },
                "99": {
                    a: 0.95
                },
                "101": {
                    a: 0.96
                },
                "102": {
                    a: 0.98
                },
                "103": {
                    a: 0.99
                },
                "104": {
                    a: 1
                },
                "756": {
                    a: 0.95
                },
                "757": {
                    a: 0.89
                },
                "758": {
                    a: 0.84
                },
                "759": {
                    a: 0.79
                },
                "760": {
                    a: 0.74
                },
                "761": {
                    a: 0.68
                },
                "762": {
                    a: 0.63
                },
                "763": {
                    a: 0.58
                },
                "764": {
                    a: 0.53
                },
                "765": {
                    a: 0.47
                },
                "766": {
                    a: 0.42
                },
                "767": {
                    a: 0.37
                },
                "768": {
                    a: 0.32
                },
                "769": {
                    a: 0.26
                },
                "770": {
                    a: 0.21
                },
                "771": {
                    a: 0.16
                },
                "772": {
                    a: 0.11
                },
                "773": {
                    a: 0.05
                },
                "774": {
                    a: 0
                }
            })
            .addTimedChild(instance2, 0, 775, {
                "0": {
                    x: 11,
                    y: 8,
                    a: 0
                },
                "45": {
                    a: 0.01
                },
                "46": {
                    a: 0.02
                },
                "47": {
                    a: 0.04
                },
                "49": {
                    a: 0.05
                },
                "50": {
                    a: 0.07
                },
                "51": {
                    a: 0.08
                },
                "52": {
                    a: 0.09
                },
                "53": {
                    a: 0.1
                },
                "54": {
                    a: 0.11
                },
                "55": {
                    a: 0.12
                },
                "56": {
                    a: 0.13
                },
                "57": {
                    a: 0.14
                },
                "58": {
                    a: 0.16
                },
                "59": {
                    a: 0.17
                },
                "60": {
                    a: 0.18
                },
                "61": {
                    a: 0.19
                },
                "62": {
                    a: 0.2
                },
                "63": {
                    a: 0.21
                },
                "64": {
                    a: 0.22
                },
                "65": {
                    a: 0.23
                },
                "66": {
                    a: 0.25
                },
                "68": {
                    a: 0.27
                },
                "69": {
                    a: 0.28
                },
                "70": {
                    a: 0.29
                },
                "71": {
                    a: 0.3
                },
                "72": {
                    a: 0.31
                },
                "73": {
                    a: 0.32
                },
                "74": {
                    a: 0.33
                },
                "75": {
                    a: 0.34
                },
                "76": {
                    a: 0.36
                },
                "77": {
                    a: 0.37
                },
                "78": {
                    a: 0.38
                },
                "79": {
                    a: 0.39
                },
                "80": {
                    a: 0.4
                },
                "81": {
                    a: 0.41
                },
                "82": {
                    a: 0.42
                },
                "83": {
                    a: 0.43
                },
                "84": {
                    a: 0.45
                },
                "85": {
                    a: 0.46
                },
                "87": {
                    a: 0.48
                },
                "88": {
                    a: 0.49
                },
                "89": {
                    a: 0.5
                },
                "90": {
                    a: 0.51
                },
                "91": {
                    a: 0.52
                },
                "92": {
                    a: 0.54
                },
                "94": {
                    a: 0.55
                },
                "95": {
                    a: 0.57
                },
                "96": {
                    a: 0.58
                },
                "97": {
                    a: 0.59
                },
                "98": {
                    a: 0.6
                },
                "99": {
                    a: 0.61
                },
                "100": {
                    a: 0.62
                },
                "101": {
                    a: 0.63
                },
                "102": {
                    a: 0.64
                },
                "103": {
                    a: 0.66
                },
                "104": {
                    a: 0.67
                },
                "105": {
                    a: 0.68
                },
                "106": {
                    a: 0.69
                },
                "107": {
                    a: 0.7
                },
                "108": {
                    a: 0.71
                },
                "109": {
                    a: 0.72
                },
                "110": {
                    a: 0.73
                },
                "111": {
                    a: 0.75
                },
                "113": {
                    a: 0.77
                },
                "114": {
                    a: 0.78
                },
                "115": {
                    a: 0.79
                },
                "116": {
                    a: 0.8
                },
                "117": {
                    a: 0.81
                },
                "118": {
                    a: 0.82
                },
                "119": {
                    a: 0.83
                },
                "120": {
                    a: 0.84
                },
                "121": {
                    a: 0.86
                },
                "122": {
                    a: 0.87
                },
                "123": {
                    a: 0.88
                },
                "124": {
                    a: 0.89
                },
                "125": {
                    a: 0.9
                },
                "126": {
                    a: 0.91
                },
                "127": {
                    a: 0.92
                },
                "128": {
                    a: 0.93
                },
                "129": {
                    a: 0.95
                },
                "130": {
                    a: 0.96
                },
                "132": {
                    a: 0.98
                },
                "133": {
                    a: 0.99
                },
                "134": {
                    a: 1
                },
                "635": {
                    a: 0.99
                },
                "636": {
                    a: 0.98
                },
                "637": {
                    a: 0.97
                },
                "638": {
                    a: 0.96
                },
                "639": {
                    a: 0.95
                },
                "640": {
                    a: 0.93
                },
                "642": {
                    a: 0.91
                },
                "643": {
                    a: 0.9
                },
                "644": {
                    a: 0.89
                },
                "645": {
                    a: 0.88
                },
                "646": {
                    a: 0.87
                },
                "647": {
                    a: 0.86
                },
                "648": {
                    a: 0.85
                },
                "649": {
                    a: 0.84
                },
                "650": {
                    a: 0.83
                },
                "651": {
                    a: 0.82
                },
                "652": {
                    a: 0.8
                },
                "653": {
                    a: 0.79
                },
                "655": {
                    a: 0.77
                },
                "656": {
                    a: 0.76
                },
                "657": {
                    a: 0.75
                },
                "658": {
                    a: 0.74
                },
                "659": {
                    a: 0.73
                },
                "660": {
                    a: 0.72
                },
                "661": {
                    a: 0.71
                },
                "662": {
                    a: 0.7
                },
                "663": {
                    a: 0.69
                },
                "664": {
                    a: 0.68
                },
                "665": {
                    a: 0.66
                },
                "666": {
                    a: 0.65
                },
                "667": {
                    a: 0.64
                },
                "668": {
                    a: 0.63
                },
                "669": {
                    a: 0.62
                },
                "670": {
                    a: 0.61
                },
                "671": {
                    a: 0.6
                },
                "672": {
                    a: 0.59
                },
                "673": {
                    a: 0.58
                },
                "674": {
                    a: 0.57
                },
                "675": {
                    a: 0.56
                },
                "676": {
                    a: 0.55
                },
                "677": {
                    a: 0.54
                },
                "678": {
                    a: 0.52
                },
                "680": {
                    a: 0.5
                },
                "681": {
                    a: 0.49
                },
                "682": {
                    a: 0.48
                },
                "683": {
                    a: 0.47
                },
                "684": {
                    a: 0.46
                },
                "685": {
                    a: 0.45
                },
                "686": {
                    a: 0.44
                },
                "687": {
                    a: 0.43
                },
                "688": {
                    a: 0.42
                },
                "689": {
                    a: 0.41
                },
                "690": {
                    a: 0.39
                },
                "691": {
                    a: 0.38
                },
                "693": {
                    a: 0.36
                },
                "694": {
                    a: 0.35
                },
                "756": {
                    a: 0.33
                },
                "757": {
                    a: 0.32
                },
                "758": {
                    a: 0.3
                },
                "759": {
                    a: 0.28
                },
                "760": {
                    a: 0.26
                },
                "761": {
                    a: 0.24
                },
                "762": {
                    a: 0.22
                },
                "763": {
                    a: 0.2
                },
                "764": {
                    a: 0.18
                },
                "765": {
                    a: 0.17
                },
                "766": {
                    a: 0.15
                },
                "767": {
                    a: 0.13
                },
                "768": {
                    a: 0.11
                },
                "769": {
                    a: 0.09
                },
                "770": {
                    a: 0.07
                },
                "771": {
                    a: 0.05
                },
                "772": {
                    a: 0.04
                },
                "773": {
                    a: 0.02
                },
                "774": {
                    a: 0
                }
            })
            .addTimedChild(instance1, 0, 775, {
                "0": {
                    x: -7.95,
                    y: 1088.3,
                    sx: 1.516,
                    sy: 1.516,
                    a: 0
                },
                "554": {
                    a: 1
                },
                "555": {
                    y: 1086.933
                },
                "556": {
                    y: 1085.383
                },
                "557": {
                    y: 1083.733
                },
                "558": {
                    y: 1081.983
                },
                "559": {
                    y: 1080.083
                },
                "560": {
                    y: 1078.083
                },
                "561": {
                    y: 1075.983
                },
                "562": {
                    y: 1073.683
                },
                "563": {
                    y: 1071.333
                },
                "564": {
                    y: 1068.833
                },
                "565": {
                    x: -8,
                    y: 1066.233
                },
                "566": {
                    y: 1063.433
                },
                "567": {
                    y: 1060.583
                },
                "568": {
                    y: 1057.533
                },
                "569": {
                    y: 1054.383
                },
                "570": {
                    y: 1051.083
                },
                "571": {
                    y: 1047.633
                },
                "572": {
                    y: 1044.033
                },
                "573": {
                    y: 1040.283
                },
                "574": {
                    y: 1036.383
                },
                "575": {
                    y: 1032.333
                },
                "576": {
                    y: 1028.133
                },
                "577": {
                    y: 1023.733
                },
                "578": {
                    x: -8.05,
                    y: 1019.233
                },
                "579": {
                    y: 1014.533
                },
                "580": {
                    y: 1009.683
                },
                "581": {
                    y: 1004.683
                },
                "582": {
                    y: 999.483
                },
                "583": {
                    y: 994.133
                },
                "584": {
                    y: 988.583
                },
                "585": {
                    y: 982.883
                },
                "586": {
                    x: -8.1,
                    y: 976.983
                },
                "587": {
                    y: 970.933
                },
                "588": {
                    y: 964.683
                },
                "589": {
                    y: 958.283
                },
                "590": {
                    y: 951.683
                },
                "591": {
                    y: 944.833
                },
                "592": {
                    y: 937.883
                },
                "593": {
                    x: -8.15,
                    y: 930.733
                },
                "594": {
                    y: 923.383
                },
                "595": {
                    y: 915.833
                },
                "596": {
                    y: 908.083
                },
                "597": {
                    y: 900.183
                },
                "598": {
                    x: -8.2,
                    y: 892.033
                },
                "599": {
                    y: 883.783
                },
                "600": {
                    y: 875.283
                },
                "601": {
                    y: 866.633
                },
                "602": {
                    y: 857.783
                },
                "603": {
                    x: -8.25,
                    y: 848.783
                },
                "604": {
                    y: 839.583
                },
                "605": {
                    y: 830.233
                },
                "606": {
                    y: 820.683
                },
                "607": {
                    y: 811.033
                },
                "608": {
                    x: -8.3,
                    y: 801.183
                },
                "609": {
                    y: 791.183
                },
                "610": {
                    y: 781.033
                },
                "611": {
                    y: 770.783
                },
                "612": {
                    x: -8.35,
                    y: 760.383
                },
                "613": {
                    y: 749.833
                },
                "614": {
                    y: 739.233
                },
                "615": {
                    y: 728.483
                },
                "616": {
                    x: -8.4,
                    y: 717.633
                },
                "617": {
                    y: 706.733
                },
                "618": {
                    y: 695.783
                },
                "619": {
                    y: 684.733
                },
                "620": {
                    x: -8.45,
                    y: 673.633
                },
                "621": {
                    y: 662.483
                },
                "622": {
                    y: 651.333
                },
                "623": {
                    y: 640.133
                },
                "624": {
                    x: -8.5,
                    y: 628.983
                },
                "625": {
                    y: 617.783
                },
                "626": {
                    y: 606.633
                },
                "627": {
                    y: 595.533
                },
                "628": {
                    x: -8.55,
                    y: 584.483
                },
                "629": {
                    y: 573.433
                },
                "630": {
                    y: 562.483
                },
                "631": {
                    y: 551.633
                },
                "632": {
                    x: -8.6,
                    y: 540.833
                },
                "633": {
                    y: 530.133
                },
                "634": {
                    y: 519.583
                },
                "635": {
                    y: 509.133
                },
                "636": {
                    x: -8.65,
                    y: 498.783
                },
                "637": {
                    y: 488.583
                },
                "638": {
                    y: 478.483
                },
                "639": {
                    y: 468.583
                },
                "640": {
                    x: -8.7,
                    y: 458.783
                },
                "641": {
                    y: 449.133
                },
                "642": {
                    y: 439.683
                },
                "643": {
                    y: 430.433
                },
                "644": {
                    y: 421.283
                },
                "645": {
                    x: -8.75,
                    y: 412.333
                },
                "646": {
                    y: 403.583
                },
                "647": {
                    y: 394.983
                },
                "648": {
                    y: 386.583
                },
                "649": {
                    y: 378.333
                },
                "650": {
                    x: -8.8,
                    y: 370.283
                },
                "651": {
                    y: 362.433
                },
                "652": {
                    y: 354.783
                },
                "653": {
                    y: 347.283
                },
                "654": {
                    y: 339.983
                },
                "655": {
                    y: 332.833
                },
                "656": {
                    x: -8.85,
                    y: 325.883
                },
                "657": {
                    y: 319.133
                },
                "658": {
                    y: 312.583
                },
                "659": {
                    y: 306.133
                },
                "660": {
                    y: 299.933
                },
                "661": {
                    y: 293.883
                },
                "662": {
                    y: 288.033
                },
                "663": {
                    x: -8.9,
                    y: 282.333
                },
                "664": {
                    y: 276.833
                },
                "665": {
                    y: 271.483
                },
                "666": {
                    y: 266.283
                },
                "667": {
                    y: 261.283
                },
                "668": {
                    y: 256.433
                },
                "669": {
                    y: 251.733
                },
                "670": {
                    y: 247.183
                },
                "671": {
                    x: -8.95,
                    y: 242.783
                },
                "672": {
                    y: 238.583
                },
                "673": {
                    y: 234.483
                },
                "674": {
                    y: 230.583
                },
                "675": {
                    y: 226.833
                },
                "676": {
                    y: 223.183
                },
                "677": {
                    y: 219.683
                },
                "678": {
                    y: 216.333
                },
                "679": {
                    y: 213.133
                },
                "680": {
                    y: 210.033
                },
                "681": {
                    y: 207.133
                },
                "682": {
                    y: 204.283
                },
                "683": {
                    y: 201.633
                },
                "684": {
                    x: -9,
                    y: 199.083
                },
                "685": {
                    y: 196.633
                },
                "686": {
                    y: 194.333
                },
                "687": {
                    y: 192.133
                },
                "688": {
                    y: 190.083
                },
                "689": {
                    y: 188.133
                },
                "690": {
                    y: 186.283
                },
                "691": {
                    y: 184.583
                },
                "692": {
                    y: 182.933
                },
                "693": {
                    y: 181.433
                },
                "694": {
                    y: 180
                },
                "695": {
                    x: -8.95,
                    y: 180.197
                },
                "696": {
                    y: 180.397
                },
                "697": {
                    y: 180.597
                },
                "698": {
                    y: 180.847
                },
                "699": {
                    y: 181.097
                },
                "700": {
                    y: 181.397
                },
                "701": {
                    y: 181.747
                },
                "702": {
                    y: 182.097
                },
                "703": {
                    y: 182.497
                },
                "704": {
                    y: 182.947
                },
                "705": {
                    y: 183.447
                },
                "706": {
                    y: 183.947
                },
                "707": {
                    y: 184.547
                },
                "708": {
                    y: 185.147
                },
                "709": {
                    y: 185.797
                },
                "710": {
                    y: 186.447
                },
                "711": {
                    y: 187.197
                },
                "712": {
                    y: 187.997
                },
                "713": {
                    y: 188.797
                },
                "714": {
                    y: 189.697
                },
                "715": {
                    y: 190.597
                },
                "716": {
                    y: 191.547
                },
                "717": {
                    y: 192.547
                },
                "718": {
                    y: 193.597
                },
                "719": {
                    y: 194.647
                },
                "720": {
                    y: 195.747
                },
                "721": {
                    y: 196.847
                },
                "722": {
                    y: 197.997
                },
                "723": {
                    y: 199.147
                },
                "724": {
                    y: 200.297
                },
                "725": {
                    y: 201.447
                },
                "726": {
                    y: 202.547
                },
                "727": {
                    y: 203.697
                },
                "728": {
                    y: 204.797
                },
                "729": {
                    y: 205.847
                },
                "730": {
                    y: 206.897
                },
                "731": {
                    y: 207.897
                },
                "732": {
                    y: 208.897
                },
                "733": {
                    y: 209.797
                },
                "734": {
                    y: 210.697
                },
                "735": {
                    y: 211.547
                },
                "736": {
                    y: 212.347
                },
                "737": {
                    y: 213.097
                },
                "738": {
                    y: 213.847
                },
                "739": {
                    y: 214.497
                },
                "740": {
                    y: 215.097
                },
                "741": {
                    y: 215.697
                },
                "742": {
                    y: 216.247
                },
                "743": {
                    y: 216.747
                },
                "744": {
                    y: 217.197
                },
                "745": {
                    y: 217.647
                },
                "746": {
                    y: 218.047
                },
                "747": {
                    y: 218.397
                },
                "748": {
                    y: 218.747
                },
                "749": {
                    y: 218.997
                },
                "750": {
                    y: 219.297
                },
                "751": {
                    y: 219.497
                },
                "752": {
                    y: 219.697
                },
                "753": {
                    y: 219.897
                },
                "754": {
                    x: -9,
                    y: 220
                },
                "756": {
                    x: -8.95,
                    y: 219.997,
                    a: 0.95
                },
                "757": {
                    a: 0.89
                },
                "758": {
                    a: 0.84
                },
                "759": {
                    a: 0.79
                },
                "760": {
                    a: 0.74
                },
                "761": {
                    a: 0.68
                },
                "762": {
                    a: 0.63
                },
                "763": {
                    a: 0.58
                },
                "764": {
                    a: 0.53
                },
                "765": {
                    a: 0.47
                },
                "766": {
                    a: 0.42
                },
                "767": {
                    a: 0.37
                },
                "768": {
                    a: 0.32
                },
                "769": {
                    a: 0.26
                },
                "770": {
                    a: 0.21
                },
                "771": {
                    a: 0.16
                },
                "772": {
                    a: 0.11
                },
                "773": {
                    a: 0.05
                },
                "774": {
                    x: -9,
                    y: 220,
                    a: 0
                }
            })
            .addAction(function () {
                this.stop();
            }, 14)
            .addAction(function () {
                this.stop();
                this.emit('SHOW_END');
            }, 754)
            .addAction(function () {
                this.stop();
                this.emit('HIDE_END');
            }, 774);
    });

    lib.SplashScreen = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 60
        });
        var instance1 = new lib.splashScreen()
            .setTransform(17.25, 17.3, 0.66, 0.66);
        this[instance1.name = "splash"] = instance1;
        this.addChild(instance1);
    });

    lib.SplashScreen.assets = {
        "normal": "../../assets/images/normal.png",
        "buttonPlatform": "../../assets/images/buttonPlatform.png",
        "info": "../../assets/images/info.png",
        "stars": "../../assets/images/stars.png",
        "SplashScreen": "../../assets/images/SplashScreen.shapes.txt"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.SplashScreen,
        background: 0x666666,
        width: 1920,
        height: 1080,
        framerate: 60,
        totalFrames: 1,
        library: lib
    };
}