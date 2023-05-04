import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  items: Array<string | number> = [
    'OFF',
    '%',
    'DEL',
    'AC',
    7,
    8,
    9,
    '+',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '*',
    0,
    '.',
    '=',
    '/',
  ];
  numsToDisplay: Array<string | number> = ['0'];
  lastElement: string | number = 0;
  result: string = '';
  item: string | number = '';
  currState = 'OFF' || 'ON' || 'calculated' || 'not-calculated';
  isWorking: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  doMath(item: any, element: any) {
    console.log(this.numsToDisplay);
    if (item === 'OFF') {
      this.isWorking = !this.isWorking;
      if (this.isWorking === true) {
        this.currState = 'ON';
        element.textContent = this.currState;
        this.numsToDisplay = ['0'];
      } else {
        this.currState = 'OFF';
        element.textContent = this.currState;
      }
    } else if (typeof item === 'number' && this.isWorking === false) {
      this.numsToDisplay[0] === '0'
        ? (this.numsToDisplay = [item])
        : (this.numsToDisplay = [...this.numsToDisplay, item]);
    } else if (
      (item === '+' ||
        item === '-' ||
        item === '*' ||
        item === '/' ||
        item === '%') &&
      this.isWorking === false
    ) {
      if (
        this.numsToDisplay[this.numsToDisplay.length-1] === '+' ||
        this.numsToDisplay[this.numsToDisplay.length-1] === '-' ||
        this.numsToDisplay[this.numsToDisplay.length-1] === '*' ||
        this.numsToDisplay[this.numsToDisplay.length-1] === '/' ||
        this.numsToDisplay[this.numsToDisplay.length-1] === '%'
      ) {
        this.numsToDisplay = this.numsToDisplay;
      } else {
        this.numsToDisplay = [...this.numsToDisplay, item];
      }
    } else if (item === '.' && this.isWorking === false) {
      if (typeof this.numsToDisplay.slice(-1).pop() === 'number') {
        this.lastElement = this.numsToDisplay.slice(-1)[0] += '.';
        this.numsToDisplay = this.numsToDisplay.slice(
          0,
          this.numsToDisplay.length - 1
        );
        this.numsToDisplay = [...this.numsToDisplay, this.lastElement];
      }
    } else if (item === 'AC' && this.isWorking === false) {
      this.numsToDisplay = ['0'];
    } else if (item === 'DEL' && this.isWorking === false) {
      if (this.numsToDisplay.length > 1) {
        this.numsToDisplay = this.numsToDisplay.slice(
          0,
          this.numsToDisplay.length - 1
        );
      } else {
        this.numsToDisplay = ['0'];
      }
    } else if (item === '=' && this.isWorking === false) {
      this.calculate(this.numsToDisplay);
      this.numsToDisplay = [this.result];
    }
  }

  calculate(numsToDisplay: any) {
    this.result = numsToDisplay.join('');
    this.result = eval(this.result);
  }
}
