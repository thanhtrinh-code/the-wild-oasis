import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

 

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {register, handleSubmit, reset, getValues, formState }= useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;


  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  const isWorking = isCreating || isEditing 

  

  function onSubmit(data){
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if(isEditSession){
      editCabin({newCabinData: {...data, image: image}, id: editId},
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    }else{
      createCabin({...data, image: image},
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }  
      );
    }
  }
  function onError(err) {
    //console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking}  {...register('name', {
          required: 'Please enter this field'
        })}/>
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
          required: 'Please enter this field',
          min: {
            value: 1,
            message: 'Maximum capacity should be at least 1'
          },
        })}/>
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking}  {...register('regularPrice', {
          required: 'Please enter this field',
          min: {
            value: 1,
            message: 'Regular Price should be at least 1'
          }
        })}/>
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register('discount', {
          required: 'Please enter this field',
          validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price',
        })}/>
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description', {
          required: 'Please enter this field'
        })}/>
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput id="image" disabled={isWorking} 
        accept="image/*" 
        {...register('image', {
          required: isEditSession ? false : 'Please upload an image'
        })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}


export default CreateCabinForm;
