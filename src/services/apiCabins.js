import supabase, { supabaseUrl } from './supabase';
export async function getCabins() {

    const { data, error } = await supabase
    .from('cabins').select('*');
    if(error){
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

    export async function createEditCabin(newCabin, id){
        const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    
        // name must match with supabase schema
        const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
        const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    
        // Step 1: Create cabin
        let query = supabase.from('cabins');
        // A) Create/edit cabin
        if(!id){
            query = query.insert([{ ...newCabin, image: imagePath }]);
        }
        // B) Edit cabin
        if(id){
            query = query.update({ ...newCabin, image: imagePath  }).eq('id', id).select();
        }
        const {data, error  } = await query.select().single();
        if(error){
            console.error(error);
            throw new Error("Cabin could not be created");
        }
        // Step 2: Upload image
        if(hasImagePath){
            return data;
        }
        const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading the image
        if(storageError){
            await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
            console.error(storageError);
            throw new Error("Image could not be uploaded");
        }
        return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);
    if(error){
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;
}