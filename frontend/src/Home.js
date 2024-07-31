import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const data = [
  {
    image: require("../src/img1.jpg"),
    caption: "Discover the Latest Trends",
    description:
      "Stay ahead with insights on trending topics and industry updates.",
  },
  {
    image: require("../src/img2.jpg"),
    caption: "In-Depth Guides and Tutorials",
    description:
      "Master new skills with our comprehensive how-to guides and tutorials.",
  },
  {
    image: require("../src/img3.jpg"),
    caption: "Expert Opinions and Interviews",
    description:
      "Get inspired by expert opinions and exclusive interviews with industry leaders.",
  },
];

function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="inner">
      <div style={{ display: "block", width: "100%" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {data.map((slide, i) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide.image}
                  alt="slider image"
                  height={500}
                />
                <Carousel.Caption>
                  <h3>{slide.caption}</h3>
                  <p>{slide.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <h2>Welcome to Our Blog!</h2>
        <p className="ps-3 fs-5 fst-italic">
          Your Go-To Source for Insightful Articles and Expert Advice We are
          dedicated to bringing you the latest and most valuable content across
          various topics. Whether you're looking to stay informed on industry
          trends, gain new skills, or be inspired by stories and interviews, our
          blog has something for everyone.
        </p>
      </div>
      <div className="d-flex flex-column align-items-center mt-3 mb-3">
        <h2>Explore Our Categories</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 ps-3 mt-0 pe-3 fs-5 ">
          <div className="col">
            <div className="card">
              <div className="card-header fw-bold">Technology</div>
              <ul className="list-group list-group-flush fst-italic">
                <li className="list-group-item background">
                  Stay updated with the latest advancements in technology, from
                  AI innovations to software development trends.
                </li>
                <li className="list-group-item background">
                  Our tech experts break down complex topics into
                  easy-to-understand articles.
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header fw-bold">Health & Wellness</div>
              <ul className="list-group list-group-flush fst-italic">
                <li className="list-group-item background">
                  Discover tips and advice on maintaining a healthy lifestyle.
                </li>
                <li className="list-group-item background">
                  From mental health and fitness routines to nutritious recipes,
                  our wellness section has you covered.
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header fw-bold">Business & Finance</div>
              <ul className="list-group list-group-flush fst-italic">
                <li className="list-group-item background">
                  Navigate the world of business with confidence.
                </li>
                <li className="list-group-item background">
                  Read about market trends, financial tips, and strategies for
                  growing your career or business.
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header fw-bold">Lifestyle</div>
              <ul className="list-group list-group-flush fst-italic">
                <li className="list-group-item background">
                  Discover captivating travel destinations, innovative home
                  decor ideas, and tips for personal development.
                </li>
                <li className="list-group-item background">
                  Explore hobbies and interests to enrich your daily life and
                  find your next passion.
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header fw-bold">Education</div>
              <ul className="list-group list-group-flush fst-italic">
                <li className="list-group-item background">
                  Enhance your knowledge with articles on learning new skills,
                  academic insights, and career development.
                </li>
                <li className="list-group-item background">
                  Empower yourself with tips and strategies for professional
                  growth.
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header fw-bold">Entertainment</div>
              <ul className="list-group list-group-flush fst-italic">
                <li className="list-group-item background">
                  Stay up-to-date with the latest in movies, TV shows, music,
                  and celebrity news.
                </li>
                <li className="list-group-item background">
                  Dive into reviews, interviews, and behind-the-scenes looks at
                  your favorite entertainment.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <h2>Join Our Community</h2>
        <p className="ps-3 fs-5 fst-italic">
          Become a part of our growing community of readers. Subscribe to our
          newsletter to receive the latest articles, exclusive content, and
          special offers straight to your inbox. Follow us on social media and
          join the conversation!
        </p>
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <h2>Write for Us</h2>
        <p className="ps-3 fs-5 fst-italic">
          Have a story to share or an expert opinion? We welcome guest
          contributions! Check out our guidelines and submit your article to be
          featured on our blog.
        </p>
      </div>
    </div>
  );
}

export default Home;
