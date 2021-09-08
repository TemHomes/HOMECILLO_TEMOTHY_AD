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
}
