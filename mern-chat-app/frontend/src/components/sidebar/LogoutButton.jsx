import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useState, useEffect } from "react"; // Add useEffect import
import { getUserStatus, updateUserStatus } from "../../../../backend/controllers/user.controller"; // Import getUserStatus function

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    const [status, setStatus] = useState("AVAILABLE"); // State for user status

    // Function to fetch user status when the component mounts
    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await getUserStatus(); // Fetch user status from the backend
                setStatus(response.status); // Update local state with the fetched status
            } catch (error) {
                console.error("Error fetching user status:", error);
            }
        };

        fetchUserStatus(); // Call the fetchUserStatus function when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

    // Function to handle status change
    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus); // Update local state
        try {
            await updateUserStatus(newStatus); // Update user status in the backend
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    return (
        <div className='mt-auto'>
            {/* Render status change buttons */}
            <div className="flex justify-center mb-4">
                <button className={`mr-2 ${status === "AVAILABLE" ? "bg-green-500" : "bg-gray-500"} text-white px-4 py-2 rounded w-32`} onClick={() => handleStatusChange("AVAILABLE")}>Available</button>
                <button className={`ml-2 ${status === "BUSY" ? "bg-red-500" : "bg-gray-500"} text-white px-4 py-2 rounded w-32`} onClick={() => handleStatusChange("BUSY")}>Busy</button>
            </div>
            {/* Render logout button */}
            {!loading ? (
                <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};

export default LogoutButton;
