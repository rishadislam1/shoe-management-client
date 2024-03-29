import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRegisterMutation } from "../../Redux/features/auth/authApiH";
import login from "../../assets/login/login.jpg";
import useAuthCheck from "../../hooks/useAuthCheck";

const Signup = () => {
  useAuthCheck();
  const [register, { isLoading, data: userData }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Password and Confirm password does not match.",
        footer: "Please Try Again",
      });
    } else {
      const data = {
        name,
        email,
        password,
      };
      register(data);
      e.currentTarget.reset();
    }
  };

  if (userData?.status && !isLoading) {
    Swal.fire({
      title: "CONGRATULATIONS",
      text: `${userData.message}. Please Login to Continue`,
      icon: "success",
    });

    navigate("/");
  }

  return (
    <div className="flex flex-wrap md:justify-center xl:justify-start items-center gap-10">
      <div>
        <img src={login} alt="login image" className="h-screen" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">USER LOGIN</h1>
        {/* SignUp form */}
        <form className="mt-10" onSubmit={handleSignup}>
          <div>
            <label className="text-xl font-bold">Your Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full mt-5"
            />
          </div>

          <div className="mt-5">
            <label className="text-xl font-bold">Email</label> <br />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              className="input input-bordered w-full mt-5"
            />
          </div>

          <div className="mt-5">
            <label className="text-xl font-bold ">Password</label> <br />
            <input
              type="password"
              name="password"
              placeholder="*********"
              className="input input-bordered w-full mt-5"
            />
          </div>

          <div className="mt-5">
            <label className="text-xl font-bold ">Confirm Password</label>{" "}
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="*********"
              className="input input-bordered w-full mt-5"
            />
          </div>
          <button className="btn btn-primary w-full mt-10">SignUp</button>
        </form>

        {/* do not account */}
        <div className="mt-14 font-bold">
          <p>
            Already Have An Account?{" "}
            <span className="text-blue-500 cursor-pointer">
              <Link to="/">Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
