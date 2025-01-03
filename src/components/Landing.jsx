import logo from "../assets/logo.png";
import style from "../style/Landing.module.css";
import left from "../assets/left.png";
import right from "../assets/right.png";
import bigpic from "../assets/bigpic.png";
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function Landing() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <div className={style.container}>
        <nav className={style.navbar}>
          <div className={style.outfitLogo}>
            <img src={logo} alt="Logo" />
            <h1>FormBot</h1>
          </div>
          <div className={style.btn}>
            <button className={style.signIn} onClick={()=>navigate("/login")}>Sign in</button>
            <button className={style.createForm} onClick={()=>navigate("/login")}>Create a FormBot</button>
          </div>
        </nav>

        <div className={style.main}>
            <div className={style.pic}>
                <img src={left} alt="left"/>
            </div>
            <div className={style.content}>
                <h1 className={style.gra}>Build advanced chatbots <br/>visually</h1>
                <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them<br/>
                anywhere on your web/mobile apps and start collecting results like magic.</p>
                <button onClick={()=>navigate("/login")}>Create a FormBot for Free</button>
            </div>
            <div className={style.pic}>
                <img src={right} alt="right"/>
            </div>
        </div>
        <img src={bigpic} alt="bigpic"/>
        <br/><br/>
        <br/><br/>
      </div>


        <div className={style.footer}>
            <div className={style.data1}>
                <div className={style.header1}>
                    <img src={logo} alt="Logo"/>
                    <p>FormBot</p>
                </div>
                <p>Made with ❤️ by</p>
                <a href="#">@cuvette</a>
            </div>   
            <div className={style.data2}>
                <p className={style.header2}>Product</p>
                <a href="#">Status<GoLinkExternal /></a>
                <a href="#">Documentation<GoLinkExternal /></a>
                <a href="#">Roadmap<GoLinkExternal /></a>
                <a href="#">Pricing</a>
            </div>
            <div className={style.data3}>
                <p className={style.header3}>Community</p>
                <a href="#">Discord<GoLinkExternal /></a>
                <a href="#">GitHub repository<GoLinkExternal /></a>
                <a href="#">Twitter<GoLinkExternal /></a>
                <a href="#">Linkedln<GoLinkExternal /></a>
                <a href="#">OSS Friends</a>
                
            </div>
            <div className={style.data4}>
                <p className={style.header4}>Company</p>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>

            </div>
  
        </div>
    </div>
  );
}

export default Landing;
