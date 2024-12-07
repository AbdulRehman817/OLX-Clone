// import React from "react";
// import { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   auth,
//   updateProfile,
//   addDoc,
//   collection,
//   storage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   db,
//   GoogleAuthProvider,
//   GithubAuthProvider,
//   signInWithPopup,
// } from "../../../FirebaseConfig/Firebase.js";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// export function Signup() {
//   const email = useRef();
//   const navigate = useNavigate();
//   const password = useRef();
//   const Fullname = useRef();
//   const file = useRef();
//   const [warning, setWarning] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const loginBtn = () => {
//     navigate("/Login");
//   };

//   const loginAuth = (provider) => {
//     const authProvider = new provider();
//     signInWithPopup(auth, authProvider)
//       .then((result) => {
//         const user = result.user;

//         navigate("/");
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         console.log(errorMessage);
//         setWarning("Error signing in. Please try again.");
//       });
//   };

//   const SignupBtn = async (e) => {
//     e.preventDefault();
//     setWarning("");
//     setLoading(true); // Set loading to true when signup starts
//     navigate("/");
//     const userEmail = email.current.value;
//     const userPassword = password.current.value;
//     const userFullname = Fullname.current.value;
//     const userFile = file.current.files[0];

//     if (!userEmail || !userPassword || !userFullname) {
//       setWarning("Please fill in all fields.");
//       setLoading(false); // Stop loading if validation fails
//       return;
//     }

//     if (!userFile) {
//       setWarning("Please add your profile pic.");
//       setLoading(false); // Stop loading if file is missing
//       return;
//     }

//     try {
//       // Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         userEmail,
//         userPassword
//       );
//       const user = auth.currentUser;
//       const uid = user.uid;

//       // Upload the profile picture
//       const storageRef = ref(storage, `profilePic/${userFile.name}`);
//       await uploadBytes(storageRef, userFile);

//       // Get the download URL for the uploaded image
//       const getImage = await getDownloadURL(storageRef);
//       // Update the user's profile with name and photo
//       await updateProfile(auth.currentUser, {
//         displayName: `${firstName} ${lastName}`,
//         photoURL: getImage,
//       });

//       // Store user data in Firestore
//       await addDoc(collection(db, "userData"), {
//         email: userEmail,
//         fullname: userFullname,
//         image: getImage,
//         uid: uid,
//       });

//       // Navigate to home page after successful signup
//       navigate("/");
//     } catch (error) {
//       // Handle specific Firebase errors
//       if (error.code === "auth/email-already-in-use") {
//         setWarning(
//           "This email is already in use. Please use a different email."
//         );
//       } else if (error.code === "auth/weak-password") {
//         setWarning("Password is too weak. Please use a stronger password.");
//       } else if (error.code === "auth/invalid-email") {
//         setWarning("Invalid email format. Please enter a valid email.");
//       } else {
//         setWarning("Error during signup: " + error.message);
//       }
//     } finally {
//       setLoading(false); // Stop loading regardless of success or failure
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-gray-700 text-center">
//           Create Account
//         </h2>
//         <p className="text-gray-500 text-sm text-center mt-2">
//           Sign up to explore more features!
//         </p>
//         <form className="mt-8 space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="file"
//               className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
//               placeholder="Enter your full name"
//               ref={file}
//             />
//           </div>

//           {/* Full Name */}

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
//               placeholder="Enter your full name"
//               ref={Fullname}
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="text"
//               className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
//               placeholder="Enter your email"
//               ref={email}
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
//               placeholder="Create a password"
//               ref={password}
//             />
//           </div>

//           {/* Terms and Conditions */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="terms"
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//               I agree to the{" "}
//               <a href="#terms" className="text-blue-600 hover:underline">
//                 terms and conditions
//               </a>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               onClick={SignupBtn}
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Social Sign-Up Buttons */}
//           <div className="mt-4 space-y-2">
//             <button
//               onClick={() => loginAuth(GoogleAuthProvider)}
//               type="button"
//               className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
//             >
//               <svg
//                 className="h-5 w-5 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="white"
//               >
//                 <path d="M21.35 11.1h-9.2v2.8h5.28c-.24 1.33-.97 2.45-2.07 3.2v2.66h3.35c1.96-1.8 3.12-4.46 3.12-7.7 0-.84-.1-1.66-.28-2.44z" />
//                 <path d="M12.15 21.92c2.26 0 4.17-.75 5.56-2.02l-3.36-2.66c-.64.43-1.45.68-2.32.68-1.79 0-3.31-1.21-3.86-2.83H4.69v2.8c1.4 2.76 4.33 4.73 7.46 4.73z" />
//                 <path d="M8.29 13.08c-.18-.54-.29-1.12-.29-1.74 0-.62.11-1.2.29-1.74V6.8h-3.6c-.78 1.51-1.22 3.22-1.22 5.08s.44 3.57 1.22 5.08z" />
//                 <path d="M12.15 4.92c1.24 0 2.35.43 3.23 1.28l2.44-2.44c-1.5-1.36-3.41-2.16-5.67-2.16-3.13 0-6.06 1.77-7.46 4.73l3.6 2.8c.55-1.62 2.07-2.83 3.86-2.83z" />
//               </svg>
//               Sign up with Google
//             </button>
//             <button
//               type="button"
//               onClick={() => loginAuth(GithubAuthProvider)}
//               className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg"
//             >
//               <svg
//                 className="h-5 w-5 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="white"
//               >
//                 <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2.3c-3.2.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-1 .1-1 .1-1 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1 2.8.7.1-.7.4-1 1.1-1.3-2.5-.3-5.1-1.3-5.1-5.9 0-1.3.5-2.5 1.2-3.4-.1-.3-.5-1.4.1-3 0 0 1-.3 3.4 1.2a11.6 11.6 0 016.2 0c2.3-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.7.1 3 .8.9 1.2 2.1 1.2 3.4 0 4.6-2.6 5.6-5.1 5.9.4.3.8.9.8 1.8v2.7c0 .4.2.8.8.6A12 12 0 0012 .5z" />
//               </svg>
//               Sign up with GitHub
//             </button>
//           </div>
//         </form>

