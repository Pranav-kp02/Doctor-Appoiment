import React from "react";
import styles from "./LatestBookings.module.css";

const LatestBookings = ({ bookings = [] }) => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Bookings</h2>
      </div>

      {/* Table Header */}
      <div className={styles.tableHeader}>
        <div className={styles.patientColumn}>Patient</div>
        <div className={styles.statusColumn}>Status</div>
        <div className={styles.dateColumn}>Date & Time</div>
        <div className={styles.feeColumn}>Fee</div>
        {/* <div className={styles.actionColumn}>Action</div> */}
      </div>

      {/* Bookings List */}
      <div className={styles.bookingsList}>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className={styles.bookingRow}>
              <div className={styles.patientColumn}>
                <img
                  src={booking.userData.image || "/api/placeholder/32/32"}
                  alt=""
                  className={styles.patientImage}
                />
                <span>{booking.userData.fullName}</span>
              </div>

              <div className={styles.statusColumn}>
                <div>
                  {booking.status === "pending" && (
                    <span className={styles.statusPending}>Pending</span>
                  )}
                  {booking.status === "approve" && (
                    <span className={styles.statusApproved}>Approved</span>
                  )}
                  {booking.status === "completed" && (
                    <span className={styles.statusCompleted}>Completed</span>
                  )}
                  {booking.status === "cancelled" && (
                    <span className={styles.cancelledBadge}>cancelled</span>
                  )}
                </div>
              </div>

              <div className={styles.dateColumn}>
                {booking.slotBookedDate}, {booking.slotBookedTime}
              </div>

              <div className={styles.feeColumn}>${booking.fees}</div>

              {/* <div className={styles.actionColumn}>
                {booking.status === "pending" && (
                  <div className={styles.actionButtons}>
                    <button className={styles.completeButton}>Complete</button>
                    <button className={styles.cancelButton}>Cancel</button>
                  </div>
                )}
              </div> */}
            </div>
          ))
        ) : (
          <div className={styles.noBookings}>No bookings available</div>
        )}
      </div>
    </div>
  );
};

export default LatestBookings;
