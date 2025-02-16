import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./DoctorProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { API } from "../../AXIOS";
import { updateDoctordata } from "../../REDUX/docAthetication";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = useSelector((state) => state.DoctorAth.doctor ?? []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {
      const res = await API.put(`/docProf/${defaultValues.id}`, data, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(updateDoctordata(res.data.doctor));
        setIsEditing(false);
        toast.success(res.data.message || "update successfull");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Doctor Profile</h2>
        {!isEditing && (
          <button onClick={handleUpdateClick} className={styles.updateButton}>
            <span>✏️</span>
            Update Profile
          </button>
        )}
      </div>

      <div className={styles.mainContent}>
        {/* Content Section */}
        <div className={styles.contentSection}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image Section */}
            <div className={styles.profileImageSection}>
              <div className={styles.imageContainer}>
                <div className={styles.imagePlaceholder}>
                  <img src={defaultValues.image} alt="docimg" />
                </div>
                <span className={styles.availableBadge}>Available</span>
              </div>
            </div>

            <div className={styles.infoGrid}>
              {/* Personal Information */}
              <div className={styles.infoGroup}>
                <div>
                  <label className={styles.label}>Full Name</label>
                  {isEditing ? (
                    <input
                      className={styles.inputField}
                      type="text"
                      {...register("fullName", { required: true })}
                    />
                  ) : (
                    <p className={`${styles.value} ${styles.fontSemibold}`}>
                      {defaultValues.fullName}
                    </p>
                  )}
                  {errors.fullName && (
                    <span className={styles.errorText}>
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className={styles.label}>Specialty</label>
                  {isEditing ? (
                    <input
                      className={styles.inputField}
                      type="text"
                      {...register("speciality", { required: true })}
                    />
                  ) : (
                    <p className={`${styles.value} ${styles.fontSemibold}`}>
                      {defaultValues.speciality}
                    </p>
                  )}
                  {errors.specialty && (
                    <span className={styles.errorText}>
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className={styles.label}>Email</label>
                  {isEditing ? (
                    <input
                      className={styles.inputField}
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                  ) : (
                    <p className={styles.value}>{defaultValues.email}</p>
                  )}
                  {errors.email && (
                    <span className={styles.errorText}>
                      Enter a valid email
                    </span>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className={styles.infoGroup}>
                <div>
                  <label className={styles.label}>Degree</label>
                  {isEditing ? (
                    <input
                      className={styles.inputField}
                      type="text"
                      {...register("degree", { required: true })}
                    />
                  ) : (
                    <p className={`${styles.value} ${styles.fontSemibold}`}>
                      {defaultValues.degree}
                    </p>
                  )}
                  {errors.degree && (
                    <span className={styles.errorText}>
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className={styles.label}>Experience</label>
                  {isEditing ? (
                    <input
                      className={styles.inputField}
                      type="text"
                      {...register("experience", { required: true })}
                    />
                  ) : (
                    <p className={styles.value}>{defaultValues.experience}</p>
                  )}
                  {errors.experience && (
                    <span className={styles.errorText}>
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className={styles.label}>Consultation Fee</label>
                  {isEditing ? (
                    <input
                      className={styles.inputField}
                      type="number"
                      {...register("fees", { required: true, min: 0 })}
                    />
                  ) : (
                    <p
                      className={`${styles.value} ${styles.fontSemibold} ${styles.fee}`}
                    >
                      ₹{defaultValues.fees}
                    </p>
                  )}
                  {errors.fee && (
                    <span className={styles.errorText}>
                      Please enter a valid fee amount
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className={styles.aboutSection}>
              <label className={styles.aboutLabel}>About</label>
              {isEditing ? (
                <textarea
                  className={styles.textareaField}
                  rows="4"
                  {...register("about", { required: true })}
                ></textarea>
              ) : (
                <p className={styles.aboutText}>{defaultValues.about}</p>
              )}
              {errors.about && (
                <span className={styles.errorText}>This field is required</span>
              )}
            </div>

            {/* Save and Cancel Buttons */}
            {isEditing && (
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
