import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
    helloWorld(){
        console.log("Hello Za Warudo!! Toki wo tomare!!!");
        return "Hello Za Warudo!! Toki wo tomare!!!";
    }
    loopsTriangle(height:number){
        for (var x = 0; x < height; x++) {
            var str = '';
            for (var y = 0; y <= x; y++) {
                str += '*';
            }
            console.log(str);
        }
        return;
    }
    hello(name: string) {
        return "Hi there, " + name;
    }
    prime(parsedNumber: number) {
        if (parsedNumber === 1) {
            return `The number ${parsedNumber} is neither prime nor composite.`;
        } else if (parsedNumber === 2) {
            return `The number ${parsedNumber} is a prime number.`;
        } else {
            for (var x = 2; x < parsedNumber; x++) {
                if (parsedNumber % x === 0) {
                    return `The number ${parsedNumber} is not a prime number.`;
                } else {
                    return `The number ${parsedNumber} is a prime number.`;
                }
            }
        }
    }
}