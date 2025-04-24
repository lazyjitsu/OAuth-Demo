// Async Await Tut

// moviePlayer(100,'left')
//     .then((result) => moviePlayer(400,'Left'))
//     .then((result) => moviePlayer(10,'Right'))
//     .then((result) => moviePlayer(330,'Left'))



// Vs. The goal is to make asyncronous code look like syncronous code.
// Async Await is a way to write asyncronous code in a more syncronous way.

// async function playerStart() {
//     const firstMove = 
//         await moviePlayer(100,'left')
//         await moviePlayer(400,'left')
//         await moviePlayer(10,'Right')
//         await moviePlayer(330,'Left')
// }

// Async are just promises under the hood. Syntatic sugar because its the same thing as promises but the syntax is different.

// Async function always returns a promise. If you return something from an async function, it will be wrapped in a promise.
// If you throw an error in an async function, it will be wrapped in a rejected promise.    
// If you return a promise from an async function, it will be resolved or rejected based on the promise. 
// delcare it as an async function like above and use await to wait for the promise to resolve.
// You can use try/catch to handle errors in async functions.
// You can use async/await with any function that returns a promise.

// In action
// let myurl = 'https://ufo-sightings.p.rapidapi.com/statistics/87250?radius=50';
let myurl = 'https://jsonplaceholder.typicode.com/users'
// myurl = 'http://ufo-api.herokuapp.com/api/sightings/search?limit=200';
// old skewl
// fetch(myurl)
//         .then((response) => response.json())
//         .then((data) => {
//         console.log('Data: ',data)
//         });
// new skewl
async function fetchUsers() {
    const resp = await fetch(myurl)
    const data = await resp.json()
    // console.log('Data: ',data)
    return data
}
// recall data is a promise so this will return a promise
// console.log(fetchUsers().then((data) => {console.log('Data: ',data)}));
fetchUsers();

// Udemy admits as well that the above code old skewl vs. new skewl that old skewl looks better.
// The new skewl is more readable and easier to understand when things get more complicated is what they say
// Recall the following promise code:
// Promise.all(urls.map(url => {
//     return fetch(url).then(resp => resp.json())
//     })).then(results => {
//         console.log('res 1: ',results[0])
//         console.log('res 2: ',results[1])
//         console.log('res 3: ',results[2])

//     }).catch(error => {
//         console.log('Error: ',error)
//     });
// async style
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
]
const getData = async function() {
    const [users, posts, albums] = await Promise.all(urls.map(url => {
        return fetch(url).then(resp => resp.json())
    }));
    return [users, posts, albums]
}
console.log(getData().then((data) => {console.log('Data: ',data)}));
    

// to catch erros we do not use the thow Error and .catch() method. We use try/catch instead.
const getData2 = async function() {
    try {
        const [users, posts, albums] = await Promise.all(urls.map(url => {
            return fetch(url).then(resp => resp.json())
        }));
        return [users, posts, albums]
    }
    catch (error) {
        console.log('Error: ',error)
    }

}
// console.log(getData().then((data) => {console.log('Data: ',data)}));
// console.log(getData2().then((data) => {console.log('Data: ',data)}));

const getData3 = async function() {
    const arrayOfPromises = urls.map(url => fetch(urls));
    for await (let request of arrayOfPromises) {
        const data = await request.json()
        console.log('Data: ',data)
    }
}
console.log('-*-*-*0*-*-*-*-*-*-*')
getData3(urls)
