import { VTodoForm } from '@/form-validator/VTodoForm'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useTodo } from '@/hooks/useTodo'

const TodoEditForm = ({ ...props }) => {
  const { updateT, isSubmitting } = useTodo()
  const { control, handleSubmit } = useForm<VTodoForm>({
    resolver: classValidatorResolver(VTodoForm),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      title: props.data.title,
      description: props.data.description,
    },
  })

  const onSubmit = (values: VTodoForm) => {
    props.onClosePopup(false)
    updateT(props.data._id, values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-lg bg-white shadow'
    >
      <div className='p-6'>
        <Controller
          name='title'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='flex flex-col gap-y-2 w-full mb-5'>
              <input
                value={field.value ? field.value : props.data.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e.target.value)
                }}
                className={clsx(
                  'w-full bg-gray-50 p-4',
                  'rounded-lg border border-gray-300',
                  'text-gray-900',
                  'focus:border-blue-500 focus:ring-blue-500',
                )}
                type='text'
                placeholder='Title'
              />

              {error && (
                <p className=' text-xs font-normal text-red-600'>
                  {error.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className='flex flex-col gap-y-2 w-full mb-5'>
              <textarea
                rows={5}
                value={field.value ? field.value : props.data.description}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  field.onChange(event.target.value)
                }}
                className={clsx(
                  'w-full bg-gray-50 p-4 mt-5',
                  'rounded-lg border border-gray-300',
                  'text-gray-900',
                  'focus:border-blue-500 focus:ring-blue-500',
                )}
                placeholder='Description'
              />

              {error && (
                <p className=' text-xs font-normal text-red-600'>
                  {error.message}
                </p>
              )}
            </div>
          )}
        />

        <div
          className={clsx(
            'flex items-center justify-center space-x-8 p-4',
            'rounded-b border-t border-gray-200',
          )}
        >
          <button
            disabled={isSubmitting}
            className={clsx(
              'bg-green-600 px-5 py-2.5 ',
              'rounded-lg border border-gray-200',
              'font-medium text-white',
              'hover:bg-gray-100 hover:text-gray-900',
              'focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200',
            )}
            type='submit'
          >
            Save
          </button>
          <button
            onClick={() => props.onClosePopup(false)}
            type='button'
            className={clsx(
              'bg-red-600 px-5 py-2.5 ',
              'rounded-lg border border-gray-200',
              'font-medium text-white',
              'hover:bg-gray-100 hover:text-gray-900',
              'focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200',
            )}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoEditForm
