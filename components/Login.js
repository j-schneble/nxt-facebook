import Image from "next/image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        width={400}
        height={400}
        alt="facebook logo"
        objectFit="contain"
      />
      <h1
        onClick={signIn}
        className="p-4 text-white bg-blue-500 rounded-full cursor-pointer"
      >
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;