//         {/* Already have an account */}
//         <p className="mt-4 text-sm text-center text-gray-600">
//           Already have an account?{" "}
//           <a
//             onClick={loginBtn}
//             className="text-blue-600 hover:underline font-medium cursor-pointer"
//           >
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  addDoc,
  collection,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  auth,
  db,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "../../../FirebaseConfig/Firebase.js";
import { useNavigate } from "react-router-dom";

function Signup() {
  const email = useRef();
  const password = useRef();
  const fullName = useRef();
  const file = useRef();
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = (providerInstance) => {
    signInWithPopup(auth, providerInstance)
      .then(() => navigate("/"))
      .catch(() => setWarning("Error signing in with social account."));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWarning("");

    const userEmail = email.current.value;
    const userPassword = password.current.value;
    const userFullName = fullName.current.value;
    const userFile = file.current.files[0];

    if (!userEmail || !userPassword || !userFullName || !userFile) {
      setWarning("All fields are required, including profile picture.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const storageRef = ref(storage, `profilePic/${userFile.name}`);
      await uploadBytes(storageRef, userFile);
      const imageUrl = await getDownloadURL(storageRef);

      await updateProfile(userCredential.user, {
        displayName: userFullName,
        photoURL: imageUrl,
      });

      await addDoc(collection(db, "userData"), {
        email: userEmail,
        fullname: userFullName,
        image: imageUrl,
        uid: userCredential.user.uid,
      });

      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setWarning("Email already in use. Please use a different email.");
      } else if (errorCode === "auth/weak-password") {
        setWarning("Weak password. Use at least 6 characters.");
      } else {
        setWarning("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              ref={file}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              ref={fullName}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              ref={email}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              ref={password}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 sm:text-sm px-4 py-2"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm">
              Agree to <a href="#terms">Terms</a>
            </label>
          </div>
          {warning && <p className="text-red-500 text-sm">{warning}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-black pt-3 text-1xl">OR</p>
        <div className="mt-4">
          <button
            onClick={() => loginAuth(GoogleAuthProvider)}
            type="button"
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
          >
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M21.35 11.1h-9.2v2.8h5.28c-.24 1.33-.97 2.45-2.07 3.2v2.66h3.35c1.96-1.8 3.12-4.46 3.12-7.7 0-.84-.1-1.66-.28-2.44z" />
              <path d="M12.15 21.92c2.26 0 4.17-.75 5.56-2.02l-3.36-2.66c-.64.43-1.45.68-2.32.68-1.79 0-3.31-1.21-3.86-2.83H4.69v2.8c1.4 2.76 4.33 4.73 7.46 4.73z" />
              <path d="M8.29 13.08c-.18-.54-.29-1.12-.29-1.74 0-.62.11-1.2.29-1.74V6.8h-3.6c-.78 1.51-1.22 3.22-1.22 5.08s.44 3.57 1.22 5.08z" />
              <path d="M12.15 4.92c1.24 0 2.35.43 3.23 1.28l2.44-2.44c-1.5-1.36-3.41-2.16-5.67-2.16-3.13 0-6.06 1.77-7.46 4.73l3.6 2.8c.55-1.62 2.07-2.83 3.86-2.83z" />
            </svg>
            Sign up with Google
          </button>{" "}
          <br />
          <button
            type="button"
            onClick={() => loginAuth(GithubAuthProvider)}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg"
          >
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2.3c-3.2.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-1 .1-1 .1-1 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1 2.8.7.1-.7.4-1 1.1-1.3-2.5-.3-5.1-1.3-5.1-5.9 0-1.3.5-2.5 1.2-3.4-.1-.3-.5-1.4.1-3 0 0 1-.3 3.4 1.2a11.6 11.6 0 016.2 0c2.3-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.7.1 3 .8.9 1.2 2.1 1.2 3.4 0 4.6-2.6 5.6-5.1 5.9.4.3.8.9.8 1.8v2.7c0 .4.2.8.8.6A12 12 0 0012 .5z" />
            </svg>
            Sign up with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
