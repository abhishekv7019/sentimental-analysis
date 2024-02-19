import React, { useEffect, useState } from "react";
import  "./css/navbar.css";

function Senti(){

    const[sometext,setState]=useState("");
    const[somereult,setData]=useState('');
    

    const handleSubmit=(event)=>{ 
	    insertArticle()
		setState('')
	  }

    const customStyle ={
      color:"",
      backgroundColor: "white",
      fontSize:"30px"
    }
      if(somereult.Max=="Positive"){
        customStyle.color="green"
      }
      else if(somereult.Max=="Negative"){
        customStyle.color="red"
      }
      else{
        customStyle.color="grey"
      }

      

    const fetchData = async ()=>{
      try{
        const response=await fetch('http://127.0.0.1:5000/freespace1')
        const jsonData=await response.json();
        setData(jsonData)
      }catch(error){
        console.log("Error",error)
      }
      
    }
  
      
      useEffect(() =>{
    fetchData();
    },[]);
    



      function InsertArticle(body){
		return fetch(`http://127.0.0.1:5000/freespace1`,{
      		'method':'POST',
      		 headers : {
      		'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
	.then(response => response.json())
	.then(jsonData => {
		console.log(jsonData);
	  })
	.catch(error => console.log(error))
	}

    const insertArticle = () =>{
        InsertArticle({sometext})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
  

    return(
        <div className="app47">
          
    <h1 className="sentihead">Sentimental Analysis</h1>
    
    <h3 className="sentitext">Enter the text to be analyzed</h3>
    <br/>
    <br/>
    <form onSubmit={handleSubmit}>
    <textarea
      type={'number'}
      name='Area'
      value={sometext}
      className="Textareaa"
      placeholder={'Enter a sentance'}
      onChange={event => {
        setState(event.target.value)
      }
    }
    />
    <br/>
    <br/>
    <button type='submit' className='Submit_house_details'>Submit</button>
    </form>
    <br/>
    <br/>
    <div className="resdiv">
      <h1 className="sentiresult">Result</h1>
      
      <div className="actres">
      {(typeof somereult.Positive =='undefined')?(
        <><h2 style={customStyle}>loading...</h2>
        <p className="fh">Positive<span className="ssp">loading...</span></p>
        <p className="fh">Neutral<span className="ssp">loading...</span></p>
        <p className="fh">Negative<span className="ssp">loading...</span></p>
        </>
      ) :(
        <><h2 style={customStyle}>{somereult.Max}</h2>
        <p className="fh">Positive<span className="ssp">{somereult.Positive}%</span></p>
        <p className="fh">Neutral<span className="ssp">{somereult.Neutral}%</span></p>
        <p className="fh">Negative<span className="ssp">{somereult.Negative}%</span></p>
        </>
      )}
      </div>
      
      </div>
    </div>
    );
}

export default Senti