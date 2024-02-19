import React, { useEffect, useState } from "react";

import  "./css/navbar.css";
function Summary() {


  
  const[somettext,setState]=useState("")
  const[somedata,setData]=useState("")
  const[maxtext,setText]=useState("")
  const[mintext,setMin]=useState("")
    
  const handleSubmit=(event)=>{ 
    insertArticle()
  setState('')
  }


  const fetchData = async ()=>{
    try{
      const response=await fetch('http://127.0.0.1:5000/summary')
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
		return fetch(`http://127.0.0.1:5000/summary`,{
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
        InsertArticle({somettext,maxtext,mintext})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
  
 

  return (
    
      
    <div className="App">

<h1 className="sentiheadd">Text Summarizer</h1>
    <label className="dk">Enter the text to be summarized</label>
    <br/>
    <br/>
    <form onSubmit={handleSubmit}>
    <textarea
      type={'Text'}
      name='Area'
      value={somettext}
      className="Textareaaa"
      placeholder={'Type here'}
      onChange={event => {
        setState(event.target.value)
      }
    }
    />
    <br/>
    <br/>
    <label className="maxtextt">Max words </label>
    <input
      type={'number'}
      name='max'
      value={maxtext}
      className="maxwhat"
      onChange={event => {
        setText(event.target.value)
      }
    } 
    />
    <label className="mintextt">Min words</label>
    <input
       type={'number'}
       name='min'
       value={mintext}
       className="minwhat"
       onChange={event => {
        setMin(event.target.value)
       }
     } 
    />
    
    <br/>
    <br/>
    <br/>
    <button type='submit' className='Submit_house_detailss'>Summarize</button>
    </form>
    <br/>
    <div className="summarydiv">
    <h1 className="resit">Result</h1>
    <div className="sumdiv">
    {(typeof somedata.summary7 =='undefined')?(
      <>
      <p className="sumy">This might take a moment</p>
      <p className="sumy">loading....</p>
      </>
      ) :(
        <p className="sumy">{somedata.summary7}</p>
      )}
      </div>
    </div>

</div>
    
  );
};

export default Summary
