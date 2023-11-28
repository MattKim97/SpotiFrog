import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
    <div className="FooterStyle">
      <div className="FooterText">These ribbiting frogs made this app:</div>
      <div><a className="FooterLinkStyle" href="https://www.linkedin.com/in/matthew-kim-9ba86a15a/">Matthew Kim 🐸</a></div>
      <div><a className="FooterLinkStyle" href="https://www.linkedin.com/in/william-shauck-153bb0210/">Bill Shauck 🐸</a></div>
      <div><a className="FooterLinkStyle" href="https://www.linkedin.com/in/sophia-t-5a51637a/">Sophia Tsau 🐸</a></div>

    </div>
    <div className="FooterStyle">
    <div className="FooterText">The repo for our frogtastic site can be found here!</div>
    <div><a className="FooterLinkStyle" href="https://github.com/MattKim97/SpotiFrog"> <i className="fa-brands fa-github"></i></a></div>
    </div>
    </>
  );
}
