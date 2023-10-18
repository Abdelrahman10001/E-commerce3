import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,  faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
export default function Footer() {
  
  return (
    <>
      <footer className=" p-5 text-white text-center">
        <div className="container-fluid p-5">
          <div className="row">
            {/* is there is not a size in bootstrap smaller than (sm) */}
            <div className="col-md-4 my-md-0 my-sm-2">
              <h3>LOCATION</h3>
              <p>2215 John Daniel Drive</p>
              <p>Clark, MO 65243</p>
            </div>
            <div className="col-md-4 my-md-0 my-sm-4">
              <h3>AROUND THE WEB</h3>
              <div className="mediaIcons d-flex justify-content-center">
                <div className="icon d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faFacebook} className="fa-lg" style={{ color: '#ffffff' }} />
                </div>
                <div className="icon d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faTwitter} className="fa-lg" style={{ color: '#ffffff' }} />
                </div>
                <div className="icon d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faLinkedinIn} className="fa-lg" style={{ color: '#ffffff' }} />
                </div>
                <div className="icon d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faGlobe} className="fa-lg" style={{ color: '#ffffff' }} />

                </div>
                
              </div>
            </div>
            <div className="col-md-4 my-md-0 my-sm-4">
              <h3>ABOUT FREELANCER</h3>
              <p>
                Freelance is a free to use, licensed Bootstrap theme created by
                Route
              </p>
            </div>
          </div>
        </div>
      </footer>
      <p className=" bg-dark text-white text-center p-3 mb-0">
        Copyright © Your Website 2021
      </p>
    </>
  );
}
