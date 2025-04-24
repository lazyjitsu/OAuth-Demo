const { result } = require("lodash");

const promise = new Promise((resolve, reject) => {
    if (true) { //forcing it work/resolve
        resolve('Promise worked/resolved!');
    } else {
        reject('Promise failed/rejected!');
    }
}
);

promise
    .then((result) => {
    result = result + ' - this is the result!'
    // console.log(result); // Promise worked/resolved!
    return result
    })
    .then((result) => {
        result += result + ' - this is the result again'
        return result;
    }).then((result) => {
        console.log(result); // Promise worked/resolved! - this is the result!
    });

// now w/errors

const promise2 = new Promise((resolve, reject) => {
    if (false) { //forcing it work/resolve
        resolve('Promise worked/resolved!');
    } else {
        reject('Promises failed/rejected!');
    }
})
console.log('---------------')
promise2
    .then((result) => {
        result = result + ' - this is the result!'
        // console.log(result); // Promise worked/resolved!
        return result
    })
    .catch((error) => {
        console.log('here is my err: ',error); // Promise failed/rejected!
    })
    .then((result) => {
        result += result + ' - this is the result again'
        return result;
    }).then((result) => {
        console.log(result); // Promise worked/resolved! - this is the result!
    });

const promise3 = new Promise((resolve, reject) => {
    if (false) { //forcing it work/resolve
        resolve('Promise3 worked/resolved!');
    } else {
        reject('Promises3 failed/rejected!');
    }
});
promise3
.catch((error) => {
    console.log('Promises 3 3error',error); // Promise failed/rejected!
})
.then((result) => {
    console.log('Promises 3',result)
})
.catch('error', (error) => {
    console.log('Promises 3 error',error)
});

const promise4 = new Promise((resolve, reject) => {
    if (true) { //forcing it work/resolve
        resolve('Promise4 worked/resolved!');
    } else {
        reject('Promises4 failed/rejected!');
    }
});
promise4
    .then((result) => {
        throw Error
        return result + '!!!'
    })
    .then((result) => {
        console.log('Promises 4',result)
    })
    .catch((e) => {
        console.log('Promises 4 error',e)
    });

console.log('-------------Promise 5 --=+++-----')

// const promise5 = new Promise((resolve, reject) => {
//     if (true) { //forcing it work/resolve
//         resolve('Promise5 worked/resolved!');
//     } else {
//         reject('Promises5 failed/rejected!');
//     }
// });
// promise5
//     .then((result) => {
//         throw Error
//         return result + '!!!'
//     })
//     .then((result) => {
//         console.log('Promises 5',result)
//     })
//     .catch((e) => {
//         console.log('Promises 5 error',e)
//     })
//     .catch((e) => {
//         console.log('Never runs',e)
//     })
//     .then((result3) => {
//         throw Error;
//         console.log('result 3 ',result3);
//     })


const promise6 = new Promise((resolve, reject) => {
    setTimeout(resolve,100,'HIIII')
});


const promise7 = new Promise((resolve, reject) => {
    setTimeout(resolve,1000,'POOKIE')
});

const promise8 = new Promise((resolve, reject) => {
    setTimeout(resolve,3000,'Is it me you are looking for?')
});

// Values will be returned as an array in the order that thy were written down
Promise.all([promise6, promise7, promise8])
    .then((values) => {
        console.log('All promises resolved',values); // All promises resolved [ 'HIIII', 'POOKIE', 'Is it me you are looking for?' ]
    });


const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
]

Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
    })).then(results => {
        console.log('res 1: ',results[0])
        console.log('res 2: ',results[1])
        console.log('res 3: ',results[2])

    }).catch(error => {
        console.log('Error: ',error)
    });
// if one url fails, all fail!

// So again, let's remember what we started with a promise is an object that may produce a single value
// sometime in the future, either resolved or rejected with a reason why it was rejected and they promised,
// maybe in one of three possible states, it can be.  Fulfilled, rejected or pending?