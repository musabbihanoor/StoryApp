import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = async(file) => {
  if (!file) {
    alert("Please choose a file first!");
  } else {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let image_url = "";

    await uploadTask
    const response = await getDownloadURL(uploadTask.snapshot.ref);
    console.log(response,"UPLOADED");
    return response

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const percent = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );

    //     // update progress
    //     console.log("PROGRESS", percent);
    //   },
    //   (err) => console.log(err),
    //   () => {
    //     // download url
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       console.log(url, "POSTED");
    //       image_url = url;
    //     });
    //   }
    // );
    // return image_url;
  }
};
