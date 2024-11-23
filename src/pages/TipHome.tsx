import { Formik, Form, Field, ErrorMessage } from "formik";
import BackButton from "../components/back-button";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ROUTES, customAxios } from "../routes/apiRoutes";
import Swal from "sweetalert2";
import useAppState from "../hooks/useAppState";

const validationSchema = Yup.object().shape({
  userNameorId: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
});

export default function TipHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTipGoal = location.pathname.includes("goal");
  const setTipWallet = useAppState((state) => state.setTipWallet);

  return (
    <main className="h-screen px-4 pt-10 pb-20 bg-primaryDark/20 space-y-5">
      <div className="flex items-center">
        <BackButton />
        <h3 className="text-center w-full">Tip a Friend</h3>
      </div>
      <Formik
        initialValues={{ userNameorId: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const { data } = await customAxios().get(
              isTipGoal
                ? API_ROUTES.tip.goal + values.userNameorId
                : API_ROUTES.tip.user + values.userNameorId
            );
            setTipWallet(data.data);
            navigate(
              isTipGoal
                ? `/app/tip/goal/${values.userNameorId}`
                : `/app/tip/user/${values.userNameorId}`
            );
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
        {({ isValid, dirty }) => (
          <Form className="h-full flex flex-col justify-between">
            <div className="mt-6">
              <label htmlFor="pocket-name">
                {isTipGoal ? "Goal Unique ID" : "Username"}
              </label>
              <Field
                id="userNameorId"
                name="userNameorId"
                type="text"
                placeholder={isTipGoal ? "Enter Goal ID" : "Enter Username"}
                className="w-full mt-1 p-2 border border-primaryDark/80 bg-white/30 rounded focus:outline-none"
              />
              <ErrorMessage
                name="userNameorId"
                component="span"
                className="text-red-500 text-sm"
              />
              <p className="text-sm text-end mt-1.5 text-primaryDark self-end">
                <Link to={isTipGoal ? "/app/tip/user" : "/app/tip/goal"}>
                  Tip {isTipGoal ? "by pocket" : "by goal"} instead
                </Link>
              </p>
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
