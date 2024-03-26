import React from "react";
import "../src/sass/pages/_home.scss";
import "../src/sass/base/_typography.scss";
import "../src/sass/base/_utilities.scss";
import "../src/sass/components/_button.scss";

const ImageComp = () => {
  return (
    <>
      <section className="section-about">
        <div className="u-center-text u-margin-bottom-small">
          <h2 className="heading-secondary">
            Exciting tours for adventurous people
          </h2>
        </div>

        <div className="row">
          <div className="col-1-of-2">
            <h3 className="heading-tertiary">
              You are going to fall in love with the nature
            </h3>
            <p className="paragraph">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam debitis maiores nemo est vitae cupiditate culpa. Aliquid
              suscipit quos, ut maxime, ratione officia blanditiis magnam, sequi
              optio nemo quisquam voluptates!
            </p>

            <h3 className="heading-tertiary">
              Live adventures like you have never have before
            </h3>
            <p className="paragraph">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam debitis maiores nemo est vitae cupiditate culpa. Aliquid
              suscipit quos, ut maxime
            </p>

            <a href="" className="btn btn-text">
              Learn more &rarr;
            </a>
          </div>

          <div className="col-1-of-2">
            <div className="composition">
              <img
                src=""
                alt=""
                className="composition__pho to composition__photo--p1"
              />
              <img
                src=""
                alt=""
                className="composition__photo composition__photo--p2"
              />
              <img
                src=""
                alt=""
                className="composition__photo composition__photo--p3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageComp;
