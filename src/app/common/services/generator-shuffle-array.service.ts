import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneratorShuffleArrayService {
  //  constructor() { }

  public shuffleArray(array: object[]): object[] {
    const arrayCopy = array;
    // While there remain elements to shuffle
    while (arrayCopy.length) {
      // Pick a remaining element…
      const arrayElement = Math.floor(Math.random() * (arrayCopy.length -= 1));
      // And swap it with the current element.
      const anotherArrayElement = arrayCopy[arrayCopy.length];
      arrayCopy[array.length] = arrayCopy[arrayElement];
      arrayCopy[arrayElement] = anotherArrayElement;
    }
    return arrayCopy;
  }

  public getElementsOfArray(array: object[], randomNumbersQuantity: number): object[] {
    return array.splice(0, randomNumbersQuantity - 1);
  }

  public getRandomNumbers(rangeLength: number, randomNumbersQuantity: number): number[] {
    const array: number[] = [];
    for (let index = 1; index <= rangeLength; index += 1) {
      array.push(index);
    }
    const result: number[] = [];
    for (let index = 1; index <= randomNumbersQuantity; index += 1) {
      const random = Math.floor(Math.random() * (rangeLength - index));
      result.push(array[random]);
      array[random] = array[rangeLength - index];
    }
    return result;
  }
}
