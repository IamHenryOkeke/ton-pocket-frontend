import { Formik, Form, Field, ErrorMessage } from 'formik';
import BackButton from '../components/back-button';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  userNameorId: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
});

export default function TipHome() {
  const navigate = useNavigate();
  return (
    <main className="h-screen px-4 pt-10 pb-20 bg-primaryDark/20 space-y-5">
      <div className='flex items-center'>
        <BackButton />
        <h3 className='text-center w-full'>Tip a Friend</h3>
      </div>
      <Formik
        initialValues={{ userNameorId: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          navigate(`/app/pocket/tip/${values.userNameorId}`)
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="h-full flex flex-col justify-between">
            <div className='mt-6'>
              <label htmlFor="pocket-name">Username/Pocket ID:</label>
              <Field
                id="userNameorId"
                name="userNameorId"
                type="text"
                placeholder="Enter username/pocket ID"
                className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
              />
              <ErrorMessage
                name="userNameorId"
                component="span"
                className="text-red-500 text-sm"
              />
              <p className='text-sm text-end mt-1.5 text-primaryDark self-end'>use QR code instead</p>
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
