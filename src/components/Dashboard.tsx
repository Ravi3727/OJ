import React from 'react';

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
  ContestCompleted: string[];  // You may need to add this in your backend or adapt it based on your needs
}

interface UserProfileProps {
  user: User;
}

const Dashboard: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="p-8 bg-black/[90] min-h-screen ">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-28">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 mr-4"></div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p>{user.collegeName}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <p>{user.userBio ? user.userBio : "No bio available."}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <p>{user.rating? user.rating : 0}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Problems Solved</h2>
          {user.problemsSolved? (
            <ul className="list-disc pl-5">
              {user.problemsSolved.map((problem, index) => (
                <li key={index} className="mb-2">
                  <span className={`font-bold ${problem.difficulty === 'Easy' ? 'text-green-500' : problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {problem.title}
                  </span> - {problem.status}
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
                <li key={index} className="mb-2">{activity}</li>
              ))}
            </ul>
          ) : (
            <p>No recent Contests.</p>
          )}
        </div>
        
        {user.isProblemSetter && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Problems Added</h2>
            {user.problemsSolved.length > 0 ? (
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
