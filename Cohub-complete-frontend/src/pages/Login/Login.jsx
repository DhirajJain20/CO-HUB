import LoginCard from "../../Components/LoginCard";
// import Register from "./Register";

const Login = () => {
  return (
    <div className="flex w-full h-screen bg gradient_bg">
      <div className="hidden relative lg:flex w-1/2 h-full items-center justify-center">
        <div className=" w-60 h-60 bg-gradient-to-tr from-teal to-lilac rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-black/10 backdrop-blur-lg" />
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-slate-900">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
