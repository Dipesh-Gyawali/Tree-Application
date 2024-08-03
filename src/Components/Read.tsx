import { useEffect, useState } from "react";

// const initialData = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "123-456-7890",
//     dob: "1990-01-01",
//   },
//   // Add more initial data as needed
// ];

export const Read = ({ userData }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUsers([parsedData]); // Since you have a single user object, put it in an array
    }
  }, [userData]);

  const handleEdit = (user) => {
    setEditUser(user);
    // Implement functionality to show an edit form/modal
    console.log("Editing user:", user);
  };

  const handleView = (user) => {
    // Implement functionality to show detailed view of user
    console.log("Viewing user:", user);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    console.log("Deleted user with ID:", userId);
  };

  return (
    <div className="container">
      <h2 className="title">User Table</h2>
      <table border="1" className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userData.name}</td>
              <td>{user.userData.email}</td>
              <td>{user.userData.phone}</td>
              <td>{user.userData.dob}</td>
              <td>{user.userData.city}</td>
              <td>{user.userData.district}</td>
              <td>{user.userData.province}</td>
              <td>{user.userData.country}</td>
              <td>
                {user.file && (
                  <img
                    src={user.file}
                    alt="Profile"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleView(user)}>View</button>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
