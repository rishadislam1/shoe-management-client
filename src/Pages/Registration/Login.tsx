import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../Redux/features/auth/authApiH";
import loginImage from "../../assets/login/login.jpg";
import useAuthCheck from "../../hooks/useAuthCheck";

const Login = () => {
  useAuthCheck();
  const [login, { isLoading, data: loginData }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname;

  const handleSignin = (e: Event) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      email: email,
      password: password,
    };
    login(data);
    e.target.reset();
  };

  if (loginData?.accessToken && loginData?.status === "success" && from) {
    navigate(from, { replace: true });
  } else if (loginData?.status === "success" && !isLoading) {
    navigate("/home");
  } else if (loginData?.status === "fail") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: `${loginData.message}. Please try again`,
    });
  }

  return (
    <div className="flex flex-wrap md:justify-center xl:justify-start items-center gap-10">
      <div>
        <img src={loginImage} alt="login image" className="h-screen" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">USER LOGIN</h1>
        {/* login form */}
        <form className="mt-10" onSubmit={handleSignin}>
          <div>
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
          <button className="btn btn-primary w-full mt-10">SignIn</button>
        </form>

        {/* do not account */}
        <div className="mt-14 font-bold">
          <p>
            Don't Have An Account.{" "}
            <span className="text-blue-500 cursor-pointer">
              <Link to="/signup">SignUp Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
