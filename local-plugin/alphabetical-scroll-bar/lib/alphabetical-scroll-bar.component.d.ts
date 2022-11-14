import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
export declare class AlphabeticalScrollBarComponent implements AfterViewInit, DoCheck, OnDestroy {
    private _cdr;
    constructor(_cdr: ChangeDetectorRef);
    alphabetContainer: ElementRef;
    get alphabet(): any;
    set alphabet(value: any);
    private _alphabet;
    get overflowDivider(): string | undefined | null;
    set overflowDivider(value: string | undefined | null);
    private _overflowDivider;
    get validLetters(): string[];
    set validLetters(value: string[]);
    private _validLetters;
    get disableInvalidLetters(): BooleanInput;
    set disableInvalidLetters(value: BooleanInput);
    private _disableInvalidLetters;
    get prioritizeHidingInvalidLetters(): BooleanInput;
    set prioritizeHidingInvalidLetters(value: BooleanInput);
    private _prioritizeHidingInvalidLetters;
    get letterMagnification(): BooleanInput;
    set letterMagnification(value: BooleanInput);
    private _letterMagnification;
    get magnifyDividers(): BooleanInput;
    set magnifyDividers(value: BooleanInput);
    private _magnifyDividers;
    get magnificationMultiplier(): number;
    set magnificationMultiplier(value: number);
    private _magnificationMultiplier;
    get magnificationCurve(): Array<number>;
    set magnificationCurve(value: Array<number>);
    private _magnificationCurve;
    get exactX(): BooleanInput;
    set exactX(value: BooleanInput);
    private _exactX;
    get navigateOnHover(): BooleanInput;
    set navigateOnHover(value: BooleanInput);
    private _navigateOnHover;
    get letterSpacing(): number | string | null;
    set letterSpacing(value: number | string | null);
    private _letterSpacing;
    letterChange$: EventEmitter<string>;
    isActive$: EventEmitter<boolean>;
    private _lastEmittedActive;
    private _isComponentActive;
    private readonly _cancellationToken$;
    get offsetSizeCheckInterval(): NumberInput;
    set offsetSizeCheckInterval(value: NumberInput);
    private _offsetSizeCheckInterval;
    private _offsetSizeCheckIntervalSubscription;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    checkVisibleLetters(force?: boolean): void;
    private _lastHeight;
    visibleLetters: Array<string>;
    private _lettersShortened;
    getNumHiddenHalves(numHiddenLetters: number, total: number): any;
    isValid(letter: string): boolean;
    getLetterStyle(index: number): any;
    focusEvent(event: MouseEvent & TouchEvent, type?: string): void;
    private _lastEmittedLetter;
    focusEnd(): void;
    magIndex: number;
    private setLetterFromCoordinates;
    visualLetterIndex: number;
    letterSelected: string;
    private getClosestValidLetterIndex;
    private stringToNumber;
}
