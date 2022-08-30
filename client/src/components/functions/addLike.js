//                 *********OLD**********                   //

// import axios from "axios";

// export const addLike = async (id, post, setPost) => {
//   try {
//     await axios.put(`/posts/${id}`); // Add like
//     const userPost = [...post]; // Post data

//     // Add like for the current post
//     const existingPost = post.filter((product) => product._id === id && product.likes++);

//     const payload = {
//       likes: existingPost.likes,
//       header: existingPost.header,
//       description: existingPost.description
//     }

//     // Update liked post
//     userPost[existingPost] = payload
//     setPost(userPost); 

//   } catch (err) {
//     console.log(err);
//   }
// };

//                 *********OLD**********                   //

