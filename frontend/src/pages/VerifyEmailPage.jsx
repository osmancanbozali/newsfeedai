import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");

  const navigate = useNavigate();

  function goToLogin() {
    navigate('/login');
  }

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verifyEmail?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage("Email successfully verified! You can now log in.");
        } else {
          setMessage(data.error || "Verification failed. Please try again.");
        }
      } catch (err) {
        setMessage("An error occurred. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return <div className="bg-secondarycolor h-screen flex flex-col justify-center">
    <p className="mx-auto text-xl md:text-3xl text-white">{message}</p>
    {message === "Email successfully verified! You can now log in." && <button className='text-white font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-maincolor active:bg-gray-600' onClick={goToLogin}>Go Back To Login</button>}
  </div>;
};
