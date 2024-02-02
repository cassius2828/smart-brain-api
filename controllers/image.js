

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("error counting photo tally"));
};

export default handleImage;

// const returnRequestOptions = () => {
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   //   * other area to move to backend?
//   const PAT = "ad37e1eec6dd4960aaa0389b7052b74a";
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = "clarifai";
//   const APP_ID = "main";
//   // Change these to whatever model and image URL you want to use
//   const MODEL_ID = "face-detection";
//   const IMAGE_URL = this.state.input;

//   ///////////////////////////////////////////////////////////////////////////////////
//   // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
//   ///////////////////////////////////////////////////////////////////////////////////

//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//           },
//         },
//       },
//     ],
//   });

//   // * this may be the area I want to move to the backend
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Key " + PAT,
//     },
//     body: raw,
//   };

//   return requestOptions;
// };
