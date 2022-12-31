var reverse = function(x) {
    x = x.toString()
    x = x.split('')
    let isNegative;
    if (x[0] === '-') {
        isNegative = true;
        x.shift()
    }
    let newx = []
    for (let i = x.length - 1; i >= 0; i--) {
        newx.push(x[i])
    }
    let j = 0;
    while (newx[j] === '0') {
        newx.shift()
        if (newx[j] !== '0')
            break
        j++
    }
    newx = isNegative ? ['-'].concat(newx) : newx
    newx = newx.join('')
    if (newx > Math.pow(2, 31) || newx < -Math.pow(2, 31)) return 0
    return newx
};
const a = reverse(1563847412)
console.log(a)
console.log(Math.pow(2, 32))