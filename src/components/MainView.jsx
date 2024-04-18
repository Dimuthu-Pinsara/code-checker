import React, {useEffect, useRef,useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainView() {
    const [formData,setFormData] = useState({
        message:''
    });

    const handleInput = (e) =>{
        const {id,value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const getCode = formData.message.replace(/\s/g, "");
        const allBrackets = /[\[\]{}()\"]/g;
        const getBrackets = getCode.match(allBrackets);
        const removeOtherCharacters = getBrackets ? getBrackets.join('') : '';
        console.log(removeOtherCharacters);
        if(removeOtherCharacters == ""){
            toast.info("This is Text", {});
        }else{
            checkCode(removeOtherCharacters);
        } 
    }

    function checkCode(removeOtherCharacters){

        const openingTypes ={
            '{':'}',
            '(':')',
            '[':']',
            '"':'"'
        };
        const bracketOrder = [];

        for (let i = 0; i < removeOtherCharacters.length; i++) {
            if (removeOtherCharacters[i] in openingTypes) {
                bracketOrder.push(removeOtherCharacters[i]);
            } else if (bracketOrder.length > 0 && openingTypes[bracketOrder[bracketOrder.length - 1]] === removeOtherCharacters[i]) {
                bracketOrder.pop();
            } else {
                toast.error("Some brackets are not correctly closed", {});
                return;
            }
        }

        if (bracketOrder.length === 0) {
            toast.success("Code is Perfect.", {
            });
        } else {
            toast.error("Some brackets are not correctly closed", {});
        }
    }

    return (
        <>
        <ToastContainer />
            <div className="container mx-auto min-h-screen h-full">
                <div className="main-wrap grid grid-cols-1 lg:grid-cols-2 justify-center align-center h-full min-h-screen">
                    <div className="heading-wrap flex items-center justify-center flex-col">
                        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Code</span> Checker.</h1>
                        <p className="text-lg font-normal text-gray-500 lg:text-xl">Check brackets in your code block Easily.. </p>
                    </div>
                    <div className="content-wrap  flex items-center justify-center">
                        <form className="w-full mx-auto" onSubmit={formSubmit}>
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 text-left">Enter Your Code.....</label>
                            <textarea id="message" rows="20" value={formData.message} onInput={handleInput} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>

                            <button type="submit" className="px-6 py-3.5 mt-4 w-3/5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">Check</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainView