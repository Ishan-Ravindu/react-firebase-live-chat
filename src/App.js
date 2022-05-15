import { useEffect, useState } from "react";
import { provider, db, auth } from "./config/firebase";
import { signInWithPopup,signOut} from 'firebase/auth';

function App() {
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user);
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth,provider);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    signOut(auth)
    .then(() => {
        console.log('logged out');
    })
    .catch((error) => {
        console.log(error);
    });
  };

  return (
    <div className="container">
    <main>
      {user ? (
        <>
          <nav id="sign_out">
            <h2>Chat With Friends</h2>
            <button onClick={logOut}>Sign Out</button>
          </nav>
          {/* <ChatRoom user={user} db={db} /> */}
        </>
      ) : (
        <section id="sign_in">
          <h1>Welcome to Chat Room</h1>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </section>
      )}
    </main>
  </div>
  );
}

export default App;

