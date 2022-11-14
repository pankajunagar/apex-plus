import { ɵɵdefineInjectable, Injectable, EventEmitter, Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, Input, Output, HostListener, NgModule } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, interval, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

class AlphabeticalScrollBarService {
    constructor() { }
}
// AlphabeticalScrollBarService.ɵprov = ɵɵdefineInjectable({ factory: function AlphabeticalScrollBarService_Factory() { return new AlphabeticalScrollBarService(); }, token: AlphabeticalScrollBarService, providedIn: "root" });
AlphabeticalScrollBarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AlphabeticalScrollBarService.ctorParameters = () => [];

class AlphabeticalScrollBarComponent {
    constructor(_cdr) {
        this._cdr = _cdr;
        this._alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
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
        this.letterChange$ = new EventEmitter();
        //Emitted when scrollbar is activated or deactivated
        this.isActive$ = new EventEmitter();
        this._lastEmittedActive = false;
        this._isComponentActive = false;
        this._cancellationToken$ = new Subject();
        this._offsetSizeCheckInterval = 0;
        //Flag for determining letter under pointer
        this._lettersShortened = false;
    }
    get alphabet() {
        return this._alphabet;
    }
    //A custom alphabet to be used instead of the default alphabet. Default is 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    set alphabet(value) {
        if (typeof value === 'string')
            this._alphabet = [...value];
        else if (Array.isArray(value) && value.every((it) => typeof it === 'string'))
            this._alphabet = value;
        else
            throw new Error('alphabet must be a string or an array of strings');
        this.checkVisibleLetters(true);
        this.validLetters = this._alphabet;
    }
    get overflowDivider() {
        return this._overflowDivider;
    }
    //A custom overflow divider. Can be undefined or null if you don't want to use one. Defaults to '·'
    set overflowDivider(value) {
        if (typeof value === 'string' || value === undefined || value === null)
            this._overflowDivider = value;
        else
            throw new Error('overflowDivider must be a string');
        this.checkVisibleLetters(true);
    }
    get validLetters() {
        return this._validLetters;
    }
    //Valid letters that are available for the user to select. default is all letters
    set validLetters(value) {
        this._validLetters = value;
        this.checkVisibleLetters(true);
    }
    get disableInvalidLetters() {
        return this._disableInvalidLetters;
    }
    //Whether or invalid letters should be disabled (greyed out and do not magnify)
    set disableInvalidLetters(value) {
        this._disableInvalidLetters = coerceBooleanProperty(value);
        this.checkVisibleLetters(true);
    }
    get prioritizeHidingInvalidLetters() {
        return this._prioritizeHidingInvalidLetters;
    }
    //Whether or invalid letters should be disabled (greyed out and do not magnify)
    set prioritizeHidingInvalidLetters(value) {
        this._prioritizeHidingInvalidLetters = coerceBooleanProperty(value);
        this.checkVisibleLetters(true);
    }
    get letterMagnification() {
        return this._letterMagnification;
    }
    //Whether or not letters should be magnified
    set letterMagnification(value) {
        this._letterMagnification = coerceBooleanProperty(value);
    }
    get magnifyDividers() {
        return this._magnifyDividers;
    }
    //Whether or not overflow diveders should be magnified
    set magnifyDividers(value) {
        this._magnifyDividers = coerceBooleanProperty(value);
    }
    get magnificationMultiplier() {
        return this._magnificationMultiplier;
    }
    //The maximum that the magnification multiplier can be. Default is 3
    set magnificationMultiplier(value) {
        this._magnificationMultiplier = value;
        this.checkVisibleLetters(true);
    }
    get magnificationCurve() {
        return this._magnificationCurve;
    }
    //Magnification curve accepts an array of numbers between 1 and 0 that represets the curve of magnification starting from magnificaiton multiplier to 1: defaults to [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
    set magnificationCurve(value) {
        if (Array.isArray(value) && value.every((it) => typeof it === 'number' && it >= 0 && it <= 1))
            this._magnificationCurve = value;
        else
            throw new Error('magnificationCurve must be an array of numbers between 0 and 1');
    }
    get exactX() {
        return this._exactX;
    }
    //If the scrolling for touch screens in the x direction should be lenient. Default is false
    set exactX(value) {
        this._exactX = coerceBooleanProperty(value);
    }
    get navigateOnHover() {
        return this._navigateOnHover;
    }
    //Whether or not letter change event is emitted on mouse hover. Default is false
    set navigateOnHover(value) {
        this._navigateOnHover = coerceBooleanProperty(value);
    }
    get letterSpacing() {
        return this._letterSpacing;
    }
    //Percentage or number in pixels of how far apart the letters are. Defaults to 1.75%
    set letterSpacing(value) {
        if (typeof value === 'string') {
            this._letterSpacing = this.stringToNumber(value);
            if (value.includes('%')) {
                this._letterSpacing = this._letterSpacing.toString() + '%';
            }
        }
        else {
            this._letterSpacing = coerceNumberProperty(value);
        }
        this.checkVisibleLetters(true);
    }
    get offsetSizeCheckInterval() {
        return this._offsetSizeCheckInterval;
    }
    //This interval can be used for fast, regular size-checks
    //Useful, if e.g. a splitter-component resizes the scroll-bar but not the window itself. Set in ms and defaults to 0 (disabled)
    set offsetSizeCheckInterval(value) {
        var _a;
        (_a = this._offsetSizeCheckIntervalSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this._offsetSizeCheckInterval = coerceNumberProperty(value);
        this._offsetSizeCheckInterval &&
            (this._offsetSizeCheckIntervalSubscription = interval(this._offsetSizeCheckInterval)
                .pipe(takeUntil(this._cancellationToken$))
                .subscribe(() => this.checkVisibleLetters()));
    }
    ngAfterViewInit() {
        fromEvent(window, 'resize')
            .pipe(takeUntil(this._cancellationToken$))
            .subscribe(() => this.checkVisibleLetters());
    }
    ngDoCheck() {
        this.checkVisibleLetters();
    }
    ngOnDestroy() {
        this._cancellationToken$.next();
        this._cancellationToken$.complete();
    }
    checkVisibleLetters(force) {
        let height = this.alphabetContainer.nativeElement.clientHeight;
        if (!force && height === this._lastHeight) {
            return;
        }
        this._lastHeight = height;
        let newAlphabet = this.alphabet;
        let letterSpacing = 0;
        let letterSize = this.stringToNumber(getComputedStyle(this.alphabetContainer.nativeElement).getPropertyValue('font-size'));
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
            const numHiddenLetters = newAlphabet.length - Math.floor(height / letterSize);
            if (numHiddenLetters === newAlphabet.length)
                newAlphabet = [];
            //determine how many letters to hide
            const hiddenHalves = this.getNumHiddenHalves(numHiddenLetters, newAlphabet.length) + 1;
            // (this.magnifyDividers || numHiddenLetters > newAlphabet.length - 2 ? 1 : 0);
            //split alphabet into two halves
            let alphabet1 = newAlphabet.slice(0, Math.ceil(newAlphabet.length / 2));
            let alphabet2 = newAlphabet.slice(Math.floor(newAlphabet.length / 2)).reverse();
            for (let i = 0; i < hiddenHalves; i++) {
                alphabet1 = alphabet1.filter((l, i) => i % 2 === 0);
                alphabet2 = alphabet2.filter((l, i) => i % 2 === 0);
            }
            //insert dots between letters
            alphabet1 = alphabet1.reduce((prev, curr, i) => {
                if (i > 0) {
                    if (this.overflowDivider)
                        prev.push(this.overflowDivider);
                }
                prev.push(curr);
                return prev;
            }, []);
            alphabet2 = alphabet2.reduce((prev, curr, i) => {
                if (i > 0) {
                    if (this.overflowDivider)
                        prev.push(this.overflowDivider);
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
    }
    getNumHiddenHalves(numHiddenLetters, total) {
        if (numHiddenLetters > total / 2) {
            return 1 + this.getNumHiddenHalves(numHiddenLetters % (total / 2), Math.ceil(total / 2));
        }
        return 0;
    }
    isValid(letter) {
        var _a;
        return ((_a = this.validLetters) === null || _a === void 0 ? void 0 : _a.includes(letter)) !== false || letter === this.overflowDivider;
    }
    getLetterStyle(index) {
        if ((this.magIndex === undefined && this.magIndex === null) ||
            (!this.magnifyDividers && this.visibleLetters[index] === this.overflowDivider) ||
            (this.disableInvalidLetters && !this.isValid(this.visibleLetters[index])))
            return {};
        const lettersOnly = this.visibleLetters.filter((l) => l !== this.overflowDivider);
        const mappedIndex = Math.round((index / this.visibleLetters.length) * lettersOnly.length);
        const mappedMagIndex = Math.round((this.magIndex / this.visibleLetters.length) * lettersOnly.length);
        let relativeIndex = this.magnifyDividers ? Math.abs(this.magIndex - index) : Math.abs(mappedMagIndex - mappedIndex);
        const magnification = relativeIndex < this.magnificationCurve.length - 1 ? this.magnificationCurve[relativeIndex] * (this.magnificationMultiplier - 1) + 1 : 1;
        const style = {
            transform: `scale(${magnification})`,
            zIndex: this.magIndex === index ? 1 : 0,
        };
        return this._isComponentActive && this.letterMagnification ? style : {};
    }
    focusEvent(event, type) {
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
    }
    focusEnd() {
        this.isActive$.emit((this._isComponentActive = this._lastEmittedActive = false));
    }
    setLetterFromCoordinates(x, y) {
        if (this.exactX) {
            const rightX = this.alphabetContainer.nativeElement.getBoundingClientRect().right;
            const leftX = this.alphabetContainer.nativeElement.getBoundingClientRect().left;
            this._isComponentActive = x > leftX && x < rightX;
            if (!this._isComponentActive) {
                this.visualLetterIndex = this.visualLetterIndex = null;
                return;
            }
        }
        const height = this.alphabetContainer.nativeElement.clientHeight;
        //Letters drew outside the viewport or host padding may cause values outsize height boundries (Usage of min/max)
        const top = Math.min(Math.max(0, y - this.alphabetContainer.nativeElement.getBoundingClientRect().top), height);
        let topRelative = (top / height) * (this.visibleLetters.length - 1);
        const preferNext = Math.round(topRelative) < topRelative;
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
    }
    getClosestValidLetterIndex(alphabet, visualLetterIndex, preferNext) {
        const lowercaseAlphabet = alphabet.map((l) => l.toLowerCase());
        const lowercaseValidLetters = this.validLetters.map((l) => l.toLowerCase());
        const validLettersAsNumbers = lowercaseValidLetters.map((l) => lowercaseAlphabet.indexOf(l));
        return validLettersAsNumbers.length > 0
            ? validLettersAsNumbers.reduce((prev, curr) => preferNext
                ? Math.abs(curr - visualLetterIndex) > Math.abs(prev - visualLetterIndex)
                    ? prev
                    : curr
                : Math.abs(curr - visualLetterIndex) < Math.abs(prev - visualLetterIndex)
                    ? curr
                    : prev)
            : null;
    }
    stringToNumber(value) {
        return Number(value === null || value === void 0 ? void 0 : value.match(/[\.\d]+/)[0]);
    }
}
AlphabeticalScrollBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'alphabetical-scroll-bar',
                template: "<div\n  #alphabetContainer\n  class=\"container\"\n  [class.cursor-pointer]=\"!navigateOnHover\"\n>\n  <div\n    *ngFor=\"let letter of visibleLetters; let i = index\"\n    class=\"letter\"\n    [class.letter-disabled]=\"disableInvalidLetters && !isValid(letter)\"\n    [class.letter-is-hidden-value]=\"letter === hiddenLetterValue\"\n    [ngStyle]=\"getLetterStyle(i)\"\n  >\n    <label>{{ letter }}</label>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{bottom:0;font-size:min(20px,max(12px,1vh));padding:calc(min(20px, max(12px, 1vh))*2) 0;position:absolute;right:-12px;top:0;z-index:1000}:host .container{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:space-between}:host .container.cursor-pointer{cursor:pointer}:host .container .letter{padding:0 20px;pointer-events:none;position:relative;transform-origin:60%;transition:transform .2s ease-in-out}:host .container .letter label{left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}:host .container .letter.letter-disabled{opacity:.3}:host .container .letter.letter-is-hidden-value{transform:scale(2);transform-origin:center}"]
            },] }
];
AlphabeticalScrollBarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AlphabeticalScrollBarComponent.propDecorators = {
    alphabetContainer: [{ type: ViewChild, args: ['alphabetContainer', { static: true },] }],
    alphabet: [{ type: Input }],
    overflowDivider: [{ type: Input }],
    validLetters: [{ type: Input }],
    disableInvalidLetters: [{ type: Input }],
    prioritizeHidingInvalidLetters: [{ type: Input }],
    letterMagnification: [{ type: Input }],
    magnifyDividers: [{ type: Input }],
    magnificationMultiplier: [{ type: Input }],
    magnificationCurve: [{ type: Input }],
    exactX: [{ type: Input }],
    navigateOnHover: [{ type: Input }],
    letterSpacing: [{ type: Input }],
    letterChange$: [{ type: Output, args: ['letterChange',] }],
    isActive$: [{ type: Output, args: ['isActive',] }],
    offsetSizeCheckInterval: [{ type: Input }],
    focusEvent: [{ type: HostListener, args: ['mousemove', ['$event', '$event.type'],] }, { type: HostListener, args: ['mouseenter', ['$event', '$event.type'],] }, { type: HostListener, args: ['touchmove', ['$event', '$event.type'],] }, { type: HostListener, args: ['touchstart', ['$event', '$event.type'],] }, { type: HostListener, args: ['click', ['$event', '$event.type'],] }],
    focusEnd: [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['touchend',] }]
};

class AlphabeticalScrollBarModule {
}
AlphabeticalScrollBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AlphabeticalScrollBarComponent],
                imports: [
                    CommonModule
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

export { AlphabeticalScrollBarComponent, AlphabeticalScrollBarModule, AlphabeticalScrollBarService };
//# sourceMappingURL=alphabetical-scroll-bar.js.map
