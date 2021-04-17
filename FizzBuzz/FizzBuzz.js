/* 
    Print numbers from 1 to n and the numbers who are divisible by 3 print BUZZ
    divisible by 2 --> FIZZ
    Both --> FIZZBUZZ

*/

const fizzBuzz = (n) => {

    let array = [];
    let c3 = 0
    let c2 = 0
    for (let i = 1; i < n + 1; i++) {
        c3++;
        c2++;
        let msg = ""
        if (c3 == 3) {
            msg = "FIZZ"
            c3 = 0
        }
        if (c2 == 2) {
            msg = msg + "BUZZ"
            c2 = 0
        }
        if (msg == "") {
            array.push(i)
        } else {
            array.push(msg)
        }

    }
    console.log(array)
}

const fizzBuzz2 = (n) => {
    let array = [];
    for (let i = 1; i < n + 1; i++) {
        let byTwo = isDivisibleByTwo(i)
        let byThree = isDivisibleByThree(i)

        if (byTwo && byThree) {
            array.push("FIZZBUZZ")
            continue;
        } else if (byTwo) {
            array.push("BUZZ")
        } else if (byThree) {
            array.push("FIZZ")
        } else {
            array.push(i)
        }
    }
    console.log(array)
}

const isDivisibleByTwo = (n) => {
    return n % 2 == 0
}

const isDivisibleByThree = (n) => {
    return n % 3 == 0
}

var input = parseInt(process.argv[2]);
if (input <= 0) {
    console.log(" \n Really !!!! Why would you do that. \n")
    process.exit(1);
}
console.log(`Executing for :-----> ${input} `)
console.time("FIZZBUZZ")
fizzBuzz(input)
console.timeEnd("FIZZBUZZ")
console.time("FIZZBUZZ2")
fizzBuzz2(input)
console.timeEnd("FIZZBUZZ2")