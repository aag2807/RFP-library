const lib = require('../dist/index.js')
const { foreach, foreachObject, unless, times, every, some } = lib.default

describe('Non Closure High order function', () => {
    test('foreach shoud return nothing', () => {
        const double = x => x * 2
        expect(foreach([1, 2, 3, 4, 5], double)).toBe(null || undefined)
    })

    test('should print key and value for an object', () => {
        let me = { name: "alvaro", age: 23 }
        let arr = []
        foreachObject(me, (k, v) => {
            arr.push(v)
        })
        expect(arr[0]).toBe("alvaro")
        expect(arr[1]).toBe(23)
    })

    test('should not assign value to local variable unless the number passed is odd', () => {
        let localVariable;

        foreach([1, 2, 3], (num) => {
            unless(num % 3, () => {
                localVariable = "run on the third"
            })
        })
        expect(localVariable).toBe("run on the third")

        let secondLocalVariable
        foreach([2, 4, 6], (num) => {
            unless(num % 3, () => {
                localVariable = "run on the third"
            })
        })
        expect(secondLocalVariable).toEqual(expect.not.stringContaining("run on the third"))
    })

    test("should execute a function 3 times pushing an item to the array", () => {
        let arr = [];
        times(3, (num) => {
            arr.push(num)
        })
        expect(arr[1]).toBe(1)
        expect(arr.length).toBe(3)
    })

    test('should return true and false for both arrays one containing all even numbers and one not', () => {
        let arr1 = [2, 4, 6, 8, 10]
        const checkEven = x => x % 2 === 0
        let result1 = every(arr1, checkEven)
        expect(result1).toBe(true)

        let arr2 = [2, 6, 7]
        let result2 = every(arr2, checkEven)
        expect(result2).toBe(false)

    });
    

    test('should return true if at least one of the items in the array is even', () => {
        let arr1 = [1,7,5,3,4]
        const isEven = x => x % 2 === 0
        let result1 = some(arr1, isEven)
        expect(result1).toBe(true)

        let arr2 = [1,1,1,1,1]
        let result2 = some(arr2, isEven)
        expect(result2).toBe(false)
    })
    


})
/* market://details?id=colmena.ctc.radio
*/