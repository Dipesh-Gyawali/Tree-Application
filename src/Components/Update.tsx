import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types";

interface UpdateProps {
  users: User[];
  onEditUser: (user: User) => void;
}

export const Update: React.FC<UpdateProps> = ({ users, onEditUser }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userToEdit = users.find((user) => user.id === id);

  const [userData, setUserData] = useState<Omit<User, "id" | "file">>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    district: "",
    province: "1",
    country: "Nepal",
  });
  const [file, setFile] = useState<File | null>(null);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (userToEdit) {
      setUserData({
        name: userToEdit.name,
        email: userToEdit.email,
        phone: userToEdit.phone,
        dob: userToEdit.dob,
        city: userToEdit.city,
        district: userToEdit.district,
        province: userToEdit.province,
        country: userToEdit.country,
      });
      setInitialImageUrl(userToEdit.file);
    }
  }, [userToEdit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Only PNG files are allowed");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedUser: User = {
      ...userData,
      id: id!,
      file: file ? previewUrl! : userToEdit?.file,
    };

    onEditUser(editedUser);
    navigate("/read");
  };

  return (
    <div className="container">
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={userData.district}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Province:</label>
          <select
            name="province"
            value={userData.province}
            onChange={handleChange}
          >
            {["1", "2", "3", "4", "5", "6", "7"].map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={userData.country}
            onChange={handleChange}
          >
            {["Nepal", "India", "China"].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input type="file" accept="image/png" onChange={handleFileChange} />
          {previewUrl ? (
            <div>
              <img
                src={previewUrl}
                alt="Profile"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ) : (
            initialImageUrl && (
              <div>
                <img
                  src={initialImageUrl}
                  alt="Profile"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )
          )}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
