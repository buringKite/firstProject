const setTimeoutAsync = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, timeout);
    });
};

setTimeoutAsync(2000)
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) });
