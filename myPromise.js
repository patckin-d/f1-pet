class MyPromise {
    static all(iterable) {
        const promises = Array.from(iterable)
        let completedCount = 0;
        const results = []

        
        return new Promise ((resolve, reject) => {
            if (promises.length === 0) {
                resolve([])
            }

            promises.forEach( (p, index) => {
                Promise.resolve(p)
                .then((res) => {
                    results[index] = res
                    completedCount += 1

                    if (completedCount === promises.length) {
                        resolve(results)
                    }
                })
                .catch(err => {
                    reject(err)
                })
            })
        })
    }

    static allSettled(iterable) {
        return new Promise((resolve) => {
            const promises = Array.from(iterable)
            let completedCount = 0;
            const result = []

            promises.forEach((p, index) => {
                Promise.resolve(p)
                .then(res => {
                    result[index] = {
                        status: 'fullfiled',
                        value: res
                    }
                })
                .catch(err => {
                    result[index] = {
                        status: 'rejected',
                        reason: err
                    }
                })
                .finally(() => {
                    completedCount += 1

                    if (completedCount === promises.length) {
                        resolve(result)
                    }
                })
            })
        })
    }
}
  
const p1 = Promise.resolve(1)
const p2 = new Promise(resolve => {
    setTimeout(function () {
        resolve(2)
    }, 1000)
})
const p3 = 3
const p4 = Promise.resolve(4)
const p5 = Promise.reject(5)


const f = async () => {
console.log('1')
try {
//   const pres = await MyPromise.all([p1, p2, p3, p4, p5])
//   const pres = await MyPromise.all([])
//   const pres = await Promise.allSettled([p1, p2, p3, p4, p5])
    const pres = await MyPromise.allSettled([p1, p2, p3, p4, p5])
    console.log('success: ')
    console.log(pres)
} catch (err) {
    console.log('error: ')
    console.error(err)
}
}

f()
  