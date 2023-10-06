import React from "react";
import Counter from "../Components/Counter";
import { useDispatch, useSelector } from "react-redux";
import { addCounter } from "../redux/counterReducer";
import styles from "./Home.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user");
  console.log(currentUser);
  if (currentUser == null || currentUser === undefined) {
    window.location.href = "/login";
  }
  const counters = useSelector((state) => state.counter.counters);
  const dispatch = useDispatch();

  const handleAddCounter = () => {
    dispatch(addCounter());
  };
  const handleLogout = () => {
    localStorage.removeItem("user");

    // Show a success toast
    toast.success("Successfully logged out!");

    // Redirect the user to the login page
    window.location.href = "/login";
  };

  return (
    <div>
      <button onClick={handleAddCounter} className={styles.addButton}>
        Add Counter
      </button>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
      <div className={styles.container}>
        {counters?.map((_, index) => (
          <Counter index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
