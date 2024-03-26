import React from "react";
import "../src/sass/layout/_grid.scss";
import "../src/sass/base/_utilities.scss";
import "../src/sass/components/_story.scss";
import "../src/sass/components/_bg-video.scss";

export const Stories = () => {
  return (
    <>
      <section className="section-stories">
        <div className="bg-video">
          <video controls autoPlay className="bg-video__content" muted>
            <source
              src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
              type="video/mp4"
            />
            <source src="/img/video.webm" type="video/webm" />
            Your video is not supported
          </video>
        </div>
        <div className="u-center-text u-margin-bottom-big">
          <h3 className="heading-secondary">We make people genuinely happy</h3>
        </div>
        <div className="row">
          <div className="story">
            <figure className="story__shape">
              <figcaption className="story__caption">Mary Smith</figcaption>
            </figure>
            <div className="story__text">
              <h3 className="heading-tertiary u-margin-bottom-small">
                I had the best week ever with my family
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
