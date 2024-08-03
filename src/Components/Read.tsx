import React, { useState, useEffect } from "react";
import { User } from "../types";

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
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleEdit = (user: User) => {
    onEditUser(user);
  };

  const handleDelete = (userId: string) => {
    onDeleteUser(userId);
  };

  const handlePageChange = (direction: number) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="container">
      <h2>User Table</h2>
      <table border="1" className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
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
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
