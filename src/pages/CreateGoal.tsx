import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BackButton from "../components/back-button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES, customFormAxios } from "../routes/apiRoutes";
import { useTelegramUser } from "../hooks/useTelegramUser";
import Swal from "sweetalert2";
import { TelegramUser } from "../lib/types";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Goal name is required")
    .min(3, "Goal name must be at least 3 characters"),
  image: Yup.mixed().required("An image is required"),
  targetAmount: Yup.number()
    .required("Goal requires a target")
    .moreThan(0, "Your Target must be more than 0"),
  recurringAmount: Yup.number()
    .required("Recurring amount is required")
    .moreThan(0, "Recuring must be more than 0"),
  intervals: Yup.number().required("Intervals is required"),
  type: Yup.string().required("Type is required"),
  unique_id: Yup.string().optional(),
  description: Yup.string()
    .optional()
    .max(50, "Description must be less than 50 characters"),
  endDate: Yup.string().optional(),
});

export default function CreateGoal() {
  const [preview, setPreview] = useState<any>(null);
  const navigate = useNavigate();
  const user = useTelegramUser();

  return (
    <main className="h-fit px-4 pt-10 pb-20 bg-primaryDark/20 space-y-5">
      <div className="flex items-center">
        <BackButton />
        <h3 className="text-center w-full">Create a New Goal</h3>
      </div>
      <Formik
        initialValues={{
          name: "",
          image: null,
          unique_id: "",
          description: "",
          targetAmount: 100,
          recurringAmount: 5,
          intervals: 7,
          endDate: new Date(),
          type: "Savings",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            // Log Goal Details on the backend
            const goalDetails = {
              name: values.name,
              image: values.image,
              unique_id: values.unique_id,
              description: values.description,
              targetAmount: values.targetAmount,
              recurringAmount: values.recurringAmount,
              intervals: values.intervals,
              endDate: values.endDate,
              type: values.type,
            };

            if (!user?.id) {
              Swal.fire({
                icon: "error",
                text: "Can't find telegram user...",
              });
              return;
            }

            const formData = new FormData();
            formData.append("tel_id", (user as TelegramUser).id!.toString());
            formData.append("name", goalDetails.name);
            formData.append("unique_id", goalDetails.unique_id);
            formData.append("description", goalDetails.description);
            formData.append(
              "targetAmount",
              goalDetails.targetAmount.toString()
            );
            formData.append(
              "recurringAmount",
              goalDetails.recurringAmount.toString()
            );
            formData.append("intervals", goalDetails.intervals.toString());
            formData.append(
              "endDate",
              new Date(goalDetails.endDate).toDateString()
            );
            formData.append("type", goalDetails.type);
            formData.append("image", goalDetails.image as unknown as File);

            const { data } = await customFormAxios().post(
              API_ROUTES.goal.create,
              formData
            );

            navigate("/app/goal/preview", {
              state: data.data,
            });
          } catch (error) {
            console.log(error);
            const errMsg =
              (error as any)?.response?.data?.error?.message ||
              (error as any)?.message ||
              "Something went wrong";

            Swal.fire({
              icon: "error",
              text: errMsg,
            });
          }
        }}
      >
        {({ setFieldValue, isValid, dirty }) => (
          <Form className="h-full flex flex-col gap-6 justify-between">
            <div className="space-y-4">
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
                  <span className="text-primaryDark font-orbitron font-semibold mt-2">
                    + Add photo
                  </span>

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

              <div className="mt-6">
                <label htmlFor="name">Goal Name</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name Your Goal"
                  className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="description">Description (Optional)</label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  placeholder="Give more details about your goal"
                  className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-4 justify-between">
                <div className="basis-1/2">
                  <label htmlFor="unique_id">Unique Name (Optional)</label>
                  <Field
                    id="unique_id"
                    name="unique_id"
                    type="text"
                    placeholder="Give your goal a unique identifier"
                    className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                  />
                  <ErrorMessage
                    name="unique_id"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="basis-1/2">
                  <label htmlFor="type">Goal Type</label>
                  <Field
                    id="type"
                    as="select"
                    name="type"
                    className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                  >
                    <option value={"Savings"}>Savings</option>
                    <option disabled value={"Crowdfunding"}>
                      Crowdfunding
                    </option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-between">
                <div className="basis-1/2">
                  <label htmlFor="targetAmount">Target Amount (USD)</label>
                  <Field
                    id="targetAmount"
                    name="targetAmount"
                    type={"number"}
                    placeholder="What is your target amount?"
                    className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                  />
                  <ErrorMessage
                    name="targetAmount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="basis-1/2">
                  <label htmlFor="recurringAmount">
                    Recurring Amount (USD)
                  </label>
                  <Field
                    id="recurringAmount"
                    name="recurringAmount"
                    type={"number"}
                    placeholder="How much do you want to save each time?"
                    className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                  />
                  <ErrorMessage
                    name="recurringAmount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-between">
                <div className="basis-1/2">
                  <label htmlFor="intervals">Intervals (Days)</label>
                  <Field
                    id="intervals"
                    name="intervals"
                    type="number"
                    placeholder="How often do you want to save?"
                    className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                  />
                  <ErrorMessage
                    name="intervals"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="basis-1/2">
                  <label htmlFor="endDate">End Date (Optional)</label>
                  <Field
                    id="endDate"
                    name="endDate"
                    type="date"
                    // placeholder="When is your saving goal"
                    className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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
  );
}
