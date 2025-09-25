import { css } from "@emotion/css";
import { Link } from "react-router-dom"; // Import Link for routing

const Landing = () => {
  return (
    <div
      className={css`
        position: relative;
        background-color: #fff8f0;
        width: 100%;
        min-height: 100vh; /* Changed from fixed height to be responsive */
        overflow-x: hidden;
        text-align: left;
        font-size: 48px;
        color: #ff6b35;
        font-family: system-ui;
        display: flex;
        flex-direction: column; /* Allow content to flow vertically */
      `}
    >
      {/* Header Section */}
      <div
        className={css`
          width: 100%;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid #fff4e6;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 11px 64px;
          flex-wrap: wrap; /* Allow items to wrap on smaller screens */
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 3px;
          `}
        >
          <img
            className={css`
              width: 75px; /* Adjusted size */
              height: auto;
              object-fit: cover;
            `}
            alt="Mentorly Logo"
            src="/graduate-hat@2x.png"
          />
          <div
            className={css`
              font-size: 48px; /* Matched from original */
              display: flex;
              align-items: center;
            `}
          >
            Mentorly
          </div>
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 24px;
            font-size: 20px;
          `}
        >
          <Link
            to="/signin"
            className={css`
              text-decoration: none;
              color: #ff6b35;
              border-radius: 4px;
              background-color: #fff4e6;
              padding: 10px 20px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={css`
              text-decoration: none;
              color: #ffffff;
              border-radius: 4px;
              background-color: #ff6b35;
              box-shadow: 1px 2px 4px rgba(255, 107, 53, 0.25);
              padding: 10px 20px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 50px 64px;
          flex-grow: 1;
          flex-wrap: wrap; /* Allow hero content to wrap */
          gap: 20px;
        `}
      >
        <div
          className={css`
            max-width: 600px;
          `}
        >
          <div
            className={css`
              font-size: 64px;
              line-height: 1.2;
            `}
          >{`Accessible and tailored mentorship experience `}</div>
          <div
            className={css`
              margin-top: 20px;
              font-size: 24px;
              color: #000;
            `}
          >
            Find mentors to develop your skills and connect with like minded
            individuals.
          </div>
          <div
            className={css`
              margin-top: 30px;
              display: flex;
              gap: 20px;
              font-size: 20px;
            `}
          >
            <button
              className={css`
                border-radius: 4px;
                background-color: #fff4e6;
                border: 1px solid #ff6b35;
                padding: 15px 30px;
                color: #ff6b35;
                cursor: pointer;
              `}
            >
              Learn More
            </button>
            <Link
              to="/signup"
              className={css`
                text-decoration: none;
                color: #ffffff;
                border-radius: 4px;
                background-color: #ff6b35;
                box-shadow: 1px 2px 4px rgba(255, 107, 53, 0.25);
                padding: 15px 30px;
              `}
            >
              Create Account
            </Link>
          </div>
        </div>
        <img
          className={css`
            max-width: 600px; /* Responsive image */
            width: 100%;
            height: auto;
          `}
          alt="Mentoring illustration"
          src="/mentoring-illustration.svg"
        />
      </div>

      {/* Footer */}
      <div
        className={css`
          width: 100%;
          background-color: #ff6b35;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
          font-size: 16px;
          color: #fff8f0;
          text-align: center;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 13px;
            font-size: 72px; /* Adjusted size */
          `}
        >
          <img
            className={css`
              width: 120px; /* Adjusted size */
              height: auto;
              object-fit: cover;
            `}
            alt=""
            src="/graduate-hat1@2x.png"
          />
          <b>Mentorly</b>
        </div>
        <div
          className={css`
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            gap: 32px;
            flex-wrap: wrap;
            justify-content: center;
          `}
        >
          <Link
            to="/privacy"
            className={css`
              color: white;
              text-decoration: none;
            `}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={css`
              color: white;
              text-decoration: none;
            `}
          >
            Terms and conditions
          </Link>
          <Link
            to="/sitemap"
            className={css`
              color: white;
              text-decoration: none;
            `}
          >
            Sitemap
          </Link>
          <Link
            to="/legal"
            className={css`
              color: white;
              text-decoration: none;
            `}
          >
            Legal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
