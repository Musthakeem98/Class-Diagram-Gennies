import "./globals.css"

export default function Home() {
  return (
    <div>
      <div className="menubar">
       <div >
       <a href="/" className="logoLink"> {/* Link to the home page */}
            <img className="logoimage" src="/images/logo.png" alt="logo" />
          </a>
            <a href="/login" className="logintext">Login</a>
            <a href="/class_diagram" className="headders">Generate Class Diagram</a>

       </div>
       <div className="homebody">
        <div className="contentContainer">
          <div className="welcomeText">
            <p className="msgheading">Automate</p>
            <p className="msgheading">Class diagrams</p>
            <p className="msgheading">Effortlessly</p>
            <div className="mb-1"></div>
            <p className="subMsg">Welcome to a revolutionary approach to software modeling,  </p>
            <p className="subMsg">where efficiency reaches new heights.</p>
            <button className="button-style">Generate Diagram</button>
          </div>
          <img className="loginimg" src="/images/stockpic.png" alt="loginpage image" />
        </div>
      </div>
      </div>
    </div>
  );
}
