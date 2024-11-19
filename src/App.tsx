// UserList.tsx
import React, { useState, useEffect } from "react";
import UserModal from "./components/UserModal";

// Define the interface for the user object
export interface User {
  // TO DO: Define the properties of the user object
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// TO DO: Define any other interfaces required to access all properties of the user object

const API_URL: string = "https://jsonplaceholder.typicode.com/users";

const UserList: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Function for fetching users from the API
  const fetchUsers = async () => {
    setIsLoading(true);
    // TO DO: Fetch users from the API, handle loading and error states
    await fetch(API_URL)
      .then((res) => res.json())
      .then((res: User[]) => {
        setUsers(res);
        setError(null);
      })
      .catch(() => setError("failed to load data please try again later..."));

    setIsLoading(false);
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Render the component
  return (
    <div className="flex items-center justify-center h-screen bg-slate-500">
      {/* TO DO: display simple view with the following: ui for isLoading, errors (if any) & table for displaying users, with a select field for managing user selection*/}
      {isLoading ? (
        <svg
          width="150"
          height="150"
          fill="white"
          className="mr-2 animate-spin"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
        </svg>
      ) : (
        <>
          {error ? (
            <h1 className="text-[32px] text-white">{error}</h1>
          ) : (
            <table className="text-left text-white text-sm text-surface">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    City
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Company Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-neutral-200 dark:border-white/10"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.address.city}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.website}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.company.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <img
                        onClick={() => handleSelectUser(user)}
                        src="change.svg"
                        className="cursor-pointer hover:scale-[1.15] transition-transform"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <UserModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
};

export default UserList;
