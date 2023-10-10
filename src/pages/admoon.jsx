import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [locations, setLocations] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { password });
      if (response.data.success) {
        setLoginSuccess(true);
        fetchLocations();
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Define fetchLocations outside of the useEffect hook
  const fetchLocations = async () => {
    try {
      const response = await axios.get("/api/safeHaven");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      fetchLocations();
    }
  }, [loginSuccess]);

  const handleVerify = async (locationId, email) => {
    try {
      const response = await axios.post("/api/verify", { locationId, email });
      if (response.data.success) {
        alert("Verification successful");
        fetchLocations(); // Refetch locations to reflect the updated isVerified status
      }
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {!loginSuccess ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <div>
            {locations ? (
              <>
              <h1 className="text-4xl mt-12 py-4 text-semibold">Welcome Admin</h1>
                <div className="unverified-locations">
                  <h2 className="text-2xl">Unverified Locations</h2>
                  {locations
                    .filter((location) => location.isVerified === "False")
                    .map((location) => (
                      <div
                        key={location._id}
                        className="bg-white max-w-sm w-full p-6 m-4 rounded shadow-lg"
                      >
                        <h2 className="text-xl font-bold mb-2">
                          {location.businessName}
                        </h2>
                        <p>
                          <span className="font-bold">Type:</span>{" "}
                          {location.type}
                        </p>
                        <p>
                          <span className="font-bold">Address:</span>{" "}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            {location.address}
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          <a
                            href={`mailto:${location.contactEmail}`}
                            className="text-blue-600"
                          >
                            {location.contactEmail}
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          <a
                            href={`tel:${location.contactPhone}`}
                            className="text-blue-600"
                          >
                            {location.contactPhone}
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">
                            Additional Information:{" "}
                          </span>
                          {location.additionalInfo}
                        </p>
                        <p>Is this place verified? {location.isVerified}</p>
                        <button
                          onClick={() =>
                            handleVerify(location._id, location.contactEmail)
                          }
                        >
                          Verify
                        </button>
                      </div>
                    ))}
                </div>
                <div className="verified-locations">
                  <h2 className="text-2xl">Verified Locations</h2>
                  {locations
                    .filter((location) => location.isVerified === "True")
                    .map((location) => (
                        <div
                        key={location._id}
                        className="bg-white max-w-sm w-full p-6 m-4 rounded shadow-lg"
                      >
                        <h2 className="text-xl font-bold mb-2">
                          {location.businessName}
                        </h2>
                        <p>
                          <span className="font-bold">Type:</span>{" "}
                          {location.type}
                        </p>
                        <p>
                          <span className="font-bold">Address:</span>{" "}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            {location.address}
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          <a
                            href={`mailto:${location.contactEmail}`}
                            className="text-blue-600"
                          >
                            {location.contactEmail}
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          <a
                            href={`tel:${location.contactPhone}`}
                            className="text-blue-600"
                          >
                            {location.contactPhone}
                          </a>
                        </p>
                        <p>
                          <span className="font-bold">
                            Additional Information:{" "}
                          </span>
                          {location.additionalInfo}
                        </p>
                        <p>This place is verified.</p>
                    
                      </div>
                    
                    
                    ))}
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogin;
