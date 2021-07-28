import { UserButton } from "@clerk/clerk-react";
import { useAuth } from "@redwoodjs/auth";

export default function UserStateNavBit() {
  const { logIn, signUp, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="font-gray-800">Loading...</div>;
  }

  if (isAuthenticated) {
    return <UserButton />;
  } else {
    return (
      <div className="hover:text-gray-900">
        <button onClick={logIn} className="mr-5">
          <span role="img" aria-hidden>
            🦹
          </span>{" "}
          Log in
        </button>
        <button onClick={signUp}>
          <span role="img" aria-hidden>
            🥳
          </span>{" "}
          Sign up
        </button>
      </div>
    );
  }
}
