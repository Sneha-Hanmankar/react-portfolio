import React from "react";
import "../src/sass/layout/_grid.scss";
import "../src/sass/base/_utilities.scss";

export const FloatEx = () => {
  return (
    <>
      <h2 className="u-center-text">This demonstrates the use of calc() and mixins</h2>
      <section class="grid-test">
        <div className="row">
          <div class="col-1-of-2">Col 1 of 2</div>
          <div class="col-1-of-2">Col 1 of 2</div>
        </div>

        <div className="row">
          <div class="col-1-of-3">Col 1 of 3</div>
          <div class="col-1-of-3">Col 1 of 3</div>
          <div class="col-1-of-3">Col 1 of 3</div>
        </div>

        <div className="row">
          <div class="col-1-of-3">Col 1 of 3</div>
          <div class="col-2-of-3">Col 2 of 3</div>
        </div>

        <div className="row">
          <div class="col-1-of-4">Col 1 of 4</div>
          <div class="col-1-of-4">Col 2 of 4</div>
          <div class="col-1-of-4">Col 3 of 4</div>
          <div class="col-1-of-4">Col 4 of 4</div>
        </div>

        <div className="row">
          <div class="col-1-of-4">Col 1 of 4</div>
          <div class="col-1-of-4">Col 1 of 4</div>
          <div class="col-2-of-4">Col 2 of 4</div>
        </div>

        <div className="row">
          <div class="col-1-of-4">Col 1 of 4</div>
          <div class="col-3-of-4">Col 3 of 4</div>
        </div>
      </section>
    </>
  );
};
