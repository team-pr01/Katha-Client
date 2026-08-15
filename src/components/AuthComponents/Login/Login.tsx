/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
import { useState } from "react";
import { emailValidator } from "../../../utils/emailValidator";
import PasswordInput from "../../Reusable/PasswordInput/PasswordInput";
import { ICONS } from "../../../assets";

type TFormData = {
  phoneNumber: string;
  password: string;
};

const Login = ({
  setAuthModalType,
}: {
  setAuthModalType: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleLogin = async (data: TFormData) => {
    try {
      const payload = {
        phoneNumber: data.phoneNumber || "",
        password: data.password || "",
      };
    } catch (err: any) {
      setLoginError(err?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5">
          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            type="number"
            error={errors.phoneNumber}
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />

          <PasswordInput
            label="Password"
            placeholder="Must be at least 8 Characters"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )}

        <div className="flex flex-col items-center justify-between mt-3 md:mt-6">
          <Button
            type="submit"
            label="Login"
            variant="primary"
            className="w-full py-1.5 lg:py-3.5"
            icon={false}
            // isLoading={isLoading}
            // isDisabled={isLoading}
          />

          <div className="flex items-center justify-center gap-3 my-4">
            <hr className="w-37 h-px border border-neutral-50/70" />
            <p className="text-neutral-25 font-Satoshi text-sm">OR</p>
            <hr className="w-37 h-px border border-neutral-50/70" />
          </div>
          <button
            type="button"
            className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full border border-neutral-50 bg-white leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 text-sm`}
          >
            <img src={ICONS.google} alt="" className="w-6" />
            Login with Google
          </button>

          <div className="font-Satoshi flex items-center gap-1 mt-7 text-sm">
            <p className="text-neutral-5">New to Katha?</p>
            <button
              onClick={() => setAuthModalType("signup")}
              className="text-primary-10 font-medium underline"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
