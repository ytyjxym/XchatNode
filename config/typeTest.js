isType = type => {
    let arr = ['Number', 'String', 'Boolean', 'Null', 'Undefined', 'Array', 'Object', 'Symbol']
    let str = '';
    arr.some(val => {
        if (Object.prototype.toString.call(type).includes(val)) {
            str = val;
            return;
        }
    })
    return str;
}
console.log(isType(123));