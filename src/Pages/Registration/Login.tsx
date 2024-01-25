import { Link } from "react-router-dom";
import login from "../../assets/login/login.jpg";

const Login = () => {
  return (
    <div className="flex flex-wrap md:justify-center xl:justify-start items-center gap-10">
      <div>
        <img src={login} alt="login image" className="h-screen" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl font-bold">USER LOGIN</h1>
        {/* login form */}
        <form className="mt-10">
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
            <p>Don't Have An Account. <span className="text-blue-500 cursor-pointer"><Link to='/signup'>SignUp Here</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
