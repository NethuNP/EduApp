export const uploadFileToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "course_upload"); 

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dasbgicrq/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.secure_url) {
    throw new Error(" upload failed");
  }

  return data.secure_url;
};


export const uploadVideoToCloudinary = async (videoFile :any) =>{
     const formData = new FormData();
     formData.append("file",videoFile)
     formData.append("upload_preset", "lesson_upload")

     const response = await fetch (
        "https://api.cloudinary.com/v1_1/dasbgicrq/video/upload",
         {
      method: "POST",
      body: formData,
    }
     )
    const data = await response.json();

  if (!response.ok || !data.secure_url) {
    throw new Error("upload failed");
  }

  return data.secure_url;
};
