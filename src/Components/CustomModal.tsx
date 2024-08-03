import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ showModal, setShowModal, id }) => {
  const allusers = useSelector((state) => state.app.users);

  const singleUser = allusers.find((ele) => ele.id === id);
  console.log("singleuser", singleUser);

  return (
    <div className="modalBackground">
      <div key={singleUser.id} className="modalContainer">
        <button onClick={() => setShowModal(false)}>Close</button>
        <h2>name: {singleUser.name}</h2>
        <h3>email:{singleUser.email}</h3>
        <h4>age:{singleUser.age}</h4>
        <p>gender:{singleUser.gender}</p>
      </div>
    </div>
  );
};

export default CustomModal;
