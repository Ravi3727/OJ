import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { MdOutlineEdit } from "react-icons/md";
interface Problem {
  title: string;
  status: string;
  difficulty: string;
}

interface User {
  username: string;
  email: string;
  userBio: string;
  collegeName: string;
  rating: number;
  isProblemSetter: boolean;
  problemsSolved: Problem[];
  ContestCompleted: string[]; // You may need to add this in your backend or adapt it based on your needs
}

interface UserProfileProps {
  user: User;
}

const Dashboard: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(user.userBio);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const saveBio = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/updateBio", {
        bio: newBio,
        email: user.email,
      });
      console.log(res);
      if (res.status) {
        toast.success("Bio updated successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsSubmitting(false);
      }
      user.userBio = newBio;
      setIsEditingBio(false);
    } catch (error) {
      toast.error(error?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-black/[90] min-h-screen text-white ">
      <div className="max-w-4xl mx-auto bg-black/[90]  rounded-lg p-6 mt-28 border-1 shadow-lg shadow-white">
        <div className="flex items-center justify-center mx-auto mb-6">
          {/* <div className="w-24 h-24 rounded-full bg-gray-200 mr-4"></div> */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-md ">{user.collegeName}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mb-6  items-center justify-center flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          {isEditingBio ? (
            <div>
              <textarea
                value={newBio}
                onChange={handleBioChange}
                className="w-full p-2 border rounded"
              />
              {/* <button
                onClick={saveBio}
                className="mt-2 mr-2 bg-blue-500 text-white py-1 px-3 rounded"
              >
                Save
              </button> */}

              <Button
                className="bg-blue-800 text-white hover:bg-blue-600"
                type="submit"
                disabled={isSubmitting}
                onClick={saveBio}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                    Loading
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <button
                onClick={() => setIsEditingBio(false)}
                className="mt-4 ml-4 bg-gray-500 text-white py-2  px-3 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center w-full p-1">
              <p>{user.userBio ? user.userBio : "No bio available."}</p>
              <button
                onClick={() => setIsEditingBio(true)}
                className="mt-2 text-black py-1 px-3 rounded text-2xl"
              >
                <MdOutlineEdit />
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <p>{user.rating ? user.rating : 0}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Problems Solved</h2>
          {user.problemsSolved ? (
            <ul className="list-disc pl-5">
              {user.problemsSolved.map((problem, index) => (
                <li key={index} className="mb-2">
                  <span
                    className={`font-bold ${
                      problem.difficulty === "Easy"
                        ? "text-green-500"
                        : problem.difficulty === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {problem.title}
                  </span>{" "}
                  - {problem.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No problems solved yet.</p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          {user.ContestCompleted ? (
            <ul className="list-disc pl-5">
              {user.ContestCompleted.map((activity, index) => (
                <li key={index} className="mb-2">
                  {activity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent Contests.</p>
          )}
        </div>

        {user.isProblemSetter && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Problems Added</h2>
            {user.problemsSolved  ? (
              <ul className="list-disc pl-5">
                {user.problemsSolved.map((problem, index) => (
                  <li key={index} className="mb-2">
                    {problem.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No problems added yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
