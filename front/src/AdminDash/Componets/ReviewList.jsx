import React, { useEffect, useState } from "react";
import { API } from "../../AXIOS"; // Ensure this is correctly set up
import toast from "react-hot-toast";

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await API.get("/adminReview", { withCredentials: true });
      if (res.data.success) {
        setReviews(res.data.review);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await API.delete(`/docDeleteReview/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Review deleted");
        setReviews(reviews.filter((review) => review._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error deleting review");
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4"> Manage Reviews</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.name}</td>
                  <td>{review.email}</td>
                  <td>{review.message}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteReview(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewList;
