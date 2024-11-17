import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BackButton from '../components/back-button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  pocketName: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  image: Yup.mixed()
    .required("An image is required")
});


export default function CreatePocket() {
  const [preview, setPreview] = useState<any>(null);

  const navigate = useNavigate();

  return (
    <main className="h-screen px-4 pt-10 pb-20 bg-primaryDark/20 space-y-5">
      <div className='flex items-center'>
        <BackButton />
        <h3 className='text-center w-full'>Create a New Pocket</h3>
      </div>
      <Formik
        initialValues={{ pocketName: '', image: null }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // console.log(values);
          navigate("/app/pocket/preview", { state: { pocketName: values.pocketName, image: values.image } })
        }}
      >
        {({ setFieldValue, isValid, dirty }) => (
          <Form className="h-full flex flex-col justify-between">
            <div className='space-y-4'>
              <div>
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="image"
                    className="flex items-center justify-center w-full h-48 bg-white/30 border border-dashed border-gray-400 rounded-lg cursor-pointer"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Selected"
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-500">
                        <img src="/src/assets/input-image.svg" alt="" />
                      </div>
                    )}
                  </label>
                  <span className='text-primaryDark font-orbitron font-semibold mt-2'>+ Add photo</span>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event: any) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPreview(reader.result);
                        reader.readAsDataURL(file);
                      } else {
                        setPreview(null);
                      }
                    }}
                    className="hidden"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className='mt-6'>
                <label htmlFor="pocket-name">Pocket Name</label>
                <Field
                  id="pocketName"
                  name="pocketName"
                  type="text"
                  placeholder="Name Your Pocket"
                  className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              className={`font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </Form>
        )}
      </Formik>
    </main>
  )
};

