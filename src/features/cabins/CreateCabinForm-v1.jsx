import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

 

function CreateCabinForm({cabinToEdit}) {
  const {register, handleSubmit, reset, getValues, formState }= useForm();
  const {errors} = formState;


  const queryClient = useQueryClient();
  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin created successfully!');
      queryClient.invalidateQueries(['cabin']);
      reset();
    },
    onError: (err) => toast.error(err.message),
  })

  

  function onSubmit(data){
    mutate({...data, image: data.image[0]});
  }
  function onError(err) {
    //console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating}  {...register('name', {
          required: 'Please enter this field'
        })}/>
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register('maxCapacity', {
          required: 'Please enter this field',
          min: {
            value: 1,
            message: 'Maximum capacity should be at least 1'
          },
        })}/>
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating}  {...register('regularPrice', {
          required: 'Please enter this field',
          min: {
            value: 1,
            message: 'Regular Price should be at least 1'
          }
        })}/>
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isCreating} {...register('discount', {
          required: 'Please enter this field',
          validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price',
        })}/>
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating} {...register('description', {
          required: 'Please enter this field'
        })}/>
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput id="image" disabled={isCreating} 
        accept="image/*" 
        {...register('image', {
          required: 'Please upload an image'
        })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
