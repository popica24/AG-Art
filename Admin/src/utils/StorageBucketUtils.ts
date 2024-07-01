import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage"
import { imageDb } from "./firebase"

export const RemoveFolder = async (path: string) => {
const folderToDeleteRef = ref(imageDb, path)
const files = await listAll(folderToDeleteRef)
files.items.map(async (file)=>{
    await deleteObject(file)
})
}

export const UploadFolder = async (folderPath: string, content: Array<Blob>) => { 
    content.map(async (image, index)=>{
        const imageRef = ref(imageDb, folderPath+`/${index+1}.jpg`)
        await uploadBytes(imageRef, image)
    })
}
export const UploadNuance = async (folderPath: string, nuance: Blob) => { 
    const nuanceRef = ref(imageDb,folderPath+"/nuance.jpg")
    await uploadBytes(nuanceRef, nuance)

}