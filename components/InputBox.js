import { useSession } from "next-auth/client";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
 

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection("posts").add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(doc => {
        if (imageToPost) {
          const uploadTask = storage
          .ref((`posts/${doc.id}`))
          .putString(imageToPost,'data_url')
            
        removeImage();

        uploadTask.on(
            'state_change',
             null, 
             error => console.log.error(error),
            () => {
                storage
                    .ref('posts')
                    .child(doc.id)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').doc(doc.id).set(
                            {
                                postImage: url
                            }, 
                            { merge: true }
                        );
                    });

                }
            );
        }
    });

    inputRef.current.value = "";
    };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="p-2 mt-6 font-medium text-gray-500 bg-white shadow-md rounded-2xl">
      <div className="flex items-center p-4 space-x-2">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
          alt='sesh'
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="flex-grow h-12 px-5 bg-gray-100 rounded-full focus:outline-none focus:text-black focus:font-semibold"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            className="flex flex-col transition duration-150 transform cursor-pointer hover:brightness-110 hover:scale-105"
            onClick={removeImage}
          >
            <img className="object-contain h-10" src={imageToPost} alt="ip" />
            <p className="text-xs text-center text-red-500">Remove</p>
          </div>
        )}
      </div>

      <div className="flex p-3 border-t justify-evenly">
        <div className="inputIcon">
          <VideoCameraIcon className="text-red-500 h-7" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          className="inputIcon"
          onClick={() => filepickerRef.current.click()}
        >
          <CameraIcon className="text-green-500 h-7" />
          <p className="text-xs sm:text-sm xl:text-base">Photo</p>
          <input
            ref={filepickerRef}
            hidden
            onChange={addImageToPost}
            type="file"
          ></input>
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="text-yellow-500 h-7" />
          <p className="text-xs sm:text-sm xl:text-base">Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;