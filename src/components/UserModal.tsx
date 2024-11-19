import { useEffect, useState } from "react";
import { User } from "../App";
import Input from "./ui/input";

interface props {
  showModal: boolean;
  handleCloseModal: () => void;
  user: User | null;
}

const UserModal: React.FC<props> = ({ showModal, handleCloseModal, user }) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebiste] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  useEffect(() => {
    setName(user?.name || "");
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setCity(user?.address?.city || "");
    setPhone(user?.phone || "");
    setWebiste(user?.website || "");
    setCompany(user?.company.name || "");
  }, [user]);

  return (
    <div
      onClick={handleCloseModal}
      className={`
          fixed inset-0 flex z-30 justify-center items-center transition-colors 
          ${showModal ? "visible bg-black/75" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
            bg-slate-300 rounded-xl shadow transition-all w-[500px] p-10 h-fit rounded-4xl overflow-y-auto
            ${showModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
      >
        <span
          onClick={handleCloseModal}
          className="absolute bg-slate-300 font-bold text-[20px] cursor-pointer top-2 right-4 transition-transhtmlForm hover:scale-125 hover:opacity-50"
        >
          X
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCloseModal();
          }}
        >
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Website
            </label>
            <Input
              value={website}
              onChange={(e) => setWebiste(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Company Name
            </label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full text-center mt-4 rounded"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
