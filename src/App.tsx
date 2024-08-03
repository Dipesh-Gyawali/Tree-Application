import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Create } from "./Components/Create";
import { Read } from "./Components/Read";
import { Update } from "./Components/Update";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const editUser = (editedUser: User) => {
    setUsers(
      users.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Create onAddUser={addUser} />} />
          <Route
            path="/read"
            element={
              <Read
                users={users}
                onDeleteUser={deleteUser}
                onEditUser={editUser}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={<Update onEditUser={editUser} users={users} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
