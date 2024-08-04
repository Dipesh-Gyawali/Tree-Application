// Create.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../types";
import "./Create.css";
import { useNavigate } from "react-router-dom";

interface CreateProps {
  onAddUser: (user: User) => void;
}

export const Create: React.FC<CreateProps> = ({ onAddUser }) => {
  const navigate = useNavigate();
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
  const [countries, setCountries] = useState<string[]>([]);
  const provinces = ["1", "2", "3", "4", "5", "6", "7"];
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    file: "",
  });

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country: any) => country.name.common);
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: "" }));
    } else {
      setErrors((prev) => ({ ...prev, file: "Only PNG files are allowed" }));
    }
  };

  const validate = (): boolean => {
    let isValid = true;
    let errors = { name: "", email: "", phone: "", file: "" };

    if (!userData.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!userData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (!userData.phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{7,}$/.test(userData.phone)) {
      errors.phone = "Phone number must be at least 7 digits";
      isValid = false;
    }
    if (!file) {
      errors.file = "Profile picture is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("dob", userData.dob);
    formData.append("city", userData.city);
    formData.append("district", userData.district);
    formData.append("province", userData.province);
    formData.append("country", userData.country);
    if (file) {
      formData.append("file", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          file: base64File,
        };

        onAddUser(newUser);

        const dataToSave = {
          userData,
          file: base64File,
        };
        localStorage.setItem("userData", JSON.stringify(dataToSave));
        console.log("Data saved to local storage:", dataToSave);

        setUserData({
          name: "",
          email: "",
          phone: "",
          dob: "",
          city: "",
          district: "",
          province: "1",
          country: "Nepal",
        });
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else {
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        file: null,
      };

      onAddUser(newUser);

      const dataToSave = {
        userData,
        file: null,
      };
      localStorage.setItem("userData", JSON.stringify(dataToSave));
      console.log("Data saved to local storage:", dataToSave);

      setUserData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        city: "",
        district: "",
        province: "1",
        country: "Nepal",
      });
      setFile(null);
    }
    navigate("/read");
  };

  return (
    <div className="container">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
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
            {provinces.map((province) => (
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
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input type="file" accept="image/png" onChange={handleFileChange} />
          {errors.file && <span className="error">{errors.file}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
