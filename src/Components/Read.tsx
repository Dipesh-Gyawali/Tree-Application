import React, { useState } from "react";
import { User } from "../types";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

interface ReadProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
  onEditUser: (user: User) => void;
}

export const Read: React.FC<ReadProps> = ({
  users,
  onDeleteUser,
  onEditUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // State for toast message
  const usersPerPage = 5;

  // Filter and sort logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortUsers = (
    users: User[],
    config: { key: string; direction: "asc" | "desc" } | null
  ) => {
    if (!config) return users;
    const { key, direction } = config;
    return [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedUsers = sortUsers(filteredUsers, sortConfig);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleEdit = (user: User) => {
    onEditUser(user);
    const editItem = users.find((item) => {
      return item.id === user.id;
    });
    console.log(editItem, "editItem");
    navigate(`/edit/${editItem.id}`);
  };

  const handleDelete = (userId: string) => {
    onDeleteUser(userId);
    setToastMessage("User deleted successfully!"); // Set the toast message
  };

  const handlePageChange = (direction: number) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig && prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  return (
    <div className="container-read">
      <h2>User Table</h2>

      <input
        type="text"
        placeholder="Search"
        className="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "20rem", marginLeft: "1rem" }}
      />

      <table border="1" className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig?.key === "name"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig?.key === "email"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.city}</td>
              <td>{user.district}</td>
              <td>{user.province}</td>
              <td>{user.country}</td>
              <td>
                {user.file ? (
                  <img
                    src={user.file}
                    alt="Profile"
                    style={{ width: "50px", height: "50px" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/path/to/fallback/image.png";
                    }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>
                <button
                  style={{ backgroundColor: "cornflowerblue" }}
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  style={{ backgroundColor: "#b30000" }}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="pagination"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          style={{
            width: "20%",
            margin: "0.5rem",
          }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={{
            width: "20%",
            margin: "0.5rem",
          }}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
    </div>
  );
};
