// Copyright 2011 Google Inc. All Rights Reserved.
(function() {
    var h, aa = "function" == typeof Object.create ? Object.create : function(a) {
            var b = function() {};
            b.prototype = a;
            return new b
        },
        ba;
    if ("function" == typeof Object.setPrototypeOf) ba = Object.setPrototypeOf;
    else {
        var ca;
        a: {
            var da = {
                    jd: !0
                },
                ea = {};
            try {
                ea.__proto__ = da;
                ca = ea.jd;
                break a
            } catch (a) {}
            ca = !1
        }
        ba = ca ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var fa = ba,
        ha = function(a, b) {
            a.prototype = aa(b.prototype);
            a.prototype.constructor = a;
            if (fa) fa(a, b);
            else
                for (var c in b)
                    if ("prototype" != c)
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d)
                        } else a[c] = b[c];
            a.ea = b.prototype
        },
        ka = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        },
        la = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ?
        global : this,
        ma = function() {
            ma = function() {};
            la.Symbol || (la.Symbol = na)
        },
        na = function() {
            var a = 0;
            return function(b) {
                return "jscomp_symbol_" + (b || "") + a++
            }
        }(),
        pa = function() {
            ma();
            var a = la.Symbol.iterator;
            a || (a = la.Symbol.iterator = la.Symbol("iterator"));
            "function" != typeof Array.prototype[a] && ka(Array.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return oa(this)
                }
            });
            pa = function() {}
        },
        oa = function(a) {
            var b = 0;
            return qa(function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            })
        },
        qa = function(a) {
            pa();
            a = {
                next: a
            };
            a[la.Symbol.iterator] = function() {
                return this
            };
            return a
        },
        ra = function(a) {
            pa();
            var b = a[Symbol.iterator];
            return b ? b.call(a) : oa(a)
        },
        sa = function(a) {
            if (!(a instanceof Array)) {
                a = ra(a);
                for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
                a = c
            }
            return a
        },
        ta = function(a, b) {
            if (b) {
                var c = la;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    e in c || (c[e] = {});
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ka(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
        },
        ua = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a,
                b)
        };
    ta("Object.assign", function(a) {
        return a ? a : function(a, c) {
            for (var b = 1; b < arguments.length; b++) {
                var e = arguments[b];
                if (e)
                    for (var f in e) ua(e, f) && (a[f] = e[f])
            }
            return a
        }
    });
    ta("Math.trunc", function(a) {
        return a ? a : function(a) {
            a = Number(a);
            if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
            var b = Math.floor(Math.abs(a));
            return 0 > a ? -b : b
        }
    });
    ta("Array.prototype.fill", function(a) {
        return a ? a : function(a, c, d) {
            var b = this.length || 0;
            0 > c && (c = Math.max(0, b + c));
            if (null == d || d > b) d = b;
            d = Number(d);
            0 > d && (d = Math.max(0, b + d));
            for (c = Number(c || 0); c < d; c++) this[c] = a;
            return this
        }
    });
    ta("WeakMap", function(a) {
        function b(a) {
            ua(a, d) || ka(a, d, {
                value: {}
            })
        }

        function c(a) {
            var c = Object[a];
            c && (Object[a] = function(a) {
                b(a);
                return c(a)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var b = Object.seal({}),
                        c = Object.seal({}),
                        d = new a([
                            [b, 2],
                            [c, 3]
                        ]);
                    if (2 != d.get(b) || 3 != d.get(c)) return !1;
                    d["delete"](b);
                    d.set(c, 4);
                    return !d.has(b) && 4 == d.get(c)
                } catch (n) {
                    return !1
                }
            }()) return a;
        var d = "$jscomp_hidden_" + Math.random().toString().substring(2);
        c("freeze");
        c("preventExtensions");
        c("seal");
        var e = 0,
            f = function(a) {
                this.g =
                    (e += Math.random() + 1).toString();
                if (a) {
                    ma();
                    pa();
                    a = ra(a);
                    for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1])
                }
            };
        f.prototype.set = function(a, c) {
            b(a);
            if (!ua(a, d)) throw Error("WeakMap key fail: " + a);
            a[d][this.g] = c;
            return this
        };
        f.prototype.get = function(a) {
            return ua(a, d) ? a[d][this.g] : void 0
        };
        f.prototype.has = function(a) {
            return ua(a, d) && ua(a[d], this.g)
        };
        f.prototype["delete"] = function(a) {
            return ua(a, d) && ua(a[d], this.g) ? delete a[d][this.g] : !1
        };
        return f
    });
    ta("Map", function(a) {
        if (function() {
                if (!a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({
                            x: 4
                        }),
                        c = new a(ra([
                            [b, "s"]
                        ]));
                    if ("s" != c.get(b) || 1 != c.size || c.get({
                            x: 4
                        }) || c.set({
                            x: 4
                        }, "t") != c || 2 != c.size) return !1;
                    var d = c.entries(),
                        e = d.next();
                    if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
                    e = d.next();
                    return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0
                } catch (G) {
                    return !1
                }
            }()) return a;
        ma();
        pa();
        var b = new WeakMap,
            c = function(a) {
                this.h = {};
                this.g = f();
                this.size =
                    0;
                if (a) {
                    a = ra(a);
                    for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1])
                }
            };
        c.prototype.set = function(a, b) {
            var c = d(this, a);
            c.list || (c.list = this.h[c.id] = []);
            c.ka ? c.ka.value = b : (c.ka = {
                next: this.g,
                Ba: this.g.Ba,
                head: this.g,
                key: a,
                value: b
            }, c.list.push(c.ka), this.g.Ba.next = c.ka, this.g.Ba = c.ka, this.size++);
            return this
        };
        c.prototype["delete"] = function(a) {
            a = d(this, a);
            return a.ka && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.h[a.id], a.ka.Ba.next = a.ka.next, a.ka.next.Ba = a.ka.Ba, a.ka.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function() {
            this.h = {};
            this.g = this.g.Ba = f();
            this.size = 0
        };
        c.prototype.has = function(a) {
            return !!d(this, a).ka
        };
        c.prototype.get = function(a) {
            return (a = d(this, a).ka) && a.value
        };
        c.prototype.entries = function() {
            return e(this, function(a) {
                return [a.key, a.value]
            })
        };
        c.prototype.keys = function() {
            return e(this, function(a) {
                return a.key
            })
        };
        c.prototype.values = function() {
            return e(this, function(a) {
                return a.value
            })
        };
        c.prototype.forEach = function(a, b) {
            for (var c = this.entries(), d; !(d = c.next()).done;) d =
                d.value, a.call(b, d[1], d[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(a, c) {
                var d = c && typeof c;
                "object" == d || "function" == d ? b.has(c) ? d = b.get(c) : (d = "" + ++g, b.set(c, d)) : d = "p_" + c;
                var e = a.h[d];
                if (e && ua(a.h, d))
                    for (a = 0; a < e.length; a++) {
                        var f = e[a];
                        if (c !== c && f.key !== f.key || c === f.key) return {
                            id: d,
                            list: e,
                            index: a,
                            ka: f
                        }
                    }
                return {
                    id: d,
                    list: e,
                    index: -1,
                    ka: void 0
                }
            },
            e = function(a, b) {
                var c = a.g;
                return qa(function() {
                    if (c) {
                        for (; c.head != a.g;) c = c.Ba;
                        for (; c.next != c.head;) return c = c.next, {
                            done: !1,
                            value: b(c)
                        };
                        c = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            },
            f = function() {
                var a = {};
                return a.Ba = a.next = a.head = a
            },
            g = 0;
        return c
    });
    var m = this,
        p = function(a) {
            return void 0 !== a
        },
        q = function(a) {
            return "string" == typeof a
        },
        r = function(a) {
            return "number" == typeof a
        },
        t = function(a, b, c) {
            a = a.split(".");
            c = c || m;
            a[0] in c || !c.execScript || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift());) !a.length && p(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {}
        },
        va = function(a, b) {
            a = a.split(".");
            b = b || m;
            for (var c = 0; c < a.length; c++)
                if (b = b[a[c]], null == b) return null;
            return b
        },
        wa = function() {},
        xa = function(a) {
            a.Mb = void 0;
            a.H = function() {
                return a.Mb ?
                    a.Mb : a.Mb = new a
            }
        },
        ya = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        za = function(a) {
            return "array" == ya(a)
        },
        Aa = function(a) {
            var b = ya(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        w = function(a) {
            return "function" == ya(a)
        },
        Ba = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        Ca = "closure_uid_" + (1E9 * Math.random() >>> 0),
        Da = 0,
        Ea = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        Fa = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments,
                    2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        x = function(a, b, c) {
            Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? x = Ea : x = Fa;
            return x.apply(null, arguments)
        },
        Ga = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        },
        Ha = Date.now || function() {
            return +new Date
        },
        y = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.ea = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.eh = function(a, c, f) {
                for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
                return b.prototype[c].apply(a, d)
            }
        };
    var Ia = document,
        z = window;
    var Ja;
    var Ka = function(a) {
            return /^[\s\xa0]*$/.test(a)
        },
        La = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        Ta = function(a) {
            if (!Ma.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(Na, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Oa, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Pa, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Qa, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(Ra, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(Sa, "&#0;"));
            return a
        },
        Na = /&/g,
        Oa = /</g,
        Pa = />/g,
        Qa = /"/g,
        Ra = /'/g,
        Sa = /\x00/g,
        Ma = /[\x00&<>"']/,
        Ua = function(a, b) {
            a.length > b && (a = a.substring(0, b - 3) + "...");
            return a
        },
        Va = function(a, b) {
            return -1 != a.toLowerCase().indexOf(b.toLowerCase())
        },
        Wa = String.prototype.repeat ? function(a, b) {
            return a.repeat(b)
        } : function(a, b) {
            return Array(b + 1).join(a)
        },
        Xa = function(a, b) {
            a = p(void 0) ? a.toFixed(void 0) : String(a);
            var c = a.indexOf("."); - 1 == c && (c = a.length);
            Wa("0", Math.max(0, b - c))
        },
        Ya = function(a) {
            return null == a ? "" : String(a)
        },
        $a = function(a, b) {
            var c = 0;
            a = La(String(a)).split(".");
            b = La(String(b)).split(".");
            for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
                var f = a[e] || "",
                    g = b[e] || "";
                do {
                    f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    if (0 == f[0].length && 0 == g[0].length) break;
                    c = Za(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || Za(0 == f[2].length, 0 == g[2].length) || Za(f[2], g[2]);
                    f = f[3];
                    g = g[3]
                } while (0 == c)
            }
            return c
        },
        Za = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        },
        ab = 2147483648 * Math.random() | 0,
        bb = function(a) {
            var b = Number(a);
            return 0 ==
                b && Ka(a) ? NaN : b
        },
        cb = function(a) {
            return String(a).replace(/\-([a-z])/g, function(a, c) {
                return c.toUpperCase()
            })
        },
        db = function(a) {
            var b = q(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var eb = function(a, b) {
            if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
            for (var c = 0; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        A = function(a, b, c) {
            for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        },
        fb = function(a, b, c) {
            for (var d = a.length, e = [], f = 0, g = q(a) ? a.split("") : a, k = 0; k < d; k++)
                if (k in g) {
                    var l = g[k];
                    b.call(c, l, k, a) && (e[f++] = l)
                }
            return e
        },
        gb = function(a, b, c) {
            for (var d = a.length, e = Array(d), f = q(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        },
        ib = function(a, b) {
            var c = "";
            A(a, function(d, e) {
                c = b.call(void 0, c, d, e, a)
            });
            return c
        },
        jb = function(a, b, c) {
            for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return !0;
            return !1
        },
        kb = function(a, b) {
            var c = 0;
            A(a, function(a, e, f) {
                b.call(void 0, a, e, f) && ++c
            }, void 0);
            return c
        },
        nb = function(a, b, c) {
            b = lb(a, b, c);
            return 0 > b ? null : q(a) ? a.charAt(b) : a[b]
        },
        lb = function(a, b, c) {
            for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return f;
            return -1
        },
        C = function(a, b) {
            return 0 <=
                eb(a, b)
        },
        pb = function() {
            var a = ob;
            if (!za(a))
                for (var b = a.length - 1; 0 <= b; b--) delete a[b];
            a.length = 0
        },
        qb = function(a) {
            return Array.prototype.concat.apply([], arguments)
        },
        rb = function(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
                return c
            }
            return []
        },
        sb = function(a, b, c) {
            return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
        },
        ub = function(a, b) {
            a.sort(b || tb)
        },
        tb = function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        };
    var vb = function(a, b, c) {
            for (var d in a) b.call(c, a[d], d, a)
        },
        xb = function(a) {
            var b = wb,
                c;
            for (c in b)
                if (a.call(void 0, b[c], c, b)) return !0;
            return !1
        },
        yb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b
        },
        zb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        },
        Ab = function(a, b) {
            var c = Aa(b),
                d = c ? b : arguments;
            for (c = c ? 0 : 1; c < d.length; c++) {
                if (null == a) return;
                a = a[d[c]]
            }
            return a
        },
        Bb = function(a, b) {
            return null !== a && b in a
        },
        Db = function(a) {
            var b = Cb,
                c;
            for (c in b)
                if (a.call(void 0, b[c], c, b)) return c
        },
        Eb = function(a) {
            for (var b in a) return !1;
            return !0
        },
        Fb = function(a, b, c) {
            return null !== a && b in a ? a[b] : c
        },
        Gb = function(a) {
            var b = {},
                c;
            for (c in a) b[c] = a[c];
            return b
        },
        Hb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        Ib = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < Hb.length; f++) c = Hb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var Kb = function() {
        this.g = "";
        this.h = Jb
    };
    Kb.prototype.Va = !0;
    Kb.prototype.Ta = function() {
        return this.g
    };
    Kb.prototype.toString = function() {
        return "Const{" + this.g + "}"
    };
    var Lb = function(a) {
            return a instanceof Kb && a.constructor === Kb && a.h === Jb ? a.g : "type_error:Const"
        },
        Jb = {},
        Mb = function(a) {
            var b = new Kb;
            b.g = a;
            return b
        };
    Mb("");
    var Ob = function() {
        this.g = "";
        this.h = Nb
    };
    Ob.prototype.Va = !0;
    Ob.prototype.Ta = function() {
        return this.g
    };
    Ob.prototype.Lb = !0;
    Ob.prototype.Eb = function() {
        return 1
    };
    var Pb = function(a) {
            if (a instanceof Ob && a.constructor === Ob && a.h === Nb) return a.g;
            ya(a);
            return "type_error:TrustedResourceUrl"
        },
        Nb = {},
        Qb = function(a) {
            var b = new Ob;
            b.g = a;
            return b
        };
    var Sb = function() {
        this.Hb = "";
        this.gd = Rb
    };
    Sb.prototype.Va = !0;
    Sb.prototype.Ta = function() {
        return this.Hb
    };
    Sb.prototype.Lb = !0;
    Sb.prototype.Eb = function() {
        return 1
    };
    var Tb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Rb = {},
        Ub = function(a) {
            var b = new Sb;
            b.Hb = a;
            return b
        };
    Ub("about:blank");
    var D;
    a: {
        var Vb = m.navigator;
        if (Vb) {
            var Wb = Vb.userAgent;
            if (Wb) {
                D = Wb;
                break a
            }
        }
        D = ""
    }
    var E = function(a) {
        return -1 != D.indexOf(a)
    };
    var Yb = function() {
            return E("Safari") && !(Xb() || E("Coast") || E("Opera") || E("Edge") || E("Silk") || E("Android"))
        },
        Xb = function() {
            return (E("Chrome") || E("CriOS")) && !E("Edge")
        };
    var $b = function() {
        this.Gb = "";
        this.fd = Zb;
        this.g = null
    };
    $b.prototype.Lb = !0;
    $b.prototype.Eb = function() {
        return this.g
    };
    $b.prototype.Va = !0;
    $b.prototype.Ta = function() {
        return this.Gb
    };
    var Zb = {},
        ac = function(a, b) {
            var c = new $b;
            c.Gb = a;
            c.g = b;
            return c
        };
    ac("<!DOCTYPE html>", 0);
    ac("", 0);
    ac("<br>", 0);
    var bc = function(a) {
        bc[" "](a);
        return a
    };
    bc[" "] = wa;
    var cc = function(a, b) {
            try {
                return bc(a[b]), !0
            } catch (c) {}
            return !1
        },
        ec = function(a, b) {
            var c = dc;
            return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
        };
    var fc = function(a) {
            try {
                return !!a && null != a.location.href && cc(a, "foo")
            } catch (b) {
                return !1
            }
        },
        gc = function(a, b) {
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
        },
        hc = /https?:\/\/[^\/]+/,
        ic = function() {
            var a = m;
            try {
                for (var b = null; b != a; b = a, a = a.parent) switch (a.location.protocol) {
                    case "https:":
                        return !0;
                    case "file:":
                        return !1;
                    case "http:":
                        return !1
                }
            } catch (c) {}
            return !0
        },
        kc = function() {
            var a = jc;
            if (!a) return "";
            var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
            try {
                var c = b.exec(decodeURIComponent(a));
                if (c) return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
            } catch (d) {}
            return ""
        };
    var lc = function() {
            return E("iPhone") && !E("iPod") && !E("iPad")
        },
        mc = function() {
            return lc() || E("iPad") || E("iPod")
        };
    var nc = E("Opera"),
        F = E("Trident") || E("MSIE"),
        oc = E("Edge"),
        pc = E("Gecko") && !(Va(D, "WebKit") && !E("Edge")) && !(E("Trident") || E("MSIE")) && !E("Edge"),
        qc = Va(D, "WebKit") && !E("Edge"),
        rc = E("Macintosh"),
        sc = E("Windows"),
        tc = E("Android"),
        uc = lc(),
        vc = E("iPad"),
        wc = E("iPod"),
        xc = mc(),
        yc = function() {
            var a = m.document;
            return a ? a.documentMode : void 0
        },
        zc;
    a: {
        var Ac = "",
            Bc = function() {
                var a = D;
                if (pc) return /rv\:([^\);]+)(\)|;)/.exec(a);
                if (oc) return /Edge\/([\d\.]+)/.exec(a);
                if (F) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (qc) return /WebKit\/(\S+)/.exec(a);
                if (nc) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();Bc && (Ac = Bc ? Bc[1] : "");
        if (F) {
            var Cc = yc();
            if (null != Cc && Cc > parseFloat(Ac)) {
                zc = String(Cc);
                break a
            }
        }
        zc = Ac
    }
    var Dc = zc,
        dc = {},
        Ec = function(a) {
            return ec(a, function() {
                return 0 <= $a(Dc, a)
            })
        },
        Fc;
    var Gc = m.document;
    Fc = Gc && F ? yc() || ("CSS1Compat" == Gc.compatMode ? parseInt(Dc, 10) : 5) : void 0;
    var Hc = !F || 9 <= Number(Fc);
    !pc && !F || F && 9 <= Number(Fc) || pc && Ec("1.9.1");
    F && Ec("9");
    var Ic = F || nc || qc;
    var H = function(a, b) {
        this.x = p(a) ? a : 0;
        this.y = p(b) ? b : 0
    };
    h = H.prototype;
    h.clone = function() {
        return new H(this.x, this.y)
    };
    h.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    h.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    h.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    h.scale = function(a, b) {
        b = r(b) ? b : a;
        this.x *= a;
        this.y *= b;
        return this
    };
    var I = function(a, b) {
        this.width = a;
        this.height = b
    };
    h = I.prototype;
    h.clone = function() {
        return new I(this.width, this.height)
    };
    h.va = function() {
        return this.width * this.height
    };
    h.aspectRatio = function() {
        return this.width / this.height
    };
    h.isEmpty = function() {
        return !this.va()
    };
    h.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    h.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    h.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    h.scale = function(a, b) {
        b = r(b) ? b : a;
        this.width *= a;
        this.height *= b;
        return this
    };
    var Lc = function(a) {
            return a ? new Jc(Kc(a)) : Ja || (Ja = new Jc)
        },
        Nc = function(a, b) {
            vb(b, function(b, d) {
                b && b.Va && (b = b.Ta());
                "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Mc.hasOwnProperty(d) ? a.setAttribute(Mc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
            })
        },
        Mc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        },
        Oc = function(a) {
            a = a.document;
            a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
            return new I(a.clientWidth, a.clientHeight)
        },
        Pc = function(a) {
            var b = a.scrollingElement ? a.scrollingElement : qc || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
            a = a.parentWindow || a.defaultView;
            return F && Ec("10") && a.pageYOffset != b.scrollTop ? new H(b.scrollLeft, b.scrollTop) : new H(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
        },
        J = function(a) {
            return a ?
                a.parentWindow || a.defaultView : window
        },
        Rc = function(a, b, c) {
            var d = arguments,
                e = document,
                f = String(d[0]),
                g = d[1];
            if (!Hc && g && (g.name || g.type)) {
                f = ["<", f];
                g.name && f.push(' name="', Ta(g.name), '"');
                if (g.type) {
                    f.push(' type="', Ta(g.type), '"');
                    var k = {};
                    Ib(k, g);
                    delete k.type;
                    g = k
                }
                f.push(">");
                f = f.join("")
            }
            f = e.createElement(f);
            g && (q(g) ? f.className = g : za(g) ? f.className = g.join(" ") : Nc(f, g));
            2 < d.length && Qc(e, f, d);
            return f
        },
        Qc = function(a, b, c) {
            function d(c) {
                c && b.appendChild(q(c) ? a.createTextNode(c) : c)
            }
            for (var e = 2; e < c.length; e++) {
                var f =
                    c[e];
                !Aa(f) || Ba(f) && 0 < f.nodeType ? d(f) : A(Sc(f) ? rb(f) : f, d)
            }
        },
        Tc = function(a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        },
        Uc = function(a, b) {
            if (!a || !b) return !1;
            if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b.parentNode;
            return b == a
        },
        Kc = function(a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Vc = function(a) {
            try {
                return a.contentWindow || (a.contentDocument ? J(a.contentDocument) :
                    null)
            } catch (b) {}
            return null
        },
        Sc = function(a) {
            if (a && "number" == typeof a.length) {
                if (Ba(a)) return "function" == typeof a.item || "string" == typeof a.item;
                if (w(a)) return "function" == typeof a.item
            }
            return !1
        },
        Jc = function(a) {
            this.g = a || m.document || document
        };
    Jc.prototype.createElement = function(a) {
        return this.g.createElement(String(a))
    };
    Jc.prototype.contains = Uc;
    var K = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    K.prototype.h = function() {
        return this.right - this.left
    };
    K.prototype.g = function() {
        return this.bottom - this.top
    };
    K.prototype.clone = function() {
        return new K(this.top, this.right, this.bottom, this.left)
    };
    K.prototype.contains = function(a) {
        return this && a ? a instanceof K ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    var Wc = function(a, b) {
        return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
    };
    K.prototype.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    K.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    K.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    var Xc = function(a, b, c) {
        b instanceof H ? (a.left += b.x, a.right += b.x, a.top += b.y, a.bottom += b.y) : (a.left += b, a.right += b, r(c) && (a.top += c, a.bottom += c));
        return a
    };
    K.prototype.scale = function(a, b) {
        b = r(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    };
    var Yc = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    Yc.prototype.clone = function() {
        return new Yc(this.left, this.top, this.width, this.height)
    };
    var Zc = function(a) {
        return new K(a.top, a.left + a.width, a.top + a.height, a.left)
    };
    h = Yc.prototype;
    h.contains = function(a) {
        return a instanceof H ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    h.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    h.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    h.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    h.scale = function(a, b) {
        b = r(b) ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    };
    var $c = {},
        ad = function(a, b) {
            var c = $c[b];
            if (!c) {
                var d = cb(b);
                c = d;
                void 0 === a.style[d] && (d = (qc ? "Webkit" : pc ? "Moz" : F ? "ms" : nc ? "O" : null) + db(d), void 0 !== a.style[d] && (c = d));
                $c[b] = c
            }
            return c
        },
        bd = function(a, b) {
            var c = a.style[cb(b)];
            return "undefined" !== typeof c ? c : a.style[ad(a, b)] || ""
        },
        cd = function(a) {
            try {
                var b = a.getBoundingClientRect()
            } catch (c) {
                return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }
            }
            F && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop +
                a.body.clientTop);
            return b
        },
        dd = function(a) {
            var b = Kc(a),
                c = new H(0, 0);
            var d = b ? Kc(b) : document;
            d = !F || 9 <= Number(Fc) || "CSS1Compat" == Lc(d).g.compatMode ? d.documentElement : d.body;
            if (a == d) return c;
            a = cd(a);
            b = Pc(Lc(b).g);
            c.x = a.left + b.x;
            c.y = a.top + b.y;
            return c
        },
        ed = function(a, b) {
            var c = new H(0, 0),
                d = J(Kc(a));
            if (!cc(d, "parent")) return c;
            do {
                if (d == b) var e = dd(a);
                else e = cd(a), e = new H(e.left, e.top);
                c.x += e.x;
                c.y += e.y
            } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
            return c
        },
        fd = function(a) {
            "number" == typeof a &&
                (a += "px");
            return a
        },
        gd = function(a) {
            var b = a.offsetWidth,
                c = a.offsetHeight,
                d = qc && !b && !c;
            return p(b) && !d || !a.getBoundingClientRect ? new I(b, c) : (a = cd(a), new I(a.right - a.left, a.bottom - a.top))
        };
    var hd = function(a) {
            return function() {
                return a
            }
        },
        id = function(a) {
            var b = !1,
                c;
            return function() {
                b || (c = a(), b = !0);
                return c
            }
        };
    var jd = id(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            m.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });

    function kd(a) {
        return a ? a.passive && jd() ? a : a.capture || !1 : a
    }
    var ld = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, kd(d)) : a.attachEvent && a.attachEvent("on" + b, c)
    };
    var md = function(a) {
        a = a || m;
        var b = a.context;
        if (!b) try {
            b = a.parent.context
        } catch (c) {}
        try {
            if (b && "pageViewId" in b && "canonicalUrl" in b) return b
        } catch (c) {}
        return null
    };
    var nd = function(a, b) {
        a.google_image_requests || (a.google_image_requests = []);
        var c = a.document.createElement("img");
        c.src = b;
        a.google_image_requests.push(c)
    };
    var od = !!window.google_async_iframe_id,
        pd = od && window.parent || window,
        qd = function() {
            if (od && !fc(pd)) {
                var a = "." + Ia.domain;
                try {
                    for (; 2 < a.split(".").length && !fc(pd);) Ia.domain = a = a.substr(a.indexOf(".") + 1), pd = window.parent
                } catch (b) {}
                fc(pd) || (pd = window)
            }
            return pd
        };
    var rd = function(a) {
        for (var b = 0, c = a, d = 0; a && a != a.parent;) a = a.parent, d++, fc(a) && (c = a, b = d);
        return {
            ac: c,
            level: b
        }
    };
    var sd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
        td = function(a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("="),
                        e = null;
                    if (0 <= d) {
                        var f = a[c].substring(0, d);
                        e = a[c].substring(d + 1)
                    } else f = a[c];
                    b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
                }
            }
        },
        ud = /#|$/,
        vd = function(a, b) {
            var c = a.search(ud);
            a: {
                var d = 0;
                for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                    var f = a.charCodeAt(d - 1);
                    if (38 == f || 63 == f)
                        if (f = a.charCodeAt(d +
                                e), !f || 61 == f || 38 == f || 35 == f) break a;
                    d += e + 1
                }
                d = -1
            }
            if (0 > d) return null;
            e = a.indexOf("&", d);
            if (0 > e || e > c) e = c;
            d += b.length + 1;
            return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
        };
    var wd = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    var xd = function(a, b, c) {
        this.l = b;
        this.h = c;
        this.o = a
    };
    y(xd, Error);
    h = xd.prototype;
    h.Xd = function() {
        return this.g
    };
    h.Yd = function() {
        return this.l
    };
    h.Wd = function() {
        return this.h
    };
    h.vd = function() {
        return 1E3 > this.h ? this.h : 900
    };
    h.Zd = function() {
        return this.o
    };
    h.toString = function() {
        return "AdError " + this.h + ": " + this.l + (null != this.g ? " Caused by: " + this.g : "")
    };
    var yd = function() {
        this.R = this.R;
        this.L = this.L
    };
    yd.prototype.R = !1;
    yd.prototype.X = function() {
        this.R || (this.R = !0, this.O())
    };
    var Ad = function(a, b) {
        b = Ga(zd, b);
        a.R ? p(void 0) ? b.call(void 0) : b() : (a.L || (a.L = []), a.L.push(p(void 0) ? x(b, void 0) : b))
    };
    yd.prototype.O = function() {
        if (this.L)
            for (; this.L.length;) this.L.shift()()
    };
    var zd = function(a) {
        a && "function" == typeof a.X && a.X()
    };
    var Bd = function(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.Nc = !0
    };
    Bd.prototype.l = function() {
        this.Nc = !1
    };
    var Cd = function(a, b) {
        Bd.call(this, "adError");
        this.h = a;
        this.o = b ? b : null
    };
    y(Cd, Bd);
    Cd.prototype.w = function() {
        return this.h
    };
    Cd.prototype.B = function() {
        return this.o
    };
    var L = function(a, b, c) {
        Bd.call(this, a);
        this.w = b;
        this.o = null != c ? c : null
    };
    y(L, Bd);
    L.prototype.F = function() {
        return this.w
    };
    L.prototype.A = function() {
        return this.o
    };
    var Dd = function(a) {
            this.g = a
        },
        Gd = function() {
            var a = Ed(M);
            return Fd(a, "disableExperiments")
        },
        Fd = function(a, b) {
            return Bb(a.g, b) && (a = a.g[b], "boolean" == typeof a) ? a : !1
        },
        Hd = function(a) {
            if (Bb(a.g, "forceExperimentIds")) {
                a = a.g.forceExperimentIds;
                var b = [],
                    c = 0;
                za(a) && A(a, function(a) {
                    r(a) && (b[c++] = a)
                });
                return b
            }
            return null
        };
    var Id = "StopIteration" in m ? m.StopIteration : {
            message: "StopIteration",
            stack: ""
        },
        Jd = function() {};
    Jd.prototype.next = function() {
        throw Id;
    };
    Jd.prototype.Ha = function() {
        return this
    };
    var Kd = function(a) {
            if (a instanceof Jd) return a;
            if ("function" == typeof a.Ha) return a.Ha(!1);
            if (Aa(a)) {
                var b = 0,
                    c = new Jd;
                c.next = function() {
                    for (;;) {
                        if (b >= a.length) throw Id;
                        if (b in a) return a[b++];
                        b++
                    }
                };
                return c
            }
            throw Error("Not implemented");
        },
        Ld = function(a, b, c) {
            if (Aa(a)) try {
                A(a, b, c)
            } catch (d) {
                if (d !== Id) throw d;
            } else {
                a = Kd(a);
                try {
                    for (;;) b.call(c, a.next(), void 0, a)
                } catch (d) {
                    if (d !== Id) throw d;
                }
            }
        };
    var Md = function(a, b) {
        this.h = {};
        this.g = [];
        this.o = this.l = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof Md ? (c = a.Sa(), d = a.ca()) : (c = zb(a), d = yb(a));
            for (var e = 0; e < c.length; e++) this.set(c[e], d[e])
        }
    };
    h = Md.prototype;
    h.Aa = function() {
        return this.l
    };
    h.ca = function() {
        Nd(this);
        for (var a = [], b = 0; b < this.g.length; b++) a.push(this.h[this.g[b]]);
        return a
    };
    h.Sa = function() {
        Nd(this);
        return this.g.concat()
    };
    h.isEmpty = function() {
        return 0 == this.l
    };
    h.clear = function() {
        this.h = {};
        this.o = this.l = this.g.length = 0
    };
    var Pd = function(a, b) {
            Od(a.h, b) && (delete a.h[b], a.l--, a.o++, a.g.length > 2 * a.l && Nd(a))
        },
        Nd = function(a) {
            if (a.l != a.g.length) {
                for (var b = 0, c = 0; b < a.g.length;) {
                    var d = a.g[b];
                    Od(a.h, d) && (a.g[c++] = d);
                    b++
                }
                a.g.length = c
            }
            if (a.l != a.g.length) {
                var e = {};
                for (c = b = 0; b < a.g.length;) d = a.g[b], Od(e, d) || (a.g[c++] = d, e[d] = 1), b++;
                a.g.length = c
            }
        };
    h = Md.prototype;
    h.get = function(a, b) {
        return Od(this.h, a) ? this.h[a] : b
    };
    h.set = function(a, b) {
        Od(this.h, a) || (this.l++, this.g.push(a), this.o++);
        this.h[a] = b
    };
    h.forEach = function(a, b) {
        for (var c = this.Sa(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    h.clone = function() {
        return new Md(this)
    };
    h.Ha = function(a) {
        Nd(this);
        var b = 0,
            c = this.o,
            d = this,
            e = new Jd;
        e.next = function() {
            if (c != d.o) throw Error("The map has changed since the iterator was created");
            if (b >= d.g.length) throw Id;
            var e = d.g[b++];
            return a ? e : d.h[e]
        };
        return e
    };
    var Od = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var Qd = function(a) {
        if (a.ca && "function" == typeof a.ca) return a.ca();
        if (q(a)) return a.split("");
        if (Aa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return yb(a)
    };
    var Rd = function(a, b) {
        this.g = this.A = this.l = "";
        this.F = null;
        this.w = this.B = "";
        this.o = !1;
        var c;
        a instanceof Rd ? (this.o = p(b) ? b : a.o, Sd(this, a.l), this.A = a.A, this.g = a.g, Td(this, a.F), this.B = a.B, Ud(this, a.h.clone()), this.w = a.w) : a && (c = String(a).match(sd)) ? (this.o = !!b, Sd(this, c[1] || "", !0), this.A = Vd(c[2] || ""), this.g = Vd(c[3] || "", !0), Td(this, c[4]), this.B = Vd(c[5] || "", !0), Ud(this, c[6] || "", !0), this.w = Vd(c[7] || "")) : (this.o = !!b, this.h = new Wd(null, 0, this.o))
    };
    Rd.prototype.toString = function() {
        var a = [],
            b = this.l;
        b && a.push(Xd(b, Yd, !0), ":");
        var c = this.g;
        if (c || "file" == b) a.push("//"), (b = this.A) && a.push(Xd(b, Yd, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.F, null != c && a.push(":", String(c));
        if (c = this.B) this.g && "/" != c.charAt(0) && a.push("/"), a.push(Xd(c, "/" == c.charAt(0) ? Zd : $d, !0));
        (c = this.h.toString()) && a.push("?", c);
        (c = this.w) && a.push("#", Xd(c, ae));
        return a.join("")
    };
    Rd.prototype.clone = function() {
        return new Rd(this)
    };
    var Sd = function(a, b, c) {
            a.l = c ? Vd(b, !0) : b;
            a.l && (a.l = a.l.replace(/:$/, ""))
        },
        Td = function(a, b) {
            if (b) {
                b = Number(b);
                if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
                a.F = b
            } else a.F = null
        },
        Ud = function(a, b, c) {
            b instanceof Wd ? (a.h = b, be(a.h, a.o)) : (c || (b = Xd(b, ce)), a.h = new Wd(b, 0, a.o))
        },
        Vd = function(a, b) {
            return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
        },
        Xd = function(a, b, c) {
            return q(a) ? (a = encodeURI(a).replace(b, de), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
        },
        de = function(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        },
        Yd = /[#\/\?@]/g,
        $d = /[\#\?:]/g,
        Zd = /[\#\?]/g,
        ce = /[\#\?@]/g,
        ae = /#/g,
        Wd = function(a, b, c) {
            this.h = this.g = null;
            this.l = a || null;
            this.o = !!c
        },
        ee = function(a) {
            a.g || (a.g = new Md, a.h = 0, a.l && td(a.l, function(b, c) {
                b = decodeURIComponent(b.replace(/\+/g, " "));
                ee(a);
                a.l = null;
                b = fe(a, b);
                var d = a.g.get(b);
                d || a.g.set(b, d = []);
                d.push(c);
                a.h += 1
            }))
        };
    Wd.prototype.Aa = function() {
        ee(this);
        return this.h
    };
    var ge = function(a, b) {
        ee(a);
        b = fe(a, b);
        Od(a.g.h, b) && (a.l = null, a.h -= a.g.get(b).length, Pd(a.g, b))
    };
    Wd.prototype.clear = function() {
        this.g = this.l = null;
        this.h = 0
    };
    Wd.prototype.isEmpty = function() {
        ee(this);
        return 0 == this.h
    };
    var he = function(a, b) {
        ee(a);
        b = fe(a, b);
        return Od(a.g.h, b)
    };
    h = Wd.prototype;
    h.forEach = function(a, b) {
        ee(this);
        this.g.forEach(function(c, d) {
            A(c, function(c) {
                a.call(b, c, d, this)
            }, this)
        }, this)
    };
    h.Sa = function() {
        ee(this);
        for (var a = this.g.ca(), b = this.g.Sa(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    h.ca = function(a) {
        ee(this);
        var b = [];
        if (q(a)) he(this, a) && (b = qb(b, this.g.get(fe(this, a))));
        else {
            a = this.g.ca();
            for (var c = 0; c < a.length; c++) b = qb(b, a[c])
        }
        return b
    };
    h.set = function(a, b) {
        ee(this);
        this.l = null;
        a = fe(this, a);
        he(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    };
    h.get = function(a, b) {
        a = a ? this.ca(a) : [];
        return 0 < a.length ? String(a[0]) : b
    };
    h.toString = function() {
        if (this.l) return this.l;
        if (!this.g) return "";
        for (var a = [], b = this.g.Sa(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = encodeURIComponent(String(d));
            d = this.ca(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.l = a.join("&")
    };
    h.clone = function() {
        var a = new Wd;
        a.l = this.l;
        this.g && (a.g = this.g.clone(), a.h = this.h);
        return a
    };
    var fe = function(a, b) {
            b = String(b);
            a.o && (b = b.toLowerCase());
            return b
        },
        be = function(a, b) {
            b && !a.o && (ee(a), a.l = null, a.g.forEach(function(a, b) {
                var c = b.toLowerCase();
                b != c && (ge(this, b), ge(this, c), 0 < a.length && (this.l = null, this.g.set(fe(this, c), rb(a)), this.h += a.length))
            }, a));
            a.o = b
        };
    var ie = function(a, b) {
            this.g = a;
            this.h = b
        },
        ke = function(a, b, c) {
            this.url = a;
            this.ac = b;
            this.xc = !!c;
            this.depth = r(void 0) ? void 0 : null
        },
        me = function(a) {
            a = a ? a : le();
            for (var b = new ke(m.location.href, m, !1), c = a.length - 1, d = c; 0 <= d; --d) {
                var e = a[d];
                if (e.url && !e.xc) {
                    b = e;
                    break
                }
            }
            d = null;
            e = a.length && a[c].url;
            0 != b.depth && e && (d = a[c]);
            return new ie(b, d)
        },
        le = function() {
            var a = m,
                b = [],
                c = null;
            do {
                var d = a;
                if (fc(d)) {
                    var e = d.location.href;
                    c = d.document && d.document.referrer || null
                } else e = c, c = null;
                b.push(new ke(e || "", d));
                try {
                    a = d.parent
                } catch (f) {
                    a =
                        null
                }
            } while (a && d != a);
            a = 0;
            for (d = b.length - 1; a <= d; ++a) b[a].depth = d - a;
            d = m;
            if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
                for (a = 1; a < b.length; ++a) e = b[a], e.url || (e.url = d.location.ancestorOrigins[a - 1] || "", e.xc = !0);
            return b
        };
    var ne = function(a, b, c, d, e) {
            this.B = c || 4E3;
            this.l = a || "&";
            this.F = b || ",$";
            this.o = p(d) ? d : "trn";
            this.C = e || null;
            this.w = !1;
            this.h = {};
            this.A = 0;
            this.g = []
        },
        oe = function(a, b) {
            var c = {};
            c[a] = b;
            return [c]
        },
        qe = function(a, b, c, d, e) {
            var f = [];
            gc(a, function(a, k) {
                (a = pe(a, b, c, d, e)) && f.push(k + "=" + a)
            });
            return f.join(b)
        },
        pe = function(a, b, c, d, e) {
            if (null == a) return "";
            b = b || "&";
            c = c || ",$";
            "string" == typeof c && (c = c.split(""));
            if (a instanceof Array) {
                if (d = d || 0, d < c.length) {
                    for (var f = [], g = 0; g < a.length; g++) f.push(pe(a[g], b, c, d + 1, e));
                    return f.join(c[d])
                }
            } else if ("object" ==
                typeof a) return e = e || 0, 2 > e ? encodeURIComponent(qe(a, b, c, d, e + 1)) : "...";
            return encodeURIComponent(String(a))
        },
        re = function(a, b, c, d) {
            a.g.push(b);
            a.h[b] = oe(c, d)
        },
        te = function(a, b, c, d) {
            b = b + "//" + c + d;
            var e = se(a) - d.length - 0;
            if (0 > e) return "";
            a.g.sort(function(a, b) {
                return a - b
            });
            d = null;
            c = "";
            for (var f = 0; f < a.g.length; f++)
                for (var g = a.g[f], k = a.h[g], l = 0; l < k.length; l++) {
                    if (!e) {
                        d = null == d ? g : d;
                        break
                    }
                    var n = qe(k[l], a.l, a.F);
                    if (n) {
                        n = c + n;
                        if (e >= n.length) {
                            e -= n.length;
                            b += n;
                            c = a.l;
                            break
                        } else a.w && (c = e, n[c - 1] == a.l && --c, b += n.substr(0,
                            c), c = a.l, e = 0);
                        d = null == d ? g : d
                    }
                }
            f = "";
            a.o && null != d && (f = c + a.o + "=" + (a.C || d));
            return b + f + ""
        },
        se = function(a) {
            if (!a.o) return a.B;
            var b = 1,
                c;
            for (c in a.h) b = c.length > b ? c.length : b;
            return a.B - a.o.length - b - a.l.length - 1
        };
    var ve = function(a) {
            var b = a || le();
            a = b.length - 1;
            var c = me(b);
            b = c.g;
            var d = c.h;
            c = [];
            d ? (b && c.push(ue(a, [d.url, 2], 0, [b.url, 0], b.depth)), c.push(ue(a, [d.url, 2], 0))) : b.url && (c.push(ue(a, void 0, void 0, [b.url, 0], b.depth)), (d = (d = hc.exec(b.url)) && d[0] || "") && c.push(ue(a, [d, 1], b.depth)));
            c.push(ue(a));
            return c
        },
        ue = function(a, b, c, d, e) {
            a = [a];
            if (p(b) && p(c)) {
                for (var f = 0; f < c; f++) a.push("");
                a.push(b)
            }
            if (p(d) && p(e)) {
                b = e - a.length + 1;
                for (f = 0; f < b; f++) a.push("");
                a.push(d)
            }
            return a
        },
        we = function() {
            var a = ve();
            return gb(a, function(a) {
                return pe(a)
            })
        };
    var N = function() {
            this.B = "always";
            this.L = 4;
            this.R = 1;
            this.o = !0;
            this.l = this.P = this.g = !1;
            this.w = "en";
            this.M = this.D = !1;
            this.G = this.C = "";
            this.I = null;
            this.F = !0;
            this.N = this.J = -1;
            this.h = !1;
            try {
                this.T = ve(void 0)[0]
            } catch (a) {}
        },
        xe = "af am ar bg bn ca cs da de el en en_gb es es_419 et eu fa fi fil fr fr_ca gl gu he hi hr hu id in is it iw ja kn ko lt lv ml mr ms nb nl no pl pt_br pt_pt ro ru sk sl sr sv sw ta te th tr uk ur vi zh_cn zh_hk zh_tw zu".split(" "),
        ye = function(a) {
            a = Ya(a);
            Ka(a) || (a = a.substring(0, 20));
            return a
        };
    h = N.prototype;
    h.cf = function(a) {
        this.B = a
    };
    h.Te = function() {
        return this.B
    };
    h.kf = function(a) {
        this.L = a
    };
    h.We = function() {
        return this.L
    };
    h.pf = function(a) {
        this.K = a
    };
    h.Ze = function() {
        return this.K
    };
    h.sf = function(a) {
        "boolean" == typeof a && (this.R = a ? 1 : 0)
    };
    h.tf = function(a) {
        this.R = a
    };
    h.bf = function(a) {
        this.o = a
    };
    h.$e = function() {
        return this.o
    };
    h.Wf = function() {
        return !1
    };
    h.qf = function(a) {
        this.g = a
    };
    h.Ef = function() {
        return this.g
    };
    h.Za = function() {
        return this.P
    };
    h.Uf = function() {
        return !0
    };
    h.la = function() {
        return !1
    };
    h.Df = function() {
        return !1
    };
    h.gf = function(a) {
        this.D = a
    };
    h.af = function() {
        return this.D
    };
    h.hf = function(a) {
        this.M = a
    };
    h.ub = function() {
        return this.M
    };
    h.Nb = function() {
        return !1
    };
    h.Rf = function() {
        return !1
    };
    h.jf = function(a) {
        if (null != a) {
            a = a.toLowerCase().replace("-", "_");
            if (!C(xe, a) && (a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "", !C(xe, a))) return;
            this.w = a
        }
    };
    h.td = function() {
        return this.w
    };
    h.mf = function(a) {
        this.C = ye(a)
    };
    h.Xe = function() {
        return this.C
    };
    h.nf = function(a) {
        this.G = ye(a)
    };
    h.Ye = function() {
        return this.G
    };
    var Ed = function(a) {
        if (null == a.I) {
            var b = {};
            var c = (new Rd(J().location.href)).h;
            if (he(c, "tcnfp")) try {
                b = JSON.parse(c.get("tcnfp"))
            } catch (d) {}
            a.I = new Dd(b)
        }
        return a.I
    };
    h = N.prototype;
    h.ff = function(a) {
        this.F = a
    };
    h.Ve = function() {
        return this.F
    };
    h.Vf = function() {
        return !1
    };
    h.lf = function(a) {
        this.J = a
    };
    h.rf = function(a) {
        this.N = a
    };
    h.df = function(a) {
        this.h = a
    };
    h.Ue = function() {
        return this.h
    };
    var M = new N;
    window.console && "function" === typeof window.console.log && x(window.console.log, window.console);
    var ze = function() {
            return Math.round(Ha() / 1E3)
        },
        Ae = function(a) {
            var b = window.performance && window.performance.timing && window.performance.timing.domLoading && 0 < window.performance.timing.domLoading ? Math.round(window.performance.timing.domLoading / 1E3) : null;
            return null != b ? b : null != a ? a : ze()
        };
    var Be = function(a) {
        for (var b = [], c = a = J(a.ownerDocument); c != a.top; c = c.parent)
            if (c.frameElement) b.push(c.frameElement);
            else break;
        return b
    };
    var Ce = null,
        De = function() {
            this.g = {};
            this.h = 0
        },
        Ee = function(a, b) {
            this.B = a;
            this.o = !0;
            this.h = b
        };
    Ee.prototype.g = function() {
        return this.h
    };
    Ee.prototype.l = function() {
        return String(this.h)
    };
    var Fe = function(a, b) {
        Ee.call(this, String(a), b);
        this.w = a;
        this.h = !!b
    };
    y(Fe, Ee);
    Fe.prototype.l = function() {
        return this.h ? "1" : "0"
    };
    var Ge = function(a, b) {
        Ee.call(this, a, b)
    };
    y(Ge, Ee);
    Ge.prototype.l = function() {
        return this.h ? Math.round(this.h.top) + "." + Math.round(this.h.left) + "." + (Math.round(this.h.top) + Math.round(this.h.height)) + "." + (Math.round(this.h.left) + Math.round(this.h.width)) : ""
    };
    var He = function(a) {
            if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
                a = a.split(".");
                var b = Number(a[0]),
                    c = Number(a[1]);
                return new Ge("", new Yc(c, b, Number(a[3]) - c, Number(a[2]) - b))
            }
            return new Ge("", new Yc(0, 0, 0, 0))
        },
        Ie = function() {
            Ce || (Ce = new De);
            return Ce
        },
        Je = function(a, b) {
            a.g[b.B] = b
        };
    var Ke = function(a) {
            var b = new Yc(-Number.MAX_VALUE / 2, -Number.MAX_VALUE / 2, Number.MAX_VALUE, Number.MAX_VALUE),
                c = new Yc(0, 0, 0, 0);
            if (!a || 0 == a.length) return c;
            for (var d = 0; d < a.length; d++) {
                a: {
                    var e = b;
                    var f = a[d],
                        g = Math.max(e.left, f.left),
                        k = Math.min(e.left + e.width, f.left + f.width);
                    if (g <= k) {
                        var l = Math.max(e.top, f.top);
                        f = Math.min(e.top + e.height, f.top + f.height);
                        if (l <= f) {
                            e.left = g;
                            e.top = l;
                            e.width = k - g;
                            e.height = f - l;
                            e = !0;
                            break a
                        }
                    }
                    e = !1
                }
                if (!e) return c
            }
            return b
        },
        Le = function(a, b) {
            var c = a.getBoundingClientRect();
            a = ed(a,
                b);
            return new Yc(Math.round(a.x), Math.round(a.y), Math.round(c.right - c.left), Math.round(c.bottom - c.top))
        },
        Me = function(a, b, c) {
            if (b && c) {
                a: {
                    var d = Math.max(b.left, c.left);
                    var e = Math.min(b.left + b.width, c.left + c.width);
                    if (d <= e) {
                        var f = Math.max(b.top, c.top),
                            g = Math.min(b.top + b.height, c.top + c.height);
                        if (f <= g) {
                            d = new Yc(d, f, e - d, g - f);
                            break a
                        }
                    }
                    d = null
                }
                e = d ? d.height * d.width : 0;f = d ? b.height * b.width : 0;d = d && f ? Math.round(e / f * 100) : 0;Je(a, new Ee("vp", d));d && 0 < d ? (e = Zc(b), f = Zc(c), e = e.top >= f.top && e.top < f.bottom) : e = !1;Je(a, new Fe(512,
                    e));d && 0 < d ? (e = Zc(b), f = Zc(c), e = e.bottom <= f.bottom && e.bottom > f.top) : e = !1;Je(a, new Fe(1024, e));d && 0 < d ? (e = Zc(b), f = Zc(c), e = e.left >= f.left && e.left < f.right) : e = !1;Je(a, new Fe(2048, e));d && 0 < d ? (b = Zc(b), c = Zc(c), c = b.right <= c.right && b.right > c.left) : c = !1;Je(a, new Fe(4096, c))
            }
        };
    var Ne = !F || 9 <= Number(Fc),
        Oe = F && !Ec("9");
    !qc || Ec("528");
    pc && Ec("1.9b") || F && Ec("8") || nc && Ec("9.5") || qc && Ec("528");
    pc && !Ec("8") || F && Ec("9");
    var Pe = function() {
        if (!m.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        m.addEventListener("test", wa, b);
        m.removeEventListener("test", wa, b);
        return a
    }();
    var Re = function(a, b) {
        Bd.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.h = null;
        if (a) {
            var c = this.type = a.type,
                d = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            (b = a.relatedTarget) ? pc && (cc(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType =
                q(a.pointerType) ? a.pointerType : Qe[a.pointerType] || "";
            this.h = a;
            a.defaultPrevented && this.l()
        }
    };
    y(Re, Bd);
    var Qe = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Re.prototype.l = function() {
        Re.ea.l.call(this);
        var a = this.h;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, Oe) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    var Se = "closure_listenable_" + (1E6 * Math.random() | 0),
        Te = function(a) {
            return !(!a || !a[Se])
        },
        Ue = 0;
    var Ve = function(a, b, c, d, e) {
            this.listener = a;
            this.g = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.ob = e;
            this.key = ++Ue;
            this.Ya = this.kb = !1
        },
        We = function(a) {
            a.Ya = !0;
            a.listener = null;
            a.g = null;
            a.src = null;
            a.ob = null
        };
    var Xe = function(a) {
            this.src = a;
            this.g = {};
            this.h = 0
        },
        Ze = function(a, b, c, d, e, f) {
            var g = b.toString();
            b = a.g[g];
            b || (b = a.g[g] = [], a.h++);
            var k = Ye(b, c, e, f); - 1 < k ? (a = b[k], d || (a.kb = !1)) : (a = new Ve(c, a.src, g, !!e, f), a.kb = d, b.push(a));
            return a
        },
        $e = function(a, b) {
            var c = b.type;
            if (c in a.g) {
                var d = a.g[c],
                    e = eb(d, b),
                    f;
                (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
                f && (We(b), 0 == a.g[c].length && (delete a.g[c], a.h--))
            }
        },
        af = function(a, b, c, d, e) {
            a = a.g[b.toString()];
            b = -1;
            a && (b = Ye(a, c, d, e));
            return -1 < b ? a[b] : null
        },
        Ye = function(a, b, c, d) {
            for (var e =
                    0; e < a.length; ++e) {
                var f = a[e];
                if (!f.Ya && f.listener == b && f.capture == !!c && f.ob == d) return e
            }
            return -1
        };
    var bf = "closure_lm_" + (1E6 * Math.random() | 0),
        cf = {},
        df = 0,
        ff = function(a, b, c, d, e) {
            if (d && d.once) return ef(a, b, c, d, e);
            if (za(b)) {
                for (var f = 0; f < b.length; f++) ff(a, b[f], c, d, e);
                return null
            }
            c = gf(c);
            return Te(a) ? a.h(b, c, Ba(d) ? !!d.capture : !!d, e) : hf(a, b, c, !1, d, e)
        },
        hf = function(a, b, c, d, e, f) {
            if (!b) throw Error("Invalid event type");
            var g = Ba(e) ? !!e.capture : !!e,
                k = jf(a);
            k || (a[bf] = k = new Xe(a));
            c = Ze(k, b, c, d, g, f);
            if (c.g) return c;
            d = kf();
            c.g = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) Pe || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(),
                d, e);
            else if (a.attachEvent) a.attachEvent(lf(b.toString()), d);
            else throw Error("addEventListener and attachEvent are unavailable.");
            df++;
            return c
        },
        kf = function() {
            var a = mf,
                b = Ne ? function(c) {
                    return a.call(b.src, b.listener, c)
                } : function(c) {
                    c = a.call(b.src, b.listener, c);
                    if (!c) return c
                };
            return b
        },
        ef = function(a, b, c, d, e) {
            if (za(b)) {
                for (var f = 0; f < b.length; f++) ef(a, b[f], c, d, e);
                return null
            }
            c = gf(c);
            return Te(a) ? Ze(a.F, String(b), c, !0, Ba(d) ? !!d.capture : !!d, e) : hf(a, b, c, !0, d, e)
        },
        nf = function(a, b, c, d, e) {
            if (za(b))
                for (var f =
                        0; f < b.length; f++) nf(a, b[f], c, d, e);
            else d = Ba(d) ? !!d.capture : !!d, c = gf(c), Te(a) ? a.B(b, c, d, e) : a && (a = jf(a)) && (b = af(a, b, c, d, e)) && of (b)
        },
        of = function(a) {
            if (!r(a) && a && !a.Ya) {
                var b = a.src;
                if (Te(b)) $e(b.F, a);
                else {
                    var c = a.type,
                        d = a.g;
                    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(lf(c), d);
                    df--;
                    (c = jf(b)) ? ($e(c, a), 0 == c.h && (c.src = null, b[bf] = null)) : We(a)
                }
            }
        },
        lf = function(a) {
            return a in cf ? cf[a] : cf[a] = "on" + a
        },
        qf = function(a, b, c, d) {
            var e = !0;
            if (a = jf(a))
                if (b = a.g[b.toString()])
                    for (b =
                        b.concat(), a = 0; a < b.length; a++) {
                        var f = b[a];
                        f && f.capture == c && !f.Ya && (f = pf(f, d), e = e && !1 !== f)
                    }
            return e
        },
        pf = function(a, b) {
            var c = a.listener,
                d = a.ob || a.src;
            a.kb && of (a);
            return c.call(d, b)
        },
        mf = function(a, b) {
            if (a.Ya) return !0;
            if (!Ne) {
                var c = b || va("window.event");
                b = new Re(c, this);
                var d = !0;
                if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                    a: {
                        var e = !1;
                        if (0 == c.keyCode) try {
                            c.keyCode = -1;
                            break a
                        } catch (g) {
                            e = !0
                        }
                        if (e || void 0 == c.returnValue) c.returnValue = !0
                    }
                    c = [];
                    for (e = b.g; e; e = e.parentNode) c.push(e);a = a.type;
                    for (e = c.length - 1; 0 <=
                        e; e--) {
                        b.g = c[e];
                        var f = qf(c[e], a, !0, b);
                        d = d && f
                    }
                    for (e = 0; e < c.length; e++) b.g = c[e],
                    f = qf(c[e], a, !1, b),
                    d = d && f
                }
                return d
            }
            return pf(a, new Re(b, this))
        },
        jf = function(a) {
            a = a[bf];
            return a instanceof Xe ? a : null
        },
        rf = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
        gf = function(a) {
            if (w(a)) return a;
            a[rf] || (a[rf] = function(b) {
                return a.handleEvent(b)
            });
            return a[rf]
        };
    var O = function() {
        yd.call(this);
        this.F = new Xe(this);
        this.Db = this;
        this.Na = null
    };
    y(O, yd);
    O.prototype[Se] = !0;
    O.prototype.addEventListener = function(a, b, c, d) {
        ff(this, a, b, c, d)
    };
    O.prototype.removeEventListener = function(a, b, c, d) {
        nf(this, a, b, c, d)
    };
    var P = function(a, b) {
        var c, d = a.Na;
        if (d)
            for (c = []; d; d = d.Na) c.push(d);
        a = a.Db;
        d = b.type || b;
        if (q(b)) b = new Bd(b, a);
        else if (b instanceof Bd) b.target = b.target || a;
        else {
            var e = b;
            b = new Bd(d, a);
            Ib(b, e)
        }
        e = !0;
        if (c)
            for (var f = c.length - 1; 0 <= f; f--) {
                var g = b.g = c[f];
                e = sf(g, d, !0, b) && e
            }
        g = b.g = a;
        e = sf(g, d, !0, b) && e;
        e = sf(g, d, !1, b) && e;
        if (c)
            for (f = 0; f < c.length; f++) g = b.g = c[f], e = sf(g, d, !1, b) && e
    };
    O.prototype.O = function() {
        O.ea.O.call(this);
        if (this.F) {
            var a = this.F,
                b = 0,
                c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++) ++b, We(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.Na = null
    };
    O.prototype.h = function(a, b, c, d) {
        return Ze(this.F, String(a), b, !1, c, d)
    };
    O.prototype.B = function(a, b, c, d) {
        var e = this.F;
        a = String(a).toString();
        if (a in e.g) {
            var f = e.g[a];
            b = Ye(f, b, c, d); - 1 < b ? (We(f[b]), Array.prototype.splice.call(f, b, 1), 0 == f.length && (delete e.g[a], e.h--), e = !0) : e = !1
        } else e = !1;
        return e
    };
    var sf = function(a, b, c, d) {
        b = a.F.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Ya && g.capture == c) {
                var k = g.listener,
                    l = g.ob || g.src;
                g.kb && $e(a.F, g);
                e = !1 !== k.call(l, d) && e
            }
        }
        return e && 0 != d.Nc
    };
    var tf = function(a, b) {
        O.call(this);
        this.o = a || 1;
        this.l = b || m;
        this.A = x(this.D, this);
        this.C = Ha()
    };
    y(tf, O);
    tf.prototype.w = !1;
    tf.prototype.g = null;
    tf.prototype.D = function() {
        if (this.w) {
            var a = Ha() - this.C;
            0 < a && a < .8 * this.o ? this.g = this.l.setTimeout(this.A, this.o - a) : (this.g && (this.l.clearTimeout(this.g), this.g = null), P(this, "tick"), this.w && (this.g = this.l.setTimeout(this.A, this.o), this.C = Ha()))
        }
    };
    tf.prototype.start = function() {
        this.w = !0;
        this.g || (this.g = this.l.setTimeout(this.A, this.o), this.C = Ha())
    };
    var uf = function(a) {
        a.w = !1;
        a.g && (a.l.clearTimeout(a.g), a.g = null)
    };
    tf.prototype.O = function() {
        tf.ea.O.call(this);
        uf(this);
        delete this.l
    };
    var vf = function(a, b, c) {
        if (w(a)) c && (a = x(a, c));
        else if (a && "function" == typeof a.handleEvent) a = x(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : m.setTimeout(a, b || 0)
    };
    var wf = function(a) {
        return gb(a, function(a) {
            a = a.toString(16);
            return 1 < a.length ? a : "0" + a
        }).join("")
    };
    var xf = E("Firefox"),
        yf = lc() || E("iPod"),
        zf = E("iPad"),
        Af = E("Android") && !(Xb() || E("Firefox") || E("Opera") || E("Silk")),
        Bf = Xb(),
        Cf = Yb() && !mc();
    var Df = null,
        Ef = null;
    var Ff = function() {
        this.h = -1
    };
    var If = function(a) {
            var b = [];
            Gf(new Hf, a, b);
            return b.join("")
        },
        Hf = function() {},
        Gf = function(a, b, c) {
            if (null == b) c.push("null");
            else {
                if ("object" == typeof b) {
                    if (za(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++) c.push(e), Gf(a, d[f], c), e = ",";
                        c.push("]");
                        return
                    }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                    else {
                        c.push("{");
                        e = "";
                        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), Jf(d, c), c.push(":"), Gf(a, f, c), e = ","));
                        c.push("}");
                        return
                    }
                }
                switch (typeof b) {
                    case "string":
                        Jf(b, c);
                        break;
                    case "number":
                        c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                        break;
                    case "boolean":
                        c.push(String(b));
                        break;
                    case "function":
                        c.push("null");
                        break;
                    default:
                        throw Error("Unknown type: " + typeof b);
                }
            }
        },
        Kf = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        Lf = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        Jf = function(a, b) {
            b.push('"', a.replace(Lf, function(a) {
                var b =
                    Kf[a];
                b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Kf[a] = b);
                return b
            }), '"')
        };
    var Mf = function() {
        this.g = {};
        return this
    };
    Mf.prototype.set = function(a, b) {
        this.g[a] = b
    };
    var Nf = function(a, b) {
        a.g.eb = Fb(a.g, "eb", 0) | b
    };
    Mf.prototype.get = function(a) {
        return Fb(this.g, a, null)
    };
    var Of = function(a, b) {
        var c = 0;
        Ab(J(), "ima", "video", "client", "tagged") && (c = 1);
        var d = null;
        a && (d = a());
        if (d) {
            a = Ie();
            a.g = {};
            var e = new Fe(32, !0);
            e.o = !1;
            Je(a, e);
            e = J().document;
            e = e.webkitVisibilityState || e.mozVisibilityState || e.visibilityState || e.msVisibilityState || "";
            Je(a, new Fe(64, "hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1));
            try {
                var f = J().top;
                try {
                    var g = !!f.location.href || "" === f.location.href
                } catch (v) {
                    g = !1
                }
                if (g) {
                    var k = Be(d);
                    var l = k && 0 != k.length ? "1" : "0"
                } else l = "2"
            } catch (v) {
                l = "2"
            }
            Je(a, new Fe(256,
                "2" == l));
            Je(a, new Fe(128, "1" == l));
            k = g = J().top;
            "2" == l && (k = J());
            f = Le(d, k);
            Je(a, new Ge("er", f));
            try {
                var n = k.document && !k.document.body ? null : Oc(k || window)
            } catch (v) {
                n = null
            }
            n ? (k = Pc(Lc(k.document).g), Je(a, new Fe(16384, !!k)), n = k ? new Yc(k.x, k.y, n.width, n.height) : null) : n = null;
            Je(a, new Ge("vi", n));
            if (n && "1" == l) {
                l = Be(d);
                d = [];
                for (k = 0; k < l.length; k++)(e = Le(l[k], g)) && d.push(e);
                d.push(n);
                n = Ke(d)
            }
            Me(a, f, n);
            a.h && (l = ze() - a.h, Je(a, new Ee("ts", l)));
            a.h = ze()
        } else a = Ie(), a.g = {}, a.h = ze(), Je(a, new Fe(32, !1));
        this.l = a;
        this.g =
            new Mf;
        this.g.set("ve", 4);
        c && Nf(this.g, 1);
        Ab(J(), "ima", "video", "client", "crossdomainTag") && Nf(this.g, 4);
        Ab(J(), "ima", "video", "client", "sdkTag") && Nf(this.g, 8);
        Ab(J(), "ima", "video", "client", "jsTag") && Nf(this.g, 2);
        b && Fb(b, "fullscreen", !1) && Nf(this.g, 16);
        this.h = b = null;
        if (c && (c = Ab(J(), "ima", "video", "client"), c.getEData)) {
            this.h = c.getEData();
            if (c = Ab(J(), "ima", "video", "client", "getLastSnapshotFromTop"))
                if (a = c()) this.h.extendWithDataFromTopIframe(a.tagstamp, a.playstamp, a.lactstamp), c = this.l, b = a.er, a = a.vi,
                    b && a && (b = He(b).g(), a = He(a).g(), l = null, Fb(c.g, "er", null) && (l = Fb(c.g, "er", null).g(), l.top += b.top, l.left += b.left, Je(c, new Ge("er", l))), Fb(c.g, "vi", null) && (n = Fb(c.g, "vi", null).g(), n.top += b.top, n.left += b.left, d = [], d.push(n), d.push(b), d.push(a), b = Ke(d), Me(c, l, b), Je(c, new Ge("vi", a))));
            a: {
                if (this.h) {
                    if (this.h.getTagLoadTimestamp) {
                        b = this.h.getTagLoadTimestamp();
                        break a
                    }
                    if (this.h.getTimeSinceTagLoadSeconds) {
                        b = this.h.getTimeSinceTagLoadSeconds();
                        break a
                    }
                }
                b = null
            }
        }
        this.g.set("td", ze() - Ae(b))
    };
    var Pf = new tf(200),
        Qf = function(a, b) {
            try {
                var c = new Of(a, b);
                a = [];
                var d = Number(c.g.get("eb")),
                    e = c.g.g;
                "eb" in e && delete e.eb;
                var f, g = c.g;
                e = [];
                for (var k in g.g) e.push(k + g.g[k]);
                (f = e.join("_")) && a.push(f);
                if (c.h) {
                    var l = c.h.serialize();
                    l && a.push(l)
                }
                var n, v = c.l;
                f = d;
                g = [];
                f || (f = 0);
                for (var G in v.g) {
                    var W = v.g[G];
                    if (W instanceof Fe) W.g() && (f |= W.w);
                    else {
                        var u, B = v.g[G];
                        (u = B.o ? B.l() : "") && g.push(G + u)
                    }
                }
                g.push("eb" + String(f));
                (n = g.join("_")) && a.push(n);
                c.g.set("eb", d);
                return a.join("_")
            } catch (ia) {
                return "tle;" + Ua(ia.name,
                    12) + ";" + Ua(ia.message, 40)
            }
        },
        Rf = function(a, b) {
            ff(Pf, "tick", function() {
                var c = Qf(b);
                a(c)
            });
            Pf.start();
            P(Pf, "tick")
        };
    var Sf = {
            currentTime: 1,
            duration: 2,
            isVpaid: 4,
            volume: 8,
            isYouTube: 16,
            isPlaying: 32
        },
        Cb = {
            cc: "start",
            FIRST_QUARTILE: "firstquartile",
            MIDPOINT: "midpoint",
            THIRD_QUARTILE: "thirdquartile",
            COMPLETE: "complete",
            cd: "metric",
            bc: "pause",
            ed: "resume",
            SKIPPED: "skip",
            VIEWABLE_IMPRESSION: "viewable_impression",
            dd: "mute",
            hd: "unmute",
            FULLSCREEN: "fullscreen",
            $c: "exitfullscreen",
            ad: "fully_viewable_audible_half_duration_impression",
            bd: "measurable_impression",
            Wc: "abandon",
            Zc: "engagedview",
            IMPRESSION: "impression",
            Yc: "creativeview",
            LOADED: "loaded",
            Og: "progress",
            gg: "close",
            hg: "collapse",
            Ig: "overlay_resize",
            Jg: "overlay_unmeasurable_impression",
            Kg: "overlay_unviewable_impression",
            Mg: "overlay_viewable_immediate_impression",
            Lg: "overlay_viewable_end_of_session_impression"
        },
        Tf = "start firstquartile midpoint thirdquartile resume loaded".split(" "),
        Uf = ["start", "firstquartile", "midpoint", "thirdquartile"],
        Vf = ["abandon"],
        Wf = {
            Zg: -1,
            cc: 0,
            FIRST_QUARTILE: 1,
            MIDPOINT: 2,
            THIRD_QUARTILE: 3,
            COMPLETE: 4,
            cd: 5,
            bc: 6,
            ed: 7,
            SKIPPED: 8,
            VIEWABLE_IMPRESSION: 9,
            dd: 10,
            hd: 11,
            FULLSCREEN: 12,
            $c: 13,
            ad: 14,
            bd: 15,
            Wc: 16,
            Zc: 17,
            IMPRESSION: 18,
            Yc: 19,
            LOADED: 20
        };
    var Xf = function() {
        this.g = []
    };
    xa(Xf);
    var Yf = function(a, b) {
        null !== a && a != a.top && (a = a.top);
        try {
            return a.document && !a.document.body ? new I(-1, -1) : (void 0 === b ? 0 : b) ? (new I(a.innerWidth, a.innerHeight)).round() : Oc(a || window).round()
        } catch (c) {
            return new I(-12245933, -12245933)
        }
    };
    var Zf = function(a, b) {
            this.h = a || 0;
            this.g = b || ""
        },
        $f = function(a) {
            return !!a.h || !!a.g
        };
    Zf.prototype.toString = function() {
        return this.h + (this.g ? "-" : "") + this.g
    };
    Zf.prototype.matches = function(a) {
        return this.g || a.g ? this.g == a.g : this.h || a.h ? this.h == a.h : !1
    };
    var ag = function() {};
    ag.prototype.g = function() {
        return null
    };
    var bg = function() {
        this.g = {};
        this.l = !0;
        this.h = {}
    };
    bg.prototype.reset = function() {
        this.g = {};
        this.l = !0;
        this.h = {}
    };
    var cg = function() {
        this.l = this.o = this.g = this.h = this.w = 0
    };
    var dg = Ha(),
        eg = -1,
        fg = -1,
        gg, hg = -1,
        ig = !1,
        jg = function() {
            return Ha() - dg
        },
        kg = function(a) {
            var b = 0 <= fg ? jg() - fg : -1,
                c = ig ? jg() - eg : -1,
                d = 0 <= hg ? jg() - hg : -1;
            if (79463068 == a) return 500;
            if (947190542 == a) return 100;
            if (79463069 == a) return 200;
            a = [2E3, 4E3];
            var e = [250, 500, 1E3];
            var f = b; - 1 != c && c < b && (f = c);
            for (b = 0; b < a.length; ++b)
                if (f < a[b]) {
                    var g = e[b];
                    break
                }
            void 0 === g && (g = e[a.length]);
            return -1 != d && 1500 < d && 4E3 > d ? 500 : g
        };
    var lg = function(a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.line = b.line || -1;
        this.msg = b.message || "";
        this.file = b.file || "";
        this.id = b.id || "jserror";
        this.meta = c
    };
    var mg = function(a, b, c, d) {
        if (Math.random() < (d || a.g)) try {
            if (c instanceof ne) var e = c;
            else e = new ne, gc(c, function(a, b) {
                var c = e,
                    d = c.A++;
                a = oe(b, a);
                c.g.push(d);
                c.h[d] = a
            });
            var f = te(e, a.o, a.h, a.l + b + "&");
            f && nd(m, f)
        } catch (g) {}
    };
    var ng = null;
    var og = function() {
            var a = m.performance;
            return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Ha()
        },
        pg = function() {
            var a = m.performance;
            return a && a.now ? a.now() : null
        };
    var qg = function(a, b, c) {
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = 0;
        this.uniqueId = this.label + "_" + this.type + "_" + Math.random();
        this.slotId = void 0
    };
    var rg = m.performance,
        sg = !!(rg && rg.mark && rg.measure && rg.clearMarks),
        tg = id(function() {
            var a;
            if (a = sg) {
                if (null === ng) {
                    ng = "";
                    try {
                        var b = m.top.location.hash;
                        if (b) {
                            var c = b.match(/\bdeid=([\d,]+)/);
                            ng = c ? c[1] : ""
                        }
                    } catch (d) {}
                }
                a = ng;
                a = !!a.indexOf && 0 <= a.indexOf("1337")
            }
            return a
        }),
        ug = function(a, b) {
            this.events = [];
            this.h = b || m;
            var c = null;
            b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [], this.events = b.google_js_reporting_queue, c = b.google_measure_js_timing);
            this.g = tg() || (null != c ? c : Math.random() < a)
        },
        vg = function(a) {
            a &&
                tg() && (rg.clearMarks("goog_" + a.uniqueId + "_start"), rg.clearMarks("goog_" + a.uniqueId + "_end"))
        };
    ug.prototype.start = function(a, b) {
        if (!this.g) return null;
        var c = pg() || og();
        a = new qg(a, b, c);
        b = "goog_" + a.uniqueId + "_start";
        tg() && rg.mark(b);
        return a
    };
    var wg = function(a, b, c, d) {
            this.o = a;
            this.B = b;
            this.l = c;
            this.w = this.g;
            this.h = void 0 === d ? null : d
        },
        yg = function(a, b, c, d, e) {
            try {
                if (a.h && a.h.g) {
                    var f = a.h.start(b.toString(), 3);
                    var g = c();
                    var k = a.h;
                    c = f;
                    if (k.g && r(c.value)) {
                        var l = pg() || og();
                        c.duration = l - c.value;
                        var n = "goog_" + c.uniqueId + "_end";
                        tg() && rg.mark(n);
                        k.g && k.events.push(c)
                    }
                } else g = c()
            } catch (G) {
                k = a.l;
                try {
                    vg(f);
                    var v = xg(G);
                    k = (e || a.w).call(a, b, v, void 0, d)
                } catch (W) {
                    a.g(217, W)
                }
                if (!k) throw G;
            }
            return g
        },
        Ag = function(a, b, c, d) {
            var e = zg;
            return function(f) {
                for (var g = [], k = 0; k < arguments.length; ++k) g[k - 0] = arguments[k];
                return yg(e, a, function() {
                    return b.apply(c, g)
                }, d, void 0)
            }
        };
    wg.prototype.g = function(a, b, c, d, e) {
        e = e || this.B;
        try {
            var f = new ne;
            f.w = !0;
            re(f, 1, "context", a);
            b.error && b.meta && b.id || (b = xg(b));
            b.msg && re(f, 2, "msg", b.msg.substring(0, 512));
            b.file && re(f, 3, "file", b.file);
            0 < b.line && re(f, 4, "line", b.line);
            var g = b.meta || {};
            if (d) try {
                d(g)
            } catch (l) {}
            b = [g];
            f.g.push(5);
            f.h[5] = b;
            var k = me();
            k.h && re(f, 6, "top", k.h.url || "");
            re(f, 7, "url", k.g.url || "");
            mg(this.o, e, f, c)
        } catch (l) {
            try {
                mg(this.o, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Bg(l),
                    url: k.g.url
                }, c)
            } catch (n) {}
        }
        return this.l
    };
    var xg = function(a) {
            return new Cg(Bg(a), a.fileName, a.lineNumber)
        },
        Bg = function(a) {
            var b = a.toString();
            a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
            a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
            if (a.stack) {
                a = a.stack;
                var c = b;
                try {
                    -1 == a.indexOf(c) && (a = c + "\n" + a);
                    for (var d; a != d;) d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    b = a.replace(/\n */g, "\n")
                } catch (e) {
                    b = c
                }
            }
            return b
        },
        Cg = function(a, b, c) {
            lg.call(this, Error(a), {
                message: a,
                file: void 0 === b ? "" : b,
                line: void 0 === c ? -1 : c
            })
        };
    ha(Cg, lg);
    var zg, Dg = qd(),
        Eg = new ug(1, Dg),
        Fg = function() {
            Dg.google_measure_js_timing || (Eg.g = !1, Eg.events != Eg.h.google_js_reporting_queue && (tg() && A(Eg.events, vg), Eg.events.length = 0))
        };
    zg = new wg(new function() {
        var a = void 0 === a ? z : a;
        this.o = "http:" === a.location.protocol ? "http:" : "https:";
        this.h = "pagead2.googlesyndication.com";
        this.l = "/pagead/gen_204?id=";
        this.g = .01
    }, "jserror", !0, Eg);
    "complete" == Dg.document.readyState ? Fg() : Eg.g && ld(Dg, "load", function() {
        Fg()
    });
    var Hg = function(a, b) {
            return yg(zg, a, b, void 0, Gg)
        },
        Ig = function(a, b, c, d) {
            return Ag(a, b, c, d)
        },
        Gg = zg.g,
        Jg = function(a, b) {
            zg.g(a, b, void 0, void 0)
        };
    if (Ia && Ia.URL) {
        var jc = Ia.URL,
            Kg = !(jc && 0 < kc().length);
        zg.l = Kg
    }
    var Lg = function(a, b, c, d) {
        c = Ag(d, c, void 0, void 0);
        ld(a, b, c, {
            capture: !1
        });
        return c
    };
    var Mg = function(a) {
        return {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0
    };
    var Ng = {},
        Og = null;
    Ng.le = 0;
    Ng.nt = 2;
    Ng.Fr = 3;
    Ng.Po = 5;
    Ng.me = 1;
    Ng.om = 4;
    var Pg = function() {
        var a = z && z.document;
        Ng.e = -1;
        Ng.i = 6;
        Ng.n = 7;
        Ng.t = 8;
        if (!Og) {
            var b = [];
            gc(Ng, function(a, c) {
                b[a + 1] = c
            });
            var c = b.join(""),
                d = a && a[c];
            Og = d && function(b, c) {
                return d.call(a, b, c)
            }
        }
        return Og
    };
    var Qg = function(a, b) {
            a && (a.h && (b[4] = a.h), a.g && (b[12] = a.g))
        },
        Rg = function(a) {
            var b = [];
            vb(a, function(a, d) {
                d = encodeURIComponent(d);
                q(a) && (a = encodeURIComponent(a));
                b.push(d + "=" + a)
            });
            b.push("24=" + Ha());
            return b.join("\n")
        };
    var Sg = function() {
            var a = Rc("DIV");
            a.style.cssText = "position:relative;left:0px;top:0px;width:0;height:0;";
            return a
        },
        Vg = function(a) {
            return Tg(a, function(a, c) {
                return !(!cc(c, "style") || !c.style || "none" !== bd(c, "display"))
            }, function(a) {
                return a
            }, !1) ? !0 : Ug(a)
        },
        Ug = function(a) {
            var b = !F || Ec(8);
            return Tg(a, function(a, d) {
                a = cc(d, "style") && d.style && bd(d, "visibility");
                return {
                    hidden: "hidden" === a,
                    visible: b && "visible" === a
                }
            }, function(a) {
                return a.hidden || a.visible
            }, {
                hidden: !1,
                visible: !1
            }).hidden
        },
        Tg = function(a, b, c, d) {
            if (!a) return d;
            d = Wg(a, b, c, d);
            if (!d.done) try {
                var e = Kc(a),
                    f = e && J(e);
                return Tg(f && f.frameElement, b, c, d.value)
            } catch (g) {}
            return d.value
        },
        Wg = function(a, b, c, d) {
            if (!a) return {
                value: d,
                done: !1
            };
            d = b(d, a);
            var e = c(d, a);
            if (!e && cc(a, "parentElement")) {
                e = Wg;
                a: {
                    var f;
                    if (Ic && !(F && Ec("9") && !Ec("10") && m.SVGElement && a instanceof m.SVGElement) && (f = a.parentElement)) {
                        a = f;
                        break a
                    }
                    f = a.parentNode;a = Ba(f) && 1 == f.nodeType ? f : null
                }
                b = e(a, b, c, d)
            } else b = {
                done: e,
                value: d
            };
            return b
        },
        Xg = function(a) {
            return new K(a.top, a.right, a.bottom, a.left)
        },
        Yg = function(a) {
            return null !=
                a && 0 <= a && 1 >= a
        },
        Zg = function(a, b) {
            return null === a || null === b ? new K(0, 0, 0, 0) : new K(Math.max(a.top, b.top), Math.min(a.right, b.right), Math.min(a.bottom, b.bottom), Math.max(a.left, b.left))
        };
    var bh = function() {
            this.g = new cg;
            var a = J();
            $g(this, a, document);
            var b = ah();
            try {
                if ("1" == b) {
                    for (var c = a.parent; c != a.top; c = c.parent) $g(this, c, c.document);
                    $g(this, a.top, a.top.document)
                }
            } catch (d) {}
        },
        ah = function() {
            var a = document.documentElement;
            try {
                if (!fc(J().top)) return "2";
                var b = [],
                    c = J(a.ownerDocument);
                for (a = c; a != c.top; a = a.parent)
                    if (a.frameElement) b.push(a.frameElement);
                    else break;
                return b && 0 != b.length ? "1" : "0"
            } catch (d) {
                return "2"
            }
        },
        $g = function(a, b, c) {
            Lg(c, "mousedown", function() {
                    var b = a.g;
                    1E5 < b.h || (b.h += 1)
                },
                301);
            Lg(b, "scroll", function() {
                var b = a.g;
                1E5 < b.g || (b.g += 1)
            }, 302);
            Lg(c, "touchmove", function() {
                var b = a.g;
                1E5 < b.g || (b.g += 1)
            }, 303);
            Lg(c, "mousemove", function() {
                var b = a.g;
                1E5 < b.o || (b.o += 1)
            }, 304);
            Lg(c, "keydown", function() {
                var b = a.g;
                1E5 < b.l || (b.l += 1)
            }, 305)
        };
    var ch = function() {
        if (sc) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec(D)) ? a[1] : "0"
        }
        return rc ? (a = /10[_.][0-9_.]+/, (a = a.exec(D)) ? a[0].replace(/_/g, ".") : "10") : tc ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(D)) ? a[1] : "") : uc || vc || wc ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(D)) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var dh = function(a) {
        a = void 0 === a ? !1 : a;
        var b;
        if (b = xc) b = 0 <= $a(ch, 9);
        var c = Cf && Ec(601);
        return !a && (b || c)
    };
    var eh = function() {
            this.g = 0;
            this.B = !1;
            this.h = -1;
            this.sa = !1
        },
        fh = function(a) {
            return a.sa ? .3 <= a.g : .5 <= a.g
        };
    var gh = function() {
        eh.call(this);
        this.l = !1;
        this.volume = void 0;
        this.w = !1;
        this.o = -1
    };
    ha(gh, eh);
    var hh = function(a) {
        return Yg(a.volume) && .1 <= a.volume
    };
    var ih = function() {
            var a = {};
            this.h = (a.vs = [1, 0], a.vw = [0, 1], a.am = [2, 2], a.a = [4, 4], a.f = [8, 8], a.bm = [16, 16], a.b = [32, 32], a.avw = [0, 64], a.cm = [128, 128], a.pv = [256, 256], a.gdr = [0, 512], a.p = [0, 1024], a.r = [0, 2048], a.m = [0, 4096], a.um = [0, 8192], a.ef = [0, 16384], a.s = [0, 32768], a.pmx = [0, 16777216], a);
            this.g = {};
            for (var b in this.h) 0 < this.h[b][1] && (this.g[b] = 0);
            this.l = 0
        },
        jh = function(a, b) {
            var c = a.h[b],
                d = c[1];
            a.l += c[0];
            0 < d && 0 == a.g[b] && (a.g[b] = 1)
        },
        lh = function(a) {
            return kh(a, zb(a.h))
        },
        kh = function(a, b) {
            var c = 0,
                d;
            for (d in a.g) C(b, d) &&
                1 == a.g[d] && (c += a.h[d][1], a.g[d] = 2);
            return c
        },
        mh = function(a) {
            var b = 0,
                c;
            for (c in a.g) {
                var d = a.g[c];
                if (1 == d || 2 == d) b += a.h[c][1]
            }
            return b
        };
    var nh = function(a) {
        this.h = this.l = 0;
        this.o = a
    };
    nh.prototype.g = function() {
        return this.l
    };
    var oh = function(a, b, c) {
        b >= a.o || (a.h & 1 << b && !c ? a.l &= ~(1 << b) : a.h & 1 << b || !c || (a.l |= 1 << b), a.h |= 1 << b)
    };
    var ph = function() {
            this.g = this.l = this.o = this.h = 0
        },
        qh = function(a, b, c, d) {
            b && (a.h += c, a.g += c, a.o += c, a.l = Math.max(a.l, a.o));
            if (void 0 === d ? !b : d) a.o = 0
        };
    var rh = function() {
        this.T = [0, 0, 0, 0, 0];
        this.l = [0, 0, 0, 0, 0];
        this.M = [0, 0, 0, 0, 0];
        this.Z = new ph;
        this.N = this.w = -1;
        this.ga = 1E3
    };
    rh.prototype.I = function(a, b, c, d, e, f) {
        e = sh(c.g);
        var g = sh(b.g);
        g = -1 == e || -1 == g ? -1 : Math.max(e, g);
        e = d ? g : e;
        this.w = -1 != this.w ? Math.min(this.w, b.g) : b.g;
        f && (this.N = Math.max(this.N, b.g)); - 1 != e && (this.T[e] += a);
        th(this.M, e, a);
        f = this.l;
        g = this.M;
        for (var k = [0, 0, 0, 0, 0], l = 0; 4 >= l; l++) k[l] = Math.max(f[l], g[l]);
        this.l = k;
        f = this.M;
        g = sh(b.g);
        for (k = 0; 4 >= k; ++k)
            if (k < g || b.B || -1 == g) f[k] = 0;
        qh(this.Z, d || c.sa != b.sa ? fh(c) && fh(b) : fh(c), a, !fh(b));
        return e
    };
    rh.prototype.Fa = function() {
        return this.Z.l >= this.ga
    };
    var th = function(a, b, c) {
            for (; 0 <= b && 4 >= b; b++) a[b] += c
        },
        sh = function(a) {
            var b = -1;
            1 <= a ? b = 0 : .75 <= a ? b = 1 : .5 <= a ? b = 2 : .3 <= a ? b = 3 : 0 < a && (b = 4);
            return b
        };
    var uh = function() {
        rh.call(this);
        this.h = new ph;
        this.W = this.G = this.J = this.R = 0;
        this.B = -1;
        this.ha = new ph;
        this.A = new ph;
        this.F = this.D = this.C = 0;
        this.K = [0, 0, 0, 0, 0];
        this.o = this.g = -1;
        this.L = new ph;
        this.ga = 2E3;
        this.P = new nh(32);
        this.fa = new nh(32);
        this.aa = new nh(32)
    };
    ha(uh, rh);
    var vh = function(a, b, c) {
        var d = a.W;
        ig || c || -1 == a.B || (d += b - a.B);
        return d
    };
    uh.prototype.I = function(a, b, c, d, e, f) {
        if (b.w) return -1;
        d = rh.prototype.I.call(this, a, b, c, d, e, f);
        e = sh(e);
        e = -1 != d && d <= e;
        f = hh(b) && hh(c);
        Yg(b.volume) && (this.g = -1 != this.g ? Math.min(this.g, b.volume) : b.volume, this.o = Math.max(this.o, b.volume));
        e && (this.R += a, this.J += a);
        0 == d && (this.G += a);
        f && (th(this.K, d, a), 0 == d && (this.F += a), e && (this.C += a, this.D += a));
        qh(this.h, !0, a);
        qh(this.A, f, a);
        qh(this.L, c.l, a);
        qh(this.ha, f && !e, a);
        a = Math.floor(b.o / 1E3);
        oh(this.P, a, fh(b));
        oh(this.fa, a, 1 <= b.g);
        oh(this.aa, a, hh(b));
        return d
    };
    var wh = function(a, b) {
            this.h = null;
            this.B = a;
            this.F = b || 1
        },
        xh = function(a, b) {
            var c = b.right - b.left;
            b = b.bottom - b.top;
            var d = Math.floor(c / 2),
                e = Math.floor(b / 2);
            switch (a.F) {
                case 4:
                    return a.B ? (a = Math.floor(.3 * c), d = Math.floor(.3 * b), [new H(a, d), new H(c - a, d), new H(a, b - d), new H(c - a, b - d)]) : [new H(d, 0), new H(0, e), new H(d, b - 1), new H(c - 1, e)];
                case 3:
                    return [new H(c - 1, 0), new H(d, e), new H(0, b - 1)];
                default:
                    return [new H(d, e)]
            }
        },
        yh = function(a, b) {
            if (void 0 === b) try {
                b = a.h.getBoundingClientRect()
            } catch (c) {
                b = new K(0, 0, 0, 0)
            }
            a = xh(a,
                b);
            A(a, function(a) {
                a.x += b.left;
                a.y += b.top
            });
            return a
        },
        zh = function(a, b, c) {
            this.l = a;
            this.h = b;
            this.g = c
        },
        Ah = function(a, b) {
            wh.call(this, a, b);
            this.g = [];
            this.w = !1;
            this.o = 0;
            this.l = -1
        };
    ha(Ah, wh);
    var Eh = function(a, b) {
            var c = b.getBoundingClientRect(),
                d = "DIV" == b.tagName || "INS" == b.tagName,
                e = Kc(b),
                f = !0,
                g = a.g;
            if (d) {
                var k = Sg();
                c = xh(a, c);
                b.insertBefore(k, b.childNodes[0] || null);
                A(c, function(a) {
                    var b = new Bh(e);
                    g.push(b);
                    var c;
                    if (c = f)
                        if (b.g) {
                            b.g.style.position = "absolute";
                            Ch(b, a);
                            a = !0;
                            try {
                                k.appendChild(b.g)
                            } catch (G) {
                                a = !1
                            }
                            c = a
                        } else c = !1;
                    f = c
                })
            } else c = yh(a, c), A(c, function(a) {
                var c = new Bh(e);
                g.push(c);
                var d;
                if (d = f)
                    if (c.g && b.parentNode) {
                        c.g.style.position = "fixed";
                        Ch(c, a);
                        a = !0;
                        try {
                            b.parentNode && b.parentNode.insertBefore(c.g,
                                b.nextSibling)
                        } catch (G) {
                            a = !1
                        }
                        d = a
                    } else d = !1;
                f = d
            });
            f ? (a.h = b, a.w = !d && !1) : (A(g, function(a) {
                Dh(a)
            }), a.g = []);
            return f
        },
        Fh = function(a) {
            if (a.h && a.w) {
                var b = yh(a);
                A(b, function(a, b) {
                    this.g[b] && Ch(this.g[b], a)
                }, a)
            }
        },
        Gh = function(a) {
            A(a.g, function(a) {
                Dh(a)
            });
            a.g = []
        },
        Lh = function(a) {
            var b = Ha(),
                c = a.o ? b - a.o : 0,
                d = kb(a.g, function(a) {
                    return 50 > b - a.h - a.l
                });
            d = 4 == a.g.length ? a.B ? Hh[d] : Ih[d] : 3 == a.g.length ? Jh[d] : 1 == a.g.length ? Kh[d] : -1;
            c = new zh(d, a.l, c);
            a.l = d;
            a.o = b;
            Fh(a);
            return c
        },
        Hh = [3, 7, 8, 5, 5],
        Ih = [3, 4, 4, 5, 6],
        Jh = [3, 4, 5, 6],
        Kh = [3, 5],
        Bh = function(a) {
            this.g = null;
            this.l = this.h = 0;
            Mh(this, a)
        },
        Mh = function(a, b) {
            var c = b.createElement("iframe");
            c.srcdoc = "";
            c.frameBorder = 0;
            c.style.width = "1px";
            c.style.height = "1px";
            c.style.opacity = "0";
            c.style.zIndex = -999999;
            a.g = c;
            var d = Ag(245, a.o, a, void 0);
            c.addEventListener("load", Ig(244, function() {
                c.contentWindow.requestAnimationFrame(d)
            }))
        };
    Bh.prototype.o = function(a) {
        this.g && this.g.contentWindow && (this.g.contentWindow.requestAnimationFrame(Ag(245, this.o, this, void 0)), this.h || (this.h = Ha() - a), this.l = a)
    };
    var Ch = function(a, b) {
            var c;
            if (c = a.g) c = a.g, c = new H(c.offsetLeft, c.offsetTop), c = !(b == c || b && c && b.x == c.x && b.y == c.y);
            c && (a = a.g, b instanceof H ? (c = b.x, b = b.y) : (c = b, b = void 0), a.style.left = fd(c), a.style.top = fd(b))
        },
        Dh = function(a) {
            try {
                Tc(a.g)
            } catch (b) {}
            a.g = null
        };
    var Q = function() {
        this.D = !1;
        this.B = void 0;
        this.h = !fc(z.top);
        var a = le();
        a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(sd)[3] || null) ? decodeURI(a) : a) || "" : "";
        this.domain = a;
        this.o = this.A = this.F = this.g = null;
        this.L = 0;
        this.l = !1;
        this.w = null;
        this.C = 0;
        this.U = "geo";
        this.bb = new bg;
        this.bb.g.nio2 = new ag;
        this.bb.g.opac = new ag
    };
    xa(Q);
    var Nh = new K(0, 0, 0, 0),
        Oh = {
            threshold: [0, .3, .5, .75, 1]
        },
        Ph = function(a, b, c) {
            this.position = Nh.clone();
            this.va = 0;
            this.Pb = this.lb();
            this.Ob = -2;
            this.Tf = Ha();
            this.Rc = -1;
            this.Xa = b;
            this.Ia = -1 != b;
            this.yb = null;
            this.opacity = -1;
            this.Lc = c;
            this.Sc = this.Qb = wa;
            this.Ea = this.element = a;
            this.Ka = null;
            this.Yb = this.Wa = !1;
            this.Cb = 1;
            this.Wb = !0;
            this.ra = !1;
            Q.H().L++;
            this.domain = null;
            this.Ac = 0;
            this.da = this.Fb();
            this.Qc = -1;
            this.zb = new K(0, 0, 0, 0);
            this.bb = new bg
        };
    Ph.prototype.lb = function() {
        return new rh
    };
    Ph.prototype.oa = function() {
        return this.Pb
    };
    var Qh = function(a, b, c, d, e) {
            if (a.Ia) {
                var f = z.innerWidth,
                    g = z.innerHeight,
                    k = new K(Math.round(z.mozInnerScreenY), Math.round(z.mozInnerScreenX + f), Math.round(z.mozInnerScreenY + g), Math.round(z.mozInnerScreenX));
                c = new K(z.screenY + d, z.screenX + c.width, z.screenY + c.height, z.screenX);
                e || (d = new K(k.top - c.top, k.right - c.left, k.bottom - c.top, k.left - c.left), d.top > a.position.top ? a.position = d : (a.position.right = a.position.left + f, a.position.bottom = a.position.top + g), a.va = f * g);
                a.Ca(k, c, b, e, !0, !0)
            }
        },
        Th = function(a, b, c) {
            if (a.Ia) {
                var d =
                    Pg();
                if (d) {
                    c || Rh(a, z, !0);
                    if (a.sa() || a.Yb) {
                        var e = Sh(a, d);
                        d = !0
                    } else {
                        e = Math.floor((a.position.left + a.position.right) / 2);
                        var f = Math.floor((a.position.top + a.position.bottom) / 2),
                            g = Pc(document);
                        e = d(e - g.x, f - g.y) ? .5 : 0;
                        d = !1
                    }
                    a.Ca(a.position, e, b, c, !0, d)
                }
            }
        },
        Uh = function(a, b, c) {
            if (c(b)) return b;
            for (;;) {
                var d = Math.floor((a + b) / 2);
                if (d == a || d == b) return a;
                c(d) ? a = d : b = d
            }
        },
        Sh = function(a, b) {
            var c = Pc(document),
                d = a.Cb,
                e = Math.floor(a.position.left - c.x) + 1,
                f = Math.floor(a.position.top - c.y) + 1,
                g = Math.floor(a.position.right - c.x) -
                d,
                k = Math.floor(a.position.bottom - c.y) - d;
            a = (k - f) * (g - e);
            if (f > k || e > g) return 0;
            c = !!b(e, f);
            d = !!b(g, k);
            if (c && d) return 1;
            var l = !!b(g, f),
                n = !!b(e, k);
            if (c) k = Uh(f, k, function(a) {
                return !!b(e, a)
            }), g = Uh(e, g, function(a) {
                return !!b(a, f)
            });
            else if (l) k = Uh(f, k, function(a) {
                return !!b(g, a)
            }), e = Uh(g, e, function(a) {
                return !!b(a, f)
            });
            else if (n) f = Uh(k, f, function(a) {
                return !!b(e, a)
            }), g = Uh(e, g, function(a) {
                return !!b(a, k)
            });
            else if (d) f = Uh(k, f, function(a) {
                return !!b(g, a)
            }), e = Uh(g, e, function(a) {
                return !!b(a, k)
            });
            else {
                var v = Math.floor((e +
                        g) / 2),
                    G = Math.floor((f + k) / 2);
                if (!b(v, G)) return 0;
                f = Uh(G, f, function(a) {
                    return !!b(v, a)
                });
                k = Uh(G, k, function(a) {
                    return !!b(v, a)
                });
                e = Uh(v, e, function(a) {
                    return !!b(a, G)
                });
                g = Uh(v, g, function(a) {
                    return !!b(a, G)
                })
            }
            return (k - f) * (g - e) / a
        },
        Vh = function(a, b, c, d, e) {
            a.Ia && (d || Rh(a, z, e), a.Ca(a.position, c, b, d, !1, !0))
        };
    Ph.prototype.Dc = function() {};
    Ph.prototype.Cc = function() {};
    Ph.prototype.lc = function() {};
    Ph.prototype.xb = function() {};
    var Wh = function(a, b, c) {
            if (a.Ia) {
                var d = c ? a.da.g : a.Ac;
                a.zb && !Wc(a.zb, new K(0, 0, 0, 0)) && (d = Xc(a.zb.clone(), a.position.left, a.position.top));
                a.Ca(a.position, d, b, c, !0, !0)
            }
        },
        Xh = function(a, b) {
            a.U = b.create(z, a.bb, function() {
                return a.Sc(a)
            });
            a.Ea || Jg(300, Error("Could not observe; element does not exist."))
        },
        Yh = function(a, b, c) {
            if (a.Ia && a.U) {
                var d = qd(),
                    e = Q.H();
                Rh(a, d, e.h);
                d = a.U.h();
                a.Ca(a.position, d.g(), b, c, !0, d.h() || d.l())
            }
        };
    h = Ph.prototype;
    h.Ca = function(a, b, c, d, e, f, g) {
        g = void 0 === g ? {} : g;
        var k = this.kc(c, g);
        g = this.Bb(a, b, d, g);
        r(b) || (this.yb = new I(b.right - b.left, b.bottom - b.top));
        e = e && this.da.g >= (this.sa() ? .3 : .5);
        this.Xb(k, g, e, f);
        this.Xa = c;
        0 < g.g && -1 === this.Qc && (this.Qc = c); - 1 == this.Rc && this.Fa() && (this.Rc = c);
        if (-2 == this.Ob) try {
            a: {
                var l = r(b) ? null : b;
                if (a && a != Nh && 0 != this.va) {
                    if (!l) {
                        if (!this.yb) {
                            var n = -1;
                            break a
                        }
                        l = new K(0, this.yb.width, this.yb.height, 0)
                    }
                    n = l.h && 0 < l.h() && l.g && 0 < l.g() ? this.ab(a, l) : -1
                } else n = -1
            }
            this.Ob = n
        }
        catch (v) {
            Jg(207, v)
        }
        this.da =
            g;
        d && (this.da.g = 0);
        this.Qb(this)
    };
    h.Xb = function(a, b, c, d) {
        this.oa().I(a, b, this.da, c, this.sa() ? .3 : .5, d)
    };
    h.Fb = function() {
        return new eh
    };
    h.Bb = function(a, b, c) {
        var d = this.Fb();
        d.B = c;
        c = Mg(Ia);
        d.h = 0 == c ? -1 : 1 == c ? 0 : 1;
        d.g = r(b) ? this.ab(b) : this.ab(a, b);
        d.sa = this.sa();
        return d
    };
    h.kc = function(a) {
        if (-1 == this.Xa) return 0;
        a = a - this.Xa || 1;
        return 1E4 < a ? 1 : a
    };
    h.ab = function(a, b) {
        if (r(a)) return a;
        if (b) {
            a = Zg(a, b);
            if (0 >= this.va || 0 >= a.h() || 0 >= a.g()) return 0;
            b = Q.H().bb;
            var c;
            if (c = 0 === this.opacity) b = Bb(b.h, "opac") ? b.h.opac : b.l ? (b = b.g.opac) ? b.g() : void 0 : null, c = 1 === b;
            return c ? 0 : (a.bottom - a.top) * (a.right - a.left) / this.va
        }
        return 0
    };
    h.sa = function() {
        return !1
    };
    var Rh = function(a, b, c, d) {
        if (d) a.position = d;
        else {
            b = c ? b : b.top;
            try {
                var e = Nh.clone(),
                    f = new H(0, 0);
                if (a.Ea) {
                    var g = 1 == a.Lc;
                    !c && g && Vg(a.Ea) || (e = a.Ea.getBoundingClientRect());
                    f = ed(a.Ea, b)
                }
                c = f;
                var k = c.x,
                    l = c.y;
                a.position = new K(Math.round(l), Math.round(k + (e.right - e.left)), Math.round(l + (e.bottom - e.top)), Math.round(k))
            } catch (n) {
                a.position = Nh.clone()
            }
        }
        a.va = (a.position.bottom - a.position.top) * (a.position.right - a.position.left)
    };
    Ph.prototype.ma = function() {
        return 0
    };
    Ph.prototype.Fa = function() {
        return this.Pb.Fa()
    };
    var Zh = function(a, b) {
            b = Math.pow(10, b);
            return Math.floor(a * b) / b
        },
        bi = function(a) {
            var b = !1,
                c = a.Ea;
            z.document && z.document.body && 12 == a.Lc && (c = z.document.body);
            if (null === c) return !1;
            Hg(152, function() {
                var d = new z.IntersectionObserver(function(b) {
                    try {
                        $h(z, b, a)
                    } catch (f) {
                        try {
                            d.unobserve(c), Jg("osd_adblock::nioc", f)
                        } catch (g) {}
                    }
                }, Oh);
                d.observe(c);
                ai(c);
                b = !0
            });
            return b
        },
        ai = function(a) {
            if (a && (a = a.style)) {
                var b = a.opacity;
                a.opacity = .98;
                a.opacity = .99;
                a.opacity = b
            }
        },
        ci = function(a) {
            var b = !1;
            Hg(151, function() {
                var c = md(z).fh(function(b) {
                    try {
                        $h(z,
                            b, a)
                    } catch (e) {
                        try {
                            c(), Jg("osd_adblock::aioc", e)
                        } catch (f) {}
                    }
                });
                b = !0
            });
            return b
        },
        $h = function(a, b, c) {
            if (!b || !b.length || 0 >= b.length) b = null;
            else {
                for (var d = b[0], e = 1; e < b.length; e++) b[e].time > d.time && (d = b[e]);
                b = d
            }
            if (d = b) b = Xg(d.boundingClientRect), e = Xg(d.intersectionRect), c.da.g = Math.min(Math.max(d.intersectionRect.width * d.intersectionRect.height / (d.boundingClientRect.width * d.boundingClientRect.height), 0), 1), c.Ac = c.da.g, Rh(c, a, !0, b), a = Zg(b, e), c.zb = 0 >= c.va || a.top >= a.bottom || a.left >= a.right ? new K(0, 0, 0, 0) : Xc(a, -b.left, -b.top)
        };
    Ph.prototype.Vb = function(a) {
        a = void 0 === a ? 1 : a;
        if (!this.Ea) return !1;
        var b = this.sa();
        b && (a = 4);
        b = new Ah(b, a);
        if (a = Eh(b, this.Ea)) this.Ka = b;
        return a
    };
    var di = function(a, b, c) {
        c && (a.Sc = c);
        switch (b) {
            case "nio":
                return bi(a);
            case "aio":
                return ci(a);
            case "raf":
                return a.Vb();
            case "geo":
            case "xde":
            case "iem":
                return !0
        }
        return !1
    };
    var ei = new K(0, 0, 0, 0),
        fi = function(a, b, c, d) {
            Ph.call(this, b, c, d);
            this.K = 0;
            this.l = {};
            this.ba = new ih;
            this.Ec = {};
            this.ia = "";
            this.Ja = null;
            this.Tc = !1;
            this.h = [];
            this.ga = this.Uc = this.Vc = this.w = !1;
            this.Da = void 0;
            this.o = -1;
            this.P = void 0;
            this.J = !1;
            this.L = this.D = 0;
            this.G = 1;
            this.R = -1;
            this.N = this.fa = !1;
            this.Ga = this.za = 0;
            this.W = !1;
            this.Na = this.na = -1;
            this.I = this.C = this.g = 0;
            this.Db = this.Qa = -1;
            this.Ra = 0;
            this.Oa = [0, 0, 0, 0, 0];
            this.B = this.Z = this.Pa = 0;
            this.F = -1;
            this.aa = 0;
            this.ha = !1;
            this.M = null;
            this.$b = !1;
            this.T = wa;
            this.A = [this.lb()];
            this.ya = !1;
            this.Yb = !0;
            this.Cb = 2;
            b = Q.H();
            Rh(this, a, b.h);
            this.Ma = {};
            this.Ma.pause = "p";
            this.Ma.resume = "r";
            this.Ma.skip = "s";
            this.Ma.mute = "m";
            this.Ma.unmute = "um";
            this.Ma.exitfullscreen = "ef"
        };
    ha(fi, Ph);
    var gi = function(a, b, c) {
        a.$b = !0;
        a.l = {};
        a.l.firstquartile = !1;
        a.l.midpoint = !1;
        a.l.thirdquartile = !1;
        a.l.complete = !1;
        a.l.pause = !1;
        a.l.skip = !1;
        a.l.viewable_impression = !1;
        a.K = 0;
        c || (a.oa().B = b)
    };
    fi.prototype.Vb = function(a) {
        a = void 0 === a ? 3 : a;
        var b = Xf.H(),
            c = C(b.g, 509445011);
        return C(b.g, 509445013) || c ? (this.ya = !0, Ph.prototype.Vb.call(this, a)) : !1
    };
    fi.prototype.Dc = function(a) {
        var b = this,
            c = a - this.na;
        this.W && 1E3 >= c || (c = va("ima.bridge.getNativeViewability"), w(c) && (c(this.ia, function(a) {
            b.W = !1;
            Eb(a) && b.aa++;
            b.xb(a)
        }), this.W = !0, this.na = a))
    };
    fi.prototype.Cc = function(a) {
        var b = Q.H();
        a - this.Na > kg(b.B) && (a = va("ima.admob.getViewability"), w(a) && a(this.ia))
    };
    var hi = function(a) {
        return p(a) ? Number(a) ? Zh(a, 3) : 0 : a
    };
    h = fi.prototype;
    h.lc = function(a) {
        this.Na = jg();
        this.xb(a)
    };
    h.xb = function(a) {
        var b = a.opt_nativeViewBounds || {},
            c = a.opt_nativeViewVisibleBounds || {},
            d = a.opt_nativeTime || -1,
            e = a.opt_nativeVolume,
            f = a.opt_nativeViewAttached;
        a = a.opt_nativeViewHidden;
        void 0 !== f && (this.M = !!f);
        b = new K(b.top || 0, b.left + b.width || 0, b.top + b.height || 0, b.left || 0);
        c = a ? ei.clone() : new K(c.top || 0, c.left + c.width || 0, c.top + c.height || 0, c.left || 0);
        f = void 0;
        "n" == this.Da && (f = {
            volume: e
        });
        e = f;
        e = void 0 === e ? {} : e;
        this.va = (b.bottom - b.top) * (b.right - b.left);
        this.position = b;
        this.Ca(b, c, d, !1, !0, !0, e)
    };
    h.Ca = function(a, b, c, d, e, f, g) {
        g = void 0 === g ? {} : g;
        var k = this.T(this) || {};
        Ib(k, g);
        this.o = k.duration || this.o;
        this.P = k.isVpaid || this.P;
        this.J = f;
        Ph.prototype.Ca.call(this, a, b, c, d, e, f, k)
    };
    h.Xb = function(a, b, c, d) {
        Ph.prototype.Xb.call(this, a, b, c, d);
        this.A[this.A.length - 1].I(a, b, this.da, c, this.sa() ? .3 : .5, d);
        this.N = hh(this.da) && hh(b); - 1 == this.R && this.fa && (this.R = this.oa().h.h);
        this.ba.l = 0;
        a = this.da;
        b = this.Fa();
        .5 <= a.g && jh(this.ba, "vs");
        b && jh(this.ba, "vw");
        Yg(a.volume) && jh(this.ba, "am");
        this.N && jh(this.ba, "a");
        this.ra && jh(this.ba, "f"); - 1 != a.h && (jh(this.ba, "bm"), 1 == a.h && jh(this.ba, "b"));
        this.N && b && jh(this.ba, "avw");
        this.J && jh(this.ba, "cm");
        this.J && 0 < a.g && jh(this.ba, "pv");
        ii(this, this.oa().h.h, !0) && jh(this.ba, "gdr");
        2E3 <= this.oa().l[0] && jh(this.ba, "pmx")
    };
    h.lb = function() {
        return new uh
    };
    h.oa = function() {
        return this.Pb
    };
    h.Fb = function() {
        return new gh
    };
    h.Bb = function(a, b, c, d) {
        a = Ph.prototype.Bb.call(this, a, b, c, d);
        a.l = this.ra;
        a.w = this.w;
        a.volume = d.volume;
        Yg(a.volume) || (this.za++, b = this.da, Yg(b.volume) && (a.volume = b.volume));
        d = d.currentTime;
        a.o = p(d) && 0 <= d ? d : -1;
        return a
    };
    h.kc = function(a, b) {
        var c = p(b.currentTime) ? b.currentTime : this.D,
            d = ji(this, a),
            e = c - this.D,
            f = b.isYouTube;
        b = p(b.isPlaying) ? b.isPlaying : !0;
        var g = 0;
        2 != this.G ? (0 <= e ? (this.L += d, this.B += Math.max(d - e, 0), g = Math.min(e, this.L)) : this.Z += Math.abs(e), 0 != e && (this.L = 0), -1 == this.F && 0 < e && (this.F = 0 <= hg ? jg() - hg : -1)) : (b || this.w || (this.B += d), -1 == this.F && b && (this.F = 0 <= hg ? jg() - hg : -1));
        this.D = c;
        if (f) {
            if (1 == this.G) return g;
            if (2 == this.G) return b ? d : 0
        }
        return ji(this, a)
    };
    var ji = function(a, b) {
        if (-1 == a.Xa) return 0;
        b = b - a.Xa || 1;
        var c = 1E4;
        p(a.o) && -1 != a.o && (c = Math.max(c, a.o / 3));
        return b > c ? 1 : b
    };
    fi.prototype.ab = function(a, b) {
        return this.ha ? 0 : this.ra ? 1 : Ph.prototype.ab.call(this, a, b)
    };
    fi.prototype.ma = function() {
        return 1
    };
    var ii = function(a, b, c) {
            return 15E3 <= b ? !0 : a.fa ? (void 0 === c ? 0 : c) ? !0 : -1 != a.o ? b >= a.o / 2 : -1 != a.R ? b >= a.R : !1 : !1
        },
        ki = function(a) {
            var b = {},
                c = Q.H();
            b.insideIframe = c.h;
            b.unmeasurable = a.Wa;
            b.position = a.position;
            b.coverage = a.da.g;
            b.documentSize = c.o;
            b.viewportSize = c.g;
            return b
        },
        mi = function(a, b) {
            li(a.h, b, function() {
                return {
                    Xf: 0,
                    sb: void 0
                }
            });
            a.h[b] = {
                viewableArea: Zh(a.da.g, 2),
                instantaneousState: a.ba.l
            }
        },
        li = function(a, b, c) {
            for (var d = a.length; d < b + 1;) a.push(c()), d++
        },
        R = function(a, b, c) {
            var d = a.Ec[b];
            if (null != d) return d;
            C(Vf, b) ? d = !0 : (d = a.l[b], p(d) ? (a.l[b] = !0, d = !d) : d = !1);
            c = a.nb(d, d, c);
            "fully_viewable_audible_half_duration_impression" == b && (c.std = "csm", c.ic = kh(a.ba, ["gdr"]));
            return c
        };
    fi.prototype.nb = function(a, b, c) {
        if (this.Wa) return {
            "if": 0
        };
        var d = this.position.clone();
        d.round();
        var e = gb(this.h, function(a) {
                return 100 * a.Xf | 0
            }),
            f = Q.H(),
            g = this.oa(),
            k = {};
        this.ya && (k.avms = "raf");
        k["if"] = f.h ? 1 : void 0;
        k.sdk = this.Da ? this.Da : void 0;
        k.t = this.Tf;
        k.p = [d.top, d.left, d.bottom, d.right];
        k.tos = g.T;
        k.mtos = g.l;
        k.mcvt = g.Z.l;
        k.ps = void 0;
        k.pt = e;
        d = vh(g, jg(), !!this.w);
        k.vht = d;
        k.mut = g.ha.l;
        k.a = hi(this.da.volume);
        k.mv = hi(g.o);
        k.fs = this.ra ? 1 : 0;
        k.ft = g.L.h;
        k.at = g.A.h;
        k.as = .1 <= g.g ? 1 : 0;
        k.atos = g.K;
        k.uac = this.za;
        k.vpt = g.h.h;
        "nio" == f.U && (k.nio = 1, k.avms = "nio");
        k.gmm = "4";
        k.gdr = ii(this, g.h.h, !0) ? 1 : 0;
        this.Yb && (k.efpf = this.Cb);
        0 < this.aa && (k.nnut = this.aa);
        k.tcm = this.G;
        k.nmt = this.Z;
        k.bt = this.B;
        k.pst = this.F;
        k.vpaid = this.P;
        k.dur = this.o;
        k.vmtime = this.D;
        k.is = this.ba.l;
        1 <= this.h.length && (k.i0 = this.h[0].sb);
        2 <= this.h.length && (k.i1 = this.h[1].sb);
        3 <= this.h.length && (k.i2 = this.h[2].sb);
        4 <= this.h.length && (k.i3 = this.h[3].sb);
        k.cs = mh(this.ba);
        a && (k.ic = lh(this.ba), k.dvpt = g.h.g, k.dvs = g.J, k.dfvs = g.G, k.davs = g.D, k.dafvs = g.F, b && (g.h.g =
            0, g.J = 0, g.G = 0, g.D = 0, g.F = 0), this.Fa() && (k.dtos = g.R, k.dav = g.C, k.dtoss = this.K + 1, b && (g.R = 0, g.C = 0, this.K++)), k.dat = g.A.g, k.dft = g.L.g, b && (g.A.g = 0, g.L.g = 0));
        f.o && (k.ps = [f.o.width, f.o.height]);
        f.g && (k.bs = [f.g.width, f.g.height]);
        f.F && (k.scs = [f.F.width, f.F.height]);
        k.dom = f.domain;
        this.Ga && (k.vds = this.Ga);
        this.g && (k.vmer = this.g);
        this.C && (k.vmmk = this.C);
        this.I && (k.vmiec = this.I);
        this.U && (k.avms = this.U.l(), Ib(k, this.U.g()));
        "exc" == f.U && (k.femt = this.Qa, k.femvt = this.Db, k.emc = this.Ra, k.emb = this.Oa, k.emuc = this.Pa,
            k.avms = "exc");
        c ? (k.c = Zh(this.da.g, 2), k.ss = Zh(ni(this), 2)) : k.tth = jg() - gg;
        k.mc = Zh(g.N, 2);
        k.nc = Zh(g.w, 2);
        k.mv = hi(g.o);
        k.nv = hi(g.g);
        k.lte = Zh(this.Ob, 2);
        a = this.A[this.A.length - 1];
        k.qmtos = a.l;
        k.qnc = Zh(a.w, 2);
        k.qmv = hi(a.o);
        k.qnv = hi(a.g);
        k.qas = .1 <= a.g ? 1 : 0;
        k.qi = this.ia;
        null !== this.M && (k.nvat = this.M ? 1 : 0);
        k.avms || (k.avms = "geo");
        k.psm = g.P.h;
        k.psv = g.P.g();
        k.psfv = g.fa.g();
        k.psa = g.aa.g();
        return k
    };
    var ni = function(a) {
        if (a.ra) return 1;
        var b = z.screen.width * z.screen.height;
        return 0 >= b ? -1 : Math.min(a.va * a.da.g / b, 1)
    };
    var oi = function(a, b, c) {
            this.l = void 0 === c ? 0 : c;
            this.h = a;
            this.g = null == b ? "" : b
        },
        pi = function(a, b) {
            return a.l < b.l ? !0 : a.l > b.l ? !1 : a.h < b.h ? !0 : a.h > b.h ? !1 : typeof a.g < typeof b.g ? !0 : typeof a.g > typeof b.g ? !1 : a.g < b.g
        };
    var qi = function() {
            this.l = 0;
            this.g = [];
            this.h = !1
        },
        ri = function(a) {
            var b = new qi;
            var c = void 0 === c ? 0 : c;
            var d = void 0 === d ? !0 : d;
            gc(a, function(a, f) {
                d && void 0 === a || (a = new oi(f, a, c), ++b.l, b.g.push(new oi(a.h, a.g, a.l + b.l / 4096)), b.h = !0)
            });
            return b
        },
        si = function(a) {
            a.h && (ub(a.g, function(a, c) {
                return pi(c, a) ? 1 : pi(a, c) ? -1 : 0
            }), a.h = !1);
            return ib(a.g, function(a, c) {
                var b = "boolean" === typeof c.g;
                c = "" + (b && !c.g ? "" : c.h) + (b || "" === c.g ? "" : "=" + c.g);
                return "" + a + ("" != a && "" != c ? "&" : "") + c
            })
        };
    var ti = new Date(0);
    Xa(ti.getUTCFullYear(), 4);
    Xa(ti.getUTCMonth() + 1, 2);
    Xa(ti.getUTCDate(), 2);
    Xa(ti.getUTCHours(), 2);
    Xa(ti.getUTCMinutes(), 2);
    var ui = function(a) {
        gc(a, function(b, c) {
            b instanceof Array && (a[c] = b.join(","))
        });
        return a
    };
    var vi = function(a) {
        var b = [],
            c = [];
        vb(a, function(a, e) {
            if (!(e in Object.prototype) && "undefined" != typeof a) switch (za(a) && (a = a.join(",")), a = [e, "=", a].join(""), e) {
                case "adk":
                case "r":
                case "tt":
                case "error":
                case "mtos":
                case "tos":
                case "p":
                case "bs":
                case "aio":
                case "nio":
                case "iem":
                    b.unshift(a);
                    break;
                case "req":
                case "url":
                case "referrer":
                case "iframe_loc":
                    c.push(a);
                    break;
                default:
                    b.push(a)
            }
        });
        return b.concat(c)
    };
    var wi = function(a) {
        this.h = a;
        this.g = null
    };
    wi.prototype.cancel = function() {
        z.clearTimeout(this.g);
        this.g = null
    };
    var xi = function(a) {
        z && (a.g = z.setTimeout(Ig(143, function() {
            a.h.N()
        }), kg(Q.H().B)))
    };
    var yi = function() {};
    xa(yi);
    var zi = function(a, b, c) {
        yd.call(this);
        this.o = null != c ? x(a, c) : a;
        this.l = b;
        this.h = x(this.Nf, this);
        this.g = []
    };
    y(zi, yd);
    h = zi.prototype;
    h.vb = !1;
    h.Ua = null;
    h.hc = function(a) {
        this.g = arguments;
        this.Ua ? this.vb = !0 : Ai(this)
    };
    h.O = function() {
        zi.ea.O.call(this);
        this.Ua && (m.clearTimeout(this.Ua), this.Ua = null, this.vb = !1, this.g = [])
    };
    h.Nf = function() {
        this.Ua = null;
        this.vb && (this.vb = !1, Ai(this))
    };
    var Ai = function(a) {
        a.Ua = vf(a.h, a.l);
        a.o.apply(null, a.g)
    };
    var Ci = function() {
            return !Bi() && (E("iPod") || E("iPhone") || E("Android") || E("IEMobile"))
        },
        Bi = function() {
            return E("iPad") || E("Android") && !E("Mobile") || E("Silk")
        };
    var Di = function() {
            this.g = this.o = null;
            this.l = 0;
            this.h = null
        },
        Ei = function() {
            this.g = [];
            this.h = [];
            this.done = !1;
            this.l = {
                bh: 0,
                kd: 0,
                Pc: 0,
                od: 0,
                Af: -1
            };
            this.I = this.F = this.D = this.A = this.L = null;
            this.J = !1;
            this.M = null;
            this.C = 0;
            this.B = Bi() || Ci();
            this.K = 0;
            this.o = new wi(this)
        },
        Fi = function() {
            var a = Q.H().U;
            return "nio" == a || "aio" == a
        },
        Hi = function() {
            var a = S;
            if (!a.J) {
                a.J = !0;
                var b = m.requestAnimationFrame || m.webkitRequestAnimationFrame || m.mozRequestAnimationFrame || m.oRequestAnimationFrame || m.msRequestAnimationFrame;
                if (!a.L &&
                    !Fi()) {
                    if (b) {
                        var c = Ig(136, function(b) {
                            for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                            return a.w.apply(a, [].concat(sa(c)))
                        });
                        var d = function() {
                            b(function() {
                                z.setTimeout(c, 0)
                            })
                        }
                    } else d = function(b) {
                        for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                        return a.w.apply(a, [].concat(sa(c)))
                    };
                    a.A = new zi(Ag(137, d, void 0, void 0), 100);
                    a.L = Lg(z, "scroll", function(b) {
                        for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                        return a.A.hc.apply(a.A, [].concat(sa(c)))
                    }, 138)
                }
                if (!a.D && !Fi()) {
                    if (b) {
                        var e =
                            Ig(139, function(b) {
                                for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                                return a.R.apply(a, [].concat(sa(c)))
                            });
                        d = function() {
                            b(function() {
                                z.setTimeout(e, 0)
                            })
                        }
                    } else d = function(b) {
                        for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                        return a.R.apply(a, [].concat(sa(c)))
                    };
                    a.F = new zi(Ag(140, d, void 0, void 0), 100);
                    a.D = Lg(z, "resize", function(b) {
                        for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                        return a.F.hc.apply(a.F, [].concat(sa(c)))
                    }, 141)
                }
                Gi(a, function(b) {
                    for (var c = [], d = 0; d < arguments.length; ++d) c[d -
                        0] = arguments[d];
                    return a.G.apply(a, [].concat(sa(c)))
                });
                a.G()
            }
        };
    Ei.prototype.R = function() {
        Ii(this, !1);
        this.w()
    };
    Ei.prototype.w = function() {
        Ji(this, Ki(this), !1)
    };
    var Li = function(a) {
        var b = a.B,
            c = Q.H();
        b && !c.l && "exc" != c.U && (c.g = Yf(z, b));
        b = new Di;
        switch (c.U) {
            case "xde":
                var d = a.C;
                Ii(a, !1);
                a = Q.H();
                var e = a.A,
                    f = e.height - d;
                0 >= f && (f = e.height, d = 0);
                a.g = new I(e.width, f);
                f = new Di;
                f.o = a.g;
                f.g = e;
                f.l = d;
                return f;
            case "geo":
                a: {
                    c = c.g;b = new Di;b.o = c;
                    if (null != c && -1 != c.width && -1 != c.height && -12245933 != c.width && -12245933 != c.height) {
                        var g = Q.H();
                        if (g.l) d = g.w;
                        else try {
                            g = z;
                            e = a.B;
                            g = g.top;
                            f = c || Yf(g, void 0 === e ? !1 : e);
                            var k = Pc(Lc(g.document).g);
                            if (-1 == f.width || -12245933 == f.width) {
                                var l = f.width;
                                var n = new K(l, l, l, l)
                            } else n = new K(k.y, k.x + f.width, k.y + f.height, k.x);
                            d = n
                        } catch (v) {
                            a = b;
                            break a
                        }
                        b.h = d
                    }
                    a = b
                }
                return a;
            default:
                return b
        }
    };
    Ei.prototype.N = function() {
        Ji(this, Ki(this), !1)
    };
    var Ji = function(a, b, c, d) {
            if (!a.done)
                if (a.o.cancel(), 0 == b.length) c || xi(a.o);
                else {
                    a.M = null;
                    var e = Li(a),
                        f = Q.H();
                    try {
                        var g = jg();
                        if (null != yi.H().g)
                            for (d = 0; d < b.length; d++) Yh(b[d], g, c);
                        else switch (f.U) {
                            case "exc":
                                for (d = 0; d < b.length; d++) Wh(b[d], g, c);
                                break;
                            case "nis":
                                for (e = 0; e < b.length; e++) p(d) ? b[e].xb(d) : b[e].Dc(g);
                                break;
                            case "gsv":
                                for (e = 0; e < b.length; e++) p(d) ? b[e].lc(d) : b[e].Cc(g);
                                break;
                            case "aio":
                            case "nio":
                                for (d = 0; d < b.length; d++) Wh(b[d], g, c);
                                break;
                            case "xde":
                                if (e.g)
                                    for (d = 0; d < b.length; d++) Qh(b[d], g, e.g,
                                        e.l, c);
                                break;
                            case "iem":
                                for (d = 0; d < b.length; d++) Th(b[d], g, c);
                                break;
                            case "raf":
                                A(b, function(a) {
                                    if (c) a.Ka && (a.Ka.l = 3, a.da.g = 0);
                                    else if (a.Ka) {
                                        var b = Lh(a.Ka),
                                            d = [0, 0, 0, 0, 0, .01, .5, 1, .01, .3],
                                            e = d[b.l + 1];
                                        a.da.g = d[b.h + 1];
                                        a.Ca(a.position, e, a.Xa + b.g, !1, !0, !1);
                                        a.Fa() && 1 != a.ma() && !a.Wb && a.Ka && Gh(a.Ka)
                                    }
                                });
                                break;
                            case "geo":
                                if (e.h)
                                    for (d = 0; d < b.length; d++) Vh(b[d], g, e.h, c, f.h)
                        }
                        a.l.Pc += jg() - g;
                        ++a.l.od
                    } finally {
                        c ? A(b, function(a) {
                            a.da.g = 0
                        }) : xi(a.o)
                    }
                }
        },
        Gi = function(a, b) {
            var c;
            Ia.mozVisibilityState ? c = "mozvisibilitychange" : Ia.webkitVisibilityState ?
                c = "webkitvisibilitychange" : Ia.visibilityState && (c = "visibilitychange");
            c && (a.I = a.I || Lg(Ia, c, b, 142))
        };
    Ei.prototype.G = function() {
        var a = T(this),
            b = jg();
        a ? (ig || (eg = b, A(this.g, function(a) {
            var c = a.oa();
            c.W = vh(c, b, !!a.w)
        })), ig = !0, Ii(this, !0)) : (this.K = Mi(this, b), ig = !1, gg = b, A(this.g, function(a) {
            a.Ia && (a.oa().B = b)
        }));
        Ji(this, Ki(this), !a)
    };
    var T = function(a) {
            if (Ni(a)) return !0;
            var b = Mg(Ia);
            a = 1 === b;
            b = 0 === b;
            return Q.H(), a || b
        },
        Oi = function(a, b) {
            return null != b && jb(a.g, function(a) {
                return a.element == b
            })
        },
        Pi = function(a) {
            return nb(S.g, function(b) {
                return b.ia == a
            })
        },
        Ki = function(a) {
            return 0 == a.g.length ? a.h : 0 == a.h.length ? a.g : qb(a.h, a.g)
        };
    Ei.prototype.reset = function() {
        this.g = [];
        this.h = []
    };
    var Ii = function(a, b) {
            var c = a.B;
            a = Q.H();
            a.g = a.l ? a.w ? (new I(a.w.h(), a.w.g())).round() : new I(0, 0) : Yf(z, c);
            if (!b) {
                a.A = z && z.outerWidth ? new I(z.outerWidth, z.outerHeight) : new I(-12245933, -12245933);
                var d = void 0 === d ? z : d;
                null !== d && d != d.top && (d = d.top);
                c = b = 0;
                var e = Q.H().g;
                try {
                    var f = d.document,
                        g = f.body,
                        k = f.documentElement;
                    if ("CSS1Compat" == f.compatMode && k.scrollHeight) b = k.scrollHeight != e.height ? k.scrollHeight : k.offsetHeight, c = k.scrollWidth != e.width ? k.scrollWidth : k.offsetWidth;
                    else {
                        var l = k.scrollHeight,
                            n = k.scrollWidth,
                            v = k.offsetHeight,
                            G = k.offsetWidth;
                        k.clientHeight != v && (l = g.scrollHeight, n = g.scrollWidth, v = g.offsetHeight, G = g.offsetWidth);
                        l > e.height ? l > v ? (b = l, c = n) : (b = v, c = G) : l < v ? (b = l, c = n) : (b = v, c = G)
                    }
                    var W = new I(c, b)
                } catch (u) {
                    W = new I(-12245933, -12245933)
                }
                a.o = W
            }
        },
        Ri = function() {
            var a = Qi("raf");
            a && (Q.H().U = "raf");
            return a
        },
        Qi = function(a) {
            var b = !1;
            A(Ki(S), function(c) {
                di(c, a, void 0) && (b = !0)
            });
            return b
        },
        Si = function(a) {
            var b = S,
                c = [];
            A(a, function(a) {
                Oi(b, a.element) || (b.g.push(a), c.push(a))
            })
        },
        Ti = function(a) {
            var b = S,
                c = [];
            A(a, function(a) {
                null ==
                    nb(b.g, function(b) {
                        return b.element == a.element && !0
                    }) && (b.g.push(a), c.push(a))
            })
        },
        Mi = function(a, b) {
            a = a.K;
            ig && (a += b - eg);
            return a
        },
        Ni = function(a) {
            return jb(Ki(a), function(a) {
                return a.ra
            })
        };
    xa(Ei);
    var S = Ei.H();
    var Ui = function() {
            var a = D;
            return a ? jb("AppleTV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;OMI/".split(";"), function(b) {
                return Va(a, b)
            }) ? !0 : Va(a, "Presto") && Va(a, "Linux") && !Va(a, "X11") && !Va(a, "Android") && !Va(a, "Mobi") : !1
        },
        Vi = function() {
            return Va(D, "CrKey") || Va(D, "PlayStation") || Va(D, "Roku") || Ui() || Va(D, "Xbox")
        };
    var Wi = null,
        Xi = "",
        Yi = !1,
        Zi = function(a) {
            if (!a) return "";
            var b = a.document,
                c = [];
            c.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
            b && b.referrer && c.push("referrer=" + encodeURIComponent(b.referrer.substring(0, 512)));
            return c.join("&")
        };
    var $i = function(a) {
            return function(b) {
                return !p(b[a]) && p(0) ? 0 : b[a]
            }
        },
        cj = function() {
            var a = [0, 2, 4];
            return function(b) {
                b = b.tos;
                if (za(b)) {
                    for (var c = Array(b.length), d = 0; d < b.length; d++) c[d] = 0 < d ? c[d - 1] + b[d] : b[d];
                    return p(a) ? aj(c, a) : c
                }
            }
        },
        dj = function(a, b) {
            return function(c) {
                c = c[a];
                if (za(c)) return aj(c, b)
            }
        },
        fj = function(a) {
            var b = ej;
            return function(c) {
                return b(c) ? c[a] : void 0
            }
        },
        aj = function(a, b) {
            return fb(a, function(a, d) {
                return C(b, d)
            })
        };
    var ej = function(a, b) {
            return function(c) {
                for (var d = 0; d < b.length; d++)
                    if (b[d] === c[a] || !p(b[d]) && !c.hasOwnProperty(a)) return !0;
                return !1
            }
        }("e", [void 0, 1, 2, 3, 4, 8, 16]),
        gj = {
            sv: "sv",
            cb: "cb",
            e: "e",
            nas: "nas",
            msg: "msg",
            "if": "if",
            sdk: "sdk",
            p: "p",
            tos: "tos",
            mtos: "mtos",
            mcvt: "mcvt",
            ps: "ps",
            scs: "scs",
            bs: "bs",
            pt: "pt",
            vht: "vht",
            mut: "mut",
            a: "a",
            ft: "ft",
            dft: "dft",
            at: "at",
            dat: "dat",
            as: "as",
            vpt: "vpt",
            gmm: "gmm",
            std: "std",
            efpf: "efpf",
            swf: "swf",
            nio: "nio",
            px: "px",
            nnut: "nnut",
            vmer: "vmer",
            vmmk: "vmmk",
            vmiec: "vmiec",
            nmt: "nmt",
            tcm: "tcm",
            bt: "bt",
            pst: "pst",
            vpaid: "vpaid",
            dur: "dur",
            vmtime: "vmtime",
            dtos: "dtos",
            dtoss: "dtoss",
            dvs: "dvs",
            dfvs: "dfvs",
            dvpt: "dvpt",
            fmf: "fmf",
            vds: "vds",
            is: "is",
            i0: "i0",
            i1: "i1",
            i2: "i2",
            i3: "i3",
            ic: "ic",
            cs: "cs",
            c: "c",
            mc: "mc",
            nc: "nc",
            mv: "mv",
            nv: "nv",
            qmt: fj("qmtos"),
            qnc: fj("qnc"),
            qmv: fj("qmv"),
            qnv: fj("qnv"),
            raf: "raf",
            rafc: "rafc",
            lte: "lte",
            tth: "tth",
            femt: "femt",
            femvt: "femvt",
            emc: "emc",
            emuc: "emuc",
            emb: "emb",
            avms: "avms",
            nvat: "nvat",
            qi: "qi",
            psm: "psm",
            psv: "psv",
            psfv: "psfv",
            psa: "psa",
            pnc: "pnc",
            pns: "pns",
            pnmm: "pnmm",
            pnk: "pnk",
            ptlt: "ptlt",
            dc_rfl: "urlsigs"
        },
        hj = {
            c: $i("c"),
            at: "at",
            atos: dj("atos", [0, 2, 4]),
            ta: function(a, b) {
                return function(c) {
                    if (!p(c[a])) return b
                }
            }("tth", "1"),
            a: "a",
            dur: "dur",
            p: "p",
            tos: cj(),
            j: "dom",
            mtos: dj("mtos", [0, 2, 4]),
            gmm: "gmm",
            gdr: "gdr",
            ss: $i("ss"),
            vsv: hd("w2"),
            t: "t"
        },
        ij = {
            atos: "atos",
            avt: dj("atos", [2]),
            davs: "davs",
            dafvs: "dafvs",
            dav: "dav",
            ss: $i("ss"),
            t: "t"
        },
        jj = {
            a: "a",
            tos: cj(),
            at: "at",
            c: $i("c"),
            mtos: dj("mtos", [0, 2, 4]),
            dur: "dur",
            fs: "fs",
            p: "p",
            vpt: "vpt",
            vsv: hd("ias_w2"),
            dom: "dom",
            gmm: "gmm",
            gdr: "gdr",
            t: "t"
        },
        kj = {
            tos: cj(),
            at: "at",
            c: $i("c"),
            mtos: dj("mtos", [0, 2, 4]),
            p: "p",
            vpt: "vpt",
            vsv: hd("dv_w4"),
            gmm: "gmm",
            gdr: "gdr",
            dom: "dom",
            t: "t",
            mv: "mv",
            qmpt: dj("qmtos", [0, 2, 4]),
            qvs: function(a, b) {
                return function(c) {
                    var d = c[a];
                    if (r(d)) return gb(b, function(a) {
                        return 0 < d && d >= a ? 1 : 0
                    })
                }
            }("qnc", [1, .5, 0]),
            qmv: "qmv",
            qa: "qas",
            a: "a"
        };
    var lj = function() {
        this.h = this.o = this.B = this.w = this.l = this.g = ""
    };
    var mj = function() {},
        nj = function(a, b, c, d, e) {
            var f = {};
            if (p(a))
                if (null != b)
                    for (var g in b) {
                        var k = b[g];
                        g in Object.prototype || null != k && (w(k) ? f[g] = k(a) : f[g] = a[k])
                    } else Ib(f, a);
            p(c) && Ib(f, c);
            a = si(ri(ui(f)));
            0 < a.length && p(d) && p(e) && (e = e(a), a += "&" + d + "=" + e);
            return a
        };
    var oj = function() {};
    ha(oj, mj);
    oj.prototype.g = function(a) {
        var b = new lj;
        b.g = nj(a, gj);
        b.l = nj(a, ij);
        return b
    };
    var pj = function(a, b, c, d, e) {
        this.time = a;
        this.h = b;
        this.volume = void 0 === e ? null : e;
        this.l = d;
        this.g = c
    };
    var qj = function(a) {
        a = void 0 === a ? 0 : a;
        this.w = [];
        this.g = new pj(-1, new I(0, 0), null, !0);
        this.L = this.h = a;
        this.G = !1;
        this.P = Bi() || Ci();
        this.C = !1;
        this.T = new wi(this)
    };
    qj.prototype.I = function() {};
    var rj = function(a) {
        var b = jg(),
            c = Yf(z, a.P),
            d = a.g.volume;
        a = a.g.g;
        var e = Mg(Ia),
            f = 1 === e;
        e = 0 === e;
        f = (Q.H(), f || e);
        return new pj(b, c, a, f, d)
    };
    qj.prototype.N = function() {
        this.G || (this.T.cancel(), this.B(rj(this)))
    };
    var sj = function(a) {
            A(a.w, function(b) {
                b.B(a.g)
            })
        },
        tj = function(a) {
            A(a.w, function(b) {
                b.A(a.h)
            })
        };
    qj.prototype.A = function(a) {
        var b = this.h;
        this.G = a >= this.L;
        this.h = Math.max(this.L, a);
        this.h != b && tj(this)
    };
    qj.prototype.B = function(a) {
        var b = this.g,
            c = this.C;
        b = !(a && (void 0 === c || !c || b.volume == a.volume) && b.l == a.l && Wc(b.g, a.g));
        this.g = a;
        b && sj(this)
    };
    qj.prototype.M = function() {
        return this.C
    };
    var uj = function() {
        qj.call(this, 1);
        this.o = new Zf(0, "");
        this.J = 4;
        this.l = [];
        this.W = [];
        this.R = !1;
        this.K = this.F = 0;
        this.D = ""
    };
    ha(uj, qj);
    var vj = function() {
            var a = 0,
                b = z;
            try {
                if (b && b.Goog_AdSense_getAdAdapterInstance) return b
            } catch (c) {}
            for (; b && 5 > a;) {
                try {
                    if (b.google_osd_static_frame) return b
                } catch (c) {}
                try {
                    if (b.aswift_0 && b.aswift_0.google_osd_static_frame) return b.aswift_0
                } catch (c) {}
                a++;
                b = b != b.parent ? b.parent : null
            }
            return null
        },
        wj = function(a, b, c, d, e) {
            d = void 0 === d ? !1 : d;
            e = void 0 === e ? "" : e;
            var f = {};
            Qg(b, f);
            f[0] = "goog_request_monitoring";
            f[6] = a;
            f[27] = z.document.domain;
            f[16] = d;
            e && e.length && (f[19] = e);
            try {
                var g = Rg(f);
                c.postMessage(g, "*")
            } catch (k) {}
        },
        xj = function(a, b, c, d, e, f) {
            d = void 0 === d ? !1 : d;
            e = void 0 === e ? "" : e;
            f = void 0 === f ? function() {
                return null
            } : f;
            10 < a.K ? (z.clearInterval(a.F), f()) : (++a.K, z.postMessage && $f(c) ? (a = vj()) && wj(b, c, a, d, e) : (z.clearInterval(a.F), f()))
        };
    uj.prototype.I = function() {
        var a = this;
        $f(this.o) ? (Lg(m, "message", function(b) {
            if (null != b && b.data && q(b.data)) {
                var c = b.data;
                if (q(c)) {
                    var d = {};
                    c = c.split("\n");
                    for (var e = 0; e < c.length; e++) {
                        var f = c[e].indexOf("=");
                        if (!(0 >= f)) {
                            var g = Number(c[e].substr(0, f));
                            f = c[e].substr(f + 1);
                            switch (g) {
                                case 5:
                                case 8:
                                case 11:
                                case 15:
                                case 16:
                                case 18:
                                case 26:
                                    f = "true" == f;
                                    break;
                                case 4:
                                case 7:
                                case 6:
                                case 20:
                                case 21:
                                case 22:
                                case 23:
                                case 24:
                                case 25:
                                    f = Number(f);
                                    break;
                                case 3:
                                case 19:
                                    if (w(decodeURIComponent)) try {
                                        f = decodeURIComponent(f)
                                    } catch (l) {
                                        throw Error("Error: URI malformed: " +
                                            f);
                                    }
                            }
                            d[g] = f
                        }
                    }
                    d = d[0] ? d : null
                } else d = null;
                if (d && a.o.matches(new Zf(d[4], d[12])) && (z.clearInterval(a.F), yj(a, d), a.l.length || a.w.length)) {
                    if ("goog_get_mode" == d[0]) {
                        c = {};
                        Qg(a.o, c);
                        c[0] = "goog_provide_mode";
                        c[6] = a.J;
                        c[19] = a.D;
                        c[16] = a.R;
                        try {
                            var k = Rg(c);
                            b.source.postMessage(k, b.origin)
                        } catch (l) {}
                    }
                    f = d[0];
                    g = !1;
                    b = a.g.h;
                    k = a.g.volume;
                    c = a.g.g;
                    e = jg();
                    "goog_acknowledge_monitoring" == f && (a.h = d[8] ? 0 : 2, tj(a));
                    isNaN(d[22]) || isNaN(d[23]) || (g = !0, b = new I(d[22], d[23]));
                    d[9] && (g = !0, f = d[9].split("-"), 4 == f.length && (c = new K(bb(f[0]),
                        bb(f[3]), bb(f[2]), bb(f[1]))));
                    g && (g = T(S), a.g = new pj(e, b, c, g, k), sj(a));
                    b = d[0];
                    k = 100 * d[25];
                    r(k) && !isNaN(k) && zj(a);
                    void 0 != d[18] && Aj(a);
                    void 0 != d[7] && 0 < d[7] && Bj(a);
                    k = !!d[5];
                    d = !!d[11];
                    "goog_update_data" == b && Cj(a);
                    switch (b) {
                        case "goog_image_request":
                            Dj(a);
                        case "goog_update_data":
                            k && Ej(a), d && Fj(a)
                    }
                }
            }
        }, 118), this.F = z.setInterval(Ig(197, function() {
            xj(a, a.J, a.o, a.R, a.D, function() {
                a.h = 0;
                tj(a)
            })
        }), 500)) : (this.h = 0, tj(this))
    };
    var Cj = function(a) {
            A(a.l, function() {})
        },
        zj = function(a) {
            A(a.l, function() {})
        },
        Aj = function(a) {
            A(a.l, function() {})
        },
        Bj = function(a) {
            A(a.l, function() {})
        },
        Dj = function(a) {
            A(a.l, function() {})
        },
        Ej = function(a) {
            A(a.l, function() {})
        },
        Fj = function(a) {
            A(a.l, function() {})
        },
        yj = function(a, b) {
            A(a.W, function(a) {
                a(b)
            })
        };
    xa(uj);
    var Gj = function() {
        this.g = this.G = !1;
        this.N = "h";
        this.h = new oj;
        var a = {};
        this.J = (a.start = this.Sd, a.firstquartile = this.Hd, a.midpoint = this.Md, a.thirdquartile = this.Td, a.complete = this.Dd, a.pause = this.Od, a.resume = this.Qd, a.skip = this.Rd, a.viewable_impression = this.Vd, a.mute = this.Nd, a.unmute = this.Ud, a.fullscreen = this.Id, a.exitfullscreen = this.Gd, a.fully_viewable_audible_half_duration_impression = this.Jd, a.measurable_impression = this.Ld, a.abandon = this.Cd, a.engagedview = this.Fd, a.impression = this.Kd, a.creativeview =
            this.Ed, a.progress = this.Pd, a);
        a = {};
        this.K = (a.overlay_resize = this.R, a.abandon = this.F, a.close = this.F, a.collapse = this.F, a.overlay_unmeasurable_impression = function(a) {
            return R(a, "overlay_unmeasurable_impression", T(S))
        }, a.overlay_viewable_immediate_impression = function(a) {
            return R(a, "overlay_viewable_immediate_impression", T(S))
        }, a.overlay_unviewable_impression = function(a) {
            return R(a, "overlay_unviewable_impression", T(S))
        }, a.overlay_viewable_end_of_session_impression = function(a) {
            return R(a, "overlay_viewable_end_of_session_impression",
                T(S))
        }, a);
        Q.H().C = 3
    };
    Gj.prototype.w = function() {};
    Gj.prototype.A = function(a) {
        switch (a) {
            case 0:
                Q.H().l = !1;
                Hj();
                break;
            case 2:
                Hi()
        }
    };
    Gj.prototype.B = function(a) {
        var b = Q.H();
        b.g = a.h;
        b.w = a.g
    };
    Gj.prototype.M = function() {
        return !1
    };
    var Hj = function() {
            var a;
            if (a = null != z.IntersectionObserver)
                if (a = Qi("nio")) Q.H().U = "nio";
            if (a) Hi();
            else if (dh() && Ri()) Hi();
            else {
                if (pc && r(z.screenX) && r(z.mozInnerScreenX) && r(z.outerWidth)) {
                    a = S;
                    var b = z.navigator.userAgent;
                    var c = b.indexOf("Firefox/");
                    if (0 <= c) {
                        c = Math.floor(b.substr(c + 8)) || -1;
                        var d = b.indexOf("Mac OS X 10."),
                            e = -1;
                        0 <= d && (e = Number(b.substr(d + 12, 1)) || -1);
                        var f = 0 < e ? -1 : b.indexOf("Windows NT ");
                        d = -1;
                        0 <= f && (d = {
                            "6.0": 0,
                            "6.1": 1,
                            "6.2": 2
                        }[b.substr(f + 11, 3)] || -1);
                        b = 148;
                        5 <= e ? b = 4 <= c ? 108 : 3 <= c ? 127 : 108 : 0 <=
                            d && (16 == c || 17 == c || 18 == c) && (b = [
                                [146, 146, 146],
                                [148, 147, 148],
                                [131, 130, 136]
                            ][d][c - 16])
                    } else b = null;
                    null !== b && (a.C = b, Q.H().U = "xde");
                    a = !0
                } else a = !1;
                a ? Hi() : (F && Ec(8) && w(Pg()) ? (Q.H().U = "iem", a = !0) : a = !1, a ? Hi() : (S.o.cancel(), Xi = "i", S.done = !0))
            }
        },
        Ij = function(a, b, c) {
            if (!b.Tc) {
                var d = R(b, "start", T(S));
                a = a.h.g(d).g;
                d = Wi || z;
                var e = [];
                e.push("v=621v");
                e.push("r=" + c);
                e.push(a);
                e.push(Zi(d));
                a = ("//pagead2.googlesyndication.com/pagead/gen_204?id=lidarvf&" + e.join("&")).substring(0, 2E3);
                c = qd() || z;
                a = a.toString();
                nd(c, a);
                b.Tc = !0
            }
        };
    h = Gj.prototype;
    h.Sd = function(a) {
        mi(a, 0);
        return R(a, "start", T(S))
    };
    h.Pd = function(a, b) {
        Ji(S, [a], !T(S), b);
        return R(a, "progress", T(S))
    };
    h.Hd = function(a, b) {
        return Jj(a, "firstquartile", 1, b)
    };
    h.Md = function(a, b) {
        a.fa = !0;
        return Jj(a, "midpoint", 2, b)
    };
    h.Td = function(a, b) {
        return Jj(a, "thirdquartile", 3, b)
    };
    h.Dd = function(a, b) {
        b = Jj(a, "complete", 4, b);
        a.ra = !1;
        Kj(1, a.ia);
        return b
    };
    var Jj = function(a, b, c, d) {
        Ji(S, [a], !T(S), d);
        mi(a, c);
        b = R(a, b, T(S));
        4 != c && li(a.A, c, a.lb);
        return b
    };
    h = Gj.prototype;
    h.Od = function(a, b) {
        return Lj(a, "pause", b)
    };
    h.Cd = function(a, b) {
        return Lj(a, "abandon", b)
    };
    h.Qd = function(a, b) {
        var c = T(S);
        if (a.w && !c) {
            var d = jg();
            a.oa().B = d
        }
        Ji(S, [a], !c, b);
        a.w = !1;
        return R(a, "resume", c)
    };
    h.Vd = function(a) {
        return R(a, "viewable_impression", T(S))
    };
    h.Rd = function(a, b) {
        var c = !T(S);
        Ji(S, [a], c, b);
        b = R(a, "skip", T(S));
        a.ra = !1;
        Kj(1, a.ia);
        return b
    };
    h.Nd = function(a, b) {
        Ji(S, [a], !T(S), b);
        return R(a, "mute", T(S))
    };
    h.Ud = function(a, b) {
        Ji(S, [a], !T(S), b);
        return R(a, "unmute", T(S))
    };
    h.Id = function(a, b) {
        a.ra = !0;
        Ji(S, [a], !T(S), b);
        return R(a, "fullscreen", T(S))
    };
    h.Gd = function(a, b) {
        a.ra = !1;
        Ji(S, [a], !T(S), b);
        return R(a, "exitfullscreen", T(S))
    };
    h.Jd = function(a) {
        return R(a, "fully_viewable_audible_half_duration_impression", T(S))
    };
    h.Ld = function(a) {
        return R(a, "measurable_impression", T(S))
    };
    h.Fd = function(a) {
        return R(a, "engagedview", T(S))
    };
    h.Kd = function(a) {
        return R(a, "impression", T(S))
    };
    h.Ed = function(a) {
        return R(a, "creativeview", T(S))
    };
    var Lj = function(a, b, c) {
        var d = a.oa(),
            e = jg();
        d.W = vh(d, e, !!a.w);
        Ji(S, [a], !T(S), c);
        a.w = !0;
        return R(a, b, T(S))
    };
    Gj.prototype.R = function(a, b) {
        Ji(S, [a], !T(S), b);
        return a.h()
    };
    Gj.prototype.F = function(a, b) {
        Ji(S, [a], !T(S), b);
        this.Jc(a);
        Kj(2, a.ia);
        return a.h()
    };
    var Mj = function(a, b, c) {
            if (!b.$b) {
                "i" != Xi && (S.done = !1);
                var d = yi.H();
                null != d.g && Xh(b, null != d.g ? d.g : null);
                di(b, Q.H().U, function(b) {
                    if (b) {
                        b.Wa = !0;
                        switch (b.ma()) {
                            case 1:
                                Ij(a, b, "fp");
                                break;
                            case 2:
                                a.Rb(b)
                        }
                        a.Sb(b)
                    }
                });
                d = p(c) ? c.opt_nativeTime : void 0;
                hg = d = r(d) ? d : jg();
                b.Ia = !0;
                var e = T(S);
                gi(b, d, e);
                Ji(S, [b], !e, c)
            }
        },
        Kj = function(a, b) {
            if (q(b)) {
                if (1 == a) var c = S.g;
                else if (2 == a) c = S.h;
                else return;
                var d = lb(c, function(c) {
                    return c.ma() != a ? !1 : c.ia == b
                });
                0 <= d && Array.prototype.splice.call(c, d, 1)
            }
        },
        Oj = function(a, b, c, d) {
            var e =
                nb(S.g, function(a) {
                    return a.element == c
                });
            null !== e && e.ia != b && (Kj(1, e.ia), e = null);
            e || (e = Nj(a, c), e.ia = b, e.Da = a.N, d && (e.Ja = d));
            return e
        },
        Nj = function(a, b) {
            jg();
            b = new fi(z, b, -1, 7);
            b.Qb = x(a.o, a);
            0 == S.h.length && (Q.H().B = 79463069);
            Ti([b]);
            Hi();
            return b
        };
    Gj.prototype.o = function(a) {
        a.Fa() && !a.Vc && this.Kc(a);
        1 == a.ma() && this.ec(a)
    };
    var Pj = function(a, b, c) {
        var d = Db(function(a) {
                return a == b
            }),
            e = {};
        d = (e.sv = "621", e.cb = "j", e.e = Wf[d], e);
        e = R(c, b, T(S));
        Ib(d, e);
        c.Ec[b] = e;
        return 2 == c.ma() ? vi(d).join("&") : a.h.g(d).g
    };
    Gj.prototype.nb = function(a, b) {
        if (Yi) return Qj("ue");
        a = this.w(a, b);
        if (!a) return Qj("nf");
        b = Qj();
        Ib(b, a.nb(!0, !1));
        return b
    };
    var Qj = function(a, b) {
            var c = {
                sv: "621",
                cb: "j"
            };
            c.nas = S.g.length;
            c.msg = a;
            p(b) && (a = Rj(b)) && (c.e = Wf[a]);
            return c
        },
        Rj = function(a) {
            var b = a.toLowerCase();
            return Db(function(a) {
                return a == b
            })
        },
        Tj = function(a, b) {
            b.C = 0;
            for (var c in Sf) null == a[c] && (b.C |= Sf[c]);
            Sj(a, "currentTime");
            Sj(a, "duration")
        };
    h = Gj.prototype;
    h.oc = function() {};
    h.Rb = function() {};
    h.Kc = function() {};
    h.ec = function() {};
    h.Jc = function() {};
    h.Fc = function() {};
    h.Sb = function() {};
    var Sj = function(a, b) {
        var c = a[b];
        p(c) && (a[b] = Math.floor(1E3 * c))
    };
    var Uj = Ha(),
        Vj = !1,
        Wj = !1,
        Xj = !1,
        U = function(a) {
            return !a || "function" !== typeof a || 0 > String(Function.prototype.toString).indexOf("[native code]") ? !1 : 0 <= String(a).indexOf("[native code]") && !0 || !1
        },
        Yj = function(a) {
            return !!(1 << a & Uj)
        },
        Zj = [function(a) {
                return !(!a.chrome || !a.chrome.webstore)
            }, function(a) {
                return !!a.document.documentMode
            }, function(a) {
                return !!a.document.fonts.ready
            }, function() {
                return Yj(0)
            }, function(a) {
                return !!a.ActiveXObject
            }, function(a) {
                return !!a.chrome
            }, function(a) {
                return !!a.navigator.serviceWorker
            },
            function(a) {
                return !!a.opera
            },
            function(a) {
                return !!a.sidebar
            },
            function() {
                return !+"\v1"
            },
            function() {
                return Yj(1)
            },
            function(a) {
                return !a.ActiveXObject
            },
            function(a) {
                return "-ms-ime-align" in a.document.documentElement.style
            },
            function(a) {
                return "-ms-scroll-limit" in a.document.documentElement.style
            },
            function(a) {
                return "-webkit-font-feature-settings" in a.document.body.style
            },
            function() {
                return Yj(2)
            },
            function(a) {
                return "ActiveXObject" in a
            },
            function(a) {
                return "MozAppearance" in a.document.documentElement.style
            },
            function(a) {
                return "_phantom" in
                    a
            },
            function(a) {
                return "callPhantom" in a
            },
            function(a) {
                return "content" in a.document.createElement("template")
            },
            function(a) {
                return "getEntriesByType" in a.performance
            },
            function() {
                return Yj(3)
            },
            function(a) {
                return "image-rendering" in a.document.body.style
            },
            function(a) {
                return "object-fit" in a.document.body.style
            },
            function(a) {
                return "open" in a.document.createElement("details")
            },
            function(a) {
                return "orientation" in a.screen
            },
            function(a) {
                return "performance" in a
            },
            function(a) {
                return "shape-image-threshold" in a.document.body.style
            },
            function() {
                return Yj(4)
            },
            function(a) {
                return "srcset" in a.document.createElement("img")
            },
            function() {
                return Wj
            },
            function() {
                return Xj
            },
            function() {
                return Yj(5)
            },
            function(a) {
                a = a.document.createElement("div");
                a.style.width = "1px";
                a.style.width = "-webkit-min-content";
                a.style.width = "min-content";
                return "1px" != a.style.width
            },
            function(a) {
                a = a.document.createElement("div");
                a.style.width = "1px";
                a.style.width = "calc(1px - 1px)";
                a.style.width = "-webkit-calc(1px - 1px)";
                return "1px" != a.style.width
            },
            function() {
                var a = !1;
                eval('var DummyFunction1 = function(x){ "use strict"; var a = 12; b = a + x*35; }');
                try {
                    DummyFunction1()
                } catch (b) {
                    a = !0
                }
                return a
            },
            function() {
                var a = !1;
                try {
                    DummyFunction2()
                } catch (b) {
                    a = !0
                }
                return a
            },
            function() {
                return !1
            },
            function() {
                return Yj(6)
            },
            function(a) {
                var b = a.document.createElement("canvas");
                b.width = b.height = 1;
                b = b.getContext("2d");
                b.globalCompositeOperation = "multiply";
                b.fillStyle = "rgb(0,255,255)";
                b.fillRect(0, 0, 1, 1);
                b.fill();
                b.fillStyle = "rgb(255,255,0)";
                b.fillRect(0, 0, 1, 1);
                b.fill();
                b = b.getImageData(0, 0, 1, 1).data;
                return b[0] == b[2] && b[1] == b[3] || U(a.navigator.vibrate)
            },
            function(a) {
                a =
                    a.document.createElement("canvas");
                a.width = a.height = 1;
                a = a.getContext("2d");
                a.globalCompositeOperation = "multiply";
                a.fillStyle = "rgb(0,255,255)";
                a.fillRect(0, 0, 1, 1);
                a.fill();
                a.fillStyle = "rgb(255,255,0)";
                a.fillRect(0, 0, 1, 1);
                a.fill();
                a = a.getImageData(0, 0, 1, 1).data;
                return a[0] == a[2] && a[1] == a[3]
            },
            function(a) {
                return U(a.document.createElement("div").matches)
            },
            function(a) {
                a = a.document.createElement("input");
                a.setAttribute("type", "range");
                return "text" !== a.type
            },
            function(a) {
                return a.CSS.supports("image-rendering",
                    "pixelated")
            },
            function(a) {
                return a.CSS.supports("object-fit", "contain")
            },
            function() {
                return Yj(7)
            },
            function(a) {
                return a.CSS.supports("object-fit", "inherit")
            },
            function(a) {
                return a.CSS.supports("shape-image-threshold", "0.9")
            },
            function(a) {
                return a.CSS.supports("word-break", "keep-all")
            },
            function() {
                return eval("1 == [for (item of [1,2,3]) item][0]")
            },
            function(a) {
                return U(a.CSS.supports)
            },
            function() {
                return U(Intl.Collator)
            },
            function(a) {
                return U(a.document.createElement("dialog").show)
            },
            function() {
                return Yj(8)
            },
            function(a) {
                return U(a.document.createElement("div").animate([{
                    transform: "scale(1)",
                    pd: "ease-in"
                }, {
                    transform: "scale(1.3)",
                    pd: "ease-in"
                }], {
                    duration: 1300,
                    gh: 1
                }).reverse)
            },
            function(a) {
                return U(a.document.createElement("div").animate)
            },
            function(a) {
                return U(a.document.documentElement.webkitRequestFullScreen)
            },
            function(a) {
                return U(a.navigator.getBattery)
            },
            function(a) {
                return U(a.navigator.permissions.query)
            },
            function() {
                return !1
            },
            function() {
                return Yj(9)
            },
            function() {
                return U(webkitRequestAnimationFrame)
            },
            function(a) {
                return U(a.BroadcastChannel.call)
            },
            function(a) {
                return U(a.FontFace)
            },
            function(a) {
                return U(a.Gamepad)
            },
            function() {
                return Yj(10)
            },
            function(a) {
                return U(a.MutationEvent)
            },
            function(a) {
                return U(a.MutationObserver)
            },
            function(a) {
                return U(a.crypto.getRandomValues)
            },
            function(a) {
                return U(a.document.body.createShadowRoot)
            },
            function(a) {
                return U(a.document.body.webkitCreateShadowRoot)
            },
            function(a) {
                return U(a.fetch)
            },
            function() {
                return Yj(11)
            },
            function(a) {
                return U(a.navigator.serviceWorker.register)
            },
            function(a) {
                return U(a.navigator.webkitGetGamepads)
            },
            function(a) {
                return U(a.speechSynthesis.speak)
            },
            function(a) {
                return U(a.webkitRTCPeerConnection)
            },
            function(a) {
                return a.CSS.supports("--fake-var", "0")
            },
            function() {
                return Yj(12)
            },
            function(a) {
                return a.CSS.supports("cursor", "grab")
            },
            function(a) {
                return a.CSS.supports("cursor", "zoom-in")
            },
            function(a) {
                return a.CSS.supports("image-orientation", "270deg")
            },
            function() {
                return Yj(13)
            },
            function(a) {
                return a.CSS.supports("position", "sticky")
            },
            function(a) {
                return void 0 ===
                    a.document.createElement("style").scoped
            },
            function(a) {
                return a.performance.getEntriesByType("resource") instanceof Array
            },
            function() {
                return "undefined" == typeof InstallTrigger
            },
            function() {
                return "object" == typeof(new Intl.Collator).resolvedOptions()
            },
            function(a) {
                return "boolean" == typeof a.navigator.onLine
            },
            function() {
                return Yj(14)
            },
            function(a) {
                return "undefined" == typeof a.navigator.hh
            },
            function(a) {
                return "number" == typeof a.performance.now()
            },
            function() {
                return 0 == (new Uint16Array(1))[0]
            },
            function(a) {
                return -1 ==
                    a.ActiveXObject.toString().indexOf("native")
            },
            function(a) {
                return -1 == Object.prototype.toString.call(a.HTMLElement).indexOf("Constructor")
            }
        ],
        ak = [function(a) {
                a = a.document.createElement("div");
                var b = null,
                    c = ["{45EA75A0-A269-11D1-B5BF-0000F8051515}", "{3AF36230-A269-11D1-B5BF-0000F8051515}", "{89820200-ECBD-11CF-8B85-00AA005B4383}"];
                try {
                    a.style.behavior = "url(#default#clientcaps)"
                } catch (e) {}
                for (var d = 0; d < c.length; d++) {
                    try {
                        b = a.getComponentVersion(c[d], "componentid").replace(/,/g, ".")
                    } catch (e) {}
                    if (b) return b.split(".")[0]
                }
                return !1
            },
            function() {
                return (new Date).getTimezoneOffset()
            },
            function(a) {
                return (a.innerWidth || a.document.documentElement.clientWidth || a.document.body.clientWidth) / (a.innerHeight || a.document.documentElement.clientHeight || a.document.body.clientHeight)
            },
            function(a) {
                return (a.outerWidth || a.document && a.document.body && a.document.body.offsetWidth) / (a.outerHeight || a.document && a.document.body && a.document.body.offsetHeight)
            },
            function(a) {
                return a.screen.availWidth / a.screen.availHeight
            },
            function(a) {
                return a.screen.width /
                    a.screen.height
            }
        ],
        bk = [function(a) {
            return a.navigator.userAgent
        }, function(a) {
            return a.navigator.platform
        }, function(a) {
            return a.navigator.vendor
        }],
        dk = function() {
            try {
                ck()
            } catch (d) {}
            var a = "a=1&b=" + Uj + "&",
                b = [],
                c = 99;
            A(Zj, function(a, c) {
                var d = !1;
                try {
                    d = a(z)
                } catch (g) {}
                b[c / 32 >>> 0] |= d << c % 32
            });
            A(b, function(b, e) {
                a += String.fromCharCode(c + e) + "=" + (b >>> 0).toString(16) + "&"
            });
            c = 105;
            A(ak, function(b) {
                var d = "false";
                try {
                    d = b(z)
                } catch (f) {}
                a += String.fromCharCode(c++) + "=" + d + "&"
            });
            A(bk, function(b) {
                var d = "";
                try {
                    var f = b(z);
                    b = [];
                    for (var g = 0, k = 0; k < f.length; k++) {
                        var l = f.charCodeAt(k);
                        255 < l && (b[g++] = l & 255, l >>= 8);
                        b[g++] = l
                    }
                    if (!Df)
                        for (Df = {}, Ef = {}, f = 0; 65 > f; f++) Df[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f), Ef[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(f);
                    f = Ef;
                    l = [];
                    for (g = 0; g < b.length; g += 3) {
                        var n = b[g],
                            v = g + 1 < b.length,
                            G = v ? b[g + 1] : 0,
                            W = g + 2 < b.length,
                            u = W ? b[g + 2] : 0;
                        k = n >> 2;
                        var B = (n & 3) << 4 | G >> 4,
                            ia = (G & 15) << 2 | u >> 6,
                            je = u & 63;
                        W || (je = 64, v || (ia = 64));
                        l.push(f[k], f[B], f[ia], f[je])
                    }
                    d =
                        l.join("")
                } catch (bj) {}
                a += String.fromCharCode(c++) + "=" + d + "&"
            });
            return a.slice(0, -1)
        },
        ck = function() {
            if (!Vj) {
                var a = function() {
                    Wj = !0;
                    z.document.removeEventListener("webdriver-evaluate", a, !0)
                };
                z.document.addEventListener("webdriver-evaluate", a, !0);
                var b = function() {
                    Xj = !0;
                    z.document.removeEventListener("webdriver-evaluate-response", b, !0)
                };
                z.document.addEventListener("webdriver-evaluate-response", b, !0);
                Vj = !0
            }
        };
    var ek = function() {
        this.h = 64;
        this.g = Array(4);
        this.w = Array(this.h);
        this.o = this.l = 0;
        this.reset()
    };
    y(ek, Ff);
    ek.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.o = this.l = 0
    };
    var fk = function(a, b, c) {
            c || (c = 0);
            var d = Array(16);
            if (q(b))
                for (var e = 0; 16 > e; ++e) d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
            else
                for (e = 0; 16 > e; ++e) d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
            b = a.g[0];
            c = a.g[1];
            e = a.g[2];
            var f = a.g[3];
            var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
            b = c + (g << 7 & 4294967295 | g >>> 25);
            g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
            f = b + (g << 12 & 4294967295 | g >>> 20);
            g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
            e = f + (g << 17 & 4294967295 | g >>> 15);
            g = c + (b ^ e &
                (f ^ b)) + d[3] + 3250441966 & 4294967295;
            c = e + (g << 22 & 4294967295 | g >>> 10);
            g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
            b = c + (g << 7 & 4294967295 | g >>> 25);
            g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
            f = b + (g << 12 & 4294967295 | g >>> 20);
            g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
            e = f + (g << 17 & 4294967295 | g >>> 15);
            g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
            c = e + (g << 22 & 4294967295 | g >>> 10);
            g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
            b = c + (g << 7 & 4294967295 | g >>> 25);
            g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
            f = b + (g << 12 & 4294967295 | g >>> 20);
            g =
                e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
            e = f + (g << 17 & 4294967295 | g >>> 15);
            g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
            c = e + (g << 22 & 4294967295 | g >>> 10);
            g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
            b = c + (g << 7 & 4294967295 | g >>> 25);
            g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
            f = b + (g << 12 & 4294967295 | g >>> 20);
            g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
            e = f + (g << 17 & 4294967295 | g >>> 15);
            g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
            c = e + (g << 22 & 4294967295 | g >>> 10);
            g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
            b = c + (g << 5 & 4294967295 |
                g >>> 27);
            g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
            f = b + (g << 9 & 4294967295 | g >>> 23);
            g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
            e = f + (g << 14 & 4294967295 | g >>> 18);
            g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
            c = e + (g << 20 & 4294967295 | g >>> 12);
            g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
            b = c + (g << 5 & 4294967295 | g >>> 27);
            g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
            f = b + (g << 9 & 4294967295 | g >>> 23);
            g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
            e = f + (g << 14 & 4294967295 | g >>> 18);
            g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
            c = e + (g << 20 & 4294967295 |
                g >>> 12);
            g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
            b = c + (g << 5 & 4294967295 | g >>> 27);
            g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
            f = b + (g << 9 & 4294967295 | g >>> 23);
            g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
            e = f + (g << 14 & 4294967295 | g >>> 18);
            g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
            c = e + (g << 20 & 4294967295 | g >>> 12);
            g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
            b = c + (g << 5 & 4294967295 | g >>> 27);
            g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
            f = b + (g << 9 & 4294967295 | g >>> 23);
            g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
            e = f + (g << 14 & 4294967295 |
                g >>> 18);
            g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
            c = e + (g << 20 & 4294967295 | g >>> 12);
            g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
            b = c + (g << 4 & 4294967295 | g >>> 28);
            g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
            f = b + (g << 11 & 4294967295 | g >>> 21);
            g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
            e = f + (g << 16 & 4294967295 | g >>> 16);
            g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
            c = e + (g << 23 & 4294967295 | g >>> 9);
            g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
            b = c + (g << 4 & 4294967295 | g >>> 28);
            g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
            f = b + (g << 11 & 4294967295 | g >>> 21);
            g = e + (f ^
                b ^ c) + d[7] + 4139469664 & 4294967295;
            e = f + (g << 16 & 4294967295 | g >>> 16);
            g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
            c = e + (g << 23 & 4294967295 | g >>> 9);
            g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
            b = c + (g << 4 & 4294967295 | g >>> 28);
            g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
            f = b + (g << 11 & 4294967295 | g >>> 21);
            g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
            e = f + (g << 16 & 4294967295 | g >>> 16);
            g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
            c = e + (g << 23 & 4294967295 | g >>> 9);
            g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
            b = c + (g << 4 & 4294967295 | g >>> 28);
            g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
            f = b + (g << 11 & 4294967295 | g >>> 21);
            g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
            e = f + (g << 16 & 4294967295 | g >>> 16);
            g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
            c = e + (g << 23 & 4294967295 | g >>> 9);
            g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
            b = c + (g << 6 & 4294967295 | g >>> 26);
            g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
            f = b + (g << 10 & 4294967295 | g >>> 22);
            g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
            e = f + (g << 15 & 4294967295 | g >>> 17);
            g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
            c = e + (g << 21 & 4294967295 | g >>> 11);
            g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
            b = c +
                (g << 6 & 4294967295 | g >>> 26);
            g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
            f = b + (g << 10 & 4294967295 | g >>> 22);
            g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
            e = f + (g << 15 & 4294967295 | g >>> 17);
            g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
            c = e + (g << 21 & 4294967295 | g >>> 11);
            g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
            b = c + (g << 6 & 4294967295 | g >>> 26);
            g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
            f = b + (g << 10 & 4294967295 | g >>> 22);
            g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
            e = f + (g << 15 & 4294967295 | g >>> 17);
            g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
            c = e + (g << 21 & 4294967295 | g >>> 11);
            g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
            b = c + (g << 6 & 4294967295 | g >>> 26);
            g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
            f = b + (g << 10 & 4294967295 | g >>> 22);
            g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
            e = f + (g << 15 & 4294967295 | g >>> 17);
            g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
            a.g[0] = a.g[0] + b & 4294967295;
            a.g[1] = a.g[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
            a.g[2] = a.g[2] + e & 4294967295;
            a.g[3] = a.g[3] + f & 4294967295
        },
        gk = function(a, b) {
            if (!p(c)) var c = b.length;
            for (var d = c - a.h, e = a.w, f = a.l, g = 0; g < c;) {
                if (0 ==
                    f)
                    for (; g <= d;) fk(a, b, g), g += a.h;
                if (q(b))
                    for (; g < c;) {
                        if (e[f++] = b.charCodeAt(g++), f == a.h) {
                            fk(a, e);
                            f = 0;
                            break
                        }
                    } else
                        for (; g < c;)
                            if (e[f++] = b[g++], f == a.h) {
                                fk(a, e);
                                f = 0;
                                break
                            }
            }
            a.l = f;
            a.o += c
        };
    var hk = function() {
        this.h = null
    };
    ha(hk, oj);
    hk.prototype.g = function(a) {
        var b = oj.prototype.g.call(this, a),
            c = Uj = Ha(),
            d = Yj(5);
        c = (Wj ? !d : d) ? c | 2 : c & -3;
        d = Yj(2);
        c = (Xj ? !d : d) ? c | 8 : c & -9;
        c = {
            s1: (c >>> 0).toString(16)
        };
        this.h || (this.h = dk());
        b.w = this.h;
        b.B = nj(a, hj, c, "h", ik("kArwaWEsTs"));
        b.o = nj(a, jj, {}, "h", ik("b96YPMzfnx"));
        b.h = nj(a, kj, {}, "h", ik("yb8Wev6QDg"));
        return b
    };
    var ik = function(a) {
        return function(b) {
            var c = new ek;
            gk(c, b + a);
            var d = Array((56 > c.l ? c.h : 2 * c.h) - c.l);
            d[0] = 128;
            for (b = 1; b < d.length - 8; ++b) d[b] = 0;
            var e = 8 * c.o;
            for (b = d.length - 8; b < d.length; ++b) d[b] = e & 255, e /= 256;
            gk(c, d);
            d = Array(16);
            for (b = e = 0; 4 > b; ++b)
                for (var f = 0; 32 > f; f += 8) d[e++] = c.g[b] >>> f & 255;
            return wf(d).slice(-8)
        }
    };
    var jk = function() {
        Gj.call(this);
        this.D = void 0;
        this.L = this.I = null;
        this.C = !1;
        this.l = {};
        this.h = new hk;
        var a = Xf.H();
        (C(a.g, 509445015) || C(a.g, 509445017)) && "exc" != Q.H().U && (this.C = !0, this.I = new bh)
    };
    ha(jk, Gj);
    jk.prototype.w = function(a, b) {
        var c = this;
        switch (Q.H().U) {
            case "nis":
                var d = kk(this, a, b);
                break;
            case "gsv":
                d = mk(this, a, b);
                break;
            case "exc":
                d = nk(this, a);
                break;
            default:
                b.opt_overlayAdElement ? d = void 0 : b.opt_adElement ? d = Oj(this, a, b.opt_adElement, b.opt_osdId) : d = Pi(a) || void 0
        }
        d && 1 == d.ma() && d.T == wa && (d.T = function(a) {
            return c.Fc(a)
        });
        return d
    };
    jk.prototype.Fc = function(a) {
        var b = Q.H();
        a.g = 0;
        a.I = 0;
        if ("h" == a.Da || "n" == a.Da) {
            if ("exc" == b.U || "nis" == b.U) var c = va("ima.bridge.getVideoMetadata");
            else if (a.Ja && ok()) {
                var d = this.l[a.Ja];
                d ? c = function(a) {
                    pk(d, a)
                } : null !== d && Jg("lidar::missingPlayerCallback", Error())
            } else c = va("ima.common.getVideoMetadata");
            if (w(c)) try {
                var e = c(a.ia)
            } catch (f) {
                a.g |= 4
            } else a.g |= 2
        } else if ("b" == a.Da)
            if (b = va("ytads.bulleit.getVideoMetadata"), w(b)) try {
                e = b(a.ia)
            } catch (f) {
                a.g |= 4
            } else a.g |= 2;
            else a.g |= 1;
        a.g || (p(e) ? null === e ? a.g |= 16 :
            Eb(e) ? a.g |= 32 : null != e.errorCode && (a.I = e.errorCode, a.g |= 64) : a.g |= 8);
        null != e || (e = {});
        Tj(e, a);
        Yg(e.volume) && Yg(this.D) && (e.volume *= this.D);
        return e
    };
    var qk = function(a, b, c, d) {
            d = new fi(z, null, d, 7);
            d.Da = c;
            d.Qb = function(b) {
                a.o(b)
            };
            Si([d]);
            d.ia = b;
            return d
        },
        mk = function(a, b, c) {
            var d = Pi(b);
            d || (d = qk(a, b, "m", c.opt_nativeTime || -1));
            return d
        },
        kk = function(a, b, c) {
            var d = Pi(b);
            d || (d = qk(a, b, "n", c.opt_nativeTime || -1), d.ha = Q.H().D);
            return d
        },
        nk = function(a, b) {
            var c = Pi(b);
            c || (c = qk(a, b, "h", -1));
            return c
        },
        sk = function(a, b, c) {
            var d = Q.H();
            switch (b.Da) {
                case "b":
                    var e = va("ytads.bulleit.triggerExternalActivityEvent");
                    break;
                case "h":
                    if ("exc" == d.U) e = va("ima.bridge.triggerExternalActivityEvent");
                    else if (b.Ja && ok()) {
                        var f = a.l[b.Ja];
                        f ? e = function(a, b, c) {
                            rk(f, a, b, c)
                        } : Jg("lidar::missingPlayerCallback", Error())
                    } else e = va("ima.common.triggerExternalActivityEvent");
                    break;
                case "m":
                    e = va("ima.common.triggerExternalActivityEvent");
                    break;
                case "n":
                    e = va("ima.bridge.triggerExternalActivityEvent");
                    break;
                default:
                    return b.Ga |= 4, !1
            }
            if (w(e)) {
                a = Pj(a, c, b);
                try {
                    return e(b.ia, a, c), !0
                } catch (g) {
                    b.Ga |= 2
                }
            } else b.Ga |= 1;
            return !1
        };
    h = jk.prototype;
    h.Kc = function(a) {
        if (1 == a.ma()) var b = "viewable_impression";
        else if (2 == a.ma()) b = "overlay_viewable_immediate_impression";
        else return;
        sk(this, a, b) && (a.Vc = !0)
    };
    h.ec = function(a) {
        ii(a, a.oa().K[0]) && !a.ga && sk(this, a, "fully_viewable_audible_half_duration_impression") && (a.ga = !0)
    };
    h.oc = function(a) {
        a.Uc || a.Wa || this.g || !sk(this, a, "measurable_impression") || (a.Uc = !0)
    };
    h.Rb = function(a) {
        !a.g && a.Wa && sk(this, a, "overlay_unmeasurable_impression") && (a.g = !0)
    };
    h.Jc = function(a) {
        a.Wb && (a.Fa() ? sk(this, a, "overlay_viewable_end_of_session_impression") : sk(this, a, "overlay_unviewable_impression"), a.Wb = !1)
    };
    var tk = function(a, b, c, d) {
        c = void 0 === c ? {} : c;
        var e = {};
        Ib(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c);
        if (e.opt_bounds) return a.h.g(Qj("ol", d));
        if (p(d)) a: {
            if (Rj(d)) {
                if (Yi) {
                    e = Qj("ue", d);
                    break a
                }
                b = a.w(b, e);
                if (!b) {
                    e = Qj("nf", d);
                    break a
                }
                if (!a.G) {
                    a.G = !0;
                    try {
                        var f = jg(),
                            g = Q.H();
                        fg = f;
                        Wi = rd(z).ac;
                        Ii(S, !1);
                        var k = Q.H();
                        z.screen && (k.F = new I(z.screen.width, z.screen.height));
                        if ("nis" != g.U && "gsv" != g.U)
                            if (z.document.body && z.document.body.getBoundingClientRect)
                                if (S.l.kd = 0, S.l.Af = jg() - f, yi.H(), !g.h && dh() && Ri()) Hi();
                                else if (g.h && "exc" != g.U)
                            if (g.l) {
                                var l = uj.H();
                                C(l.w, a) || (l.w.push(a), a.A(l.h), a.B(l.g), a.M() && (l.C = !0));
                                l.I()
                            } else Hj();
                        else Hi();
                        else Yi = !0
                    } catch (v) {
                        throw S.reset(), v;
                    }
                }
                "i" == Xi && (b.Wa = !0, a.Sb(b));
                f = e.opt_fullscreen;
                p(f) && (b.ra = !!f);
                Vi() ? f = !1 : (f = Q.H().U, f = z && z.g || "nis" === f || "gsv" === f ? !1 : 0 === Mg(Ia));
                if (f) {
                    switch (b.ma()) {
                        case 1:
                            Ij(a, b, "pvu");
                            break;
                        case 2:
                            a.Rb(b)
                    }
                    S.o.cancel();
                    Xi = "pvu";
                    S.done = !0
                }
                d = d.toLowerCase();
                !f && C(Tf, d) && Mj(a, b, e);
                b.$b && C(Uf, d) && a.oc(b);
                (f = b.Ma[d]) && jh(b.ba, f);
                switch (b.ma()) {
                    case 1:
                        var n =
                            a.J[d];
                        break;
                    case 2:
                        n = a.K[d]
                }
                if (n && (e = n.call(a, b, e), p(e))) {
                    n = Qj(void 0, d);
                    Ib(n, e);
                    e = n;
                    break a
                }
            }
            e = void 0
        }
        else e = a.nb(b, e);
        e && (n = a.L, d = {}, n && (n.h && 0 < n.h && (d.pnc = n.h), n.g && 0 < n.g && (d.pns = n.g), n.o && 0 < n.o && (d.pnmm = n.o), n.l && 0 < n.l && (d.pnk = n.l), d.ptlt = n.w), Ib(e, d));
        return a.h.g(e)
    };
    jk.prototype.o = function(a) {
        if (this.C) {
            var b = this.I,
                c = b.g,
                d = jg();
            c.w = d;
            this.L = b.g
        }
        this.g && 1 == a.ma() ? uk(this, a) : Gj.prototype.o.call(this, a)
    };
    jk.prototype.Sb = function(a) {
        this.g && 1 == a.ma() && uk(this, a)
    };
    var uk = function(a, b) {
            var c;
            if (b.Ja && ok()) {
                var d = a.l[b.Ja];
                d ? c = function(a, b) {
                    vk(d, a, b)
                } : null !== d && Jg("lidar::missingPlayerCallback", Error())
            } else c = va("ima.common.triggerViewabilityMeasurementUpdate");
            if (w(c)) {
                var e = ki(b);
                e.nativeVolume = a.D;
                a.C && (e.userActivity = a.L);
                c(b.ia, e)
            }
        },
        wk = function(a, b, c) {
            a.l[b] = c
        },
        ok = function() {
            var a = Xf.H();
            return C(a.g, 495644009) || C(a.g, 495644010)
        },
        xk = function(a) {
            var b = {};
            return b.viewability = a.g, b.googleViewability = a.l, b.moatInit = a.w, b.moatViewability = a.B, b.integralAdsViewability =
                a.o, b.doubleVerifyViewability = a.h, b
        },
        yk = function(a, b, c) {
            c = void 0 === c ? {} : c;
            a = tk(jk.H(), b, c, a);
            return xk(a)
        };
    xa(jk);
    t("Goog_AdSense_Lidar_sendVastEvent", Ig(193, yk, void 0, function() {
        return {
            v: "621",
            "if": Q.H().h ? "1" : "0",
            nas: String(S.g.length)
        }
    }), void 0);
    t("Goog_AdSense_Lidar_getViewability", Ig(194, function(a, b) {
        b = void 0 === b ? {} : b;
        a = tk(jk.H(), a, b);
        return xk(a)
    }), void 0);
    t("Goog_AdSense_Lidar_getUrlSignalsArray", Ig(195, function() {
        return we()
    }), void 0);
    t("Goog_AdSense_Lidar_getUrlSignalsList", Ig(196, function() {
        return If(we())
    }), void 0);
    var zk = function(a) {
        O.call(this);
        this.g = a || "goog_" + ab++;
        this.o = []
    };
    y(zk, O);
    zk.prototype.l = !1;
    zk.prototype.connect = function() {
        for (this.l = !0; 0 != this.o.length;) {
            var a = this.o.shift();
            this.sendMessage(a.name, a.type, a.data)
        }
    };
    var Ak = function(a, b, c, d) {
            a.l ? a.sendMessage(b, c, d) : a.o.push({
                name: b,
                type: c,
                data: d
            })
        },
        Bk = function(a, b, c, d, e) {
            Bd.call(this, a);
            this.$ = b;
            this.V = c;
            this.pb = d;
            this.Ic = e
        };
    y(Bk, Bd);
    Bk.prototype.toString = function() {
        return ""
    };
    var Ck = {
        ig: "application/dash+xml",
        Cg: "video/mp4",
        Eg: "video/mpeg",
        zg: "application/x-mpegURL",
        Fg: "video/ogg",
        Wg: "video/3gpp",
        ah: "video/webm",
        Bg: "audio/mpeg",
        Dg: "audio/mp4"
    };
    var Dk = function() {};
    Dk.prototype.allowCustom = !0;
    var Ek = {
            wg: "Image",
            ng: "Flash",
            Xc: "All"
        },
        Fk = {
            rg: "Html",
            ug: "IFrame",
            Ug: "Static",
            Xc: "All"
        },
        Gk = {
            vg: "IgnoreSize",
            Qg: "SelectExactMatch",
            Rg: "SelectNearMatch"
        },
        Hk = {
            jg: "DisallowResize",
            Pg: "ResizeSmaller"
        };
    var Ik = !1,
        Jk = function(a) {
            if (a = a.match(/[\d]+/g)) a.length = 3
        };
    (function() {
        if (navigator.plugins && navigator.plugins.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && (Ik = !0, a.description)) {
                Jk(a.description);
                return
            }
            if (navigator.plugins["Shockwave Flash 2.0"]) {
                Ik = !0;
                return
            }
        }
        if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"], Ik = !(!a || !a.enabledPlugin))) {
            Jk(a.enabledPlugin.description);
            return
        }
        try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            Ik = !0;
            Jk(b.GetVariable("$version"));
            return
        } catch (c) {}
        try {
            b =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            Ik = !0;
            return
        } catch (c) {}
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Ik = !0, Jk(b.GetVariable("$version"))
        } catch (c) {}
    })();
    var Kk = Ik;
    var Lk = "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/sul www.google.com/pagead/xsul www.youtube.com/pagead/sul www.youtube.com/pagead/psul www.youtube.com/pagead/slav".split(" "),
        Mk = /\bocr\b/,
        Nk = 0,
        Ok = {},
        Pk = function(a) {
            if (Ka(Ya(a))) return !1;
            if (0 <= a.indexOf("://pagead2.googlesyndication.com/pagead/gen_204?id=yt3p&sr=1&")) return !0;
            try {
                var b = new Rd(a)
            } catch (c) {
                return null != nb(Lk, function(b) {
                    return 0 < a.search(b)
                })
            }
            return b.w.match(Mk) ? !0 : null != nb(Lk, function(b) {
                return null != a.match(b)
            })
        },
        Tk = function(a, b) {
            if (a && (a = Qk(a), !Ka(a))) {
                var c = 'javascript:"<body><img src=\\""+' + a + '+"\\"></body>"';
                b ? Rk(function(b) {
                    Sk(b ? c : 'javascript:"<body><object data=\\""+' + a + '+"\\" width=1 height=1 style=\\"visibility:hidden;\\"></body>"')
                }) : Sk(c)
            }
        },
        Sk = function(a) {
            var b = Rc("IFRAME", {
                src: a,
                style: "display:none"
            });
            a = Kc(b).body;
            var c = vf(function() { of (d);
                Tc(b)
            }, 15E3);
            var d = ef(b, ["load", "error"], function() {
                vf(function() {
                    m.clearTimeout(c);
                    Tc(b)
                }, 5E3)
            });
            a.appendChild(b)
        },
        Rk = function(a) {
            var b = Ok.imageLoadingEnabled;
            if (null != b) a(b);
            else {
                var c = !1;
                Uk(function(b, e) {
                    delete Ok[e];
                    c || (c = !0, null != Ok.imageLoadingEnabled || (Ok.imageLoadingEnabled = b), a(b))
                })
            }
        },
        Uk = function(a) {
            var b = new Image,
                c = "" + Nk++;
            Ok[c] = b;
            b.onload = function() {
                clearTimeout(d);
                a(!0, c)
            };
            var d = setTimeout(function() {
                a(!1, c)
            }, 300);
            b.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        },
        Vk = function(a) {
            if (a) {
                var b = document.createElement("OBJECT");
                b.data = a;
                b.width = "1";
                b.height = "1";
                b.style.visibility = "hidden";
                var c = "" + Nk++;
                Ok[c] = b;
                b.onload = b.onerror = function() {
                    delete Ok[c]
                };
                document.body.appendChild(b)
            }
        },
        Wk = function(a) {
            if (a) {
                var b = new Image,
                    c = "" + Nk++;
                Ok[c] = b;
                b.onload = b.onerror = function() {
                    delete Ok[c]
                };
                b.src = a
            }
        },
        Xk = function(a, b, c) {
            if (a) {
                if (c) try {
                    if (m.navigator && m.navigator.sendBeacon && m.navigator.sendBeacon(a, "")) return
                } catch (d) {}
                b ? Rk(function(b) {
                    b ? Wk(a) : Vk(a)
                }) : Wk(a)
            }
        },
        Qk = function(a) {
            a instanceof
            Sb || (a = a.Va ? a.Ta() : String(a), Tb.test(a) || (a = "about:invalid#zClosurez"), a = Ub(a));
            if (a instanceof Sb && a.constructor === Sb && a.gd === Rb) var b = a.Hb;
            else ya(a), b = "type_error:SafeUrl";
            if ("about:invalid#zClosurez" === b) return "";
            b instanceof $b ? a = b : (a = null, b.Lb && (a = b.Eb()), b = Ta(b.Va ? b.Ta() : String(b)), a = ac(b, a));
            a instanceof $b && a.constructor === $b && a.fd === Zb ? a = a.Gb : (ya(a), a = "type_error:SafeHtml");
            return encodeURIComponent(String(If(a)))
        };
    var Yk = /(?:\[|%5B)([a-zA-Z0-9_]+)(?:\]|%5D)/g,
        Zk = function(a, b) {
            return a.replace(Yk, function(a, d) {
                try {
                    var c = Fb(b, d);
                    if (null == c) return a;
                    c = c.toString();
                    if ("" == c || !Ka(Ya(c))) return encodeURIComponent(c).replace(/%2C/g, ",")
                } catch (f) {}
                return a
            })
        };
    var $k = function(a, b, c) {
        this.g = a;
        this.h = Math.min(Math.max(b || 0, 0), 1);
        this.l = null != c ? c : !0
    };
    var al = function(a) {
            this.l = a;
            this.h = new Md;
            this.g = null
        },
        bl = function(a) {
            var b = Math.random(),
                c = 0,
                d = a.h.ca();
            A(d, function(a) {
                c += a.h
            }, a);
            var e = 1 < c ? c : 1;
            a.g = null;
            for (var f = 0, g = 0; g < d.length; ++g)
                if (f += d[g].h, f / e >= b) {
                    a.g = d[g];
                    break
                }
        };
    var el = function() {
            this.h = null != m.G_testRunner;
            this.g = new Md;
            V(this, "GvnExternalLayer", 31061774, .01);
            V(this, "GvnExternalLayer", 31061775, .01);
            V(this, "GvnExternalLayer", 41351088, .01);
            V(this, "GvnExternalLayer", 41351089, .01);
            V(this, "GvnExternalLayer", 420706008, .05);
            V(this, "GvnExternalLayer", 420706009, .05);
            V(this, "GvnExternalLayer", 420706024, 0);
            V(this, "GvnExternalLayer", 420706025, 0);
            V(this, "GvnExternalLayer", 420706029, 0);
            V(this, "GvnExternalLayer", 634360101, 0);
            V(this, "GvnExternalLayer", 634360102, 0);
            V(this,
                "GvnExternalLayer", 21592082, .01);
            V(this, "GvnExternalLayer", 420706068, .01);
            V(this, "GvnExternalLayer", 420706069, .01);
            V(this, "GvnExternalLayer", 324123020, .05);
            V(this, "GvnExternalLayer", 324123021, .05);
            V(this, "GvnExternalLayer", 420706081, .01);
            V(this, "GvnExternalLayer", 420706082, .01);
            var a = M.la();
            dh(a) && (fc(z.top) ? (V(this, "ActiveViewExternalLayer", 509445010, .01), V(this, "ActiveViewExternalLayer", 509445011, .01)) : (V(this, "ActiveViewExternalLayer", 509445012, .01), V(this, "ActiveViewExternalLayer", 509445013, .01)));
            V(this, "ActiveViewExternalLayer", 509445014, .01);
            V(this, "ActiveViewExternalLayer", 509445015, .01);
            V(this, "ActiveViewExternalLayer", 495644008, .05);
            V(this, "ActiveViewExternalLayer", 495644009, .05);
            V(this, "ActiveViewExternalLayer", 495644010, .05);
            V(this, "GvnExternalLayer", 634360200, .01);
            V(this, "GvnExternalLayer", 634360201, .01);
            V(this, "GvnExternalLayer", 413051065, .01);
            V(this, "GvnExternalLayer", 413051066, .01);
            V(this, "GvnExternalLayer", 651800001, .01);
            V(this, "GvnExternalLayer", 651800002, .01);
            V(this, "GvnExternalLayer",
                667080007, .01);
            V(this, "GvnExternalLayer", 667080008, .01);
            cl(this);
            a = Ed(M);
            a = Hd(a);
            null != a && (this.h = !1, dl(this, a.map(String)))
        },
        fl = ["ActiveViewExternalLayer"],
        gl = null,
        hl = function() {
            gl || (gl = new el);
            return gl
        },
        V = function(a, b, c, d) {
            Ka(Ya(b)) || isNaN(c) || 0 >= c || (c = new $k(c, d), il(a, b).h.set(c.g, c))
        },
        cl = function(a) {
            Gd() || M.Nb() || A(a.g.ca(), function(a) {
                bl(a)
            }, a)
        },
        dl = function(a, b) {
            A(b, function(a) {
                var b = Number(a);
                a = "FORCED_PUB_EXP_LAYER_" + a;
                isNaN(b) || 0 >= b || Ka(Ya(a)) || (il(this, a).g = new $k(b, 0, !0))
            }, a)
        },
        jl = function() {
            var a =
                hl(),
                b = {};
            A(a.g.ca(), function(a) {
                var c = a.g;
                if (c) {
                    var e = {};
                    e.experimentId = c.g;
                    e.shouldReport = c.l;
                    b[a.l] = e
                } else b[a.l] = {}
            });
            return b
        },
        kl = function(a, b) {
            return a.h ? !1 : jb(a.g.ca(), function(a) {
                return !!a.g && a.g.g == b
            })
        },
        ll = function() {
            var a = hl();
            if (a.h) return "";
            var b = [];
            A(a.g.ca(), function(a) {
                (a = a.g) && a.l && b.push(a.g)
            });
            return b.sort().join(",")
        },
        il = function(a, b) {
            var c = a.g.get(b);
            null == c && (c = new al(b), a.g.set(b, c));
            return c
        },
        ml = function(a) {
            var b = [];
            A(fl, function(c) {
                (c = (c = il(a, c)) ? c.g : null) && b.push(c.g)
            });
            return b
        };
    var nl = ["*.youtu.be", "*.youtube.com"],
        ol = "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" "),
        pl = ["c.googlesyndication.com"];

    function ql(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)", "i")).test(a)
    }

    function rl(a) {
        try {
            var b = (new Rd(a)).g;
            b = b.replace(/^www./i, "");
            return nl.some(function(a) {
                return sl(a, b)
            })
        } catch (c) {
            return !1
        }
    }

    function sl(a, b) {
        if (Ka(Ya(b))) return !1;
        a = a.toLowerCase();
        b = b.toLowerCase();
        return "*." == a.substr(0, 2) ? (a = a.substr(2), a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
    };
    var tl = ["*.googlesyndication.com", "gcdn.2mdn.net"],
        vl = function(a) {
            try {
                var b = (new Rd(a)).g;
                b = b.replace(/^www./i, "");
                return jb(tl, function(a) {
                    return ul(a, b)
                })
            } catch (c) {
                return !1
            }
        },
        ul = function(a, b) {
            if (Ka(Ya(b))) return !1;
            a = a.toLowerCase();
            b = b.toLowerCase();
            return "*." == a.substr(0, 2) ? (a = a.substr(2), a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
        };
    var wl = function(a) {
        try {
            a: {
                var b = a,
                    c = void 0,
                    d = b.length - 11 - 2;
                if (!(-1 == b.indexOf("URL_SIGNALS") || 2048 <= d || !c && !window.Goog_AdSense_Lidar_getUrlSignalsArray)) {
                    c = c || window.Goog_AdSense_Lidar_getUrlSignalsArray();
                    d = {};
                    for (var e = 0; e < c.length; ++e) {
                        d.URL_SIGNALS = c[e];
                        var f = Zk(b, d);
                        if (2048 > f.length) {
                            a = f;
                            break a
                        }
                    }
                }
                a = b
            }
        }
        catch (n) {}
        try {
            f = a;
            var g = window.location.protocol;
            g = void 0 === g ? window.location.protocol : g;
            b = !1;
            ql(f, pl) ? b = !1 : null != f && rl(f) ? b = !0 : "https:" == g && ql(f, ol) && (b = !0);
            if (b) {
                var k = new Rd(f);
                "https" == k.l ?
                    a = f : (Sd(k, "https"), a = k.toString())
            } else a = f;
            var l = !M.la();
            g = !1;
            !M.la() && kl(hl(), 634360102) && (g = !0);
            (k = a) && (Pk(k) ? Tk(k, l) : Xk(k, l, g))
        } catch (n) {}
    };
    var xl = function(a, b) {
            this.message = a;
            this.g = b
        },
        yl = new xl("Invalid usage of the API. Cause: {0}", 900),
        zl = new xl("Failed to initialize ad playback element before starting ad playback.", 400),
        Al = new xl("The provided {0} information: {1} is invalid.", 1101),
        Bl = function(a, b, c) {
            var d = b || null;
            if (!(d instanceof xd)) {
                var e = a.g,
                    f = a.message,
                    g = sb(arguments, 2);
                if (0 < g.length)
                    for (var k = 0; k < g.length; k++) f = f.replace(new RegExp("\\{" + k + "\\}", "ig"), g[k]);
                e = new xd("adPlayError", f, e);
                e.g = d;
                d = e
            }
            return d
        };
    var Dl = function(a, b) {
            if (null == a || 0 >= a.width || 0 >= a.height) throw Bl(Al, null, "ad slot size", a.toString());
            this.h = a;
            this.g = null != b ? b : new Dk;
            this.w = Cl(Fk, this.g.resourceType) ? this.g.resourceType : "All";
            this.o = Cl(Ek, this.g.creativeType) ? this.g.creativeType : "All";
            this.F = Cl(Gk, this.g.sizeCriteria) ? this.g.sizeCriteria : "SelectExactMatch";
            this.A = Cl(Hk, this.g.g) ? this.g.g : "DisallowResize";
            this.l = null != this.g.adSlotIds ? this.g.adSlotIds : [];
            this.B = r(this.g.nearMatchPercent) && 0 < this.g.nearMatchPercent && 100 >= this.g.nearMatchPercent ?
                this.g.nearMatchPercent : 90
        },
        Gl = function(a, b) {
            var c = [];
            A(b, function(a) {
                if (this.g.allowCustom || a.L) !Ka(a.h) && (isNaN(a.B) || isNaN(a.w) || a.w == a.B) && El(this, a) ? c.push(a) : (a = Fl(this, a), null != a && !Ka(a.h) && c.push(a))
            }, a);
            return c
        },
        El = function(a, b) {
            var c;
            if (c = "Flash" != b.g || Kk) {
                if (c = "All" == a.w || a.w == b.D) c = b.g, c = null != c ? "All" == a.o || a.o == c : !0;
                c && (c = b.G, c = 0 == a.l.length ? !0 : null != c ? 0 <= eb(a.l, c) : !1)
            }
            if (c)
                if (b = b.l, (c = "IgnoreSize" == a.F) || (c = a.h, c = c == b ? !0 : c && b ? c.width == b.width && c.height == b.height : !1), c) a = !0;
                else {
                    if (c =
                        "SelectNearMatch" == a.F) "ResizeSmaller" != a.A || b.width <= a.h.width && b.height <= a.h.height || (c = a.h, c = Math.min(c.width / b.width, c.height / b.height), b = new I(c * b.width, c * b.height)), c = b.width, b = b.height, c = c > a.h.width || b > a.h.height || c < a.B / 100 * a.h.width || b < a.B / 100 * a.h.height ? !1 : !0;
                    a = c
                }
            else a = !1;
            return a
        },
        Fl = function(a, b) {
            b = b.o;
            return null != b ? nb(b, function(a) {
                return El(this, a)
            }, a) : null
        },
        Cl = function(a, b) {
            var c;
            if (c = null != b) a: {
                for (var d in a)
                    if (a[d] == b) {
                        c = !0;
                        break a
                    }
                c = !1
            }
            return c
        };
    var Hl = function(a) {
        var b = {};
        A(a.split(","), function(a) {
            var c = a.split("=");
            2 == c.length && (a = La(c[0]), c = La(c[1]), 0 < a.length && (b[a] = c))
        });
        return b
    };
    var Il = function() {
        this.B = 1;
        this.l = -1;
        this.g = 1;
        this.w = this.o = 0;
        this.h = !1
    };
    h = Il.prototype;
    h.ee = function() {
        return this.B
    };
    h.be = function() {
        return this.l
    };
    h.$d = function() {
        return this.g
    };
    h.ce = function() {
        return this.o
    };
    h.de = function() {
        return this.w
    };
    h.ae = function() {
        return this.h
    };
    var Jl = function(a) {
        this.h = a.content;
        this.g = a.contentType;
        this.L = a.isSynthetic;
        this.l = a.size;
        this.w = a.masterSequenceNumber;
        this.D = a.resourceType;
        this.B = a.sequenceNumber;
        this.G = a.adSlotId;
        this.o = [];
        a = a.backupCompanions;
        null != a && (this.o = gb(a, function(a) {
            return new Jl(a)
        }))
    };
    Jl.prototype.getContent = function() {
        return this.h
    };
    Jl.prototype.F = function() {
        return this.g
    };
    Jl.prototype.C = function() {
        return this.l.width
    };
    Jl.prototype.A = function() {
        return this.l.height
    };
    var X = function(a) {
        this.g = a
    };
    X.prototype.h = function() {
        return this.g.adId
    };
    X.prototype.l = function() {
        return this.g.creativeAdId
    };
    X.prototype.o = function() {
        return this.g.creativeId
    };
    var Kl = function(a) {
        return a.g.adQueryId
    };
    h = X.prototype;
    h.ge = function() {
        return this.g.adSystem
    };
    h.he = function() {
        return this.g.advertiserName
    };
    h.ie = function() {
        return this.g.apiFramework
    };
    h.Be = function() {
        return this.g.adWrapperIds
    };
    h.De = function() {
        return this.g.adWrapperCreativeIds
    };
    h.Ce = function() {
        return this.g.adWrapperSystems
    };
    h.Ee = function() {
        return this.g.linear
    };
    h.Fe = function() {
        return this.g.skippable
    };
    h.ke = function() {
        return this.g.contentType
    };
    h.sd = function() {
        return this.g.description
    };
    h.ud = function() {
        return this.g.title
    };
    h.Ib = function() {
        return this.g.duration
    };
    h.ze = function() {
        return this.g.vastMediaWidth
    };
    h.ye = function() {
        return this.g.vastMediaHeight
    };
    h.Ae = function() {
        return this.g.width
    };
    h.oe = function() {
        return this.g.height
    };
    h.ve = function() {
        return this.g.uiElements
    };
    h.qe = function() {
        return this.g.minSuggestedDuration
    };
    h.fe = function() {
        var a = this.g.adPodInfo,
            b = new Il;
        b.o = a.podIndex;
        b.w = a.timeOffset;
        b.B = a.totalAds;
        b.g = a.adPosition;
        b.h = a.isBumper;
        b.l = a.maxDuration;
        return b
    };
    h.je = function(a, b, c) {
        var d = gb(this.g.companions, function(a) {
            return new Jl(a)
        });
        return Gl(new Dl(new I(a, b), c), d)
    };
    h.te = function() {
        return Hl(Ya(this.g.traffickingParameters))
    };
    h.ue = function() {
        return this.g.traffickingParameters
    };
    h.pe = function() {
        return this.g.mediaUrl
    };
    h.se = function() {
        return this.g.surveyUrl
    };
    h.ne = function() {
        return this.g.dealId
    };
    h.xe = function() {
        return this.g.universalAdIdValue
    };
    h.we = function() {
        return this.g.universalAdIdRegistry
    };
    h.re = function() {
        return this.g.skipTimeOffset
    };
    h.Ge = function() {
        return this.g.disableUi
    };
    var Ll = function(a) {
        yd.call(this);
        this.w = a;
        this.l = {}
    };
    y(Ll, yd);
    var Ml = [];
    Ll.prototype.h = function(a, b, c, d) {
        return Nl(this, a, b, c, d)
    };
    var Nl = function(a, b, c, d, e, f) {
            za(c) || (c && (Ml[0] = c.toString()), c = Ml);
            for (var g = 0; g < c.length; g++) {
                var k = ff(b, c[g], d || a.handleEvent, e || !1, f || a.w || a);
                if (!k) break;
                a.l[k.key] = k
            }
            return a
        },
        Ol = function(a, b, c, d, e, f) {
            if (za(c))
                for (var g = 0; g < c.length; g++) Ol(a, b, c[g], d, e, f);
            else(b = ef(b, c, d || a.handleEvent, e, f || a.w || a)) && (a.l[b.key] = b)
        };
    Ll.prototype.B = function(a, b, c, d, e) {
        if (za(b))
            for (var f = 0; f < b.length; f++) this.B(a, b[f], c, d, e);
        else c = c || this.handleEvent, d = Ba(d) ? !!d.capture : !!d, e = e || this.w || this, c = gf(c), d = !!d, b = Te(a) ? af(a.F, String(b), c, d, e) : a ? (a = jf(a)) ? af(a, b, c, d, e) : null : null, b && ( of (b), delete this.l[b.key]);
        return this
    };
    var Pl = function(a) {
        vb(a.l, function(a, c) {
            this.l.hasOwnProperty(c) && of (a)
        }, a);
        a.l = {}
    };
    Ll.prototype.O = function() {
        Ll.ea.O.call(this);
        Pl(this)
    };
    Ll.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Ql = function(a) {
        return (a = a.exec(D)) ? a[1] : ""
    };
    (function() {
        if (xf) return Ql(/Firefox\/([0-9.]+)/);
        if (F || oc || nc) return Dc;
        if (Bf) return mc() ? Ql(/CriOS\/([0-9.]+)/) : Ql(/Chrome\/([0-9.]+)/);
        if (Cf && !mc()) return Ql(/Version\/([0-9.]+)/);
        if (yf || zf) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(D);
            if (a) return a[1] + "." + a[2]
        } else if (Af) return (a = Ql(/Android\s+([0-9.]+)/)) ? a : Ql(/Version\/([0-9.]+)/);
        return ""
    })();
    var Rl = "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(" ");
    var Sl = {},
        Tl = "",
        Ul = /OS (\S+) like/,
        Vl = /Android ([\d\.]+)/,
        Xl = function() {
            return !Wl() && (Ci() || Bi())
        },
        Yl = function() {
            return uc && !vc || Va(D, "iPod")
        },
        Zl = function() {
            return Yl() || vc
        },
        am = function(a) {
            return Zl() && $l(Ul, a)
        },
        bm = function(a) {
            return tc && $l(Vl, a)
        },
        $l = function(a, b) {
            null == Sl[b] && (Ka(Tl) && (a = a.exec(D)) && (Tl = a[1]), (a = Tl) ? (a = a.replace(/_/g, "."), Sl[b] = 0 <= $a(a, b)) : Sl[b] = !1);
            return Sl[b]
        },
        Wl = function() {
            return M.la() || !1
        },
        cm = function() {
            var a = D;
            return a ? Va(a, "Nintendo WiiU") : !1
        },
        dm = function() {
            return Af || Wl() &&
                tc && !bm(4.4)
        },
        em = function(a) {
            return Wl() || M.ub() && Xl() || Zl() && (!(vc || am(10) && M.h) || !a) || tc && !bm(4) || Vi() ? !0 : !1
        },
        fm = function() {
            return !Wl() && !M.Za() && Xl() || Wl() && tc && !bm(4.2) || Vi() ? !1 : !0
        };
    var gm = function() {
            this.l = -1;
            this.g = null;
            this.o = "";
            this.h = null;
            this.w = 0
        },
        hm = new gm;
    gm.prototype.clear = function() {
        this.g = null;
        this.o = "";
        this.h = null
    };
    var im = function() {
        var a = "h." + hm.o;
        null != hm.h ? (a += "/n." + hm.h, null != hm.g && (a += "/" + hm.g)) : M.la() && (a += "/o.0.0.0");
        return a
    };
    var jm = function() {
        this.h = .01 > Math.random() && null == m.G_testRunner;
        this.g = Math.floor(4503599627370496 * Math.random())
    };
    xa(jm);
    var mm = function(a, b, c, d) {
            if (a.h || d) {
                c = c || {};
                c.lid = b;
                c.sdkv = im();
                b = ll();
                Ka(Ya(b)) || (c.e = b);
                c = km(a, c);
                var e = new Rd("http://pagead2.googlesyndication.com/pagead/gen_204");
                vb(c, function(a, b) {
                    e.h.set(b, null != a ? "boolean" == typeof a ? a ? "t" : "f" : "" + a : "")
                }, a);
                a = lm();
                Sd(e, a.l);
                M.Nb() || wl(e.toString())
            }
        },
        km = function(a, b) {
            b.id = "ima_html5";
            var c = lm();
            b.c = a.g;
            b.domain = c.g;
            return b
        },
        lm = function() {
            var a = J(),
                b = document;
            return new Rd(a.parent == a ? a.location.href : b.referrer)
        };
    var nm = function() {
        O.call(this);
        this.g = null;
        this.G = new Ll(this);
        Ad(this, this.G);
        this.l = new Map;
        this.A = new Map;
        this.C = this.I = !1;
        this.o = null;
        this.w = !1;
        this.D = null
    };
    y(nm, O);
    var om = null,
        pm = null,
        qm = 0,
        rm = function() {
            null != om || (om = new nm);
            return om
        },
        vk = function(a, b, c) {
            var d = {};
            d.queryId = b;
            d.viewabilityData = c;
            a.g && Ak(a.g, "activityMonitor", "viewabilityMeasurement", d)
        },
        rk = function(a, b, c, d) {
            var e = {};
            e.queryId = b;
            e.viewabilityString = c;
            e.eventName = d;
            a.g ? Ak(a.g, "activityMonitor", "externalActivityEvent", e) : P(a, new L("externalActivityEvent", null, e))
        };
    nm.prototype.O = function() {
        this.G.B(this.g, "activityMonitor", this.J);
        this.w = !1;
        this.l.clear();
        this === pm && (pm = null);
        nm.ea.O.call(this)
    };
    var um = function(a, b) {
            if (!a.w) {
                a.g = b || null;
                a.g && (a.G.h(a.g, "activityMonitor", a.J), sm(a));
                tm();
                b = hl();
                var c = ml(b);
                A(c, function(a) {
                    var b = Xf.H().g;
                    C(b, a) || b.push(a)
                });
                kl(b, 495644010) && (0 == qm && (pm = a), qm++);
                M.D || (a.I = !0, jk.H().g = !0);
                a.D = (w(null), null);
                M.la() && (Q.H().U = "gsv", Q.H().B = 79463068);
                a.w = !0
            }
        },
        wm = function(a) {
            if (null == a) return !1;
            if (Yl() && null != a.webkitDisplayingFullscreen) return a.webkitDisplayingFullscreen;
            var b = window.screen.availWidth || window.screen.width,
                c = window.screen.availHeight || window.screen.height;
            a = vm(a);
            return 0 >= b - a.width && 42 >= c - a.height
        },
        vm = function(a) {
            var b = {
                left: a.offsetLeft,
                top: a.offsetTop,
                width: a.offsetWidth,
                height: a.offsetHeight
            };
            try {
                w(a.getBoundingClientRect) && Uc(Kc(a), a) && (b = a.getBoundingClientRect())
            } catch (c) {}
            return b
        },
        xm = function(a, b, c, d, e) {
            if (a.w) {
                if (a.D) return a.D(b, c, e);
                e = e || {};
                a = d ? a.A.get(d) : M.A;
                d && null == e.opt_osdId && (e.opt_osdId = d);
                a && (null != e.opt_fullscreen || (e.opt_fullscreen = wm(a)), null != e.opt_adElement || (e.opt_adElement = a));
                return Hg("lidar::handlevast_html5", Ga(yk, b,
                    c, e)) || {}
            }
            return {}
        },
        ym = function(a) {
            var b = hl();
            return kl(b, 495644009) || kl(b, 495644010) ? jk.H().g : a.I
        };
    nm.prototype.M = function(a) {
        this.C = a
    };
    nm.prototype.K = function() {
        return this.C
    };
    nm.prototype.N = function(a) {
        a ? this.o = new Zf(a.adk, a.awbidKey) : this.o = null
    };
    var zm = function(a, b) {
            var c = hl(),
                d = String(Math.floor(1E9 * Math.random()));
            a.A.set(d, b);
            if (kl(c, 31061775)) {
                var e = function() {
                    return b
                };
                try {
                    var f;
                    kl(c, 495644010) ? f = pm : f = a;
                    Rf(x(f.P, f), e)
                } catch (g) {}
            }(kl(c, 495644009) || kl(c, 495644010)) && wk(jk.H(), d, a);
            return d
        },
        Am = function(a, b, c) {
            if (c) a.l.get(c) == b && a.l["delete"](c);
            else {
                var d = [];
                a.l.forEach(function(a, c) {
                    a == b && d.push(c)
                });
                A(d, a.l["delete"], a.l)
            }
        },
        pk = function(a, b) {
            a = a.l.get(b);
            return w(a) ? a() : {}
        },
        sm = function(a) {
            if (w(window.Goog_AdSense_Lidar_getUrlSignalsArray)) {
                var b = {};
                b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
                Ak(a.g, "activityMonitor", "pageSignals", b)
            }
        };
    nm.prototype.J = function(a) {
        var b = a.V,
            c = b.queryId,
            d = {};
        d.eventId = b.eventId;
        switch (a.$) {
            case "getPageSignals":
                sm(this);
                break;
            case "reportVastEvent":
                var e = b.vastEvent;
                a = b.osdId;
                var f = {};
                f.opt_fullscreen = b.isFullscreen;
                b.isOverlay && (f.opt_bounds = b.overlayBounds);
                d.viewabilityData = xm(this, e, c, a, f);
                Ak(this.g, "activityMonitor", "viewability", d);
                break;
            case "fetchAdTagUrl":
                kl(hl(), 495644010) && this !== pm || (d = {}, d.eventId = b.eventId, a = b.osdId, c = null, Bb(b, "isFullscreen") && (c = b.isFullscreen), Bb(b, "loggingId") && (b =
                    b.loggingId, d.loggingId = b, mm(jm.H(), 43, {
                        step: "beforeLookup",
                        logid: b,
                        time: Ha()
                    }, !0)), d.engagementString = Bm(this, a, c), Ak(this.g, "activityMonitor", "engagement", d))
        }
    };
    var tm = function() {
            if (!(m.ima && m.ima.video && m.ima.video.client && m.ima.video.client.tagged)) {
                t("ima.video.client.sdkTag", !0, void 0);
                var a = m.document,
                    b = document.createElement("SCRIPT"),
                    c = Qb(Lb(Mb("https://s0.2mdn.net/instream/video/client.js")));
                b.src = Pb(c);
                b.async = !0;
                b.type = "text/javascript";
                a = a.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(b, a)
            }
        },
        Bm = function(a, b, c) {
            var d = b ? a.A.get(b) : M.A;
            a = {};
            null != c && (a.fullscreen = c);
            c = "";
            try {
                c = Qf(function() {
                    return d
                }, a)
            } catch (e) {
                c = "sdktle;" + Ua(e.name,
                    12) + ";" + Ua(e.message, 40)
            }
            return c
        };
    nm.prototype.P = function(a) {
        if (this.g) {
            var b = {};
            b.engagementString = a;
            Ak(this.g, "activityMonitor", "engagementData", b)
        }
    };
    t("ima.common.getVideoMetadata", function(a) {
        return pk(rm(), a)
    }, void 0);
    t("ima.common.triggerViewEvent", function(a, b) {
        var c = rm(),
            d = {};
        d.queryId = a;
        d.viewabilityString = b;
        c.g ? Ak(c.g, "activityMonitor", "viewableImpression", d) : P(c, new L("viewable_impression", null, d))
    }, void 0);
    t("ima.common.triggerViewabilityMeasurementUpdate", function(a, b) {
        vk(rm(), a, b)
    }, void 0);
    t("ima.common.triggerMeasurableEvent", function(a, b) {
        var c = rm(),
            d = {};
        d.queryId = a;
        d.viewabilityString = b;
        c.g ? Ak(c.g, "activityMonitor", "measurableImpression", d) : P(c, new L("measurable_impression", null, d))
    }, void 0);
    t("ima.common.triggerExternalActivityEvent", function(a, b, c) {
        rk(rm(), a, b, c)
    }, void 0);
    var Cm = rm();
    var Dm = function(a, b, c) {
        this.h = c;
        0 == b.length && (b = [
            []
        ]);
        this.g = gb(b, function(b) {
            b = a.concat(b);
            for (var c = [], d = 0, g = 0; d < b.length;) {
                var k = b[d++];
                if (128 > k) c[g++] = String.fromCharCode(k);
                else if (191 < k && 224 > k) {
                    var l = b[d++];
                    c[g++] = String.fromCharCode((k & 31) << 6 | l & 63)
                } else if (239 < k && 365 > k) {
                    l = b[d++];
                    var n = b[d++],
                        v = b[d++];
                    k = ((k & 7) << 18 | (l & 63) << 12 | (n & 63) << 6 | v & 63) - 65536;
                    c[g++] = String.fromCharCode(55296 + (k >> 10));
                    c[g++] = String.fromCharCode(56320 + (k & 1023))
                } else l = b[d++], n = b[d++], c[g++] = String.fromCharCode((k & 15) << 12 |
                    (l & 63) << 6 | n & 63)
            }
            return new RegExp(c.join(""))
        })
    };
    Dm.prototype.match = function(a) {
        return jb(this.g, function(b) {
            b = a.match(b);
            return null == b ? !1 : !this.h || 1 <= b.length && "3.180.3" == b[1] || 2 <= b.length && "3.180.3" == b[2] ? !0 : !1
        }, this)
    };
    var Em = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47],
        Fm = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47],
        Gm = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 40, 115, 100,
            107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47
        ],
        Hm = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 99, 111, 114, 101, 47, 97, 100, 109, 111, 98, 47],
        Im = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115, 101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 47],
        Jm = [
            [105, 109, 97, 51, 92, 46, 106, 115],
            [105, 109, 97,
                51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115
            ],
            [105, 109, 97, 51, 95, 116, 101, 115, 116, 92, 46, 106, 115],
            [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 92, 46, 106, 115],
            [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]
        ],
        Km = [
            [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
            [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103,
                40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108
            ],
            [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 116, 101, 115, 116, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
            [98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]
        ],
        Lm = [
            [111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115],
            [111, 117, 116, 115, 116, 114, 101, 97, 109,
                95, 100, 101, 98, 117, 103, 92, 46, 106, 115
            ]
        ],
        Mm = [
            [104, 116, 109, 108, 53, 95, 103, 97, 109, 101, 115, 92, 46, 106, 115],
            [104, 116, 109, 108, 53, 95, 103, 97, 109, 101, 115, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]
        ],
        Nm = new Dm(Em, Jm, !1),
        Om = new Dm(Em, Km, !0),
        Pm = new Dm(Fm, Jm, !1),
        Qm = new Dm(Fm, Km, !0),
        Rm = new Dm(Gm, [], !1),
        Sm = new Dm(Gm, Km, !0),
        Tm = new Dm(Hm, Km, !1),
        Um = new Dm(Hm, [
            [97, 112, 112, 95, 112, 114, 111, 109, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106,
                115
            ],
            [97, 112, 112, 95, 112, 114, 111, 109, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 95, 99, 97, 110, 97, 114, 121, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115],
            [118, 105, 100, 101, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115],
            [118, 105, 100, 101, 111, 95, 105, 110, 116, 101, 114, 115, 116, 105, 116, 105, 97, 108, 95, 99, 97, 110, 97, 114, 121, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50,
                44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 106, 115
            ]
        ], !1),
        Vm = new Dm([104, 116, 116, 112, 115, 63, 58, 47, 47, 103, 111, 111, 103, 108, 101, 97, 100, 115, 92, 46, 103, 92, 46, 100, 111, 117, 98, 108, 101, 99, 108, 105, 99, 107, 92, 46, 110, 101, 116, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47], [], !1),
        Wm = new Dm([104, 116, 116, 112, 115, 63, 58, 47, 47, 119, 119, 119, 92, 46, 103, 115, 116, 97, 116, 105, 99, 92, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 106, 115, 47], [], !1),
        Xm = new Dm([104, 116, 116, 112, 115, 63, 58, 47, 47, 109, 105, 110, 116, 45, 109, 97, 100, 92, 46, 115, 97, 110, 100, 98,
            111, 120, 92, 46, 103, 111, 111, 103, 108, 101, 92, 46, 99, 111, 109, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47, 102, 111, 114, 109, 97, 116, 115, 47
        ], [], !1),
        Ym = new Dm([104, 116, 116, 112, 115, 63, 58, 47, 47, 118, 105, 100, 101, 111, 45, 97, 100, 45, 116, 101, 115, 116, 92, 46, 97, 112, 112, 115, 112, 111, 116, 92, 46, 99, 111, 109, 47], [], !1),
        Zm = new Dm(Im, Jm, !1),
        $m = new Dm([104, 116, 116, 112, 115, 63, 58, 47, 47, 40, 112, 97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111, 111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92, 46, 99, 111, 109, 47, 112, 97, 103,
            101, 97, 100, 47, 40, 103, 97, 100, 103, 101, 116, 115, 124, 106, 115, 41, 47
        ], [], !1),
        an = new Dm(Em, Lm, !1),
        bn = new Dm(Im, Lm, !1),
        cn = new Dm(Em, Mm, !1),
        dn = new Dm(Im, Mm, !1),
        wb = {
            pg: Nm,
            og: Om,
            yg: Pm,
            xg: Qm,
            cg: Rm,
            $f: Sm,
            Zf: Tm,
            ag: Um,
            dg: Vm,
            bg: Wm,
            Yf: Xm,
            eg: Ym,
            qg: Zm,
            Vg: $m,
            Gg: an,
            Hg: bn,
            sg: cn,
            tg: dn
        };
    var en = function(a) {
        this.h = a
    };
    en.prototype.g = function() {
        return this.h
    };
    var fn = function() {
        O.call(this);
        this.currentTime = 0
    };
    y(fn, O);
    var gn = function(a) {
        fn.call(this);
        this.currentTime = a.currentTime;
        if (!("currentTime" in a) || isNaN(a.currentTime)) throw Bl(Al, null, "content", "currentTime");
        this.duration = "duration" in a && !isNaN(a.duration) ? a.duration : -1;
        this.l = a;
        this.g = new tf(250);
        this.o = new Ll(this);
        Nl(this.o, this.g, "tick", this.w, !1, this)
    };
    y(gn, fn);
    gn.prototype.start = function() {
        this.g.start()
    };
    gn.prototype.O = function() {
        gn.ea.O.call(this);
        this.o.X();
        this.g.X()
    };
    gn.prototype.w = function() {
        if ("currentTime" in this.l && !isNaN(this.l.currentTime)) {
            var a = this.currentTime;
            this.currentTime = this.l.currentTime;
            a != this.currentTime && P(this, new Bd("currentTimeUpdate"))
        } else P(this, new Bd("contentWrapperError")), uf(this.g)
    };
    var hn = function(a, b) {
        L.call(this, "adMetadata", a);
        this.h = b || null
    };
    y(hn, L);
    hn.prototype.B = function() {
        return this.h
    };
    var kn = function() {
        this.loadVideoTimeout = jn()
    };
    h = kn.prototype;
    h.allowUnrelatedCompanion = !1;
    h.allowCompanionBeforeMaster = !1;
    h.autoAlign = !0;
    h.baseYouTubeUrl = null;
    h.bitrate = -1;
    h.uiElements = null;
    h.contentId = null;
    h.disableClickThrough = !1;
    h.enablePreloading = !1;
    h.customPlayerSupportsPreloading = !1;
    h.delayLoadedEventWhenPreloading = !1;
    h.mimeTypes = null;
    h.restoreCustomPlaybackStateOnAdBreakComplete = !1;
    h.useLearnMoreButton = !1;
    h.useMuteToggleButton = !1;
    h.useStyledLinearAds = !1;
    h.useStyledNonLinearAds = !1;
    h.playAdsAfterTime = -1;
    h.useVideoAdUi = !0;
    h.enableVideoTouchMove = !1;
    h.youTubeAdNamespace = 0;
    h.loadVideoTimeout = 8E3;
    h.disableUi = !1;
    var jn = function() {
        return M.la() || kl(hl(), 420706082) ? 15E3 : 8E3
    };
    var ln = function() {
        O.call(this);
        this.C = this.G = this.K = this.I = !1;
        this.l = 0;
        this.w = [];
        this.D = !1;
        this.N = this.M = Infinity;
        this.o = 0;
        this.A = new Ll(this);
        this.J = {}
    };
    y(ln, O);
    ln.prototype.La = function(a) {
        null == a || this.I || (this.g = a, mn(this), this.I = !0)
    };
    ln.prototype.pa = function() {
        null != this.g && this.I && (nn(this), this.C = this.G = this.I = !1, this.l = 0, this.w = [], this.D = !1)
    };
    var mn = function(a) {
            nn(a);
            !(a.g instanceof O) && "ontouchstart" in document.documentElement && Zl() ? (a.J = {
                touchstart: x(a.aa, a),
                touchmove: x(a.W, a),
                touchend: x(a.Z, a)
            }, vb(a.J, function(a, c) {
                this.g.addEventListener(c, a, !1)
            }, a)) : a.A.h(a.g, "click", a.T)
        },
        nn = function(a) {
            a.A.B(a.g, "click", a.T);
            vb(a.J, function(a, c) {
                this.g.removeEventListener(c, a, !1)
            }, a);
            a.J = {}
        };
    ln.prototype.aa = function(a) {
        this.G = !0;
        this.l = a.touches.length;
        this.o && (window.clearTimeout(this.o), this.o = 0, this.K = !0);
        (this.D = on(this, a.touches) || 1 != a.touches.length) ? this.N = this.M = Infinity: (this.M = a.touches[0].clientX, this.N = a.touches[0].clientY);
        pn(this, a.touches)
    };
    ln.prototype.W = function(a) {
        this.l = a.touches.length;
        if (!am(8) || Math.pow(a.changedTouches[0].clientX - this.M, 2) + Math.pow(a.changedTouches[0].clientY - this.N, 2) > Math.pow(5, 2)) this.C = !0
    };
    ln.prototype.Z = function(a) {
        !this.G || 1 != this.l || this.C || this.K || this.D || !on(this, a.changedTouches) || (this.o = window.setTimeout(x(this.P, this), 300));
        this.l = a.touches.length;
        0 == this.l && (this.C = this.G = !1, this.w = []);
        this.K = !1
    };
    ln.prototype.T = function() {
        this.P()
    };
    var pn = function(a, b) {
            a.w = [];
            A(b, function(a) {
                var b = this.w;
                a = a.identifier;
                C(b, a) || b.push(a)
            }, a)
        },
        on = function(a, b) {
            return jb(b, function(a) {
                return C(this.w, a.identifier)
            }, a)
        };
    ln.prototype.P = function() {
        this.o = 0;
        P(this, new Bd("click"))
    };
    ln.prototype.O = function() {
        this.pa();
        this.A.X();
        this.A = null;
        ln.ea.O.call(this)
    };
    var qn = function() {
        this.g = [];
        this.h = []
    };
    h = qn.prototype;
    h.Aa = function() {
        return this.g.length + this.h.length
    };
    h.isEmpty = function() {
        return 0 == this.g.length && 0 == this.h.length
    };
    h.clear = function() {
        this.g = [];
        this.h = []
    };
    h.contains = function(a) {
        return C(this.g, a) || C(this.h, a)
    };
    h.ca = function() {
        for (var a = [], b = this.g.length - 1; 0 <= b; --b) a.push(this.g[b]);
        var c = this.h.length;
        for (b = 0; b < c; ++b) a.push(this.h[b]);
        return a
    };
    var rn = function(a) {
        if (Ka(Ya(a))) return null;
        var b = a.match(/^https?:\/\/[^\/]*youtu\.be\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length) return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/video\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length) return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/watch\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length) return b[1];
        a = (new Rd(a)).h;
        return he(a, "v") ? a.get("v").toString() : he(a, "video_id") ? a.get("video_id").toString() : null
    };
    var sn = function(a) {
        this.h = 0;
        this.l = a || 100;
        this.g = []
    };
    h = sn.prototype;
    h.get = function(a) {
        a = tn(this, a);
        return this.g[a]
    };
    h.set = function(a, b) {
        a = tn(this, a);
        this.g[a] = b
    };
    h.Aa = function() {
        return this.g.length
    };
    h.isEmpty = function() {
        return 0 == this.g.length
    };
    h.clear = function() {
        this.h = this.g.length = 0
    };
    h.ca = function() {
        var a = this.Aa(),
            b = this.Aa(),
            c = [];
        for (a = this.Aa() - a; a < b; a++) c.push(this.get(a));
        return c
    };
    h.Sa = function() {
        for (var a = [], b = this.Aa(), c = 0; c < b; c++) a[c] = c;
        return a
    };
    var tn = function(a, b) {
        if (b >= a.g.length) throw Error("Out of bounds exception");
        return a.g.length < a.l ? b : (a.h + Number(b)) % a.l
    };
    var un = function() {
        O.call(this)
    };
    y(un, O);
    var vn = {
        fg: "beginFullscreen",
        CLICK: "click",
        kg: "end",
        lg: "endFullscreen",
        mg: "error",
        LOADED: "loaded",
        Ag: "mediaLoadTimeout",
        bc: "pause",
        Ng: "play",
        Sg: "skip",
        Tg: "skipShown",
        cc: "start",
        Yg: "timeUpdate",
        Xg: "timedMetadata",
        $g: "volumeChange"
    };
    un.prototype.yc = function() {
        return !0
    };
    var wn = function(a) {
        O.call(this);
        this.g = a;
        this.K = "";
        this.I = -1;
        this.M = !1;
        this.ga = new sn(4);
        this.w = 0;
        this.aa = this.o = this.Z = this.G = !1;
        this.T = this.gb();
        this.P = this.ib();
        this.ha = jn();
        this.A = null;
        this.W = !1
    };
    y(wn, un);
    h = wn.prototype;
    h.jc = function() {
        return fb(yb(Ck), function(a) {
            return !Ka(this.g.canPlayType(a))
        }, this)
    };
    h.Ub = function(a) {
        this.ha = 0 < a.timeout ? a.timeout : jn();
        a.g && (this.g.l = "auto")
    };
    h.Bc = function(a) {
        var b = 0 < this.g.seekable.length;
        this.M ? b ? (this.g.currentTime = this.I, this.I = -1, this.K = "", this.M = !1, a()) : setTimeout(x(this.Bc, this, a), 100) : (this.I = -1, this.K = "", this.M = !1, a())
    };
    h.Oc = function() {
        this.K = this.g.currentSrc;
        this.M = 0 < this.g.seekable.length;
        this.I = this.g.ended ? -1 : this.g.currentTime
    };
    h.Mc = function(a) {
        if (0 <= this.I) {
            var b = this;
            this.g.addEventListener("loadedmetadata", function d() {
                b.Bc(a);
                b.g.removeEventListener("loadedmetadata", d, !1)
            }, !1);
            this.g.src = this.K;
            this.g.load()
        } else a()
    };
    h.load = function(a, b) {
        xn(this);
        b && M.la() && w(this.g.g) && this.g.g(b);
        a && (this.g.src = a);
        this.g.load()
    };
    h.rb = function(a) {
        this.g.volume = a;
        this.g.muted = 0 == a ? !0 : !1
    };
    h.sc = function() {
        return this.g.volume
    };
    h.qb = function() {
        this.W = !1;
        this.g.play();
        M.ub() && !this.o && (Xb() || Yb()) && "hidden" == m.document.visibilityState ? this.A || (this.A = x(this.fa, this), m.document.addEventListener("visibilitychange", this.A)) : this.fa()
    };
    h.uc = function() {
        this.W = !0;
        this.g.pause();
        yn(this)
    };
    h.tc = function() {
        return this.g.paused ? Zl() || Bf ? this.g.currentTime < this.g.duration : !0 : !1
    };
    h.gc = function() {
        Yl() && this.g.webkitDisplayingFullscreen && this.g.webkitExitFullscreen()
    };
    h.ib = function() {
        return wm(this.g)
    };
    h.jb = function(a) {
        this.g.currentTime = a
    };
    h.wa = function() {
        return this.g.currentTime
    };
    h.fb = function() {
        return isNaN(this.g.duration) ? -1 : this.g.duration
    };
    h.tb = function() {
        return this.g.ended
    };
    h.gb = function() {
        return new I(this.g.offsetWidth, this.g.offsetHeight)
    };
    h.O = function() {
        this.pa();
        wn.ea.O.call(this)
    };
    h.La = function() {
        this.pa();
        this.l = new Ll(this);
        this.l.h(this.g, Rl, this.na);
        this.l.h(this.g, "canplay", this.Gf);
        this.l.h(this.g, "ended", this.Hf);
        this.l.h(this.g, "webkitbeginfullscreen", this.Kb);
        this.l.h(this.g, "webkitendfullscreen", this.vc);
        this.l.h(this.g, "pause", this.Kf);
        this.l.h(this.g, "playing", this.Lf);
        this.l.h(this.g, "timeupdate", this.Mf);
        this.l.h(this.g, "volumechange", this.Qf);
        this.l.h(this.g, "error", this.Hc);
        this.l.h(this.g, dm() || Zl() && !am(8) ? "loadeddata" : "canplay", this.If);
        this.D = new ln;
        this.l.h(this.D,
            "click", this.uf);
        this.D.La(this.g);
        this.J = new tf(1E3);
        this.l.h(this.J, "tick", this.vf);
        this.J.start()
    };
    h.pa = function() {
        null != this.D && (this.D.pa(), this.D = null);
        null != this.J && this.J.X();
        null != this.l && (this.l.X(), this.l = null);
        xn(this)
    };
    var xn = function(a) {
        a.Z = !1;
        a.o = !1;
        a.G = !1;
        a.w = 0;
        a.aa = !1;
        a.ga.clear();
        yn(a);
        zd(a.C)
    };
    wn.prototype.na = function(a) {
        P(this, a.type)
    };
    var zn = function(a) {
        if (!a.o) {
            a.o = !0;
            yn(a);
            P(a, "start");
            var b = w(a.g.getAttribute) && null != a.g.getAttribute("playsinline");
            (vc || am(10) && M.h) && b || !(Yl() && !Wl() || tc && !bm(4) || Vi()) || !tc || bm(3) || Yl() && !am(4) || a.Kb()
        }
    };
    h = wn.prototype;
    h.Gf = function() {
        var a;
        if (a = Cf) a = D, a = !(a && (Va(a, "SMART-TV") || Va(a, "SmartTV")));
        a && !this.aa && (this.jb(.001), this.aa = !0)
    };
    h.If = function() {
        this.Z || (this.Z = !0, P(this, "loaded"))
    };
    h.Lf = function() {
        P(this, "play");
        Zl() || dm() || zn(this)
    };
    h.Mf = function() {
        if (!this.o && (Zl() || dm())) {
            if (0 >= this.wa()) return;
            if (dm() && this.tb() && 1 == this.fb()) {
                this.Hc();
                return
            }
            zn(this)
        }
        if (Zl() || cm()) {
            if (1.5 < this.wa() - this.w) {
                this.G = !0;
                this.jb(this.w);
                return
            }
            this.G = !1;
            this.wa() > this.w && (this.w = this.wa())
        }
        var a = this.ga;
        a.g[a.h] = this.g.currentTime;
        a.h = (a.h + 1) % a.l;
        P(this, "timeUpdate")
    };
    h.Qf = function() {
        P(this, "volumeChange")
    };
    h.Kf = function() {
        if (this.o && Zl() && !this.W && (2 > An(this) || this.G)) {
            this.C = new tf(250);
            this.l.h(this.C, "tick", this.Ff);
            this.C.start();
            var a = !0
        } else a = !1;
        a || P(this, "pause")
    };
    h.Hf = function() {
        var a = !0;
        if (Zl() || cm()) a = this.w >= this.g.duration - 1.5;
        !this.G && a && P(this, "end")
    };
    h.Kb = function() {
        P(this, "beginFullscreen")
    };
    h.vc = function() {
        P(this, "endFullscreen")
    };
    h.Hc = function() {
        yn(this);
        P(this, "error")
    };
    h.uf = function() {
        P(this, "click")
    };
    h.vf = function() {
        var a = this.gb(),
            b = this.ib();
        if (a.width != this.T.width || a.height != this.T.height) !this.P && b ? this.Kb() : this.P && !b && this.vc(), this.T = a, this.P = b
    };
    h.ld = function() {
        if (!this.o) {
            try {
                mm(jm.H(), 16)
            } catch (a) {}
            xn(this);
            P(this, "mediaLoadTimeout")
        }
    };
    h.Ff = function() {
        if (this.tb() || !this.tc()) zd(this.C);
        else {
            var a = this.g.duration - this.g.currentTime,
                b = An(this);
            0 < b && (2 <= b || 2 > a) && (zd(this.C), this.qb())
        }
    };
    var An = function(a) {
        var b;
        a: {
            for (b = a.g.buffered.length - 1; 0 <= b;) {
                if (a.g.buffered.start(b) <= a.g.currentTime) {
                    b = a.g.buffered.end(b);
                    break a
                }
                b--
            }
            b = 0
        }
        return b - a.g.currentTime
    };
    wn.prototype.fa = function() {
        this.N || (this.N = vf(this.ld, this.ha, this));
        Bn(this)
    };
    var yn = function(a) {
            a.N && (m.clearTimeout(a.N), a.N = null);
            Bn(a)
        },
        Bn = function(a) {
            a.A && (m.document.removeEventListener("visibilitychange", a.A), a.A = null)
        };
    var Dn = function() {
        O.call(this);
        this.buffered = new Cn;
        this.l = new Cn;
        this.g = new Ll(this);
        var a = Ed(M);
        if (a) {
            a: {
                if (Bb(a.g, "videoElementMockDuration") && (a = a.g.videoElementMockDuration, r(a))) break a;a = NaN
            }
            this.duration = a
        }
    };
    y(Dn, O);
    var En = new Md,
        Fn = function() {
            var a = ["video/mp4"],
                b = ["video/ogg"],
                c = new Dn;
            c.canPlayType = function(c) {
                return C(a, c) ? "probably" : C(b, c) ? "maybe" : ""
            };
            c.width = 0;
            c.height = 0;
            c.offsetWidth = 0;
            c.offsetHeight = 0;
            return c
        },
        Gn = function() {},
        Cn = function() {
            this.length = 0;
            this.g = []
        };
    Cn.prototype.start = function() {
        return 0
    };
    h = Dn.prototype;
    h.readyState = 0;
    h.currentTime = 0;
    h.duration = NaN;
    h.volume = 1;
    h.muted = !1;
    h.src = "";
    h.$a = null;
    h.wb = null;
    h.load = function() {
        this.readyState = 0;
        P(this, "loadstart");
        this.duration = Number(isNaN(this.duration) ? 10 + 20 * Math.random() : this.duration);
        P(this, "durationchange");
        var a = this.l;
        a.g.push(new Gn);
        a.length = a.g.length;
        a = this.buffered;
        a.g.push(new Gn);
        a.length = a.g.length;
        P(this, "loadedmetadata");
        0 < this.currentTime && P(this, "timeupdate");
        P(this, "loadeddata");
        P(this, "canplay");
        P(this, "canplaythrough");
        P(this, "progress")
    };
    h.setAttribute = function(a, b) {
        null != a && En.set(a, b)
    };
    h.O = function() {
        this.g.X()
    };
    h.Pf = function(a) {
        var b = null,
            c = null;
        switch (a.type) {
            case "loadeddata":
                b = "Loaded";
                break;
            case "playing":
                b = "Playing";
                c = "#00f";
                break;
            case "pause":
                b = "Paused";
                break;
            case "ended":
                b = "Ended", c = "#000"
        }
        b && this.wb && (this.wb.innerText = b);
        c && this.$a && (this.$a.style.backgroundColor = c)
    };
    F && Ec(8);
    var Hn = function() {
        throw Error("Do not instantiate directly");
    };
    Hn.prototype.g = null;
    Hn.prototype.getContent = function() {
        return this.content
    };
    Hn.prototype.toString = function() {
        return this.content
    };
    var In = function() {
        Hn.call(this)
    };
    y(In, Hn);
    (function(a) {
        function b(a) {
            this.content = a
        }
        b.prototype = a.prototype;
        return function(a, d) {
            a = new b(String(a));
            void 0 !== d && (a.g = d);
            return a
        }
    })(In);
    var Jn = {},
        Kn = function(a, b) {
            var c = "key_" + a + ":" + b,
                d = Jn[c];
            if (void 0 === d || 0 > d) Jn[c] = 0;
            else if (0 == d) throw Error('Encountered two active delegates with the same priority ("' + a + ":" + b + '").');
        };
    (function(a) {
        function b(a) {
            this.content = a
        }
        b.prototype = a.prototype;
        return function(a, d) {
            a = String(a);
            if (!a) return "";
            a = new b(a);
            void 0 !== d && (a.g = d);
            return a
        }
    })(In);
    Kn("a", "");
    Kn("a", "redesign2014q4");
    Kn("b", "");
    Kn("b", "redesign2014q4");
    Kn("b", "forcedlinebreak");
    var Ln = function(a, b, c, d) {
        if (null == a || !Uc(Kc(a), a)) throw Bl(Al, null, "containerElement", "element");
        this.w = a;
        this.h = this.g = null;
        this.o = b;
        this.F = !d;
        this.B = c || !1;
        this.l = null;
        this.g = Rc("DIV", {
            style: "display:none;"
        });
        this.w.appendChild(this.g);
        if (this.F) {
            a = Ed(M);
            if (Fd(a, "useVideoElementMock")) {
                a = Fn();
                b = Rc("DIV", {
                    style: "position:absolute;width:100%;height:100%;top:0px;left:0px;"
                });
                for (e in a) b[e] = a[e];
                a.$a = Rc("DIV", {
                    style: "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000"
                });
                a.wb = Rc("P", {
                    style: "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;"
                });
                a.$a.appendChild(a.wb);
                b.appendChild(a.$a);
                a.g.h(a, ["loadeddata", "playing", "pause", "ended"], a.Pf);
                var e = b
            } else e = Rc("VIDEO", {
                style: "background-color:#000;position:absolute;width:100%;height:100%;",
                title: "Advertisement"
            });
            e.setAttribute("webkit-playsinline", !0);
            e.setAttribute("playsinline", !0);
            this.h = e;
            this.g.appendChild(this.h)
        }
        this.o && (e = "display:none;position:absolute;width:100%;height:100%;", M.Za() || (e +=
            "background-color:#000;"), e = Rc("DIV", {
            id: this.o,
            style: e
        }), this.g.appendChild(e));
        this.B && (this.l = Rc("DIV", {
            style: "position:absolute;width:100%;height:100%;"
        }), this.g.appendChild(this.l))
    };
    y(Ln, yd);
    Ln.prototype.O = function() {
        Tc(this.g);
        Ln.ea.O.call(this)
    };
    Ln.prototype.show = function() {
        Mn(this.g, !0)
    };
    var Mn = function(a, b) {
        null != a && (a.style.display = b ? "block" : "none")
    };
    var Nn = function(a, b, c, d) {
        yd.call(this);
        this.B = b || null;
        this.C = "*";
        this.o = c || null;
        this.l = null;
        this.h = d || null;
        this.I = !!a;
        this.F = x(this.D, this);
        window.addEventListener("message", this.F)
    };
    y(Nn, yd);
    Nn.prototype.D = function(a) {
        if (!("*" != this.o && a.origin != this.o || this.B && a.source != this.B) && q(a.data)) {
            try {
                var b = JSON.parse(a.data)
            } catch (c) {
                return
            }
            if (!(null == b || this.I && (this.l && this.l != b.id || this.h && this.h != b.channel)) && b) switch (b.event) {
                case "syn":
                    On(this, a);
                    Pn(this);
                    this.sendMessage({
                        event: "ack"
                    });
                    break;
                case "ack":
                    On(this, a);
                    Pn(this);
                    break;
                case "command":
                    a = b.func, a in this.g && this.g[a].apply(null, b.args)
            }
        }
    };
    var On = function(a, b) {
        "null" != b.origin && (a.o = a.C = b.origin);
        a.B = b.source
    };
    Nn.prototype.sendMessage = function(a, b) {
        if (b = b || this.B) {
            this.l && (a.id = this.l);
            this.h && (a.channel = this.h);
            try {
                var c = If(a);
                b.postMessage(c, this.C)
            } catch (d) {}
        }
    };
    Nn.prototype.O = function() {
        window.removeEventListener("message", this.F);
        Nn.ea.O.call(this)
    };
    var Qn = function(a) {
        Nn.call(this, !0);
        this.l = a;
        this.h = "remoteplayer";
        this.o = "*";
        this.g = {};
        this.w = [];
        this.A = !1
    };
    y(Qn, Nn);
    Qn.prototype.G = function(a, b) {
        var c = {
                event: "command",
                func: a
            },
            d = Array.prototype.slice.call(arguments, 1);
        0 < d.length && (c.args = d);
        this.A ? this.sendMessage(c) : 100 > this.w.length && this.w.push(c)
    };
    var Pn = function(a) {
            a.A = !0;
            A(a.w, function(a) {
                this.sendMessage(a)
            }, a);
            a.w.length = 0
        },
        Rn = function() {};
    var Tn = function(a) {
            this.g = new Md;
            if (a) {
                a = Qd(a);
                for (var b = a.length, c = 0; c < b; c++) {
                    var d = a[c];
                    this.g.set(Sn(d), d)
                }
            }
        },
        Sn = function(a) {
            var b = typeof a;
            return "object" == b && a || "function" == b ? "o" + (a[Ca] || (a[Ca] = ++Da)) : b.substr(0, 1) + a
        };
    h = Tn.prototype;
    h.Aa = function() {
        return this.g.Aa()
    };
    h.clear = function() {
        this.g.clear()
    };
    h.isEmpty = function() {
        return this.g.isEmpty()
    };
    h.contains = function(a) {
        a = Sn(a);
        return Od(this.g.h, a)
    };
    h.ca = function() {
        return this.g.ca()
    };
    h.clone = function() {
        return new Tn(this)
    };
    h.Ha = function() {
        return this.g.Ha(!1)
    };
    var Un = function(a, b) {
        this.g = a;
        this.w = new Tn;
        this.A = x(this.C, this);
        this.F = Math.floor(2147483646 * Math.random()) + 1;
        this.h = b || new Qn(this.F);
        Ad(this, this.h);
        this.l = new Ll(this);
        Ad(this, this.l);
        b = x(a.play, a);
        this.h.g.play = b;
        b = x(a.load, a);
        this.h.g.load = b;
        a = x(a.pause, a);
        this.h.g.pause = a;
        a = x(this.B, this);
        this.h.g.listen = a;
        a = x(this.D, this);
        this.h.g.unlisten = a;
        a = x(this.o, this, "src");
        this.h.g.setSource = a;
        a = x(this.o, this, "muted");
        this.h.g.setMuted = a;
        a = x(this.o, this, "volume");
        this.h.g.setVolume = a
    };
    y(Un, yd);
    Un.prototype.C = function(a) {
        a = a.type;
        var b = new Rn;
        b.duration = this.g.duration;
        b.currentTime = this.g.currentTime;
        b.readyState = this.g.readyState;
        this.g.error && (b.h = this.g.error.code);
        b.muted = this.g.muted;
        b.l = this.g.paused;
        b.g = this.g.ended;
        b.volume = this.g.volume;
        this.h.G("notify", a, b)
    };
    Un.prototype.B = function(a) {
        this.w.g.set(Sn(a), a);
        this.l.h(this.g, a, this.A)
    };
    Un.prototype.D = function(a) {
        Pd(this.w.g, Sn(a));
        this.l.B(this.g, a)
    };
    Un.prototype.o = function(a, b) {
        this.g[a] = b
    };
    var Vn = function(a, b) {
        Pl(a.l);
        a.g = b;
        A(a.w.ca(), a.B, a)
    };
    var Wn = function() {
        this.w = this.G = this.o = this.l = this.h = null;
        this.D = this.L = this.C = this.A = this.F = !1;
        this.timeout = -1;
        this.g = !1;
        this.B = null
    };
    var Zn = function(a) {
        O.call(this);
        this.M = "ima-chromeless-video";
        var b = null;
        null != a && (q(a) ? this.M = a : b = a);
        this.N = new Ll(this);
        this.A = null;
        this.w = !1;
        this.ga = this.gb();
        this.fa = this.ib();
        this.I = -1;
        this.W = !1;
        this.C = -1;
        this.g = this.T = this.J = null;
        this.za = "";
        this.o = !1;
        this.aa = null != b;
        this.ya = this.K = this.Z = this.l = null;
        this.D = void 0;
        this.na = null;
        this.G = 0;
        this.aa ? (this.o = !0, this.l = b, this.D = 2) : (a = x(this.md, this), Xn ? a() : (ob.push(a), a = document.createElement("SCRIPT"), a.src = Pb(Yn), b = document.getElementsByTagName("script")[0],
            b.parentNode.insertBefore(a, b)))
    };
    y(Zn, un);
    var Yn = Qb(Lb(Mb("https://www.youtube.com/iframe_api"))),
        $n = {
            el: "adunit",
            controls: 0,
            html5: 1,
            playsinline: 1,
            ps: "gvn",
            showinfo: 0
        },
        ob = [],
        Xn = !1;
    h = Zn.prototype;
    h.Ub = function(a) {
        this.g = a
    };
    h.load = function(a, b) {
        null !== a && (this.za = a, this.o ? ao(this, a, b) : (this.J = a, this.T = b))
    };
    h.rb = function(a) {
        this.aa ? P(this, "volumeChange") : this.o ? (a = Math.min(Math.max(100 * a, 0), 100), this.l.setVolume(a), this.C = -1, P(this, "volumeChange")) : this.C = a
    };
    h.sc = function() {
        return this.o ? this.l.getVolume() / 100 : this.C
    };
    h.qb = function() {
        if (!Ka(Ya(this.za))) {
            if (!this.w) {
                bo(this);
                var a = jn();
                null != this.g && 0 < this.g.timeout && (a = this.g.timeout);
                this.Ra = vf(this.rd, a, this)
            }
            this.o ? (this.W = !1, !this.w && this.g && this.g.g ? this.l.loadVideoByPlayerVars(this.na) : this.l.playVideo()) : this.W = !0
        }
    };
    h.uc = function() {
        this.o && this.w && this.l.pauseVideo()
    };
    h.tc = function() {
        return this.o ? 2 == this.l.getPlayerState(this.D) : !1
    };
    h.gc = function() {};
    h.ib = function() {
        var a = document.getElementById(this.M);
        return a ? wm(a) : !1
    };
    h.jb = function(a) {
        this.o ? this.l.seekTo(a, !1) : this.I = a
    };
    h.wa = function(a) {
        return this.o ? this.l.getCurrentTime(a || this.D) : -1
    };
    h.fb = function() {
        return this.o && this.w ? this.l.getDuration(this.D) : -1
    };
    h.jc = function() {
        return yb(Ck)
    };
    h.tb = function() {
        return this.o ? 0 == this.l.getPlayerState(this.D) : !1
    };
    h.gb = function() {
        var a = document.getElementById(this.M);
        return a ? new I(a.offsetWidth, a.offsetHeight) : new I(0, 0)
    };
    h.yc = function() {
        return this.o ? 1 == this.l.getPlayerState(this.D) : !1
    };
    h.wf = function() {
        var a = this.gb(),
            b = this.ib();
        if (a.width != this.ga.width || a.height != this.ga.height) !this.fa && b ? P(this, "beginFullscreen") : this.fa && !b && P(this, "endFullscreen"), this.ga = a, this.fa = b
    };
    h.La = function() {
        this.Z = x(this.Pa, this);
        this.K = x(this.ha, this);
        this.ya = x(this.Qa, this);
        this.aa && (this.l.addEventListener("onAdStateChange", this.K), this.l.addEventListener("onReady", this.Z), this.l.addEventListener("onStateChange", this.K), this.l.addEventListener("onVolumeChange", this.ya));
        this.P = new tf(1E3);
        this.N.h(this.P, "tick", this.wf);
        this.P.start()
    };
    h.pa = function() {
        this.aa && (this.l.removeEventListener("onAdStateChange", this.K), this.l.removeEventListener("onReady", this.Z), this.l.removeEventListener("onStateChange", this.K), this.l.removeEventListener("onVolumeChange", this.ya));
        null != this.P && this.P.X()
    };
    h.md = function() {
        var a = Gb($n);
        M.Za() && (a.ps = "gvn", a.remoteve = hm.w, a.remotevewin = "discover");
        a = {
            playerVars: a,
            events: {
                onError: x(this.xd, this),
                onReady: x(this.Pa, this),
                onAdStateChange: x(this.ha, this),
                onStateChange: x(this.ha, this),
                onVolumeChange: x(this.Qa, this)
            }
        };
        var b = va("YT");
        this.l = null != b && null != b.Player ? new b.Player(this.M, a) : null
    };
    var ao = function(a, b, c) {
        var d = {
            autoplay: "1"
        };
        M.Za() && (d.dash = 0);
        null != a.g && (null != a.g.o && (d.agcid = a.g.o), null != a.g.h && (d.adformat = a.g.h), null != a.g.l && (d.ad_query_id = a.g.l), a.g.w && (d.cta_conversion_urls = a.g.w), a.g.B && (d.endscreen_ad_tracking_data = a.g.B), a.g.A && (d.is_pharma = 1), d.iv_load_policy = a.g.C ? 1 : 3, a.g.F && (d.noiba = 1), a.g.L && (d.utpsa = 1), a.g.D && (d.autoplay = "1"));
        if (null != b)
            if (vl(b)) {
                var e = b.match(/yt_vid\/([a-zA-Z0-9_-]{11})/);
                e = null != e && 1 < e.length ? e[1] : null
            } else e = null != b && rl(b) ? rn(b) : null;
        else e =
            null;
        null === e ? (c = null === c ? "" : c, b = "url=" + encodeURIComponent(b) + "&type=" + encodeURIComponent(c), d.url_encoded_third_party_media = b) : d.videoId = e;
        d.enabled_engage_types = "3,4,5,6";
        a.w = !1;
        a.g && a.g.g ? (a.na = d, a.l.preloadVideoByPlayerVars(a.na)) : a.l.cueVideoByPlayerVars(d);
        P(a, "loaded")
    };
    Zn.prototype.xd = function() {
        P(this, "error")
    };
    Zn.prototype.Pa = function() {
        this.o = !0; - 1 != this.C && (this.rb(this.C), this.C = -1);
        null != this.J && (ao(this, this.J, this.T), this.T = this.J = null); - 1 != this.I && (this.jb(this.I), this.I = -1);
        this.W && this.qb()
    };
    Zn.prototype.ha = function(a) {
        switch (a.data) {
            case 0:
                this.w ? P(this, "end") : P(this, "error");
                break;
            case 1:
                this.w || (bo(this), this.w = !0, this.G = 0, P(this, "start"));
                P(this, "play");
                co(this);
                this.A = new tf(100);
                this.N.h(this.A, "tick", this.Oa);
                this.A.start();
                break;
            case 2:
                P(this, "pause"), co(this)
        }
    };
    Zn.prototype.Qa = function() {
        P(this, "volumeChange")
    };
    var co = function(a) {
            a.N.B(a.A, "tick", a.Oa);
            null != a.A && (uf(a.A), a.A = null)
        },
        bo = function(a) {
            null != a.Ra && m.clearTimeout(a.Ra)
        };
    Zn.prototype.Oa = function() {
        if (yf || cm()) {
            if (1.5 < this.wa() - this.G) {
                this.o && this.l.seekTo(this.G, !0);
                return
            }
            this.wa() > this.G && (this.G = this.wa())
        }
        P(this, "timeUpdate")
    };
    Zn.prototype.rd = function() {
        P(this, "mediaLoadTimeout")
    };
    Zn.prototype.O = function() {
        co(this);
        bo(this);
        this.pa();
        this.o = !1;
        this.N.X();
        this.I = -1;
        this.T = null;
        this.W = !1;
        this.J = null;
        this.C = -1;
        this.Z = this.l = this.g = null;
        this.w = !1;
        this.za = "";
        Zn.ea.O.call(this)
    };
    t("onYouTubeIframeAPIReady", function() {
        Xn = !0;
        A(ob, function(a) {
            a()
        });
        pb()
    }, window);
    var eo = function(a, b) {
        zk.call(this, b);
        this.w = a;
        this.ua = null;
        this.A = new Ll(this);
        this.A.h(J(), "message", this.C)
    };
    y(eo, zk);
    var fo = function(a) {
        if (null == a || !q(a) || 0 != a.lastIndexOf("ima://", 0)) return null;
        a = a.substr(6);
        try {
            return JSON.parse(a)
        } catch (b) {
            return null
        }
    };
    eo.prototype.sendMessage = function(a, b, c) {
        null != this.ua && null != this.ua.postMessage && this.ua.postMessage(go(this, a, b, c), "*");
        null != this.ua && null == this.ua.postMessage && mm(jm.H(), 11)
    };
    eo.prototype.O = function() {
        this.A.X();
        eo.ea.O.call(this)
    };
    eo.prototype.C = function(a) {
        a = a.h;
        var b = fo(a.data);
        if (ho(this, b)) {
            if (null == this.ua) this.ua = a.source, this.l || this.connect();
            else if (this.ua != a.source) return;
            ho(this, b) && P(this, new Bk(b.name, b.type, b.data || {}, b.sid, a.origin))
        }
    };
    var go = function(a, b, c, d) {
            var e = {};
            e.name = b;
            e.type = c;
            null != d && (e.data = d);
            e.sid = a.g;
            e.channel = a.w;
            return "ima://" + If(e)
        },
        ho = function(a, b) {
            if (null == b) return !1;
            var c = b.channel;
            if (null == c || c != a.w) return !1;
            b = b.sid;
            return null == b || "*" != a.g && b != a.g ? !1 : !0
        };
    var io = function(a, b) {
        O.call(this);
        this.w = a;
        this.o = b;
        this.g = {};
        this.l = new Ll(this);
        this.l.h(J(), "message", this.A)
    };
    y(io, O);
    var jo = function(a, b) {
            var c = b.h;
            a.g.hasOwnProperty(c) && Ak(a.g[c], b.type, b.$, b.V)
        },
        lo = function(a, b, c, d) {
            a.g.hasOwnProperty(b) || (c = new eo(b, c), a.l.h(c, a.w, function(a) {
                P(this, new ko(a.type, a.$, a.V, a.pb, a.Ic, b))
            }), c.ua = d, c.connect(), a.g[b] = c)
        };
    io.prototype.O = function() {
        this.l.X();
        for (var a in this.g) zd(this.g[a]);
        io.ea.O.call(this)
    };
    io.prototype.A = function(a) {
        a = a.h;
        var b = fo(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.o && !this.g.hasOwnProperty(c)) {
                var d = b.sid;
                lo(this, c, d, a.source);
                P(this, new ko(b.name, b.type, b.data || {}, d, a.origin, c))
            }
        }
    };
    var ko = function(a, b, c, d, e, f) {
        Bk.call(this, a, b, c, d, e);
        this.h = f
    };
    y(ko, Bk);
    var no = function() {
        var a = va("google.ima.gptProxyInstance", J());
        if (null != a) return a;
        Ll.call(this);
        this.o = new io("gpt", !0);
        Ad(this, this.o);
        this.h(this.o, "gpt", this.A);
        this.g = null;
        mo() || J().top === J() || (this.g = new io("gpt", !1), Ad(this, this.g), this.h(this.g, "gpt", this.F))
    };
    y(no, Ll);
    var mo = function() {
            return !!va("googletag.cmd", J())
        },
        oo = function() {
            var a = va("googletag.console", J());
            return null != a ? a : null
        };
    no.prototype.A = function(a) {
        var b = a.Ic,
            c = "//imasdk.googleapis.com".match(sd);
        b = b.match(sd);
        if (c[3] == b[3] && c[4] == b[4])
            if (null != this.g) lo(this.g, a.h, a.pb, J().parent), null != this.g && jo(this.g, a);
            else if (c = a.V, null != c && p(c.scope)) {
            b = c.scope;
            c = c.args;
            var d;
            if ("proxy" == b) c = a.$, "isGptPresent" == c ? d = mo() : "isConsolePresent" == c && (d = null != oo());
            else if (mo())
                if ("pubads" == b || "companionAds" == b) {
                    d = a.$;
                    var e = J().googletag;
                    if (null != e && null != e[b] && (e = e[b](), null != e && (d = e[d], null != d))) try {
                        var f = d.apply(e, c)
                    } catch (g) {}
                    d =
                        f
                } else if ("console" == b) {
                if (f = oo(), null != f && (e = f[a.$], null != e)) try {
                    e.apply(f, c)
                } catch (g) {}
            } else if (null === b) {
                d = a.$;
                f = J();
                if (C(["googleGetCompanionAdSlots", "googleSetCompanionAdContents"], d) && (d = f[d], null != d)) try {
                    e = d.apply(f, c)
                } catch (g) {}
                d = e
            }
            p(d) && (a.V.returnValue = d, jo(this.o, a))
        }
    };
    no.prototype.F = function(a) {
        jo(this.o, a)
    };
    var qo = function(a, b) {
            var c = Array.prototype.slice.call(arguments),
                d = c.shift();
            if ("undefined" == typeof d) throw Error("[goog.string.format] Template required");
            return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, k, l, n, v, G) {
                if ("%" == n) return "%";
                var e = c.shift();
                if ("undefined" == typeof e) throw Error("[goog.string.format] Not enough arguments");
                arguments[0] = e;
                return po[n].apply(null, arguments)
            })
        },
        po = {
            s: function(a, b, c) {
                return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ?
                    a + Wa(" ", Number(c) - a.length) : Wa(" ", Number(c) - a.length) + a
            },
            f: function(a, b, c, d, e) {
                d = a.toString();
                isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
                var f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
                0 <= Number(a) && (d = f + d);
                if (isNaN(c) || d.length >= Number(c)) return d;
                d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
                a = Number(c) - d.length - f.length;
                return d = 0 <= b.indexOf("-", 0) ? f + d + Wa(" ", a) : f + Wa(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
            },
            d: function(a, b, c, d, e, f, g, k) {
                return po.f(parseInt(a,
                    10), b, c, d, 0, f, g, k)
            }
        };
    po.i = po.d;
    po.u = po.d;
    var so = function(a, b) {
        O.call(this);
        this.l = new Ll(this);
        this.I = !1;
        this.J = "goog_" + ab++;
        this.G = new Md;
        var c = this.J,
            d = M.la() ? (ic() ? "https:" : "http:") + qo("//imasdk.googleapis.com/js/core/admob/bridge_%s.html", M.w) : (ic() ? "https:" : "http:") + qo("//imasdk.googleapis.com/js/core/bridge3.180.3_%s.html", M.w);
        a: {
            var e = window;
            try {
                do {
                    try {
                        if (0 == e.location.href.indexOf(d) || 0 == e.document.referrer.indexOf(d)) {
                            var f = !0;
                            break a
                        }
                    } catch (g) {}
                    e = e.parent
                } while (e != e.top)
            } catch (g) {}
            f = !1
        }
        f && (d += "?f=" + c);
        c = Rc("IFRAME", {
            src: d + "#" +
                c,
            allowFullscreen: !0,
            style: "border:0; opacity:0; margin:0; padding:0; position:relative;"
        });
        Ol(this.l, c, "load", this.qd, void 0);
        a.appendChild(c);
        this.o = c;
        this.D = ro(this);
        this.C = b;
        this.g = this.C.h;
        this.w = this.A = null;
        this.l.h(this.D, "mouse", this.K);
        this.l.h(this.D, "touch", this.N);
        null != this.g && (this.l.h(this.D, "displayContainer", this.zd), this.l.h(this.D, "videoDisplay", this.M), this.l.h(this.D, "preloadVideoDisplay", this.Bd), this.l.h(this.g, yb(vn), this.xa), this.l.h(this.g, Rl, this.xa));
        a = J();
        b = va("google.ima.gptProxyInstance",
            a);
        null == b && (b = new no, t("google.ima.gptProxyInstance", b, a))
    };
    y(so, O);
    var ro = function(a, b) {
            b = b || "*";
            var c = a.G.get(b);
            null == c && (c = new eo(a.J, b), a.I && (c.ua = Vc(a.o), c.connect()), a.G.set(b, c));
            return c
        },
        to = function(a, b) {
            null != a.g && (a.l.B(a.g, yb(vn), a.xa), a.l.B(a.g, Rl, a.xa));
            a.g = b;
            a.l.h(a.g, yb(vn), a.xa);
            a.l.h(a.g, Rl, a.xa)
        };
    so.prototype.O = function() {
        this.l.X();
        null !== this.w && (this.w.X(), this.w = null);
        Ld(this.G.Ha(!1), function(a) {
            a.X()
        });
        this.G.clear();
        Tc(this.o);
        so.ea.O.call(this)
    };
    so.prototype.K = function(a) {
        var b = a.V,
            c = dd(this.o),
            d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.$, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        if (!Cf || Zl() || 0 == document.webkitIsFullScreen) this.o.blur(), window.focus();
        this.o.dispatchEvent(d)
    };
    var uo = function(a, b) {
        var c = dd(a.o),
            d = !!("TouchEvent" in window && 0 < TouchEvent.length);
        a = gb(b, function(a) {
            return d ? new Touch({
                identifier: a.identifier,
                target: this.o,
                clientX: a.clientX,
                clientY: a.clientY,
                screenX: a.screenX,
                screenY: a.screenY,
                pageX: a.pageX + c.x,
                pageY: a.pageY + c.y
            }) : document.createTouch(window, this.o, a.identifier, a.pageX + c.x, a.pageY + c.y, a.screenX, a.screenY)
        }, a);
        return document.createTouchList.apply(document, a)
    };
    so.prototype.N = function(a) {
        var b = a.V,
            c = dd(this.o);
        if ("TouchEvent" in window && 0 < TouchEvent.length) {
            b = {
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: b.detail,
                ctrlKey: b.ctrlKey,
                altKey: b.altKey,
                shiftKey: b.shiftKey,
                metaKey: b.metaKey,
                touches: uo(this, b.touches),
                targetTouches: uo(this, b.targetTouches),
                changedTouches: uo(this, b.changedTouches)
            };
            var d = new TouchEvent(a.$, b);
            this.o.dispatchEvent(d)
        } else d = document.createEvent("TouchEvent"), d.initTouchEvent(a.$, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x,
            b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, uo(this, b.touches), uo(this, b.targetTouches), uo(this, b.changedTouches), b.scale, b.rotation), this.o.dispatchEvent(d)
    };
    so.prototype.M = function(a) {
        if (null != this.g) {
            var b = a.V;
            switch (a.$) {
                case "startTracking":
                    this.g.La();
                    break;
                case "stopTracking":
                    this.g.pa();
                    break;
                case "exitFullscreen":
                    this.g.gc();
                    break;
                case "play":
                    this.g.qb();
                    break;
                case "pause":
                    this.g.uc();
                    break;
                case "load":
                    this.g.load(b.videoUrl, b.mimeType);
                    break;
                case "setCurrentTime":
                    this.g.jb(b.currentTime);
                    break;
                case "setPlaybackOptions":
                    this.g.Ub(vo(b));
                    break;
                case "setVolume":
                    this.g.rb(b.volume)
            }
        }
    };
    var vo = function(a) {
        a = a.playbackOptions;
        var b = new Wn;
        b.h = a.adFormat;
        b.o = a.adSenseAgcid;
        b.G = a.contentVideoDocId;
        b.w = a.ctaAnnotationTrackingEvents;
        a.showAnnotations && (b.C = !0);
        a.viewCountsDisabled && (b.L = !0);
        b.timeout = a.loadVideoTimeout;
        a.ibaDisabled && (b.F = !0);
        a.enablePreloading && (b.g = !0);
        b.l = a.adQemId;
        a.isPharma && (b.A = !0);
        a.useAutoplayFlag && (b.D = !0);
        b.B = a.endscreenAdTracking;
        return b
    };
    h = so.prototype;
    h.Bd = function(a) {
        if (null != this.A) {
            var b = a.V;
            switch (a.$) {
                case "startTracking":
                    this.A.La();
                    break;
                case "stopTracking":
                    this.A.pa();
                    break;
                case "setPlaybackOptions":
                    this.A.Ub(vo(b));
                    break;
                case "load":
                    this.A.load(b.videoUrl, b.mimeType)
            }
        }
    };
    h.xa = function(a) {
        var b = {};
        switch (a.type) {
            case "beginFullscreen":
                a = "fullscreen";
                break;
            case "endFullscreen":
                a = "exitFullscreen";
                break;
            case "click":
                a = "click";
                break;
            case "end":
                a = "end";
                break;
            case "error":
                a = "error";
                break;
            case "loaded":
                a = "loaded";
                break;
            case "mediaLoadTimeout":
                a = "mediaLoadTimeout";
                break;
            case "pause":
                a = "pause";
                b.ended = this.g.tb();
                break;
            case "play":
                a = "play";
                break;
            case "skip":
                a = "skip";
                break;
            case "start":
                a = "start";
                break;
            case "timeUpdate":
                a = "timeupdate";
                b.currentTime = this.g.wa();
                b.duration = this.g.fb();
                break;
            case "volumeChange":
                a = "volumeChange";
                b.volume = this.g.sc();
                break;
            case "loadedmetadata":
                a = a.type;
                b.duration = this.g.fb();
                break;
            case "abort":
            case "canplay":
            case "canplaythrough":
            case "durationchange":
            case "emptied":
            case "loadstart":
            case "loadeddata":
            case "progress":
            case "ratechange":
            case "seeked":
            case "seeking":
            case "stalled":
            case "suspend":
            case "waiting":
                a = a.type;
                break;
            default:
                return
        }
        Ak(this.D, "videoDisplay", a, b)
    };
    h.zd = function(a) {
        switch (a.$) {
            case "showVideo":
                null != this.w ? this.w.pa() : (this.w = new ln, this.l.h(this.w, "click", this.Of));
                this.w.La(wo(this.C));
                a = this.C;
                null != a.g && a.g.show();
                break;
            case "hide":
                null !== this.w && (this.w.X(), this.w = null);
                a = this.C;
                null != a.g && Mn(a.g.g, !1);
                break;
            case "getPreloadDisplay":
                null != this.g && null == this.A && (this.A = this.C.F);
                break;
            case "swapVideoDisplays":
                if (null != this.g && null != this.A) {
                    this.l.B(this.g, yb(vn), this.xa);
                    this.l.B(this.g, Rl, this.xa);
                    a = this.C;
                    if (a.g && a.h && a.l && a.F) {
                        var b =
                            a.h;
                        a.h = a.F;
                        a.F = b;
                        b = a.g;
                        a.g = a.l;
                        a.l = b;
                        a.D && a.h instanceof wn && Vn(a.D, a.h.g);
                        null != a.B && to(a.B, a.h)
                    }
                    this.g = this.C.h;
                    this.A = this.C.F;
                    this.l.h(this.g, yb(vn), this.xa);
                    this.l.h(this.g, Rl, this.xa)
                }
        }
    };
    h.Of = function() {
        Ak(this.D, "displayContainer", "videoClick")
    };
    h.qd = function() {
        Ld(this.G.Ha(!1), function(a) {
            a.ua = Vc(this.o);
            a.connect()
        }, this);
        this.I = !0
    };
    var yo = function(a, b, c, d, e) {
        if (!(e || null != a && Uc(Kc(a), a))) throw Bl(Al, null, "containerElement", "element");
        this.R = !1;
        this.L = a;
        var f = null != b || null != d;
        if (!f && M.g) throw Bl(yl, null, "Custom video element was not provided even though the setting restrictToCustomPlayback is set to true.");
        kl(hl(), 136961005) && (M.l = !0);
        this.G = xo(b ? b : null);
        var g = f;
        e = !1;
        if (M.l) {
            M.g || em(this.G) && f || (g = !1);
            if (f = !g) f = M.l && !M.la() && (Xl() || M.g);
            f && (M.P = !0);
            fm() && (e = !0)
        } else M.g || em(this.G) && f || (fm() && (e = !0), g = !1);
        this.C = g;
        this.Z = (this.W =
            e) || g && null != d;
        g = Rc("DIV", {
            style: "position:absolute"
        });
        a.insertBefore(g, a.firstChild);
        this.A = g;
        this.g = null;
        !this.C && Xl() && (this.g = new Ln(this.A, null, !0));
        g = a = null;
        this.C ? b ? (a = new wn(b), g = b) : d && (a = new Zn(d)) : this.g && (a = new wn(this.g.h), g = this.g.h);
        f = null;
        g && M.Za() && e && (f = new Un(g));
        this.D = f;
        this.h = a;
        this.F = this.l = null;
        e = tc && !bm(4);
        a = Yl() && Xl();
        if (M.la() || this.g && this.h && !this.C && M.o && !Vi() && !e && !a) this.l = new Ln(this.A, null, !0), this.F = new wn(this.l.h);
        this.w = this.h ? c || null : null;
        this.K = null != this.w;
        mm(jm.H(), 8, {
            enabled: this.C,
            yt: null != d,
            customClick: null != this.w
        });
        this.C && b ? w(b.getBoundingClientRect) || (b = this.L, M.A = b) : b = this.A;
        this.I = b;
        this.B = new so(this.A, this);
        this.J = new I(0, 0)
    };
    yo.prototype.P = function() {
        this.R = !0;
        if (null != this.g) {
            var a = this.g;
            a.h && (a = a.h, Xl() && a.load())
        }
        null != this.l && (a = this.l, a.h && (a = a.h, Xl() && a.load()))
    };
    yo.prototype.N = function() {
        zd(this.g);
        zd(this.l);
        zd(this.B);
        zd(this.h);
        zd(this.F);
        zd(this.D);
        Tc(this.A)
    };
    var wo = function(a) {
        return a.K && a.w ? a.w : null != a.g ? a.g.l : null
    };
    yo.prototype.o = function() {
        return this.C
    };
    yo.prototype.T = function() {
        return this.W
    };
    yo.prototype.M = function() {
        return this.Z
    };
    var xo = function(a) {
        return null != a && w(a.getAttribute) && null != a.getAttribute("playsinline") ? !0 : !1
    };
    var zo = qc && "srcdoc" in document.createElement("iframe"),
        Ao = pc || qc || F && Ec(11),
        Bo = function(a, b) {
            a.open("text/html", "replace");
            a.write(b);
            a.close()
        },
        Go = function(a, b) {
            F && Ec(7) && !Ec(10) && 6 > Co() && Do(b) && (b = Eo(b));
            var c = function() {
                    a.contentWindow.goog_content = b;
                    a.contentWindow.location.replace("javascript:window.goog_content")
                },
                d;
            if (d = F) {
                try {
                    var e = fc(a.contentWindow)
                } catch (f) {
                    e = !1
                }
                d = !e
            }
            d ? Fo(a, c) : c()
        },
        Co = function() {
            var a = navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
            return a ? parseFloat(a[1]) : 0
        },
        Ho =
        0,
        Fo = function(a, b) {
            var c = "goog_rendering_callback" + Ho++;
            m[c] = b;
            a.src = "javascript:'<script>(function() {document.domain = \"" + document.domain + '";var continuation = window.parent.' + c + ";window.parent." + c + " = null;continuation();})()\x3c/script>'"
        },
        Do = function(a) {
            for (var b = 0; b < a.length; ++b)
                if (127 < a.charCodeAt(b)) return !0;
            return !1
        },
        Eo = function(a) {
            a = unescape(encodeURIComponent(a));
            for (var b = Math.floor(a.length / 2), c = [], d = 0; d < b; ++d) c[d] = String.fromCharCode(256 * a.charCodeAt(2 * d + 1) + a.charCodeAt(2 * d));
            1 == a.length %
                2 && (c[b] = a.charAt(a.length - 1));
            return c.join("")
        };
    var Io = function(a, b) {
        this.o = a;
        this.l = null;
        this.D = "";
        this.G = 0;
        this.w = this.g = null;
        this.K = b;
        this.C = null;
        this.A = ""
    };
    y(Io, O);
    Io.prototype.J = function(a) {
        try {
            var b = a.h.data;
            try {
                var c = JSON.parse(b)
            } catch (lk) {
                return
            }
            var d = c.session;
            if (null != d && this.A == d) {
                if ("friendlyReady" == c.type) {
                    var e = Jo(this);
                    if ((Ci() || Bi()) && null != e) {
                        this.l = e;
                        this.D = e.currentSrc;
                        this.G = e.currentTime;
                        var f = this.o;
                        null != f.g && f.g.show()
                    } else {
                        var g = this.o.L,
                            k = this.o.J;
                        var l = "border: 0; margin: 0; padding: 0; position: absolute; " + ("width:" + k.width + "px; ");
                        l += "height:" + k.height + "px;";
                        this.l = Rc("VIDEO", {
                            style: l
                        });
                        null != Jo(this) && r(Jo(this).volume) && (this.l.volume =
                            Jo(this).volume);
                        g.appendChild(this.l)
                    }
                    var n = this.o.L;
                    a = "border: 0; margin: 0; padding: 0;position: absolute; ";
                    var v = this.l;
                    b: {
                        var G = Kc(v);
                        if (G.defaultView && G.defaultView.getComputedStyle) {
                            var W = G.defaultView.getComputedStyle(v, null);
                            if (W) {
                                var u = W.display || W.getPropertyValue("display") || "";
                                break b
                            }
                        }
                        u = ""
                    }
                    if ("none" != (u || (v.currentStyle ? v.currentStyle.display : null) || v.style && v.style.display)) var B = gd(v);
                    else {
                        var ia = v.style,
                            je = ia.display,
                            bj = ia.visibility,
                            To = ia.position;
                        ia.visibility = "hidden";
                        ia.position =
                            "absolute";
                        ia.display = "inline";
                        var Uo = gd(v);
                        ia.display = je;
                        ia.position = To;
                        ia.visibility = bj;
                        B = Uo
                    }
                    a += "width:" + B.width + "px; ";
                    a += "height:" + B.height + "px;";
                    this.w = Rc("DIV", {
                        style: a
                    });
                    n.appendChild(this.w);
                    try {
                        this.g.contentWindow.loader.initFriendly(this.l, this.w)
                    } catch (lk) {
                        Ko(this)
                    }
                }
                Ak(this.K, "vpaid", "", b)
            }
        } catch (lk) {
            Ko(this)
        }
    };
    var Ko = function(a) {
            var b = {
                type: "error"
            };
            b.session = a.A;
            a = If(b);
            window.postMessage(a, "*")
        },
        Jo = function(a) {
            a = a.o.h;
            return a instanceof wn && a.g instanceof HTMLVideoElement ? a.g : null
        };
    Io.prototype.O = function() {
        O.ea.O.call(this);
        zd(this.I);
        this.I = null;
        Tc(this.w);
        this.w = null;
        Tc(this.g);
        this.g = null;
        var a = Jo(this);
        (Ci() || Bi()) && null != a ? (a.src = this.D, a.currentTime = this.G, a = this.o, null != a.g && Mn(a.g.g, !1)) : (Tc(this.l), this.l = null)
    };
    var Y = function(a, b, c, d, e, f, g) {
        O.call(this);
        this.M = a;
        this.g = b;
        this.K = c;
        this.Qa = e;
        this.o = null;
        this.aa = g;
        this.P = !1;
        this.J = 1;
        this.Pa = d;
        this.na = this.fa = this.Z = -1;
        this.w = this.l = null;
        this.G = new qn;
        this.za = !1;
        this.T = new Map;
        this.W = this.ya = !1;
        this.C = null;
        this.ha = f && null != this.g.w;
        this.N = x(this.wd, this);
        this.ga = new Ll(this);
        this.ga.h(this.aa, "adsManager", this.Ra)
    };
    y(Y, O);
    Y.prototype.Ra = function(a) {
        switch (a.$) {
            case "error":
                Lo(this, a.V);
                break;
            case "contentPauseRequested":
                var b = this.g.h;
                this.g.o() && null != this.o && this.o.restoreCustomPlaybackStateOnAdBreakComplete && null != b.Oc && b.Oc();
                this.A(a.$, a.V);
                break;
            case "contentResumeRequested":
                a = x(Y.prototype.A, this, a.$, a.V);
                b = this.g.h;
                this.g.o() && null != this.o && this.o.restoreCustomPlaybackStateOnAdBreakComplete && null != b.Mc ? b.Mc(a) : a();
                break;
            case "remainingTime":
                b = a.V;
                this.Z = b.currentTime;
                this.fa = b.duration;
                this.na = b.remainingTime;
                break;
            case "skip":
                this.A(a.$, a.V);
                break;
            case "log":
                b = a.V;
                var c = b.adData;
                this.A(a.$, c, b.logData);
                break;
            case "companionBackfill":
                a = va("window.google_show_companion_ad");
                null != a && a();
                break;
            case "skipshown":
                this.P = !0;
                this.A(a.$, a.V);
                break;
            case "interaction":
                b = a.V;
                c = b.adData;
                this.A(a.$, c, b.interactionData);
                break;
            case "vpaidEvent":
                try {
                    var d = a.V;
                    switch (d.vpaidEventType) {
                        case "createFriendlyIframe":
                            b = this.C = new Io(this.g, this.aa);
                            b.A = d.session;
                            a = "about:self";
                            F && (a = "");
                            b.g = Rc("IFRAME", {
                                src: a,
                                allowtransparency: !0,
                                background: "transparent"
                            });
                            c = b.g;
                            a = {
                                display: "none",
                                width: "0",
                                height: "0"
                            };
                            if (q(a)) {
                                var e = ad(c, a);
                                e && (c.style[e] = void 0)
                            } else
                                for (var f in a) {
                                    e = c;
                                    var g = a[f],
                                        k = ad(e, f);
                                    k && (e.style[k] = g)
                                }
                            var l = b.o.L;
                            l.appendChild(b.g);
                            var n = l.ownerDocument,
                                v = n.defaultView || n.parentWindow;
                            null == b.C && (b.C = new Ll(b));
                            b.C.h(v, "message", b.J);
                            var G = '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>' + ('loader = new VPAIDLoader(false, "' + b.A + '");') + "\x3c/script></body>";
                            if (Bf || xf || oc) {
                                var W =
                                    b.g;
                                Ao ? Bo(W.contentWindow.document, G) : Go(W, G)
                            } else {
                                var u = b.g;
                                zo ? u.srcdoc = G : Ao ? Bo(u.contentWindow.document, G) : Go(u, G)
                            }
                            break;
                        case "destroyFriendlyIframe":
                            null != this.C && (this.C.X(), this.C = null)
                    }
                } catch (B) {
                    Lo(this, B.V)
                }
                break;
            case "skippableStateChanged":
                b = a.V;
                c = b.adData;
                null != c.skippable && (this.P = c.skippable);
                this.A(a.$, a.V);
                break;
            case "cacheAbandonUrls":
                break;
            case "volumeChange":
                b = a.V;
                c = b.adData;
                null != c && r(c.volume) && (this.J = c.volume);
                this.A(a.$, a.V);
                break;
            default:
                this.A(a.$, a.V)
        }
    };
    Y.prototype.A = function(a, b, c) {
        if (null == b.companions) {
            var d = this.T.get(b.adId);
            b.companions = null != d ? d : []
        }
        this.l = d = null != b.adData ? new X(b.adData) : null;
        switch (a) {
            case "adBreakReady":
            case "trackingUrlPinged":
            case "mediaUrlPinged":
                a = new L(a, null, b);
                break;
            case "adMetadata":
                a = null;
                null != b.adCuePoints && (a = new en(b.adCuePoints));
                a = new hn(d, a);
                break;
            case "allAdsCompleted":
                this.l = null;
                this.ya = !0;
                a = new L(a, d);
                break;
            case "contentPauseRequested":
                this.W = !1;
                a = new L(a, d);
                break;
            case "contentResumeRequested":
                this.l =
                    null;
                this.W = !0;
                a = new L(a, d);
                break;
            case "loaded":
                this.Z = 0;
                this.fa = d.Ib();
                this.na = d.Ib();
                c = this.M;
                var e = this.N,
                    f = this.Qa;
                jk.H();
                c.l.set(Kl(d), e);
                c.C && c.o && (Q.H().l = !0, e = c.o, uj.H().o = e);
                ym(c) && xm(c, "loaded", Kl(d), f);
                a = new L(a, d, b.adData);
                break;
            case "start":
                this.T.set(b.adId, b.companions);
                null != wo(this.g) && (null != this.w ? this.w.pa() : (this.w = new ln, this.ga.h(this.w, "click", this.Jf)), this.w.La(wo(this.g)));
                a = new L(a, d);
                break;
            case "complete":
                null != this.w && this.w.pa();
                Am(this.M, this.N, Kl(d));
                this.l = null;
                this.T["delete"](b.adId);
                a = new L(a, d);
                break;
            case "log":
                b = null;
                null != c && null != c.type ? (f = c.type, f = "adLoadError" == f || "adPlayError" == f) : f = !1;
                f && (b = {
                    adError: Mo(c)
                });
                a = new L(a, d, b);
                break;
            case "interaction":
                a = new L(a, d, c);
                break;
            case "urlNavigationRequested":
                a = new L(a, d, b.urlNavigationData);
                break;
            default:
                a = new L(a, d)
        }
        P(this, a);
        this.ya && this.W && this.pc()
    };
    var Lo = function(a, b) {
            var c = new Cd(Mo(b));
            a.za ? (P(a, c), a.l && Am(a.M, a.N, Kl(a.l)), a.l = null) : a.G.h.push(c);
            a = {
                error: b.errorCode,
                vis: Mg(document)
            };
            mm(jm.H(), 7, a, !0)
        },
        Mo = function(a) {
            var b = new xd(a.type, a.errorMessage, a.errorCode);
            null != a.innerError && (b.g = Error(a.innerError));
            return b
        },
        No = function(a, b, c) {
            Ak(a.aa, "adsManager", b, c)
        };
    h = Y.prototype;
    h.Gc = function() {
        No(this, "contentTimeUpdate", {
            currentTime: this.D.currentTime
        })
    };
    h.Oe = function(a, b, c, d) {
        if (this.G.isEmpty()) {
            var e = this.g;
            null != d && (mm(jm.H(), 54, {}, !0), e.G = xo(d), M.g || em(e.G) ? (e.C = !0, zd(e.g), zd(e.l), zd(e.F), e.g = null, e.l = null, e.F = null, zd(e.h), e.h = new wn(d), w(d.getBoundingClientRect) ? e.I = d : (e.I = e.L, M.A = e.I), null != e.B && to(e.B, e.h), e.D && Vn(e.D, d)) : e.C = !1);
            this.za = !0;
            this.qc(a, b, c);
            No(this, "init", {
                width: a,
                height: b,
                viewMode: c
            })
        } else {
            for (; !this.G.isEmpty();) b = a = this.G, 0 == b.g.length && (b.g = b.h, b.g.reverse(), b.h = []), a = a.g.pop(), P(this, a);
            this.X()
        }
    };
    h.Cf = function() {
        return this.g.o()
    };
    h.Bf = function() {
        return this.ha
    };
    h.Me = function() {
        return this.na
    };
    h.Je = function() {
        return this.P
    };
    h.nd = function() {
        No(this, "discardAdBreak")
    };
    h.Sf = function() {
        No(this, "requestNextAdBreak")
    };
    h.rc = function(a) {
        null != a && (this.o = a, No(this, "updateAdsRenderingSettings", {
            adsRenderingSettings: Oo(this)
        }))
    };
    h.wd = function() {
        var a = null != this.l ? this.l.g.vpaid : !1,
            b = this.g.h,
            c = null != b ? b.wa() : this.Z,
            d = null != b ? b.fb() : this.fa;
        return {
            currentTime: c,
            duration: d,
            isPlaying: null != b ? b.yc() : !1,
            isVpaid: a,
            isYouTube: !1,
            volume: this.J
        }
    };
    h.Re = function() {
        No(this, "skip")
    };
    h.start = function() {
        if (this.K && !M.la()) {
            Yl() && mm(jm.H(), 50, {
                customPlayback: this.g.o()
            });
            Xl() && !this.g.R && mm(jm.H(), 26, {
                adtagurl: this.K,
                customPlayback: this.g.o()
            });
            Vg(this.g.A) && mm(jm.H(), 30, {
                adtagurl: this.K,
                customPlayback: this.g.o()
            });
            var a = this.g.w,
                b = this.g.A,
                c;
            if (c = a && b && !Vg(a)) a = vm(a), b = vm(b), c = 0 < a.width && 0 < a.height && 0 < b.width && 0 < b.height && a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
            c && mm(jm.H(), 31, {
                adtagurl: this.K,
                customPlayback: this.g.o()
            })
        }
        if (Xl() &&
            !this.g.R && !this.g.o()) throw Bl(zl);
        b = this.g;
        b.K = this.ha && null != b.w;
        this.g.B.o.style.opacity = 1;
        null != this.D && 1 == this.J && ("boolean" == typeof this.D.muted && this.D.muted ? this.Jb(0) : r(this.D.volume) && (b = this.D.volume, 0 <= b && 1 >= b && this.Jb(this.D.volume)));
        No(this, "start")
    };
    h.Jf = function() {
        if ((null == this.o || !this.o.disableClickThrough) && null != this.l) {
            var a = this.l.g.clickThroughUrl;
            null != a && (Ka(Ya(a)) || window.open(a, "_blank"))
        }
    };
    h.qc = function(a, b, c) {
        var d = this.g,
            e = d.A;
        null != e && (-1 == a ? (e.style.right = "0", e.style.left = "0") : e.style.width = a + "px", -1 == b ? (e.style.bottom = "0", e.style.top = "0") : e.style.height = b + "px");
        null != d.B && (e = d.B, e.o.width = -1 == a ? "100%" : a, e.o.height = -1 == b ? "100%" : b);
        d.J = new I(a, b);
        No(this, "resize", {
            width: a,
            height: b,
            viewMode: c
        })
    };
    h.Se = function() {
        No(this, "stop")
    };
    h.Ie = function() {
        No(this, "expand")
    };
    h.He = function() {
        No(this, "collapse")
    };
    h.Ne = function() {
        return this.J
    };
    h.Jb = function(a) {
        this.J = a;
        if (!M.la()) {
            var b = this.g.h;
            null != b && b.rb(a)
        }
        No(this, "volume", {
            volume: a
        })
    };
    h.Pe = function() {
        No(this, "pause")
    };
    h.Qe = function() {
        No(this, "resume")
    };
    h.pc = function() {
        null != this.C && (this.C.X(), this.C = null);
        this.X()
    };
    h.Ke = function() {
        return this.Pa
    };
    h.Le = function() {
        return this.l
    };
    h.O = function() {
        No(this, "destroy");
        null != this.w && this.w.X();
        this.ga.X();
        this.G.clear();
        this.I && (uf(this.I.g), this.I.X());
        Am(this.M, this.N);
        Y.ea.O.call(this)
    };
    var Oo = function(a) {
        var b = {};
        null != a.o && Ib(b, a.o);
        a.ha && (b.useClickElement = !1, b.disableClickThrough = !0);
        return b
    };
    Y.prototype.Oa = function() {
        No(this, "click")
    };
    var Po = function(a, b, c) {
        Bd.call(this, "adsManagerLoaded");
        this.h = a;
        this.o = b;
        this.A = c || ""
    };
    y(Po, Bd);
    Po.prototype.w = function(a, b) {
        var c = this.h;
        c.D = a;
        null != b && (c.o = b);
        null != a.currentTime && (c.I = new gn(a), c.I.h("currentTimeUpdate", c.Gc, !1, c), c.I.start(), c.Gc());
        kl(hl(), 651800002) ? null != b && c.rc(b) : No(c, "configure", {
            adsRenderingSettings: Oo(c)
        });
        return this.h
    };
    Po.prototype.F = function() {
        return this.o
    };
    Po.prototype.B = function() {
        return this.A
    };
    var Qo;
    if (Qo = !xb(function(a) {
            return a.match(J().location.href)
        })) {
        var Ro = document;
        Qo = null == nb(Ro.querySelectorAll && Ro.querySelector ? Ro.querySelectorAll("SCRIPT") : Ro.getElementsByTagName("SCRIPT"), function(a) {
            return xb(function(b) {
                return b.match(a.src)
            })
        })
    }
    if (Qo) throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
    var So = function(a) {
        O.call(this);
        this.g = a;
        this.A = new Map;
        this.o = this.g.B;
        this.C = new Ll(this);
        a = hl();
        kl(a, 495644009) || kl(a, 495644010) ? (this.l = new nm, Ad(this, this.l)) : this.l = rm();
        this.o && (um(this.l, ro(this.o)), this.w = zm(this.l, this.g.I));
        a: {
            try {
                var b = window.top.location.href
            } catch (c) {
                b = 2;
                break a
            }
            b = null != b ? b == window.document.location.href ? 0 : 1 : 2
        }
        hm.l = b
    };
    y(So, O);
    h = So.prototype;
    h.O = function() {
        this.C.X();
        var a = this.l,
            b = this.w,
            c = hl();
        a.A["delete"](b);
        if (kl(c, 495644009) || kl(c, 495644010)) jk.H().l[b] = null;
        So.ea.O.call(this)
    };
    h.yf = function() {
        this.X()
    };
    h.zf = function(a, b) {
        a.adTagUrl && mm(jm.H(), 8, {
            adtagurl: a.adTagUrl,
            customPlayback: this.g.o(),
            customClick: null != this.g.w,
            restrict: M.g
        });
        var c = "",
            d = me(),
            e = d.h;
        d = d.g;
        e && e.url ? c = e.url : d && d.url && (c = d.url);
        a.location = c;
        a.referrer = window.document.referrer;
        a.supportsYouTubeHosted = this.g.M();
        e = a.adTagUrl;
        d = this.g.L;
        c = [];
        var f = "",
            g = "";
        if (null != d) {
            f = d;
            g = [];
            for (var k = 0; f && 25 > k; ++k) {
                a: {
                    if (f && f.nodeName && f.parentElement) {
                        var l = f.nodeName.toString().toLowerCase();
                        for (var n = f.parentElement.childNodes, v = 0, G = 0; G < n.length; ++G) {
                            var W =
                                n[G];
                            if (W.nodeName && W.nodeName.toString().toLowerCase() === l) {
                                if (f === W) {
                                    l = "." + v;
                                    break a
                                }++v
                            }
                        }
                    }
                    l = ""
                }
                g.push((f.nodeName && f.nodeName.toString().toLowerCase()) + "" + l);f = f.parentElement
            }
            f = g.join();
            if (d) {
                d = (d = d.ownerDocument) && (d.defaultView || d.parentWindow) || null;
                g = [];
                if (d) try {
                    var u = d.parent;
                    for (k = 0; u && u !== d && 25 > k; ++k) {
                        var B = u.frames;
                        for (l = 0; l < B.length; ++l)
                            if (d === B[l]) {
                                g.push(l);
                                break
                            }
                        d = u;
                        u = d.parent
                    }
                } catch (ia) {}
                g = g.join()
            } else g = ""
        }
        c.push(f, g);
        if (null != e) {
            for (u = 0; u < wd.length - 1; ++u) c.push(vd(e, wd[u]) || "");
            u = vd(e, "videoad_start_delay");
            B = "";
            u && (u = parseInt(u, 10), B = 0 > u ? "postroll" : 0 == u ? "preroll" : "midroll");
            c.push(B)
        } else
            for (u = 0; u < wd.length; ++u) c.push("");
        c = c.join(":");
        u = c.length;
        if (0 == u) c = 0;
        else {
            B = 305419896;
            for (e = 0; e < u; e++) B ^= (B << 5) + (B >> 2) + c.charCodeAt(e) & 4294967295;
            c = 0 < B ? B : 4294967296 + B
        }
        a.videoAdKey = c.toString();
        c = a.adTagUrl;
        null != c && "ca-pub-6219811747049371" != vd(c, "client") ? c = null : (c = va("window.yt.util.activity.getTimeSinceActive"), c = null != c ? c().toString() : null);
        null != c && (a.lastActivity = c);
        c = a.adTagUrl;
        null == c ? c = !1 : (u = new Rd(c), c = u.B, u = u.g, B = u.length - 27, c = 0 <= B && u.indexOf("googleads.g.doubleclick.net", B) == B && (Ka(Ya(c)) ? !1 : /\/pagead\/(live\/)?ads/.test(c)));
        if (c) {
            u = window;
            B = qd().document;
            c = {};
            e = rd(u).ac;
            g = e;
            d = g.location.href;
            g == g.top ? d = {
                url: d,
                zc: !0
            } : (f = !1, (k = g.document) && k.referrer && (d = k.referrer, g.parent == g.top && (f = !0)), (g = g.location.ancestorOrigins) && (g = g[g.length - 1]) && -1 == d.indexOf(g) && (f = !1, d = g), d = {
                url: d,
                zc: f
            });
            a: if (f = qd(), g = u.google_ad_width || f.google_ad_width, k = u.google_ad_height || f.google_ad_height,
                    f && f.top == f) f = !1;
                else {
                    l = B.documentElement;
                    if (g && k && (v = n = 1, f.innerHeight ? (n = f.innerWidth, v = f.innerHeight) : l && l.clientHeight ? (n = l.clientWidth, v = l.clientHeight) : B.body && (n = B.body.clientWidth, v = B.body.clientHeight), v > 2 * k || n > 2 * g)) {
                        f = !1;
                        break a
                    }
                    f = !0
                }
            g = f;
            k = d.zc;
            d = qd();
            l = d.top == d ? 0 : fc(d.top) ? 1 : 2;
            d = 4;
            g || 1 != l ? g || 2 != l ? g && 1 == l ? d = 7 : g && 2 == l && (d = 8) : d = 6 : d = 5;
            k && (d |= 16);
            g = !!u.google_page_url;
            c.google_iframing = "" + d;
            if (!g && "ad.yieldmanager.com" == B.domain) {
                for (d = B.URL.substring(B.URL.lastIndexOf("http")); - 1 < d.indexOf("%");) try {
                    d =
                        decodeURIComponent(d)
                } catch (ia) {
                    break
                }
                u.google_page_url = d;
                g = !!d
            }
            g ? (c.google_page_url = u.google_page_url, c.google_page_location = (f ? B.referrer : B.URL) || "EMPTY") : (f && fc(u.top) && B.referrer && u.top.document.referrer === B.referrer ? c.google_page_url = u.top.document.URL : c.google_page_url = f ? B.referrer : B.URL, c.google_page_location = null);
            c.google_last_modified_time = B.URL == c.google_page_url ? Date.parse(B.lastModified) / 1E3 : null;
            u = e == e.top ? e.document.referrer : ((u = md()) ? u.referrer : null) || "";
            c.google_referrer_url = u;
            a.adSenseParams =
                c
        }
        c = "goog_" + ab++;
        this.A.set(c, b || null);
        b = {};
        Ib(b, a);
        b.settings = {
            autoPlayAdBreaks: this.Y().o,
            chromelessPlayer: !0,
            companionBackfill: this.Y().B,
            pageCorrelator: this.Y().J,
            disableCustomPlaybackForIOS10Plus: this.Y().h,
            disableFlashAds: this.Y().F,
            enableTrvBillOnClick: !0,
            engagementDetection: !0,
            unloadAbandonPingEnabled: this.Y().Uf(),
            cacheAbandonUrls: !1,
            isAdMob: this.Y().la(),
            isInChina: this.Y().Df() || !1,
            isFunctionalTest: this.Y().Nb(),
            isVpaidAdapter: this.Y().ub(),
            numRedirects: this.Y().L,
            onScreenDetection: !0,
            playbackQualityWindowMinimumLength: 3E3,
            playerType: this.Y().C,
            playerVersion: this.Y().G,
            ppid: this.Y().K,
            reportMediaRequests: this.Y().Rf(),
            activeViewPushUpdates: ym(this.l),
            restrictToCustomPlayback: this.Y().g,
            streamCorrelator: this.Y().N,
            urlSignals: this.Y().T,
            useCompanionsAsEndSlate: !1,
            useRewardedEndSlate: this.Y().Wf(),
            usePlaybackQualityWindow: this.Y().Vf(),
            vpaidMode: this.Y().R,
            useChromelessRemoteMode: this.Y().Za(),
            useRefactoredDelayLearnMore: !1,
            remoteYtExperiment: this.Y().l,
            testingConfig: Ed(this.Y()).g
        };
        e = this.g.h;
        a = null != this.g.w;
        u = hm.l;
        B = this.w;
        e = null != e ? e.jc() : null;
        d = this.g.T();
        f = this.g.o();
        g = this.g.M();
        k = this.g;
        b.videoEnvironment = {
            customClickTrackingProvided: a,
            iframeState: u,
            osdId: B,
            supportedMimeTypes: e,
            usesChromelessPlayer: d,
            usesCustomVideoPlayback: f,
            usesYouTubePlayer: g,
            usesInlinePlayback: this.g.G,
            youTubeRendererId: k.D ? k.D.F : 0
        };
        b.experimentState = jl();
        a = ro(this.o, c);
        this.C.h(a, "adsLoader", this.yd);
        Ak(a, "adsLoader", "requestAds", b)
    };
    h.Y = function() {
        return M
    };
    h.xf = function() {
        Ak(ro(this.o), "adsLoader", "contentComplete")
    };
    h.yd = function(a) {
        var b = a.$;
        switch (b) {
            case "adsLoaded":
                b = a.V;
                a = a.pb;
                var c = new Y(this.l, this.g, b.adTagUrl || "", b.adCuePoints, this.w, b.isCustomClickTrackingAllowed, ro(this.o, a));
                P(this, new Po(c, this.A.get(a), b.response));
                break;
            case "error":
                b = a.V;
                a = a.pb;
                c = new xd(b.type, b.errorMessage, b.errorCode);
                null != b.innerError && (c.g = Error(b.innerError));
                P(this, new Cd(c, this.A.get(a)));
                a = {
                    error: b.errorCode,
                    vis: Mg(document)
                };
                mm(jm.H(), 7, a, !0);
                break;
            case "trackingUrlPinged":
                P(this, new L(b, null, a.V))
        }
    };
    var Z = function() {
        this.slotId = Math.floor(2147483646 * Math.random()) + 1
    };
    h = Z.prototype;
    h.clone = function() {
        var a = new Z;
        "auto" == this.videoPlayActivation ? a.Tb(!0) : "click" == this.videoPlayActivation && a.Tb(!1);
        a.adTagUrl = this.adTagUrl;
        a.adSenseParams = Gb(this.adSenseParams);
        a.adsResponse = this.adsResponse;
        a.contentDuration = this.contentDuration;
        a.contentKeywords = this.contentKeywords ? rb(this.contentKeywords) : null;
        a.contentTitle = this.contentTitle;
        a.customMacros = Gb(this.customMacros);
        a.g = this.g;
        a.location = this.location;
        a.referrer = this.referrer;
        a.lastActivity = this.lastActivity;
        a.language = this.language;
        a.linearAdSlotWidth = this.linearAdSlotWidth;
        a.linearAdSlotHeight = this.linearAdSlotHeight;
        a.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth;
        a.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight;
        a.videoAdKey = this.videoAdKey;
        a.tagForChildDirectedContent = this.tagForChildDirectedContent;
        a.usePostAdRequests = this.usePostAdRequests;
        a.supportsYouTubeHosted = this.supportsYouTubeHosted;
        a.youTubeAdType = this.youTubeAdType;
        a.youTubeVideoAdStartTime = this.youTubeVideoAdStartTime;
        a.fc = this.fc;
        a.dc = this.dc;
        a.l = this.l;
        a.h =
            this.h;
        a.forceNonLinearFullSlot = this.forceNonLinearFullSlot;
        a.liveStreamPrefetchSeconds = this.liveStreamPrefetchSeconds;
        a.wc = this.wc;
        a.Zb = this.Zb;
        a.Ab = this.Ab ? this.Ab.clone() : null;
        return a
    };
    h.adSenseParams = null;
    h.customMacros = null;
    h.videoPlayActivation = "unknown";
    h.liveStreamPrefetchSeconds = 0;
    h.linearAdSlotWidth = 0;
    h.linearAdSlotHeight = 0;
    h.nonLinearAdSlotWidth = 0;
    h.nonLinearAdSlotHeight = 0;
    h.forceNonLinearFullSlot = !1;
    h.videoAdKey = null;
    h.tagForChildDirectedContent = !1;
    h.usePostAdRequests = !1;
    h.slotId = 0;
    h.supportsYouTubeHosted = !0;
    h.youTubeVideoAdStartTime = 0;
    h.fc = null;
    h.dc = !1;
    h.Tb = function(a) {
        this.videoPlayActivation = a ? "auto" : "click"
    };
    h.wc = !0;
    h.Zb = 5E3;
    h.Ab = null;
    X.prototype.getCompanionAds = X.prototype.je;
    X.prototype.isLinear = X.prototype.Ee;
    X.prototype.isSkippable = X.prototype.Fe;
    X.prototype.isUiDisabled = X.prototype.Ge;
    X.prototype.getAdId = X.prototype.h;
    X.prototype.getAdSystem = X.prototype.ge;
    X.prototype.getAdvertiserName = X.prototype.he;
    X.prototype.getApiFramework = X.prototype.ie;
    X.prototype.getContentType = X.prototype.ke;
    X.prototype.getCreativeId = X.prototype.o;
    X.prototype.getCreativeAdId = X.prototype.l;
    X.prototype.getDescription = X.prototype.sd;
    X.prototype.getTitle = X.prototype.ud;
    X.prototype.getDuration = X.prototype.Ib;
    X.prototype.getHeight = X.prototype.oe;
    X.prototype.getWidth = X.prototype.Ae;
    X.prototype.getVastMediaHeight = X.prototype.ye;
    X.prototype.getVastMediaWidth = X.prototype.ze;
    X.prototype.getWrapperCreativeIds = X.prototype.De;
    X.prototype.getWrapperAdIds = X.prototype.Be;
    X.prototype.getWrapperAdSystems = X.prototype.Ce;
    X.prototype.getTraffickingParameters = X.prototype.te;
    X.prototype.getTraffickingParametersString = X.prototype.ue;
    X.prototype.getAdPodInfo = X.prototype.fe;
    X.prototype.getUiElements = X.prototype.ve;
    X.prototype.getMinSuggestedDuration = X.prototype.qe;
    X.prototype.getMediaUrl = X.prototype.pe;
    X.prototype.getSurveyUrl = X.prototype.se;
    X.prototype.getSkipTimeOffset = X.prototype.re;
    X.prototype.getDealId = X.prototype.ne;
    X.prototype.getUniversalAdIdValue = X.prototype.xe;
    X.prototype.getUniversalAdIdRegistry = X.prototype.we;
    en.prototype.getCuePoints = en.prototype.g;
    t("google.ima.AdCuePoints.PREROLL", 0, window);
    t("google.ima.AdCuePoints.POSTROLL", -1, window);
    t("google.ima.AdDisplayContainer", yo, window);
    yo.prototype.initialize = yo.prototype.P;
    yo.prototype.destroy = yo.prototype.N;
    Il.prototype.getPodIndex = Il.prototype.ce;
    Il.prototype.getTimeOffset = Il.prototype.de;
    Il.prototype.getTotalAds = Il.prototype.ee;
    Il.prototype.getMaxDuration = Il.prototype.be;
    Il.prototype.getAdPosition = Il.prototype.$d;
    Il.prototype.getIsBumper = Il.prototype.ae;
    t("google.ima.AdError.ErrorCode.VIDEO_PLAY_ERROR", 400, window);
    t("google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS", 1005, window);
    t("google.ima.AdError.ErrorCode.REQUIRED_LISTENERS_NOT_ADDED", 900, window);
    t("google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT", 301, window);
    t("google.ima.AdError.ErrorCode.VAST_NO_ADS_AFTER_WRAPPER", 303, window);
    t("google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT", 402, window);
    t("google.ima.AdError.ErrorCode.VAST_TOO_MANY_REDIRECTS", 302, window);
    t("google.ima.AdError.ErrorCode.VAST_ASSET_MISMATCH", 403, window);
    t("google.ima.AdError.ErrorCode.VAST_LINEAR_ASSET_MISMATCH", 403, window);
    t("google.ima.AdError.ErrorCode.VAST_NONLINEAR_ASSET_MISMATCH", 503, window);
    t("google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND", 1007, window);
    t("google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION", 102, window);
    t("google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR", 101, window);
    t("google.ima.AdError.ErrorCode.VAST_TRAFFICKING_ERROR", 200, window);
    t("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_LINEARITY", 201, window);
    t("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_DURATION_ERROR", 202, window);
    t("google.ima.AdError.ErrorCode.VAST_WRAPPER_ERROR", 300, window);
    t("google.ima.AdError.ErrorCode.NONLINEAR_DIMENSIONS_ERROR", 501, window);
    t("google.ima.AdError.ErrorCode.COMPANION_REQUIRED_ERROR", 602, window);
    t("google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE", 1009, window);
    t("google.ima.AdError.ErrorCode.UNSUPPORTED_LOCALE", 1011, window);
    t("google.ima.AdError.ErrorCode.INVALID_ADX_EXTENSION", 1105, window);
    t("google.ima.AdError.ErrorCode.INVALID_ARGUMENTS", 1101, window);
    t("google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE", 1010, window);
    t("google.ima.AdError.ErrorCode.UNKNOWN_ERROR", 900, window);
    t("google.ima.AdError.ErrorCode.OVERLAY_AD_PLAYING_FAILED", 500, window);
    t("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    t("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    t("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    t("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    t("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    t("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    t("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    t("google.ima.AdError.Type.AD_LOAD", "adLoadError", window);
    t("google.ima.AdError.Type.AD_PLAY", "adPlayError", window);
    xd.prototype.getErrorCode = xd.prototype.Wd;
    xd.prototype.getVastErrorCode = xd.prototype.vd;
    xd.prototype.getInnerError = xd.prototype.Xd;
    xd.prototype.getMessage = xd.prototype.Yd;
    xd.prototype.getType = xd.prototype.Zd;
    t("google.ima.AdErrorEvent.Type.AD_ERROR", "adError", window);
    Cd.prototype.getError = Cd.prototype.w;
    Cd.prototype.getUserRequestContext = Cd.prototype.B;
    t("google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED", "contentResumeRequested", window);
    t("google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED", "contentPauseRequested", window);
    t("google.ima.AdEvent.Type.CLICK", "click", window);
    t("google.ima.AdEvent.Type.DURATION_CHANGE", "durationChange", window);
    t("google.ima.AdEvent.Type.EXPANDED_CHANGED", "expandedChanged", window);
    t("google.ima.AdEvent.Type.STARTED", "start", window);
    t("google.ima.AdEvent.Type.IMPRESSION", "impression", window);
    t("google.ima.AdEvent.Type.PAUSED", "pause", window);
    t("google.ima.AdEvent.Type.RESUMED", "resume", window);
    t("google.ima.AdEvent.Type.FIRST_QUARTILE", "firstquartile", window);
    t("google.ima.AdEvent.Type.MIDPOINT", "midpoint", window);
    t("google.ima.AdEvent.Type.THIRD_QUARTILE", "thirdquartile", window);
    t("google.ima.AdEvent.Type.COMPLETE", "complete", window);
    t("google.ima.AdEvent.Type.USER_CLOSE", "userClose", window);
    t("google.ima.AdEvent.Type.LINEAR_CHANGED", "linearChanged", window);
    t("google.ima.AdEvent.Type.LOADED", "loaded", window);
    t("google.ima.AdEvent.Type.AD_CAN_PLAY", "adCanPlay", window);
    t("google.ima.AdEvent.Type.AD_METADATA", "adMetadata", window);
    t("google.ima.AdEvent.Type.AD_BREAK_READY", "adBreakReady", window);
    t("google.ima.AdEvent.Type.INTERACTION", "interaction", window);
    t("google.ima.AdEvent.Type.ALL_ADS_COMPLETED", "allAdsCompleted", window);
    t("google.ima.AdEvent.Type.SKIPPED", "skip", window);
    t("google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED", "skippableStateChanged", window);
    t("google.ima.AdEvent.Type.LOG", "log", window);
    t("google.ima.AdEvent.Type.VIEWABLE_IMPRESSION", "viewable_impression", window);
    t("google.ima.AdEvent.Type.VOLUME_CHANGED", "volumeChange", window);
    t("google.ima.AdEvent.Type.VOLUME_MUTED", "mute", window);
    L.prototype.type = L.prototype.type;
    L.prototype.getAd = L.prototype.F;
    L.prototype.getAdData = L.prototype.A;
    hn.prototype.getAdCuePoints = hn.prototype.B;
    t("google.ima.AdsLoader", So, window);
    So.prototype.getSettings = So.prototype.Y;
    So.prototype.requestAds = So.prototype.zf;
    So.prototype.contentComplete = So.prototype.xf;
    So.prototype.destroy = So.prototype.yf;
    t("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED", "adsManagerLoaded", window);
    Po.prototype.getAdsManager = Po.prototype.w;
    Po.prototype.getUserRequestContext = Po.prototype.F;
    Po.prototype.getResponse = Po.prototype.B;
    t("google.ima.CompanionAdSelectionSettings", Dk, window);
    t("google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE", "Image", void 0);
    t("google.ima.CompanionAdSelectionSettings.CreativeType.FLASH", "Flash", void 0);
    t("google.ima.CompanionAdSelectionSettings.CreativeType.ALL", "All", void 0);
    t("google.ima.CompanionAdSelectionSettings.ResourceType.HTML", "Html", void 0);
    t("google.ima.CompanionAdSelectionSettings.ResourceType.IFRAME", "IFrame", void 0);
    t("google.ima.CompanionAdSelectionSettings.ResourceType.STATIC", "Static", void 0);
    t("google.ima.CompanionAdSelectionSettings.ResourceType.ALL", "All", void 0);
    t("google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE", "IgnoreSize", void 0);
    t("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH", "SelectExactMatch", void 0);
    t("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH", "SelectNearMatch", void 0);
    t("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    t("ima.ImaSdkSettings", N, window);
    t("google.ima.settings", M, window);
    N.prototype.setCompanionBackfill = N.prototype.cf;
    N.prototype.getCompanionBackfill = N.prototype.Te;
    N.prototype.setAutoPlayAdBreaks = N.prototype.bf;
    N.prototype.isAutoPlayAdBreak = N.prototype.$e;
    N.prototype.setPpid = N.prototype.pf;
    N.prototype.getPpid = N.prototype.Ze;
    N.prototype.setVpaidAllowed = N.prototype.sf;
    N.prototype.setVpaidMode = N.prototype.tf;
    N.prototype.setIsVpaidAdapter = N.prototype.hf;
    N.prototype.isVpaidAdapter = N.prototype.ub;
    N.prototype.setRestrictToCustomPlayback = N.prototype.qf;
    N.prototype.isRestrictToCustomPlayback = N.prototype.Ef;
    N.prototype.setNumRedirects = N.prototype.kf;
    N.prototype.getNumRedirects = N.prototype.We;
    N.prototype.getLocale = N.prototype.td;
    N.prototype.setLocale = N.prototype.jf;
    N.prototype.getPlayerType = N.prototype.Xe;
    N.prototype.setPlayerType = N.prototype.mf;
    N.prototype.getDisableFlashAds = N.prototype.Ve;
    N.prototype.setDisableFlashAds = N.prototype.ff;
    N.prototype.getPlayerVersion = N.prototype.Ye;
    N.prototype.setPlayerVersion = N.prototype.nf;
    N.prototype.setPageCorrelator = N.prototype.lf;
    N.prototype.setStreamCorrelator = N.prototype.rf;
    N.prototype.setIsOutstreamVideo = N.prototype.gf;
    N.prototype.isOutstreamVideo = N.prototype.af;
    N.prototype.setDisableCustomPlaybackForIOS10Plus = N.prototype.df;
    N.prototype.getDisableCustomPlaybackForIOS10Plus = N.prototype.Ue;
    t("google.ima.ImaSdkSettings.CompanionBackfillMode.ALWAYS", "always", void 0);
    t("google.ima.ImaSdkSettings.CompanionBackfillMode.ON_MASTER_AD", "on_master_ad", void 0);
    t("google.ima.ImaSdkSettings.VpaidMode.DISABLED", 0, void 0);
    t("google.ima.ImaSdkSettings.VpaidMode.ENABLED", 1, void 0);
    t("google.ima.ImaSdkSettings.VpaidMode.INSECURE", 2, void 0);
    t("google.ima.common.adTrackingMonitor", Cm, window);
    nm.prototype.setActiveViewUseOsdGeometry = nm.prototype.M;
    nm.prototype.getActiveViewUseOsdGeometry = nm.prototype.K;
    nm.prototype.setBlockId = nm.prototype.N;
    t("google.ima.AdsRenderingSettings", kn, window);
    t("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    t("google.ima.AdsRequest", Z, window);
    Z.prototype.adTagUrl = Z.prototype.adTagUrl;
    Z.prototype.adsResponse = Z.prototype.adsResponse;
    Z.prototype.nonLinearAdSlotHeight = Z.prototype.nonLinearAdSlotHeight;
    Z.prototype.nonLinearAdSlotWidth = Z.prototype.nonLinearAdSlotWidth;
    Z.prototype.linearAdSlotHeight = Z.prototype.linearAdSlotHeight;
    Z.prototype.linearAdSlotWidth = Z.prototype.linearAdSlotWidth;
    Z.prototype.setAdWillAutoPlay = Z.prototype.Tb;
    Z.prototype.contentDuration = Z.prototype.contentDuration;
    Z.prototype.contentKeywords = Z.prototype.contentKeywords;
    Z.prototype.contentTitle = Z.prototype.contentTitle;
    Z.prototype.vastLoadTimeout = Z.prototype.Zb;
    t("google.ima.VERSION", "3.180.3", void 0);
    t("google.ima.UiElements.AD_ATTRIBUTION", "adAttribution", void 0);
    t("google.ima.UiElements.COUNTDOWN", "countdown", void 0);
    t("google.ima.ViewMode.NORMAL", "normal", void 0);
    t("google.ima.ViewMode.FULLSCREEN", "fullscreen", void 0);
    Y.prototype.isCustomPlaybackUsed = Y.prototype.Cf;
    Y.prototype.isCustomClickTrackingUsed = Y.prototype.Bf;
    Y.prototype.destroy = Y.prototype.pc;
    Y.prototype.init = Y.prototype.Oe;
    Y.prototype.start = Y.prototype.start;
    Y.prototype.stop = Y.prototype.Se;
    Y.prototype.pause = Y.prototype.Pe;
    Y.prototype.resume = Y.prototype.Qe;
    Y.prototype.getCuePoints = Y.prototype.Ke;
    Y.prototype.getCurrentAd = Y.prototype.Le;
    Y.prototype.getRemainingTime = Y.prototype.Me;
    Y.prototype.expand = Y.prototype.Ie;
    Y.prototype.collapse = Y.prototype.He;
    Y.prototype.getAdSkippableState = Y.prototype.Je;
    Y.prototype.resize = Y.prototype.qc;
    Y.prototype.skip = Y.prototype.Re;
    Y.prototype.getVolume = Y.prototype.Ne;
    Y.prototype.setVolume = Y.prototype.Jb;
    Y.prototype.discardAdBreak = Y.prototype.nd;
    Y.prototype.requestNextAdBreak = Y.prototype.Sf;
    Y.prototype.updateAdsRenderingSettings = Y.prototype.rc;
    Y.prototype.clicked = Y.prototype.Oa;
    Jl.prototype.getContent = Jl.prototype.getContent;
    Jl.prototype.getContentType = Jl.prototype.F;
    Jl.prototype.getHeight = Jl.prototype.A;
    Jl.prototype.getWidth = Jl.prototype.C;
})();