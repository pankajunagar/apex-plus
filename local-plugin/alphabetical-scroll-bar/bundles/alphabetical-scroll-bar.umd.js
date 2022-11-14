(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('alphabetical-scroll-bar', ['exports', '@angular/core', '@angular/cdk/coercion', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['alphabetical-scroll-bar'] = {}, global.ng.core, global.ng.cdk.coercion, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, coercion, rxjs, operators, common) { 'use strict';

    var AlphabeticalScrollBarService = /** @class */ (function () {
        function AlphabeticalScrollBarService() {
        }
        return AlphabeticalScrollBarService;
    }());
    AlphabeticalScrollBarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AlphabeticalScrollBarService_Factory() { return new AlphabeticalScrollBarService(); }, token: AlphabeticalScrollBarService, providedIn: "root" });
    AlphabeticalScrollBarService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    AlphabeticalScrollBarService.ctorParameters = function () { return []; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var AlphabeticalScrollBarComponent = /** @class */ (function () {
        function AlphabeticalScrollBarComponent(_cdr) {
            this._cdr = _cdr;
            this._alphabet = __spread('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            this._overflowDivider = '·';
            this._validLetters = this._alphabet;
            this._disableInvalidLetters = false;
            this._prioritizeHidingInvalidLetters = false;
            this._letterMagnification = true;
            this._magnifyDividers = false;
            this._magnificationMultiplier = 2;
            this._magnificationCurve = [1, 0.7, 0.5, 0.3, 0.1];
            this._exactX = false;
            this._navigateOnHover = false;
            this._letterSpacing = '1%';
            //Output event when a letter selected
            this.letterChange$ = new i0.EventEmitter();
            //Emitted when scrollbar is activated or deactivated
            this.isActive$ = new i0.EventEmitter();
            this._lastEmittedActive = false;
            this._isComponentActive = false;
            this._cancellationToken$ = new rxjs.Subject();
            this._offsetSizeCheckInterval = 0;
            //Flag for determining letter under pointer
            this._lettersShortened = false;
        }
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "alphabet", {
            get: function () {
                return this._alphabet;
            },
            //A custom alphabet to be used instead of the default alphabet. Default is 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            set: function (value) {
                if (typeof value === 'string')
                    this._alphabet = __spread(value);
                else if (Array.isArray(value) && value.every(function (it) { return typeof it === 'string'; }))
                    this._alphabet = value;
                else
                    throw new Error('alphabet must be a string or an array of strings');
                this.checkVisibleLetters(true);
                this.validLetters = this._alphabet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "overflowDivider", {
            get: function () {
                return this._overflowDivider;
            },
            //A custom overflow divider. Can be undefined or null if you don't want to use one. Defaults to '·'
            set: function (value) {
                if (typeof value === 'string' || value === undefined || value === null)
                    this._overflowDivider = value;
                else
                    throw new Error('overflowDivider must be a string');
                this.checkVisibleLetters(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "validLetters", {
            get: function () {
                return this._validLetters;
            },
            //Valid letters that are available for the user to select. default is all letters
            set: function (value) {
                this._validLetters = value;
                this.checkVisibleLetters(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "disableInvalidLetters", {
            get: function () {
                return this._disableInvalidLetters;
            },
            //Whether or invalid letters should be disabled (greyed out and do not magnify)
            set: function (value) {
                this._disableInvalidLetters = coercion.coerceBooleanProperty(value);
                this.checkVisibleLetters(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "prioritizeHidingInvalidLetters", {
            get: function () {
                return this._prioritizeHidingInvalidLetters;
            },
            //Whether or invalid letters should be disabled (greyed out and do not magnify)
            set: function (value) {
                this._prioritizeHidingInvalidLetters = coercion.coerceBooleanProperty(value);
                this.checkVisibleLetters(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "letterMagnification", {
            get: function () {
                return this._letterMagnification;
            },
            //Whether or not letters should be magnified
            set: function (value) {
                this._letterMagnification = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "magnifyDividers", {
            get: function () {
                return this._magnifyDividers;
            },
            //Whether or not overflow diveders should be magnified
            set: function (value) {
                this._magnifyDividers = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "magnificationMultiplier", {
            get: function () {
                return this._magnificationMultiplier;
            },
            //The maximum that the magnification multiplier can be. Default is 3
            set: function (value) {
                this._magnificationMultiplier = value;
                this.checkVisibleLetters(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "magnificationCurve", {
            get: function () {
                return this._magnificationCurve;
            },
            //Magnification curve accepts an array of numbers between 1 and 0 that represets the curve of magnification starting from magnificaiton multiplier to 1: defaults to [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
            set: function (value) {
                if (Array.isArray(value) && value.every(function (it) { return typeof it === 'number' && it >= 0 && it <= 1; }))
                    this._magnificationCurve = value;
                else
                    throw new Error('magnificationCurve must be an array of numbers between 0 and 1');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "exactX", {
            get: function () {
                return this._exactX;
            },
            //If the scrolling for touch screens in the x direction should be lenient. Default is false
            set: function (value) {
                this._exactX = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "navigateOnHover", {
            get: function () {
                return this._navigateOnHover;
            },
            //Whether or not letter change event is emitted on mouse hover. Default is false
            set: function (value) {
                this._navigateOnHover = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "letterSpacing", {
            get: function () {
                return this._letterSpacing;
            },
            //Percentage or number in pixels of how far apart the letters are. Defaults to 1.75%
            set: function (value) {
                if (typeof value === 'string') {
                    this._letterSpacing = this.stringToNumber(value);
                    if (value.includes('%')) {
                        this._letterSpacing = this._letterSpacing.toString() + '%';
                    }
                }
                else {
                    this._letterSpacing = coercion.coerceNumberProperty(value);
                }
                this.checkVisibleLetters(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlphabeticalScrollBarComponent.prototype, "offsetSizeCheckInterval", {
            get: function () {
                return this._offsetSizeCheckInterval;
            },
            //This interval can be used for fast, regular size-checks
            //Useful, if e.g. a splitter-component resizes the scroll-bar but not the window itself. Set in ms and defaults to 0 (disabled)
            set: function (value) {
                var _this = this;
                var _a;
                (_a = this._offsetSizeCheckIntervalSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                this._offsetSizeCheckInterval = coercion.coerceNumberProperty(value);
                this._offsetSizeCheckInterval &&
                    (this._offsetSizeCheckIntervalSubscription = rxjs.interval(this._offsetSizeCheckInterval)
                        .pipe(operators.takeUntil(this._cancellationToken$))
                        .subscribe(function () { return _this.checkVisibleLetters(); }));
            },
            enumerable: false,
            configurable: true
        });
        AlphabeticalScrollBarComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            rxjs.fromEvent(window, 'resize')
                .pipe(operators.takeUntil(this._cancellationToken$))
                .subscribe(function () { return _this.checkVisibleLetters(); });
        };
        AlphabeticalScrollBarComponent.prototype.ngDoCheck = function () {
            this.checkVisibleLetters();
        };
        AlphabeticalScrollBarComponent.prototype.ngOnDestroy = function () {
            this._cancellationToken$.next();
            this._cancellationToken$.complete();
        };
        AlphabeticalScrollBarComponent.prototype.checkVisibleLetters = function (force) {
            var _this = this;
            var height = this.alphabetContainer.nativeElement.clientHeight;
            if (!force && height === this._lastHeight) {
                return;
            }
            this._lastHeight = height;
            var newAlphabet = this.alphabet;
            var letterSpacing = 0;
            var letterSize = this.stringToNumber(getComputedStyle(this.alphabetContainer.nativeElement).getPropertyValue('font-size'));
            if (this.letterMagnification) {
                letterSize = letterSize * this.magnificationMultiplier;
            }
            //Calculate actual letter spacing
            if (typeof this.letterSpacing === 'number') {
                letterSpacing = this.letterSpacing;
            }
            else if (typeof this.letterSpacing === 'string') {
                letterSpacing = this.stringToNumber(this.letterSpacing);
                if (this.letterSpacing.endsWith('%')) {
                    letterSpacing = height * (letterSpacing / 100);
                }
            }
            letterSize = letterSize + letterSpacing;
            //Remove invalid letters (if set and necessary)
            if (this.prioritizeHidingInvalidLetters && !!this.validLetters && height / letterSize < newAlphabet.length) {
                newAlphabet = this.validLetters;
            }
            //Check if there is enough free space for letters
            this._lettersShortened = height / letterSize < newAlphabet.length;
            if (this._lettersShortened) {
                var numHiddenLetters = newAlphabet.length - Math.floor(height / letterSize);
                if (numHiddenLetters === newAlphabet.length)
                    newAlphabet = [];
                //determine how many letters to hide
                var hiddenHalves = this.getNumHiddenHalves(numHiddenLetters, newAlphabet.length) + 1;
                // (this.magnifyDividers || numHiddenLetters > newAlphabet.length - 2 ? 1 : 0);
                //split alphabet into two halves
                var alphabet1 = newAlphabet.slice(0, Math.ceil(newAlphabet.length / 2));
                var alphabet2 = newAlphabet.slice(Math.floor(newAlphabet.length / 2)).reverse();
                for (var i = 0; i < hiddenHalves; i++) {
                    alphabet1 = alphabet1.filter(function (l, i) { return i % 2 === 0; });
                    alphabet2 = alphabet2.filter(function (l, i) { return i % 2 === 0; });
                }
                //insert dots between letters
                alphabet1 = alphabet1.reduce(function (prev, curr, i) {
                    if (i > 0) {
                        if (_this.overflowDivider)
                            prev.push(_this.overflowDivider);
                    }
                    prev.push(curr);
                    return prev;
                }, []);
                alphabet2 = alphabet2.reduce(function (prev, curr, i) {
                    if (i > 0) {
                        if (_this.overflowDivider)
                            prev.push(_this.overflowDivider);
                    }
                    prev.push(curr);
                    return prev;
                }, []);
                if (this.alphabet.length % 2 === 0 && this.overflowDivider)
                    alphabet1.push(this.overflowDivider);
                newAlphabet = alphabet1.concat(alphabet2.reverse());
            }
            this._cdr.markForCheck();
            this.visibleLetters = newAlphabet;
        };
        AlphabeticalScrollBarComponent.prototype.getNumHiddenHalves = function (numHiddenLetters, total) {
            if (numHiddenLetters > total / 2) {
                return 1 + this.getNumHiddenHalves(numHiddenLetters % (total / 2), Math.ceil(total / 2));
            }
            return 0;
        };
        AlphabeticalScrollBarComponent.prototype.isValid = function (letter) {
            var _a;
            return ((_a = this.validLetters) === null || _a === void 0 ? void 0 : _a.includes(letter)) !== false || letter === this.overflowDivider;
        };
        AlphabeticalScrollBarComponent.prototype.getLetterStyle = function (index) {
            var _this = this;
            if ((this.magIndex === undefined && this.magIndex === null) ||
                (!this.magnifyDividers && this.visibleLetters[index] === this.overflowDivider) ||
                (this.disableInvalidLetters && !this.isValid(this.visibleLetters[index])))
                return {};
            var lettersOnly = this.visibleLetters.filter(function (l) { return l !== _this.overflowDivider; });
            var mappedIndex = Math.round((index / this.visibleLetters.length) * lettersOnly.length);
            var mappedMagIndex = Math.round((this.magIndex / this.visibleLetters.length) * lettersOnly.length);
            var relativeIndex = this.magnifyDividers ? Math.abs(this.magIndex - index) : Math.abs(mappedMagIndex - mappedIndex);
            var magnification = relativeIndex < this.magnificationCurve.length - 1 ? this.magnificationCurve[relativeIndex] * (this.magnificationMultiplier - 1) + 1 : 1;
            var style = {
                transform: "scale(" + magnification + ")",
                zIndex: this.magIndex === index ? 1 : 0,
            };
            return this._isComponentActive && this.letterMagnification ? style : {};
        };
        AlphabeticalScrollBarComponent.prototype.focusEvent = function (event, type) {
            var _a, _b, _c, _d;
            if (!this._lastEmittedActive) {
                this.isActive$.emit((this._lastEmittedActive = true));
            }
            if (type == 'click')
                this._isComponentActive = false;
            else
                this._isComponentActive = true;
            this.setLetterFromCoordinates((_b = (_a = event.touches) === null || _a === void 0 ? void 0 : _a[0].clientX) !== null && _b !== void 0 ? _b : event.clientX, (_d = (_c = event.touches) === null || _c === void 0 ? void 0 : _c[0].clientY) !== null && _d !== void 0 ? _d : event.clientY);
            if (this._lastEmittedLetter !== this.letterSelected && (this.navigateOnHover || !type.includes('mouse'))) {
                this.letterChange$.emit((this._lastEmittedLetter = this.letterSelected));
            }
        };
        AlphabeticalScrollBarComponent.prototype.focusEnd = function () {
            this.isActive$.emit((this._isComponentActive = this._lastEmittedActive = false));
        };
        AlphabeticalScrollBarComponent.prototype.setLetterFromCoordinates = function (x, y) {
            if (this.exactX) {
                var rightX = this.alphabetContainer.nativeElement.getBoundingClientRect().right;
                var leftX = this.alphabetContainer.nativeElement.getBoundingClientRect().left;
                this._isComponentActive = x > leftX && x < rightX;
                if (!this._isComponentActive) {
                    this.visualLetterIndex = this.visualLetterIndex = null;
                    return;
                }
            }
            var height = this.alphabetContainer.nativeElement.clientHeight;
            //Letters drew outside the viewport or host padding may cause values outsize height boundries (Usage of min/max)
            var top = Math.min(Math.max(0, y - this.alphabetContainer.nativeElement.getBoundingClientRect().top), height);
            var topRelative = (top / height) * (this.visibleLetters.length - 1);
            var preferNext = Math.round(topRelative) < topRelative;
            topRelative = Math.round(topRelative);
            this.magIndex = topRelative;
            //Set visualLetterIndex to the closest valid letter
            this.visualLetterIndex = this.getClosestValidLetterIndex(this.visibleLetters, topRelative, preferNext);
            if (this._lettersShortened) {
                if (this.validLetters) {
                    this.letterSelected = this.validLetters[Math.round((top / height) * (this.validLetters.length - 1))];
                }
                else {
                    this.letterSelected = this.alphabet[this.getClosestValidLetterIndex(this.alphabet, topRelative, preferNext)];
                }
            }
            else {
                this.letterSelected = this.visibleLetters[this.visualLetterIndex];
            }
        };
        AlphabeticalScrollBarComponent.prototype.getClosestValidLetterIndex = function (alphabet, visualLetterIndex, preferNext) {
            var lowercaseAlphabet = alphabet.map(function (l) { return l.toLowerCase(); });
            var lowercaseValidLetters = this.validLetters.map(function (l) { return l.toLowerCase(); });
            var validLettersAsNumbers = lowercaseValidLetters.map(function (l) { return lowercaseAlphabet.indexOf(l); });
            return validLettersAsNumbers.length > 0
                ? validLettersAsNumbers.reduce(function (prev, curr) { return preferNext
                    ? Math.abs(curr - visualLetterIndex) > Math.abs(prev - visualLetterIndex)
                        ? prev
                        : curr
                    : Math.abs(curr - visualLetterIndex) < Math.abs(prev - visualLetterIndex)
                        ? curr
                        : prev; })
                : null;
        };
        AlphabeticalScrollBarComponent.prototype.stringToNumber = function (value) {
            return Number(value === null || value === void 0 ? void 0 : value.match(/[\.\d]+/)[0]);
        };
        return AlphabeticalScrollBarComponent;
    }());
    AlphabeticalScrollBarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'alphabetical-scroll-bar',
                    template: "<div\n  #alphabetContainer\n  class=\"container\"\n  [class.cursor-pointer]=\"!navigateOnHover\"\n>\n  <div\n    *ngFor=\"let letter of visibleLetters; let i = index\"\n    class=\"letter\"\n    [class.letter-disabled]=\"disableInvalidLetters && !isValid(letter)\"\n    [class.letter-is-hidden-value]=\"letter === hiddenLetterValue\"\n    [ngStyle]=\"getLetterStyle(i)\"\n  >\n    <label>{{ letter }}</label>\n  </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{bottom:0;font-size:min(20px,max(12px,1vh));padding:calc(min(20px, max(12px, 1vh))*2) 0;position:absolute;right:-12px;top:0;z-index:1000}:host .container{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:space-between}:host .container.cursor-pointer{cursor:pointer}:host .container .letter{padding:0 20px;pointer-events:none;position:relative;transform-origin:60%;transition:transform .2s ease-in-out}:host .container .letter label{left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}:host .container .letter.letter-disabled{opacity:.3}:host .container .letter.letter-is-hidden-value{transform:scale(2);transform-origin:center}"]
                },] }
    ];
    AlphabeticalScrollBarComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    AlphabeticalScrollBarComponent.propDecorators = {
        alphabetContainer: [{ type: i0.ViewChild, args: ['alphabetContainer', { static: true },] }],
        alphabet: [{ type: i0.Input }],
        overflowDivider: [{ type: i0.Input }],
        validLetters: [{ type: i0.Input }],
        disableInvalidLetters: [{ type: i0.Input }],
        prioritizeHidingInvalidLetters: [{ type: i0.Input }],
        letterMagnification: [{ type: i0.Input }],
        magnifyDividers: [{ type: i0.Input }],
        magnificationMultiplier: [{ type: i0.Input }],
        magnificationCurve: [{ type: i0.Input }],
        exactX: [{ type: i0.Input }],
        navigateOnHover: [{ type: i0.Input }],
        letterSpacing: [{ type: i0.Input }],
        letterChange$: [{ type: i0.Output, args: ['letterChange',] }],
        isActive$: [{ type: i0.Output, args: ['isActive',] }],
        offsetSizeCheckInterval: [{ type: i0.Input }],
        focusEvent: [{ type: i0.HostListener, args: ['mousemove', ['$event', '$event.type'],] }, { type: i0.HostListener, args: ['mouseenter', ['$event', '$event.type'],] }, { type: i0.HostListener, args: ['touchmove', ['$event', '$event.type'],] }, { type: i0.HostListener, args: ['touchstart', ['$event', '$event.type'],] }, { type: i0.HostListener, args: ['click', ['$event', '$event.type'],] }],
        focusEnd: [{ type: i0.HostListener, args: ['mouseleave',] }, { type: i0.HostListener, args: ['touchend',] }]
    };

    var AlphabeticalScrollBarModule = /** @class */ (function () {
        function AlphabeticalScrollBarModule() {
        }
        return AlphabeticalScrollBarModule;
    }());
    AlphabeticalScrollBarModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [AlphabeticalScrollBarComponent],
                    imports: [
                        common.CommonModule
                    ],
                    exports: [AlphabeticalScrollBarComponent]
                },] }
    ];

    /*
     * Public API Surface of alphabetical-scroll-bar
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AlphabeticalScrollBarComponent = AlphabeticalScrollBarComponent;
    exports.AlphabeticalScrollBarModule = AlphabeticalScrollBarModule;
    exports.AlphabeticalScrollBarService = AlphabeticalScrollBarService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=alphabetical-scroll-bar.umd.js.map
