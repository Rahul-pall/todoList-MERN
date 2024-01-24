import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
const Todo = () => {
  const [data, setData] = useState("");
  const [todoData, setTodoData] = useState([]);
  const refData = useRef("");

  const getdata= async ()=>{
   const data= await axios.get("http://localhost:3001/get")
   .then(result=>{setTodoData(result.data)})
   console.log(data)
  }
  
  useEffect(() => {
    refData.current.focus();
    getdata();
  },[]);

  const handleAdd = (e) => {
     e.preventDefault();
    refData.current.focus();
    setData("")
    axios.post("http://localhost:3001/add",{data})
    .then(val=>{location.reload()})
    .catch(err=>{console.log(err)})
    console.log("data send")
  };

  const handleUpdate= async(id)=>{
   await axios.put("http://localhost:3001/update"+id)
   .then(val=>{location.reload()})
   .catch((err)=>{console.log(err)})
  }

  const handleDelete= async(id)=>{
              await axios.delete("http://localhost:3001/delete"+id)
              .then(val=>{location.reload()})
              .catch((err)=>{console.log(err)})
  }
  return (
    <div className="h-[100vh] w-[100%] bg-[rgba(0,0,0,0.9)] text-white flex justify-center items-center font-serif">
      <div className="min-w-96 min-h-96">
        <h1 className="text-center text-3xl mb-5">TODO LIST</h1>
        <div className="w-[100%] h-[100%] shadow-lg shadow-[rgba(255,255,255,0.11)] border border-[rgba(255,255,255,0.11)] rounded-lg p-5">
          <div className="w-[100%] flex">
            <input
              type="text"
              value={data}
              ref={refData}
              onChange={(e) => {
                setData(e.target.value);
              }}
              className="w-[100%] rounded-l-3xl p-2 bg-transparent border outline-none pl-6"
              required
            />
            <Button btn="Add" handleAdd={handleAdd} />
          </div>
          <div className="mt-4 relative">
            {todoData.length === 0 ? (
              <h1 className="text-center mt-8">Nothing found here</h1>
            ) : (
              todoData.map((todo, index) => {
                return (
                  <div key={index} className="bg-white text-black rounded-3xl flex item-center p-2 justify-between m-2 cursor-pointer"
                  >
                    <p  className={`${todo.done==true?"cutmsg":""} w-64`} 
                    onClick={()=>{handleUpdate(todo._id)}}
                    >
                      {todo.data}
                    </p>
                     <p onClick={()=>handleDelete(todo._id)}
                     className="pl-10"
                     ><MdDelete className="text-2xl"/></p>
                  </div>  
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
