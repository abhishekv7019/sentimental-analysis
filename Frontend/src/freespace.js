import React, { useEffect, useState } from "react";

import  "./css/navbar.css";
function Freespace() {


  const [file, setFile] = useState();

    function handleChange(e) {

        console.log(e.target.files);

        setFile(URL.createObjectURL(e.target.files[0]));

    }
 

  return (
    
      
    <div className="App">

 <h2>Add Image:</h2>

<input type="file" onChange={handleChange} />

<img src={file} className="imgprev" />


</div>
    
  );
};

export default Freespace 

