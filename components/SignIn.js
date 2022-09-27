import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push(`/${session.user.name}`);
    return;
  } else {
    return (
      <main className="signInMain">
        <div className="logo">
          <Image src="/gitHub.png" width={48} height={48} />
        </div>
        <div className="signInHeader">
          <h1>Sign in to GitHub</h1>
        </div>
        <div className="signInCard">
          <h6>Click to Sign into your GitHub</h6>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </main>
    );
  }
}

export default SignIn;
