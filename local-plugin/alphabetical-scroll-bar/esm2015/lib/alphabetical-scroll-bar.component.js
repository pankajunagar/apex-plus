import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { fromEvent, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class AlphabeticalScrollBarComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxwaGFiZXRpY2FsLXNjcm9sbC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nYWJlL3BhY2thZ2VzL2FscGhhYmV0aWNhbC1zY3JvbGwtYmFyL3Byb2plY3RzL2FscGhhYmV0aWNhbC1zY3JvbGwtYmFyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hbHBoYWJldGljYWwtc2Nyb2xsLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxvQkFBb0IsRUFBZSxNQUFNLHVCQUF1QixDQUFDO0FBQy9HLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFHVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUTNDLE1BQU0sT0FBTyw4QkFBOEI7SUFDekMsWUFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFnQm5DLGNBQVMsR0FBa0IsQ0FBQyxHQUFHLDRCQUE0QixDQUFDLENBQUM7UUFXN0QscUJBQWdCLEdBQVcsR0FBRyxDQUFDO1FBVS9CLGtCQUFhLEdBQWtCLElBQUksQ0FBQyxTQUFTLENBQUM7UUFVOUMsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBVS9CLG9DQUErQixHQUFHLEtBQUssQ0FBQztRQVN4Qyx5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFTNUIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBVXpCLDZCQUF3QixHQUFHLENBQUMsQ0FBQztRQVc3Qix3QkFBbUIsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFH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U0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7OztZQTdYRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsd2JBQXVEO2dCQUV2RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztZQW5CQyxpQkFBaUI7OztnQ0F1QmhCLFNBQVMsU0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7dUJBTy9DLEtBQUs7OEJBYUwsS0FBSzsyQkFXTCxLQUFLO29DQVVMLEtBQUs7NkNBVUwsS0FBSztrQ0FVTCxLQUFLOzhCQVNMLEtBQUs7c0NBU0wsS0FBSztpQ0FVTCxLQUFLO3FCQVdMLEtBQUs7OEJBU0wsS0FBSzs0QkFTTCxLQUFLOzRCQWVMLE1BQU0sU0FBQyxjQUFjO3dCQUVyQixNQUFNLFNBQUMsVUFBVTtzQ0FZakIsS0FBSzt5QkEwSUwsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsY0FDbkQsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsY0FDcEQsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsY0FDbkQsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsY0FDcEQsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUM7dUJBaUIvQyxZQUFZLFNBQUMsWUFBWSxjQUN6QixZQUFZLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSwgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIGludGVydmFsLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWxwaGFiZXRpY2FsLXNjcm9sbC1iYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxwaGFiZXRpY2FsLXNjcm9sbC1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbHBoYWJldGljYWwtc2Nyb2xsLWJhci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWxwaGFiZXRpY2FsU2Nyb2xsQmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBAVmlld0NoaWxkKCdhbHBoYWJldENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGFscGhhYmV0Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGdldCBhbHBoYWJldCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hbHBoYWJldDtcbiAgfVxuICAvL0EgY3VzdG9tIGFscGhhYmV0IHRvIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBhbHBoYWJldC4gRGVmYXVsdCBpcyAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonXG4gIEBJbnB1dCgpIHNldCBhbHBoYWJldCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHRoaXMuX2FscGhhYmV0ID0gWy4uLnZhbHVlXTtcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeSgoaXQpID0+IHR5cGVvZiBpdCA9PT0gJ3N0cmluZycpKSB0aGlzLl9hbHBoYWJldCA9IHZhbHVlO1xuICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdhbHBoYWJldCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MnKTtcbiAgICB0aGlzLmNoZWNrVmlzaWJsZUxldHRlcnModHJ1ZSk7XG4gICAgdGhpcy52YWxpZExldHRlcnMgPSB0aGlzLl9hbHBoYWJldDtcbiAgfVxuICBwcml2YXRlIF9hbHBoYWJldDogQXJyYXk8c3RyaW5nPiA9IFsuLi4nQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonXTtcblxuICBnZXQgb3ZlcmZsb3dEaXZpZGVyKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9vdmVyZmxvd0RpdmlkZXI7XG4gIH1cbiAgLy9BIGN1c3RvbSBvdmVyZmxvdyBkaXZpZGVyLiBDYW4gYmUgdW5kZWZpbmVkIG9yIG51bGwgaWYgeW91IGRvbid0IHdhbnQgdG8gdXNlIG9uZS4gRGVmYXVsdHMgdG8gJ8K3J1xuICBASW5wdXQoKSBzZXQgb3ZlcmZsb3dEaXZpZGVyKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgdGhpcy5fb3ZlcmZsb3dEaXZpZGVyID0gdmFsdWU7XG4gICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ292ZXJmbG93RGl2aWRlciBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgdGhpcy5jaGVja1Zpc2libGVMZXR0ZXJzKHRydWUpO1xuICB9XG4gIHByaXZhdGUgX292ZXJmbG93RGl2aWRlcjogc3RyaW5nID0gJ8K3JztcblxuICBnZXQgdmFsaWRMZXR0ZXJzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRMZXR0ZXJzO1xuICB9XG4gIC8vVmFsaWQgbGV0dGVycyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHRoZSB1c2VyIHRvIHNlbGVjdC4gZGVmYXVsdCBpcyBhbGwgbGV0dGVyc1xuICBASW5wdXQoKSBzZXQgdmFsaWRMZXR0ZXJzKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3ZhbGlkTGV0dGVycyA9IHZhbHVlO1xuICAgIHRoaXMuY2hlY2tWaXNpYmxlTGV0dGVycyh0cnVlKTtcbiAgfVxuICBwcml2YXRlIF92YWxpZExldHRlcnM6IEFycmF5PHN0cmluZz4gPSB0aGlzLl9hbHBoYWJldDtcblxuICBnZXQgZGlzYWJsZUludmFsaWRMZXR0ZXJzKCk6IEJvb2xlYW5JbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVJbnZhbGlkTGV0dGVycztcbiAgfVxuICAvL1doZXRoZXIgb3IgaW52YWxpZCBsZXR0ZXJzIHNob3VsZCBiZSBkaXNhYmxlZCAoZ3JleWVkIG91dCBhbmQgZG8gbm90IG1hZ25pZnkpXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlSW52YWxpZExldHRlcnModmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2Rpc2FibGVJbnZhbGlkTGV0dGVycyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5jaGVja1Zpc2libGVMZXR0ZXJzKHRydWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVJbnZhbGlkTGV0dGVycyA9IGZhbHNlO1xuXG4gIGdldCBwcmlvcml0aXplSGlkaW5nSW52YWxpZExldHRlcnMoKTogQm9vbGVhbklucHV0IHtcbiAgICByZXR1cm4gdGhpcy5fcHJpb3JpdGl6ZUhpZGluZ0ludmFsaWRMZXR0ZXJzO1xuICB9XG4gIC8vV2hldGhlciBvciBpbnZhbGlkIGxldHRlcnMgc2hvdWxkIGJlIGRpc2FibGVkIChncmV5ZWQgb3V0IGFuZCBkbyBub3QgbWFnbmlmeSlcbiAgQElucHV0KCkgc2V0IHByaW9yaXRpemVIaWRpbmdJbnZhbGlkTGV0dGVycyh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fcHJpb3JpdGl6ZUhpZGluZ0ludmFsaWRMZXR0ZXJzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLmNoZWNrVmlzaWJsZUxldHRlcnModHJ1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcHJpb3JpdGl6ZUhpZGluZ0ludmFsaWRMZXR0ZXJzID0gZmFsc2U7XG5cbiAgZ2V0IGxldHRlck1hZ25pZmljYXRpb24oKTogQm9vbGVhbklucHV0IHtcbiAgICByZXR1cm4gdGhpcy5fbGV0dGVyTWFnbmlmaWNhdGlvbjtcbiAgfVxuICAvL1doZXRoZXIgb3Igbm90IGxldHRlcnMgc2hvdWxkIGJlIG1hZ25pZmllZFxuICBASW5wdXQoKSBzZXQgbGV0dGVyTWFnbmlmaWNhdGlvbih2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fbGV0dGVyTWFnbmlmaWNhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbGV0dGVyTWFnbmlmaWNhdGlvbiA9IHRydWU7XG5cbiAgZ2V0IG1hZ25pZnlEaXZpZGVycygpOiBCb29sZWFuSW5wdXQge1xuICAgIHJldHVybiB0aGlzLl9tYWduaWZ5RGl2aWRlcnM7XG4gIH1cbiAgLy9XaGV0aGVyIG9yIG5vdCBvdmVyZmxvdyBkaXZlZGVycyBzaG91bGQgYmUgbWFnbmlmaWVkXG4gIEBJbnB1dCgpIHNldCBtYWduaWZ5RGl2aWRlcnModmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX21hZ25pZnlEaXZpZGVycyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWFnbmlmeURpdmlkZXJzID0gZmFsc2U7XG5cbiAgZ2V0IG1hZ25pZmljYXRpb25NdWx0aXBsaWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21hZ25pZmljYXRpb25NdWx0aXBsaWVyO1xuICB9XG4gIC8vVGhlIG1heGltdW0gdGhhdCB0aGUgbWFnbmlmaWNhdGlvbiBtdWx0aXBsaWVyIGNhbiBiZS4gRGVmYXVsdCBpcyAzXG4gIEBJbnB1dCgpIHNldCBtYWduaWZpY2F0aW9uTXVsdGlwbGllcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbWFnbmlmaWNhdGlvbk11bHRpcGxpZXIgPSB2YWx1ZTtcbiAgICB0aGlzLmNoZWNrVmlzaWJsZUxldHRlcnModHJ1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbWFnbmlmaWNhdGlvbk11bHRpcGxpZXIgPSAyO1xuXG4gIGdldCBtYWduaWZpY2F0aW9uQ3VydmUoKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hZ25pZmljYXRpb25DdXJ2ZTtcbiAgfVxuICAvL01hZ25pZmljYXRpb24gY3VydmUgYWNjZXB0cyBhbiBhcnJheSBvZiBudW1iZXJzIGJldHdlZW4gMSBhbmQgMCB0aGF0IHJlcHJlc2V0cyB0aGUgY3VydmUgb2YgbWFnbmlmaWNhdGlvbiBzdGFydGluZyBmcm9tIG1hZ25pZmljYWl0b24gbXVsdGlwbGllciB0byAxOiBkZWZhdWx0cyB0byBbMSwgMC45LCAwLjgsIDAuNywgMC42LCAwLjUsIDAuNCwgMC4zLCAwLjIsIDAuMV1cbiAgQElucHV0KCkgc2V0IG1hZ25pZmljYXRpb25DdXJ2ZSh2YWx1ZTogQXJyYXk8bnVtYmVyPikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeSgoaXQpID0+IHR5cGVvZiBpdCA9PT0gJ251bWJlcicgJiYgaXQgPj0gMCAmJiBpdCA8PSAxKSkgdGhpcy5fbWFnbmlmaWNhdGlvbkN1cnZlID0gdmFsdWU7XG4gICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ21hZ25pZmljYXRpb25DdXJ2ZSBtdXN0IGJlIGFuIGFycmF5IG9mIG51bWJlcnMgYmV0d2VlbiAwIGFuZCAxJyk7XG4gIH1cblxuICBwcml2YXRlIF9tYWduaWZpY2F0aW9uQ3VydmUgPSBbMSwgMC43LCAwLjUsIDAuMywgMC4xXTtcblxuICBnZXQgZXhhY3RYKCk6IEJvb2xlYW5JbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4YWN0WDtcbiAgfVxuICAvL0lmIHRoZSBzY3JvbGxpbmcgZm9yIHRvdWNoIHNjcmVlbnMgaW4gdGhlIHggZGlyZWN0aW9uIHNob3VsZCBiZSBsZW5pZW50LiBEZWZhdWx0IGlzIGZhbHNlXG4gIEBJbnB1dCgpIHNldCBleGFjdFgodmFsdWU6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX2V4YWN0WCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZXhhY3RYID0gZmFsc2U7XG5cbiAgZ2V0IG5hdmlnYXRlT25Ib3ZlcigpOiBCb29sZWFuSW5wdXQge1xuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0ZU9uSG92ZXI7XG4gIH1cbiAgLy9XaGV0aGVyIG9yIG5vdCBsZXR0ZXIgY2hhbmdlIGV2ZW50IGlzIGVtaXR0ZWQgb24gbW91c2UgaG92ZXIuIERlZmF1bHQgaXMgZmFsc2VcbiAgQElucHV0KCkgc2V0IG5hdmlnYXRlT25Ib3Zlcih2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fbmF2aWdhdGVPbkhvdmVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9uYXZpZ2F0ZU9uSG92ZXIgPSBmYWxzZTtcblxuICBnZXQgbGV0dGVyU3BhY2luZygpOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbGV0dGVyU3BhY2luZztcbiAgfVxuICAvL1BlcmNlbnRhZ2Ugb3IgbnVtYmVyIGluIHBpeGVscyBvZiBob3cgZmFyIGFwYXJ0IHRoZSBsZXR0ZXJzIGFyZS4gRGVmYXVsdHMgdG8gMS43NSVcbiAgQElucHV0KCkgc2V0IGxldHRlclNwYWNpbmcodmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fbGV0dGVyU3BhY2luZyA9IHRoaXMuc3RyaW5nVG9OdW1iZXIodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlLmluY2x1ZGVzKCclJykpIHtcbiAgICAgICAgdGhpcy5fbGV0dGVyU3BhY2luZyA9IHRoaXMuX2xldHRlclNwYWNpbmcudG9TdHJpbmcoKSArICclJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGV0dGVyU3BhY2luZyA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrVmlzaWJsZUxldHRlcnModHJ1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbGV0dGVyU3BhY2luZzogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCA9ICcxJSc7XG5cbiAgLy9PdXRwdXQgZXZlbnQgd2hlbiBhIGxldHRlciBzZWxlY3RlZFxuICBAT3V0cHV0KCdsZXR0ZXJDaGFuZ2UnKSBsZXR0ZXJDaGFuZ2UkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8vRW1pdHRlZCB3aGVuIHNjcm9sbGJhciBpcyBhY3RpdmF0ZWQgb3IgZGVhY3RpdmF0ZWRcbiAgQE91dHB1dCgnaXNBY3RpdmUnKSBpc0FjdGl2ZSQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBfbGFzdEVtaXR0ZWRBY3RpdmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNDb21wb25lbnRBY3RpdmUgPSBmYWxzZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9jYW5jZWxsYXRpb25Ub2tlbiQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGdldCBvZmZzZXRTaXplQ2hlY2tJbnRlcnZhbCgpOiBOdW1iZXJJbnB1dCB7XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldFNpemVDaGVja0ludGVydmFsO1xuICB9XG4gIC8vVGhpcyBpbnRlcnZhbCBjYW4gYmUgdXNlZCBmb3IgZmFzdCwgcmVndWxhciBzaXplLWNoZWNrc1xuICAvL1VzZWZ1bCwgaWYgZS5nLiBhIHNwbGl0dGVyLWNvbXBvbmVudCByZXNpemVzIHRoZSBzY3JvbGwtYmFyIGJ1dCBub3QgdGhlIHdpbmRvdyBpdHNlbGYuIFNldCBpbiBtcyBhbmQgZGVmYXVsdHMgdG8gMCAoZGlzYWJsZWQpXG4gIEBJbnB1dCgpIHNldCBvZmZzZXRTaXplQ2hlY2tJbnRlcnZhbCh2YWx1ZTogTnVtYmVySW5wdXQpIHtcbiAgICB0aGlzLl9vZmZzZXRTaXplQ2hlY2tJbnRlcnZhbFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vZmZzZXRTaXplQ2hlY2tJbnRlcnZhbCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9vZmZzZXRTaXplQ2hlY2tJbnRlcnZhbCAmJlxuICAgICAgKHRoaXMuX29mZnNldFNpemVDaGVja0ludGVydmFsU3Vic2NyaXB0aW9uID0gaW50ZXJ2YWwodGhpcy5fb2Zmc2V0U2l6ZUNoZWNrSW50ZXJ2YWwpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9jYW5jZWxsYXRpb25Ub2tlbiQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tWaXNpYmxlTGV0dGVycygpKSk7XG4gIH1cbiAgcHJpdmF0ZSBfb2Zmc2V0U2l6ZUNoZWNrSW50ZXJ2YWwgPSAwO1xuICBwcml2YXRlIF9vZmZzZXRTaXplQ2hlY2tJbnRlcnZhbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9jYW5jZWxsYXRpb25Ub2tlbiQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrVmlzaWJsZUxldHRlcnMoKSk7XG4gIH1cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWaXNpYmxlTGV0dGVycygpO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NhbmNlbGxhdGlvblRva2VuJC5uZXh0KCk7XG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uVG9rZW4kLmNvbXBsZXRlKCk7XG4gIH1cblxuICBjaGVja1Zpc2libGVMZXR0ZXJzKGZvcmNlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLmFscGhhYmV0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIGlmICghZm9yY2UgJiYgaGVpZ2h0ID09PSB0aGlzLl9sYXN0SGVpZ2h0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbGFzdEhlaWdodCA9IGhlaWdodDtcblxuICAgIGxldCBuZXdBbHBoYWJldCA9IHRoaXMuYWxwaGFiZXQ7XG4gICAgbGV0IGxldHRlclNwYWNpbmcgPSAwO1xuICAgIGxldCBsZXR0ZXJTaXplID0gdGhpcy5zdHJpbmdUb051bWJlcihnZXRDb21wdXRlZFN0eWxlKHRoaXMuYWxwaGFiZXRDb250YWluZXIubmF0aXZlRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJykpO1xuXG4gICAgaWYgKHRoaXMubGV0dGVyTWFnbmlmaWNhdGlvbikge1xuICAgICAgbGV0dGVyU2l6ZSA9IGxldHRlclNpemUgKiB0aGlzLm1hZ25pZmljYXRpb25NdWx0aXBsaWVyO1xuICAgIH1cblxuICAgIC8vQ2FsY3VsYXRlIGFjdHVhbCBsZXR0ZXIgc3BhY2luZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5sZXR0ZXJTcGFjaW5nID09PSAnbnVtYmVyJykge1xuICAgICAgbGV0dGVyU3BhY2luZyA9IHRoaXMubGV0dGVyU3BhY2luZztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmxldHRlclNwYWNpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXR0ZXJTcGFjaW5nID0gdGhpcy5zdHJpbmdUb051bWJlcih0aGlzLmxldHRlclNwYWNpbmcpO1xuICAgICAgaWYgKHRoaXMubGV0dGVyU3BhY2luZy5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgIGxldHRlclNwYWNpbmcgPSBoZWlnaHQgKiAobGV0dGVyU3BhY2luZyAvIDEwMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0dGVyU2l6ZSA9IGxldHRlclNpemUgKyBsZXR0ZXJTcGFjaW5nO1xuXG4gICAgLy9SZW1vdmUgaW52YWxpZCBsZXR0ZXJzIChpZiBzZXQgYW5kIG5lY2Vzc2FyeSlcbiAgICBpZiAodGhpcy5wcmlvcml0aXplSGlkaW5nSW52YWxpZExldHRlcnMgJiYgISF0aGlzLnZhbGlkTGV0dGVycyAmJiBoZWlnaHQgLyBsZXR0ZXJTaXplIDwgbmV3QWxwaGFiZXQubGVuZ3RoKSB7XG4gICAgICBuZXdBbHBoYWJldCA9IHRoaXMudmFsaWRMZXR0ZXJzO1xuICAgIH1cblxuICAgIC8vQ2hlY2sgaWYgdGhlcmUgaXMgZW5vdWdoIGZyZWUgc3BhY2UgZm9yIGxldHRlcnNcbiAgICB0aGlzLl9sZXR0ZXJzU2hvcnRlbmVkID0gaGVpZ2h0IC8gbGV0dGVyU2l6ZSA8IG5ld0FscGhhYmV0Lmxlbmd0aDtcbiAgICBpZiAodGhpcy5fbGV0dGVyc1Nob3J0ZW5lZCkge1xuICAgICAgY29uc3QgbnVtSGlkZGVuTGV0dGVycyA9IG5ld0FscGhhYmV0Lmxlbmd0aCAtIE1hdGguZmxvb3IoaGVpZ2h0IC8gbGV0dGVyU2l6ZSk7XG4gICAgICBpZiAobnVtSGlkZGVuTGV0dGVycyA9PT0gbmV3QWxwaGFiZXQubGVuZ3RoKSBuZXdBbHBoYWJldCA9IFtdO1xuXG4gICAgICAvL2RldGVybWluZSBob3cgbWFueSBsZXR0ZXJzIHRvIGhpZGVcbiAgICAgIGNvbnN0IGhpZGRlbkhhbHZlcyA9IHRoaXMuZ2V0TnVtSGlkZGVuSGFsdmVzKG51bUhpZGRlbkxldHRlcnMsIG5ld0FscGhhYmV0Lmxlbmd0aCkgKyAxO1xuICAgICAgLy8gKHRoaXMubWFnbmlmeURpdmlkZXJzIHx8IG51bUhpZGRlbkxldHRlcnMgPiBuZXdBbHBoYWJldC5sZW5ndGggLSAyID8gMSA6IDApO1xuXG4gICAgICAvL3NwbGl0IGFscGhhYmV0IGludG8gdHdvIGhhbHZlc1xuICAgICAgbGV0IGFscGhhYmV0MSA9IG5ld0FscGhhYmV0LnNsaWNlKDAsIE1hdGguY2VpbChuZXdBbHBoYWJldC5sZW5ndGggLyAyKSk7XG4gICAgICBsZXQgYWxwaGFiZXQyID0gbmV3QWxwaGFiZXQuc2xpY2UoTWF0aC5mbG9vcihuZXdBbHBoYWJldC5sZW5ndGggLyAyKSkucmV2ZXJzZSgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpZGRlbkhhbHZlczsgaSsrKSB7XG4gICAgICAgIGFscGhhYmV0MSA9IGFscGhhYmV0MS5maWx0ZXIoKGwsIGkpID0+IGkgJSAyID09PSAwKTtcbiAgICAgICAgYWxwaGFiZXQyID0gYWxwaGFiZXQyLmZpbHRlcigobCwgaSkgPT4gaSAlIDIgPT09IDApO1xuICAgICAgfVxuXG4gICAgICAvL2luc2VydCBkb3RzIGJldHdlZW4gbGV0dGVyc1xuICAgICAgYWxwaGFiZXQxID0gYWxwaGFiZXQxLnJlZHVjZSgocHJldiwgY3VyciwgaSkgPT4ge1xuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5vdmVyZmxvd0RpdmlkZXIpIHByZXYucHVzaCh0aGlzLm92ZXJmbG93RGl2aWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJldi5wdXNoKGN1cnIpO1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgIH0sIFtdKTtcbiAgICAgIGFscGhhYmV0MiA9IGFscGhhYmV0Mi5yZWR1Y2UoKHByZXYsIGN1cnIsIGkpID0+IHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMub3ZlcmZsb3dEaXZpZGVyKSBwcmV2LnB1c2godGhpcy5vdmVyZmxvd0RpdmlkZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByZXYucHVzaChjdXJyKTtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIGlmICh0aGlzLmFscGhhYmV0Lmxlbmd0aCAlIDIgPT09IDAgJiYgdGhpcy5vdmVyZmxvd0RpdmlkZXIpIGFscGhhYmV0MS5wdXNoKHRoaXMub3ZlcmZsb3dEaXZpZGVyKTtcbiAgICAgIG5ld0FscGhhYmV0ID0gYWxwaGFiZXQxLmNvbmNhdChhbHBoYWJldDIucmV2ZXJzZSgpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy52aXNpYmxlTGV0dGVycyA9IG5ld0FscGhhYmV0O1xuICB9XG4gIHByaXZhdGUgX2xhc3RIZWlnaHQ6IG51bWJlcjtcbiAgdmlzaWJsZUxldHRlcnM6IEFycmF5PHN0cmluZz47XG4gIC8vRmxhZyBmb3IgZGV0ZXJtaW5pbmcgbGV0dGVyIHVuZGVyIHBvaW50ZXJcbiAgcHJpdmF0ZSBfbGV0dGVyc1Nob3J0ZW5lZCA9IGZhbHNlO1xuXG4gIGdldE51bUhpZGRlbkhhbHZlcyhudW1IaWRkZW5MZXR0ZXJzOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpIHtcbiAgICBpZiAobnVtSGlkZGVuTGV0dGVycyA+IHRvdGFsIC8gMikge1xuICAgICAgcmV0dXJuIDEgKyB0aGlzLmdldE51bUhpZGRlbkhhbHZlcyhudW1IaWRkZW5MZXR0ZXJzICUgKHRvdGFsIC8gMiksIE1hdGguY2VpbCh0b3RhbCAvIDIpKTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpc1ZhbGlkKGxldHRlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRMZXR0ZXJzPy5pbmNsdWRlcyhsZXR0ZXIpICE9PSBmYWxzZSB8fCBsZXR0ZXIgPT09IHRoaXMub3ZlcmZsb3dEaXZpZGVyO1xuICB9XG5cbiAgZ2V0TGV0dGVyU3R5bGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChcbiAgICAgICh0aGlzLm1hZ0luZGV4ID09PSB1bmRlZmluZWQgJiYgdGhpcy5tYWdJbmRleCA9PT0gbnVsbCkgfHxcbiAgICAgICghdGhpcy5tYWduaWZ5RGl2aWRlcnMgJiYgdGhpcy52aXNpYmxlTGV0dGVyc1tpbmRleF0gPT09IHRoaXMub3ZlcmZsb3dEaXZpZGVyKSB8fFxuICAgICAgKHRoaXMuZGlzYWJsZUludmFsaWRMZXR0ZXJzICYmICF0aGlzLmlzVmFsaWQodGhpcy52aXNpYmxlTGV0dGVyc1tpbmRleF0pKVxuICAgIClcbiAgICAgIHJldHVybiB7fTtcbiAgICBjb25zdCBsZXR0ZXJzT25seSA9IHRoaXMudmlzaWJsZUxldHRlcnMuZmlsdGVyKChsKSA9PiBsICE9PSB0aGlzLm92ZXJmbG93RGl2aWRlcik7XG5cbiAgICBjb25zdCBtYXBwZWRJbmRleCA9IE1hdGgucm91bmQoKGluZGV4IC8gdGhpcy52aXNpYmxlTGV0dGVycy5sZW5ndGgpICogbGV0dGVyc09ubHkubGVuZ3RoKTtcbiAgICBjb25zdCBtYXBwZWRNYWdJbmRleCA9IE1hdGgucm91bmQoKHRoaXMubWFnSW5kZXggLyB0aGlzLnZpc2libGVMZXR0ZXJzLmxlbmd0aCkgKiBsZXR0ZXJzT25seS5sZW5ndGgpO1xuXG4gICAgbGV0IHJlbGF0aXZlSW5kZXggPSB0aGlzLm1hZ25pZnlEaXZpZGVycyA/IE1hdGguYWJzKHRoaXMubWFnSW5kZXggLSBpbmRleCkgOiBNYXRoLmFicyhtYXBwZWRNYWdJbmRleCAtIG1hcHBlZEluZGV4KTtcblxuICAgIGNvbnN0IG1hZ25pZmljYXRpb24gPVxuICAgICAgcmVsYXRpdmVJbmRleCA8IHRoaXMubWFnbmlmaWNhdGlvbkN1cnZlLmxlbmd0aCAtIDEgPyB0aGlzLm1hZ25pZmljYXRpb25DdXJ2ZVtyZWxhdGl2ZUluZGV4XSAqICh0aGlzLm1hZ25pZmljYXRpb25NdWx0aXBsaWVyIC0gMSkgKyAxIDogMTtcbiAgICBjb25zdCBzdHlsZTogYW55ID0ge1xuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHttYWduaWZpY2F0aW9ufSlgLFxuICAgICAgekluZGV4OiB0aGlzLm1hZ0luZGV4ID09PSBpbmRleCA/IDEgOiAwLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuX2lzQ29tcG9uZW50QWN0aXZlICYmIHRoaXMubGV0dGVyTWFnbmlmaWNhdGlvbiA/IHN0eWxlIDoge307XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCcsICckZXZlbnQudHlwZSddKVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJywgWyckZXZlbnQnLCAnJGV2ZW50LnR5cGUnXSlcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2htb3ZlJywgWyckZXZlbnQnLCAnJGV2ZW50LnR5cGUnXSlcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50JywgJyRldmVudC50eXBlJ10pXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnLCAnJGV2ZW50LnR5cGUnXSlcbiAgZm9jdXNFdmVudChldmVudDogTW91c2VFdmVudCAmIFRvdWNoRXZlbnQsIHR5cGU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2xhc3RFbWl0dGVkQWN0aXZlKSB7XG4gICAgICB0aGlzLmlzQWN0aXZlJC5lbWl0KCh0aGlzLl9sYXN0RW1pdHRlZEFjdGl2ZSA9IHRydWUpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PSAnY2xpY2snKSB0aGlzLl9pc0NvbXBvbmVudEFjdGl2ZSA9IGZhbHNlO1xuICAgIGVsc2UgdGhpcy5faXNDb21wb25lbnRBY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5zZXRMZXR0ZXJGcm9tQ29vcmRpbmF0ZXMoZXZlbnQudG91Y2hlcz8uWzBdLmNsaWVudFggPz8gZXZlbnQuY2xpZW50WCwgZXZlbnQudG91Y2hlcz8uWzBdLmNsaWVudFkgPz8gZXZlbnQuY2xpZW50WSk7XG5cbiAgICBpZiAodGhpcy5fbGFzdEVtaXR0ZWRMZXR0ZXIgIT09IHRoaXMubGV0dGVyU2VsZWN0ZWQgJiYgKHRoaXMubmF2aWdhdGVPbkhvdmVyIHx8ICF0eXBlLmluY2x1ZGVzKCdtb3VzZScpKSkge1xuICAgICAgdGhpcy5sZXR0ZXJDaGFuZ2UkLmVtaXQoKHRoaXMuX2xhc3RFbWl0dGVkTGV0dGVyID0gdGhpcy5sZXR0ZXJTZWxlY3RlZCkpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9sYXN0RW1pdHRlZExldHRlcjogc3RyaW5nO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcpXG4gIGZvY3VzRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuaXNBY3RpdmUkLmVtaXQoKHRoaXMuX2lzQ29tcG9uZW50QWN0aXZlID0gdGhpcy5fbGFzdEVtaXR0ZWRBY3RpdmUgPSBmYWxzZSkpO1xuICB9XG5cbiAgbWFnSW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIHNldExldHRlckZyb21Db29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4YWN0WCkge1xuICAgICAgY29uc3QgcmlnaHRYID0gdGhpcy5hbHBoYWJldENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuICAgICAgY29uc3QgbGVmdFggPSB0aGlzLmFscGhhYmV0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblxuICAgICAgdGhpcy5faXNDb21wb25lbnRBY3RpdmUgPSB4ID4gbGVmdFggJiYgeCA8IHJpZ2h0WDtcbiAgICAgIGlmICghdGhpcy5faXNDb21wb25lbnRBY3RpdmUpIHtcbiAgICAgICAgdGhpcy52aXN1YWxMZXR0ZXJJbmRleCA9IHRoaXMudmlzdWFsTGV0dGVySW5kZXggPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5hbHBoYWJldENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAvL0xldHRlcnMgZHJldyBvdXRzaWRlIHRoZSB2aWV3cG9ydCBvciBob3N0IHBhZGRpbmcgbWF5IGNhdXNlIHZhbHVlcyBvdXRzaXplIGhlaWdodCBib3VuZHJpZXMgKFVzYWdlIG9mIG1pbi9tYXgpXG4gICAgY29uc3QgdG9wID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeSAtIHRoaXMuYWxwaGFiZXRDb250YWluZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApLCBoZWlnaHQpO1xuXG4gICAgbGV0IHRvcFJlbGF0aXZlID0gKHRvcCAvIGhlaWdodCkgKiAodGhpcy52aXNpYmxlTGV0dGVycy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBwcmVmZXJOZXh0ID0gTWF0aC5yb3VuZCh0b3BSZWxhdGl2ZSkgPCB0b3BSZWxhdGl2ZTtcbiAgICB0b3BSZWxhdGl2ZSA9IE1hdGgucm91bmQodG9wUmVsYXRpdmUpO1xuXG4gICAgdGhpcy5tYWdJbmRleCA9IHRvcFJlbGF0aXZlO1xuXG4gICAgLy9TZXQgdmlzdWFsTGV0dGVySW5kZXggdG8gdGhlIGNsb3Nlc3QgdmFsaWQgbGV0dGVyXG4gICAgdGhpcy52aXN1YWxMZXR0ZXJJbmRleCA9IHRoaXMuZ2V0Q2xvc2VzdFZhbGlkTGV0dGVySW5kZXgodGhpcy52aXNpYmxlTGV0dGVycywgdG9wUmVsYXRpdmUsIHByZWZlck5leHQpO1xuXG4gICAgaWYgKHRoaXMuX2xldHRlcnNTaG9ydGVuZWQpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkTGV0dGVycykge1xuICAgICAgICB0aGlzLmxldHRlclNlbGVjdGVkID0gdGhpcy52YWxpZExldHRlcnNbTWF0aC5yb3VuZCgodG9wIC8gaGVpZ2h0KSAqICh0aGlzLnZhbGlkTGV0dGVycy5sZW5ndGggLSAxKSldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZXR0ZXJTZWxlY3RlZCA9IHRoaXMuYWxwaGFiZXRbdGhpcy5nZXRDbG9zZXN0VmFsaWRMZXR0ZXJJbmRleCh0aGlzLmFscGhhYmV0LCB0b3BSZWxhdGl2ZSwgcHJlZmVyTmV4dCldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxldHRlclNlbGVjdGVkID0gdGhpcy52aXNpYmxlTGV0dGVyc1t0aGlzLnZpc3VhbExldHRlckluZGV4XTtcbiAgICB9XG4gIH1cbiAgdmlzdWFsTGV0dGVySW5kZXg6IG51bWJlcjtcbiAgbGV0dGVyU2VsZWN0ZWQ6IHN0cmluZztcblxuICBwcml2YXRlIGdldENsb3Nlc3RWYWxpZExldHRlckluZGV4KGFscGhhYmV0OiBzdHJpbmdbXSwgdmlzdWFsTGV0dGVySW5kZXg6IG51bWJlciwgcHJlZmVyTmV4dDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgbG93ZXJjYXNlQWxwaGFiZXQgPSBhbHBoYWJldC5tYXAoKGwpID0+IGwudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3QgbG93ZXJjYXNlVmFsaWRMZXR0ZXJzID0gdGhpcy52YWxpZExldHRlcnMubWFwKChsKSA9PiBsLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHZhbGlkTGV0dGVyc0FzTnVtYmVycyA9IGxvd2VyY2FzZVZhbGlkTGV0dGVycy5tYXAoKGwpID0+IGxvd2VyY2FzZUFscGhhYmV0LmluZGV4T2YobCkpO1xuXG4gICAgcmV0dXJuIHZhbGlkTGV0dGVyc0FzTnVtYmVycy5sZW5ndGggPiAwXG4gICAgICA/IHZhbGlkTGV0dGVyc0FzTnVtYmVycy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+XG4gICAgICAgICAgcHJlZmVyTmV4dFxuICAgICAgICAgICAgPyBNYXRoLmFicyhjdXJyIC0gdmlzdWFsTGV0dGVySW5kZXgpID4gTWF0aC5hYnMocHJldiAtIHZpc3VhbExldHRlckluZGV4KVxuICAgICAgICAgICAgICA/IHByZXZcbiAgICAgICAgICAgICAgOiBjdXJyXG4gICAgICAgICAgICA6IE1hdGguYWJzKGN1cnIgLSB2aXN1YWxMZXR0ZXJJbmRleCkgPCBNYXRoLmFicyhwcmV2IC0gdmlzdWFsTGV0dGVySW5kZXgpXG4gICAgICAgICAgICA/IGN1cnJcbiAgICAgICAgICAgIDogcHJldlxuICAgICAgICApXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHN0cmluZ1RvTnVtYmVyKHZhbHVlPzogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlPy5tYXRjaCgvW1xcLlxcZF0rLylbMF0pO1xuICB9XG59XG4iXX0=