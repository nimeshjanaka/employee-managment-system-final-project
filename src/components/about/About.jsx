import { Card } from "antd";
import React from "react";

const About = () => {
  return (
    <div>
      <h1
        style={{ marginBottom: "50px", fontSize: "36px", fontWeight: "bold" }}
      >
        BLOCKCHAIN & WEB3
      </h1>
      <span>
        Perfectus operates at the cutting edge of Web 3.0 innovation. With our
        team of 25+ experienced engineers, we develop bespoke Web 3.0 solutions
        for enterprises of all sizes, making use of the latest developments in
        the space to create products and assets that stand out.
      </span>
      <div style={{ display: "flex", background: "#01312B" }}>
        <Card>
          <h1>Vision</h1>
          <span>
            Our aim is to help corporations worldwide become more efficient,
            confident and secure in their adoption of Web 3.0 technologies. We
            aspire to become one of the Top 10 blockchain companies in the
            world, leading by example as we accelerate and promote the mass
            adoption of Web 3.0.
          </span>
        </Card>
        <Card>
          <h1>Mission</h1>
          <span>
            Our mission is to promote the adoption of blockchain technologies
            and digital currencies for a range of professional industries, and
            to a wider general audience. Through our work, we are preparing the
            world for the next phase of the internet’s evolution – Web 3.0 –
            with an emphasis on digital identity, digital assets,
            interoperability, and a stable means of digital payment.
          </span>
        </Card>
      </div>
    </div>
  );
};

export default About;
