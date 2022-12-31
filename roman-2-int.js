let r2i = function(romanInput) {
    romanInput = romanInput.split('');
    const roman2int = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }
    let listGroupChar = []
    let flag = 0
    let sliceLeft
    let sliceRight
    for (let i = 0; i < romanInput.length; i++) {
        if (roman2int[`${romanInput[i]}`] > roman2int[`${romanInput[i - 1]}`]) {
            // console.log('ME; ', roman2int[`${romanInput[i]}`] + '  ' + roman2int[`${romanInput[i - 1]}`])
            // console.log('flag', i)
            // sliceLeft = romanInput.slice(0, i)
            // sliceRight = romanInput.slice(i)
            // console.log(romanInput, ' and ', sliceLeft, ' and ', sliceRight)
            // romanInput = sliceRight
            listGroupChar.push(romanInput[i - 1] + romanInput[i])
                // flag = i
        }
    }
    listGroupChar.push(sliceRight)
    console.log('input', romanInput)
    console.log('result', listGroupChar)
}
r2i('VCMIVMXCIV')

var ar = [1, 2, 3, 4, 5, 6];

var p1 = ar.slice(0, 4);
var p2 = ar.slice(4);

console.log(p1, '  ', p2)