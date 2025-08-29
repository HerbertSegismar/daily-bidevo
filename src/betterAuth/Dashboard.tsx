// Dashboard.tsx
import { useAuth } from "./AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <button
        onClick={logout}
        style={{
          padding: "10px 15px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
