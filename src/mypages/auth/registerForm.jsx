import "@/mycss/auth.css";
import UserValidator from "@/utils/userValidator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const registerUser = () => {
    if (id)
      fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          password: password,
          name: userName,
          email: email,
          telNo: telephone,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // toastr.success('Registration successful! Please log in.');
            toast.success("Registration successful! Please log in.");
            navigate("/test/auth/login");
          } else {
            toast.error("Registration failed. Please try again.");
          }
        })
        .catch((error) => {
          toast.error(error, "Error");
        });
  };

  useEffect(() => {
    document.getElementById("register-id").focus();
  }, []);

  const [id, setId] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [idTouched, setIdTouched] = useState(false);
  const handleIdChange = (e) => {
    setId(e.target.value);
    if (!idTouched) setIdTouched(true);
  };
  useEffect(() => {
    if (id.trim() === "") {
      setIdMessage("아이디를 입력해주세요.");
      return;
    }
    if (!UserValidator.isValidId(id)) {
      setIdMessage("아이디는 최소 2글자 이상이어야 합니다.");
      return;
    }

    setIdMessage("");
  }, [id]);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!passwordTouched) setPasswordTouched(true);
  };
  useEffect(() => {
    if (password.trim() === "") {
      setPasswordMessage("비밀번호를 입력해주세요.");
      return;
    }
    if (!UserValidator.isValidPassword(password)) {
      setPasswordMessage("비밀번호는 최소 8자, 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.");
      return;
    }

    setPasswordMessage("");
  }, [password]);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (!confirmPasswordTouched) setConfirmPasswordTouched(true);
  };
  useEffect(() => {
    if (password !== confirmPassword) {
      setConfirmPasswordMessage("비밀번호가 일치하지 않습니다.");
    }
    setConfirmPasswordMessage("");
  }, [password, confirmPassword]);

  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState(false);
  const [userNameTouched, setUserNameTouched] = useState(false);
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    if (!userNameTouched) setUserNameTouched(true);
  };
  useEffect(() => {
    if (userName.trim() === "") {
      setUserNameMessage("이름을 입력해주세요.");
      return;
    }
    if (!UserValidator.isValidName(userName)) {
      setUserNameMessage("이름이 유효하지 않습니다.");
    } else {
      setUserNameMessage("");
    }
  }, [userName]);

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailTouched) setEmailTouched(true);
  };
  useEffect(() => {
    if (email.trim() === "") {
      setEmailMessage("이메일을 입력해주세요.");
      return;
    }
    if (!UserValidator.isValidEmail(email)) {
      setEmailMessage("이메일 주소가 유효하지 않습니다.");
      return;
    }
    setEmailMessage("");
  }, [email]);

  const [telephone, setTelephone] = useState("");
  const [telephoneMessage, setTelephoneMessage] = useState("");
  const [telephoneTouched, setTelephoneTouched] = useState(false);
  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
    if (!telephoneTouched) setTelephoneTouched(true);
  };
  useEffect(() => {
    if (telephone.trim() === "") {
      setTelephoneMessage("전화번호를 입력해주세요.");
      return;
    }
    if (!UserValidator.isValidTelephone(telephone)) {
      setTelephoneMessage("유효한 전화번호를 입력해주세요.");
      return;
    }
    setTelephoneMessage("");
  }, [telephone]);

  return (
    <>
      <link rel="stylesheet" href="/css/egovframework/auth.css" />

      <div className="form">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>

        <div className="flex-column">
          <label>ID </label>
        </div>
        <div className="inputForm">
          <input type="text" className="input" id="register-id" placeholder="Enter your ID" onChange={handleIdChange} />
        </div>
        <div>{idTouched ? <span style={{ color: "red", marginLeft: "10px" }}>{idMessage}</span> : ""}</div>

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input type="password" className="input" id="register-password" placeholder="Enter your Password" onChange={handlePasswordChange} />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
          </svg>
        </div>
        <div>{passwordTouched ? "" : <span style={{ color: "red", marginLeft: "10px" }}>{passwordMessage}</span>}</div>

        <div className="flex-column">
          <label>Confirm Password </label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input type="password" className="input" id="register-password" placeholder="Enter your Password" onChange={handleConfirmPasswordChange} />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
          </svg>
        </div>
        <div>{confirmPasswordTouched ? "" : <span style={{ color: "red", marginLeft: "10px" }}>{confirmPasswordMessage}</span>}</div>

        <div className="flex-column">
          <label>Name </label>
        </div>
        <div className="inputForm">
          <input type="text" className="input" id="register-name" placeholder="Enter your Name" onChange={handleUserNameChange} />
        </div>
        <div>{userNameTouched ? "" : <span style={{ color: "red", marginLeft: "10px" }}>{userNameMessage}</span>}</div>

        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input type="text" className="input" id="register-email" placeholder="Enter your Email" onChange={handleEmailChange} />
        </div>
        <div>{emailTouched ? "" : <span style={{ color: "red", marginLeft: "10px" }}>{emailMessage}</span>}</div>

        <div className="flex-column">
          <label>Telephone </label>
        </div>
        <div className="inputForm">
          <input type="text" className="input" id="register-telephone" placeholder="Enter your Telephone" onChange={handleTelephoneChange} />
        </div>
        <div>{telephoneTouched ? "" : <span style={{ color: "red", marginLeft: "10px" }}>{telephoneMessage}</span>}</div>

        <button className="button-submit" onClick={registerUser}>
          Register
        </button>
      </div>
    </>
  );
};
export default RegisterForm;
