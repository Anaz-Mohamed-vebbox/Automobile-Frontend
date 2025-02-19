export const Apivalue = (Apival) => {
  function fakeAPICall() {
    return new Promise(async (resolve, reject) => {
      try {
        var admin = await fetch("http://localhost:3000/posts");
        var Sadmin = await admin.json();
        var aadmin = await fetch("http://localhost:3000/Admin");
        var admin = await aadmin.json();
        var uuser = await fetch("http://localhost:3000/User");
        var user = await uuser.json();
        var apiValues = {
          admin: Sadmin,
          Sadmin: admin,
          user: user, 
        };
        resolve(apiValues);
      } catch (err) {
        // console.log(err);
      }
    });
  }
  var results = [];
  var promises = [];
  const delayedPromise = new Promise((resolve, reject) => {
    fakeAPICall()
      .then((data) => {
        // console.log(data);
        results.push(data);
        resolve();
      })
      .catch((error) => reject(error));
  });

  promises.push(delayedPromise);
  Promise.all(promises)
    .then(() => {
      Apival(results[0]);
      //   console.log("Results:", results);
    })
    .catch((error) => console.error("Error:", error));
};
