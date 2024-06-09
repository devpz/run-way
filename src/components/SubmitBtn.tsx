import React from "react";
import { useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

interface SubmitBtnProps {
  text?: string;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDemo = true;

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
      onClick={(e) => {
        if (isDemo) {
          e.preventDefault();
          toast.error("This functionality is disabled in DEMO version");
        }
      }}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
