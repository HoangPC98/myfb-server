const convert = (str) => {
    let out = ''
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        console.log('charAt', i, str.charAt(i), str.charAt(i + 1))

        if (str.charAt(i) === str.charAt(i + 1)) {
            count++
        } else {
            count++
            out += count.toString()
            count = 0;
        }
    }
    return out
}

console.log('convert', convert('eerrtttt'))