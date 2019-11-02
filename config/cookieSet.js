let prototype = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"]
let keys = [];
let str = '';
for (let j = 0; j < 100; j++) {
    for (let i = 0; i < 1000; i++) {
        str += prototype[parseInt(Math.random() * 20)]
    }
    keys.push(str);
    str = '';
};
module.exports = {
    name: "XYM",
    keys,
    maxAge: 1000 * 3600 * 24 * 15
}