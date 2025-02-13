import { Label, TextInput, Button, Card } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  let navigate = useNavigate();
  onsubmit = (e) => {
    e.preventDefault();
    if(username === "AdminUMKMpesantren890" && password === "Adminadminpesantren098"){
      navigate('/admin', { replace: true });
      localStorage.setItem("login", true);
    }else{
      alert("Username atau password salah");
    }


  }

  return (
    <>
      <main>
        <div className="p-3 my-36 lg:my-44">
          <h1 className="font-bold">ADMIN - UMKM</h1>
          <h3>Login</h3>
          <form className="mx-10 mt-3 sm:mx-36 lg:mx-56 flex text-start flex-col gap-4 ">
            <div>
              <TextInput
                id="username"
                type="text"
                placeholder="Masukkan Username"
                required
                shadow
                onChange={(e) => setUsername(e.target.value)}
                addon="Username"
              />
            </div>
            <div className="">
              <TextInput
                id="password"
                type="password"
                placeholder="Masukkan password"
                required
                shadow
                onChange={(e) => setPassword(e.target.value)}
                addon="Password"
              />
            </div>

            <Button className="mx-16 bg-gray-200 text-black" type="submit">
              Login
            </Button>
          </form>
          {/* </Card> */}
        </div>
      </main>
    </>
  );
};

export default Login;
