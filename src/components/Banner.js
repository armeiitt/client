import React from "react";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements

register();
export default function Banner() {
  return (
    <div>
      <swiper-container>
        <swiper-slide>
          <div>
            <div class="swiper-slide">
              <img src="https://skins.minimog.co/cdn/shop/files/cake_slide_1.jpg" />
              <div class="swiper-slide-transform">
                <div>
                  <h4 class="heading-title">
                    Little bliss in
                    <br />
                    Every bite
                  </h4>
                  <p>
                    Special fluffiness for your loved one! A thoughtful
                    expression through good food and warm experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="swiper-slide">
              <img src="https://skins.minimog.co/cdn/shop/files/cake_slide_2.jpg" />
              <div class="swiper-slide-transform">
                <div>
                  <h4 class="heading-title">
                    Little bliss in
                    <br />
                    Every bite
                  </h4>
                  <p>
                    Special fluffiness for your loved one! A thoughtful
                    expression through good food and warm experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="swiper-slide">
              <img src="https://skins.minimog.co/cdn/shop/files/cake_slide_3.jpg" />
              <div class="swiper-slide-transform">
                <div>
                  <h4 class="heading-title">
                    Little bliss in
                    <br />
                    Every bite
                  </h4>
                  <p>
                    Special fluffiness for your loved one! A thoughtful
                    expression through good food and warm experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
}
