let cloud: string
let folder: string

if (process.env.REACT_APP_CLOUDINARY_API !== undefined) {
  cloud = process.env.REACT_APP_CLOUDINARY_API
}

if (process.env.REACT_APP_CLOUDINARY_FOLDER !== undefined) {
  folder = process.env.REACT_APP_CLOUDINARY_FOLDER
}

export const createImageUrl = async (image: File): Promise<string> => {
  const upload = new FormData()
  upload.append('file', image)
  upload.append('upload_preset', folder)

  const response = await fetch(cloud, {
    method: 'POST',
    body: upload,
  })

  const img = await response.json()
  return img.secure_url
}
