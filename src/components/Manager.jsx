import React, { useState, useEffect } from 'react'; // Add useState to handle toggle
import './Manager.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordarray, setpasswordarray] = useState([])
  const [form, setform] = useState({
    site: "",
    username: "",
    password: ""
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };



  const savepassword = () => {
    setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
    localStorage.setItem("password", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
    console.log(...passwordarray, form)
    // go to application/local storage in dev tools and then submit the form and then refresh . you will notice that on refresh also you the values will persist 
  }

  // ------- icon of edit and delete ---------
  // Function to delete a password
  const deletePassword = (id) => {
    const updatedPasswords = passwordarray.filter(item => item.id !== id);
    setpasswordarray(updatedPasswords);
    localStorage.setItem("password", JSON.stringify(updatedPasswords));
    console.log("Deleted password with id", id);
  };

  // Function to edit a password
  const editPassword = (id) => {
    console.log("Editing password with id", id);
    const passwordToEdit = passwordarray.find(item => item.id === id);
    setform(passwordToEdit); // Populate the form with the selected password
    const updatedPasswords = passwordarray.filter(item => item.id !== id); // Remove the edited item from the array
    setpasswordarray(updatedPasswords); // Update the array
    localStorage.setItem("password", JSON.stringify(updatedPasswords)); // Update local storage
  };


  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordarray(JSON.parse(passwords))
    }
  }, [])

  return (
    <div>
      <div>
        {/* Background */}
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        {/* Background over */}

        <div className="form-container">
          <div className="box">
            <div className="input-group">
              <input type="text" value={form.site} name='site' onChange={handlechange} placeholder="Enter Website URL" />
            </div>
            <div className="input-group">
              <input type="email" value={form.username} name='username' onChange={handlechange} placeholder="Enter Username" />
              <div className="password-wrapper">
                <input value={form.password} name='password' onChange={handlechange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`eye-icon ${showPassword ? 'eye-open' : 'eye-closed'}`}
                  >
                    {showPassword ? (
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12c-2.22 0-4-1.78-4-4s1.78-4 4-4 4 1.78 4 4-1.78 4-4 4zm0-6.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5z" />
                    ) : (
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12c-2.22 0-4-1.78-4-4s1.78-4 4-4 4 1.78 4 4-1.78 4-4 4zM4.69 17.31l1.42 1.42 2.83-2.83-1.42-1.42-2.83 2.83z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            <button className="submit-btn" onClick={savepassword}>
              <span>Add Password</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="button-icon animated-lock"
              >
                <path
                  d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm-3 8v1h6V7a3 3 0 0 0-6 0v3zm9 3H6v7h12v-7zm-6 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="z-20 text-white w-full">
          <div className="absolute bottom-16 right-16 w-[450px] image-flowing">
            <img src="/shield.png" alt="Shield Image" className="shield-img" />
          </div>
        </div>

      </div>

      {/* ------- password table------- */}

      <div className="passwords">
        <h2 className="font-bold text-3xl py-4 text-center ">
          Your Saved Passwords
        </h2>
        {passwordarray.length === 0 ? (
          <div className="text-center text-gray-300 italic py-8 text-xl">
            No passwords to show
          </div>
        ) : (
          <div className="table-container animate-fade-in-up">
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordarray.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline hover:text-blue-600 transition-colors duration-300"
                        >
                          {item.site}
                        </a>
                        <span
                          className="ml-2 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => copyText(item.site)}
                          title="Copy URL"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <span>{item.username}</span>
                        <span
                          className="ml-2 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => copyText(item.username)}
                          title="Copy Username"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <span>{item.password}</span>
                        <span
                          className="ml-2 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => copyText(item.password)}
                          title="Copy Password"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    {/* -----------edit and Delet-------- */}
                    <td className="actions text-center">
                      {/* Edit Icon */}
                      <button
                        onClick={() => editPassword(item.id)}
                        title="Edit"
                        className="icon-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="url(#editGradient)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animated-icon"
                        >
                          <defs>
                            <linearGradient id="editGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#4caf50" stopOpacity="1" />
                              <stop offset="100%" stopColor="#8bc34a" stopOpacity="1" />
                            </linearGradient>
                          </defs>
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5L20.5 7.5L7 21H3V17L16.5 3.5z" />
                        </svg>
                      </button>

                      {/* Spacing between buttons */}
                      <span className="button-spacing"></span>

                      {/* Delete Icon */}
                      <button
                        onClick={() => deletePassword(item.id)}
                        title="Delete"
                        className="icon-button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="url(#deleteGradient)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animated-icon"
                        >
                          <defs>
                            <linearGradient id="deleteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#f44336" stopOpacity="1" />
                              <stop offset="100%" stopColor="#e57373" stopOpacity="1" />
                            </linearGradient>
                          </defs>
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6L17.8 19a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 6m5 4v6m4-6v6" />
                          <path d="M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>



    </div>
  );
};

export default Manager;
