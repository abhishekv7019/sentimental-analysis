import React, { useEffect, useState } from "react";
import  "./css/navbar.css"
import Navbar from './Navbar';
const Home = () => {

	const [Area, setState] = useState('')
	const [bedroom, setbed] = useState('')
	const [bathroom, setbath] = useState('')
	const [stories, setstory] = useState('')
	const [basement, setbase] = useState('')
	const [parking, setpark] = useState('')
	const [data,setData]=useState('')


	const handleSubmit=(event)=>{ 
		event.preventDefault()
		insertArticle()
		setState('')
		setbed('')
		setbath('')
		setstory('')
		setbase('')
		setpark('')
		window.location.reload(false);
	  }
	
	const fetchData = async ()=>{
		try{
		  const response=await fetch('http://127.0.0.1:5000/home')
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
		return fetch(`http://127.0.0.1:5000/home`,{
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
        InsertArticle({Area,bedroom,bathroom,stories,basement,parking})
        .then((response) => InsertArticle(response))
        .catch(error => console.log('error',error))
      }
  
	return (
	  <div>
		
		<h1 className='head'>Enter the house details</h1>
		<form onSubmit={handleSubmit}>
		<label >Enter the area required for the house: </label>
		<input
		  type={'number'}
		  name='Area'
		  value={Area}
		  className='areainput'
		  placeholder={'Type here'}
		  onChange={event => {
			setState(event.target.value)
		  }}
		/>
		<br />
		<br />
		<label >Enter the number of bedrooms required of the house: </label>
	    <input
		  type={'number'}
		  name='bedroom'
		  value={bedroom}
		  className='bedroominput'
		  placeholder={'Type here'}
		  onChange={event => {
			setbed(event.target.value)
		  }}
        />
		<br />
		<br />
		<label >Enter the number of bathrooms required of the house: </label>
		<input
		  type={'number'}
		  name='bathroom'
		  value={bathroom}
		  className='bathroominput'
		  placeholder={'Type here'}
		  onChange={event => {
			setbath(event.target.value)
		  }}
        />
		<br/>
		<br/>
        <label >Enter the number of stories required of the house: </label>
		<input
		  type={'number'}
		  name='stories'
		  value={stories}
		  className='storiesinput'
		  placeholder={'Type here'}
		  onChange={event => {
			setstory(event.target.value)
		  }}
        />
		<br/>
		<br/>
		<label >Garden required for the house?</label>
		<input
		  type={'number'}
		  name='basement'
		  value={basement}
		  className='basementinput'
		  placeholder={'1:Yes 0:no'}
		  onChange={event => {
			setbase(event.target.value)
		  }}
        />
		<br/>
		<br/>
		<label >Number of parking floors required for the house?</label>
		<input
		  type={'number'}
		  name='parking'
		  value={parking}
		  className='parkinginput'
		  placeholder={'Type here'}
		  onChange={event => {
			setpark(event.target.value)
		  }}
        />
		<br/>
		<br/>
        <button type='submit' className='Submit_house_details'>Submit</button>
		</form>
		<h1 className="Result">Result</h1>


		{(typeof data.message =='undefined')?(
      <h3 className="result">loading...</h3>
    ) :(
		<h3 className="result">{data.message}</h3>
    )}
		
	  </div>
	)
  }
  

export default Home;
