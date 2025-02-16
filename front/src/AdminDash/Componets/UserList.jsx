import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "../../REDUX/adminSlice";
import { API } from "../../AXIOS";
import { toast } from "react-hot-toast";
import styles from "./UserList.module.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.Admin.userDetails ?? []);

  const handleViewDetails = (uid) => {
    navigate(`/admin/user-list/${uid}`);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await API.get("/allUsers", { withCredentials: true });
        if (res.data.success) {
          dispatch(getAllUserDetails(res.data.userData));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong"
        );
      }
    };
    getUserData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>User Management</h2>
        </div>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Total Appointments</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.length > 0 ? (
              userDetails.map((user, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.userInfo}>
                      {user.user.image ? (
                        <img
                          src={user.user.image}
                          alt=""
                          className={styles.userImage}
                        />
                      ) : (
                        <div className={styles.defaultUserIcon}>
                          {user.user.fullName.charAt(0)}
                        </div>
                      )}
                      <span className={styles.userName}>
                        {user.user.fullName}
                        {user.user.active === "inActive" && (
                          <span className={styles.userBan}>Banned</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.userEmail}>{user.user.email}</span>
                  </td>
                  <td className={styles.tableCell}>{user.appoimetLength}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.statusGroup}>
                      <span
                        className={`${styles.badge} ${styles.badgeCompleted}`}
                      >
                        {user.completedCount} - Completed
                      </span>
                      {/* <span
                        className={`${styles.badge} ${styles.badgePending}`}
                      >
                        {user.penCount} - Pending
                      </span> */}
                      <span
                        className={`${styles.badge} ${styles.badgeCancelled}`}
                      >
                        {user.cancelledCount} - Cancelled
                      </span>
                    </div>
                  </td>

                  <td className={styles.tableCell}>
                    <button
                      onClick={() => handleViewDetails(user.user._id)}
                      className={styles.viewButton}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noUsers}>
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
