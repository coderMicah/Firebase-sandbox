import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  query,
  // where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const collectionRef = collection(db, "books");
const q = query(
  collectionRef,
  orderBy("createdAt")
  // where("author", "==", "jumong"),
  // orderBy("title", "asc")
);

const getBooksByAuthor = () => {
  getDocs(q)
    .then((snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    })
    .catch((err) => console.log(err.message));
};
const getBooks = () => {
  getDocs(collectionRef)
    .then((snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    })
    .catch((err) => console.log(err.message));
};

const addBook = (data) => {
  addDoc(collectionRef, { ...data, createdAt: serverTimestamp() })
    .then((snapshot) => {
      console.log(snapshot.data);
    })
    .catch((err) => console.log(err.message));
};
const deleteBook = (id) => {
  const documentRef = doc(db, "books", id);

  deleteDoc(documentRef)
    .then(() => {
      console.log("Book deleted");
    })
    .catch((err) => console.log(err.message));
};
const createUser = (data) => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((cred) => console.log(cred.user))
    .catch((err) => console.log(err.message));
};
function App() {
  // getBooks();
  getBooksByAuthor();
  const { register, handleSubmit, reset } = useForm();
  const submitAdd = (data) => {
    addBook({ ...data });
    reset();
  };
  const submitDelete = (data) => {
    deleteBook(data.id);
    reset();
  };

  const registerUser = (data) => {
    createUser(data);
    reset();
  };
  const loginUser = (data) => {
    createUser(data);
    reset();
  };
  const logoutUser = () => {
    signOut(auth)
      .then(console.log("User logged out"))
      .catch((err) => console.log(err.message));
    reset();
  };
  return (
    <>
      <form className="add" onSubmit={handleSubmit(submitAdd)}>
        <label htmlFor="title">Title:</label>
        <input {...register("title")} type="text" name="title" required />
        <label htmlFor="author">Author:</label>
        <input {...register("author")} type="text" name="author" required />

        <button>add a new book</button>
      </form>

      <form className="delete" onSubmit={handleSubmit(submitDelete)}>
        <label htmlFor="id">Document id:</label>
        <input {...register("id")} type="text" name="id" required />

        <button>delete a book</button>
      </form>

      <h2>Firebase Auth</h2>

      <form className="signup" onSubmit={handleSubmit(registerUser)}>
        <label htmlFor="email">email:</label>
        <input {...register("email")} type="email" name="email" />
        <label htmlFor="password">password:</label>
        <input {...register("password")} type="password" name="password" />
        <button>signup</button>
      </form>

      <form className="login" onSubmit={handleSubmit(loginUser)}>
        <label htmlFor="email">email:</label>
        <input {...register("loginemail")} type="email" name="email" />
        <label htmlFor="password">password:</label>
        <input {...register("loginpassword")} type="password" name="password" />
        <button>login</button>
      </form>

      <button onClick={handleSubmit(logoutUser)} className="logout">
        logout
      </button>
    </>
  );
}

export default App;
