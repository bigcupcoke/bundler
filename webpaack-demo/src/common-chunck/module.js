const foo = () => {
    let a = 1
    return () => {
        a++
        console.log('moudleA', a)
    }
}

const moudleA = foo()

export {
    moudleA
}