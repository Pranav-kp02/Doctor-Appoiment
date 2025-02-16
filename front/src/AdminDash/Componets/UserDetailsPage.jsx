import React, { useEffect, useState } from "react";
import styles from "./UserDetailsPage.module.css";
import { banuser, getUserData } from "../../REDUX/adminSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";

const UserDetailsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state
  const userDetails = useSelector((state) => state.Admin.userDataSolo ?? null);

  const { uid } = useParams();

  useEffect(() => {
    const getAdminDash = async () => {
      try {
        const res = await API.get(`/userDetailsAdmin/${uid}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(getUserData(res.data.dataUser));
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
        setLoading(false);
      }
    };

    getAdminDash();
    window.scrollTo(0, 0);
  }, [dispatch, uid]);

  const handleBanUser = async () => {
    try {
      const res = await API.post(
        `/banUser/${uid}`,
        { status: "inActive" },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("User has been banned successfully!");
        dispatch(banuser(res.data.active));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to ban user";
      toast.error(errorMessage);
    }
  };

  const handleUnBan = async () => {
    try {
      const res = await API.post(
        `/unbanUser/${uid}`,
        { status: "Active" },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("User has been Unbanned successfully!");
        dispatch(banuser(res.data.active));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to ban user";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2 className={styles.title}>User Details</h2>
        </header>

        <div className={styles.contentWrapper}>
          <section className={styles.userDetailsSection}>
            {userDetails ? (
              <div className={styles.userDetails}>
                <div className={styles.imageWrapper}>
                  <img
                    src={userDetails.user.image || "/defaultImage.png"}
                    alt={userDetails.user.fullName}
                    className={styles.userImage}
                  />
                </div>

                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    <strong>Name:</strong>{" "}
                    <span>{userDetails.user.fullName || "N/A"}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Email:</strong>{" "}
                    <span>{userDetails.user.email || "N/A"}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Gender:</strong>{" "}
                    <span>{userDetails.user.gender || "N/A"}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>DOB:</strong>{" "}
                    <span>{userDetails.user.dob || "N/A"}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Phone:</strong>{" "}
                    <span>{userDetails.user.phone || "N/A"}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>No user details available</div>
            )}
            {userDetails.user.active === "Active" ? (
              <button onClick={handleBanUser} className={styles.banButton}>
                Ban User
              </button>
            ) : (
              <button onClick={handleUnBan} className={styles.unbanButton}>
                Un-Ban User
              </button>
            )}
          </section>

          <section className={styles.appointmentsSection}>
            <div className={styles.appointmentsSection}>
              <h3 className={styles.tableHeader}>Appointments</h3>

              <div className={styles.horizontalTable}>
                <div className={styles.tableRow}>
                  <div className={styles.tableHeaderColumn}>
                    <strong>Status</strong>
                  </div>
                  <div className={styles.tableHeaderColumn}>
                    <strong>Date & Time</strong>
                  </div>
                  <div className={styles.tableHeaderColumn}>
                    <strong>Fee</strong>
                  </div>
                  <div className={styles.tableHeaderColumn}>
                    <strong>Doctor</strong>
                  </div>
                </div>

                {userDetails.appoiment.length > 0 ? (
                  userDetails.appoiment.map((booking, index) => (
                    <div key={index} className={styles.tableRow}>
                      <div className={styles.tableColumn}>
                        <span className={styles[booking.status]}>
                          {booking.status}
                        </span>
                      </div>
                      <div className={styles.tableColumn}>
                        {booking.slotBookedDate}, {booking.slotBookedTime}
                      </div>
                      <div className={styles.tableColumn}>${booking.fees}</div>
                      <div className={styles.tableColumn}>
                        {booking.docData.fullName}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noAppointments}>
                    No appointments available
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
