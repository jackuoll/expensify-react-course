const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("you suck");
  }, 1500)
});

promise.then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
