import React from "react";
import {  Link } from "react-router-dom";
import  "./css/navbar.css"

const Navbar = () => {

    const customStyle ={
        fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
        color:"white"
      }
   

	return (
		<><nav >
			<ul className="ele">
                <li className="navele">
                <Link to="/" className="link">
                    <h2 style={customStyle} className="hover">AI</h2>
                    </Link>
                </li>
                <li className="navele11">
                <Link to="/" className="link">
                <h2 style={customStyle} className="hover" >Home</h2>
					</Link>
                </li>
                <li className="navele">
                <Link to="/Summary" className="link">
                <h2 style={customStyle} className="hover">Summarizer</h2>
					</Link>
                </li>

            </ul>
        </nav>
        
			
		</>
	);
};

export default Navbar;
