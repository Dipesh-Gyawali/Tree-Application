import { useEffect, useState } from "react";
import "./Create.css"; // Importing CSS file for styling
import { Read } from "./Read";

export const Create = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    district: "",
    province: "1",
    country: "Nepal",
  });
  const [file, setFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const provinces = ["1", "2", "3", "4", "5", "6", "7"];
  ////////////////////////////

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => country.name.common);
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // useEffect(() => {
  //   // Retrieve data from local storage on component mount
  //   const savedData = localStorage.getItem("userData");
  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  //     setUserData(parsedData.userData);
  //     setFile(parsedData.file ? parsedData.file : null);
  //   }
  // }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof file === "undefined") return;
    const formData = new FormData();
    formData.append("file", file);

    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    ////

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result;
        const dataToSave = {
          userData,
          file: base64File,
        };
        localStorage.setItem("userData", JSON.stringify(dataToSave));
        console.log("Data saved to local storage:", dataToSave);

        // Reset the form after saving
        resetForm();
      };
      reader.readAsDataURL(file);
    } else {
      const dataToSave = {
        userData,
        file: null,
      };
      localStorage.setItem("userData", JSON.stringify(dataToSave));
      console.log("Data saved to local storage:", dataToSave);

      // Reset the form after saving
      resetForm();
    }
  };

  const resetForm = () => {
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

  // console.log(file, "fffffff");
  return (
    <>
      <div className="container">
        <h2 className="title">Enter Your Details</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <h3>Address:</h3>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              style={{
                width: "1rem",
              }}
              id="city"
              name="city"
              placeholder="Enter your city"
              value={userData.city}
              onChange={handleChange}
            />
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Enter your district"
              value={userData.district}
              onChange={handleChange}
            />
            <label htmlFor="province">Province:</label>
            <select
              id="province"
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
            <label htmlFor="country">Country:</label>
            <select
              id="country"
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
            <label htmlFor="image">Profile Pic:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div>
        <Read userData={userData} />
      </div>
    </>
  );
};
