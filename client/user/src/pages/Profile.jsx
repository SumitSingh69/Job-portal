import React from "react";
import { Phone, Mail, Pencil} from "lucide-react";
import { Link } from "react-router-dom";
import CircularProgress from "../components/CircularProgress";
const TwoColumnLayout = () => {
  return (
    <div className="flex min-h-screen bg-sky-100">
      <div className="w-[35%] h-screen text-black p-5 bg-sky-100">
        <div className="w-full h-[40vh] rounded-md p-6 border-1 border-black bg-white">
            <div className="flex h-[20vh] w-full">
            <div className="h-[14vh] w-[14vh] bg-blue-200 rounded-full overflow-hidden">
              <img className="object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div className="h-[20vh] w-[45vh] ml-5">
                  <div className="h-[3vh] w-full flex items-center justify-between"><h2 className="font-bold">Sumit ki bandi</h2>
                  <Pencil className="w-4 h-4 mr-4"/>
                  </div>
                  <h5>Devops Engineer</h5>
                  <p>Apple</p>
                  <p>March 2024 -  Present </p>
                  <p>California, USA</p>
            </div>
            
            </div>
            <hr className="w-full border-t-2 my-4" />

           <div className="h-[10vh] w-full flex justify-between items-center ">
            <div>
              <p>Total exp</p>
              <h5 className="font-semibold">1 yrs 5 mos</h5>
            </div>
            <div>
              <p>Salary</p>
              <h5 className="font-semibold">INR 1.5Cr</h5>
            </div>
            <div>
              <p>Notice Period</p>
              <h5 className="font-semibold">LWD 30 jul</h5>
            </div>
           </div>
    
        </div>
        <div className="w-full h-[12vh] bg-white rounded-md mt-4 p-4">
            <div className="flex h-[4vh] items-center gap-4"><Phone className="h-4 w-4 ml-4"/>
            <p>2305972120</p>
            <Pencil className="h-4 w-4"/>
            </div>
            <div className="flex h-[4vh] items-center gap-4">
              <Mail className="h-4 w-4 ml-4"/>
              <p>sumitsinghbora.dev@gmail.com</p>
            </div>
        </div>
        <div className="h-[30vh] w-full bg-white rounded-md mt-4 p-4">
          <div className="flex h-[12vh] w-full items-center p-4">
            <div className="w-1/4 h-[10vh] flex justify-center">
              <CircularProgress percentage={75} />
            </div>
            <div className="w-3/4 h-[10vh]">
            <h5>Profile score</h5>
            <p className="text-sm">Recruiters seek 100% profiles - complete yours to stand out!</p>
            </div>
          </div>
          <hr className="w-full border-t-2 my-4" />
        </div>

      </div>

      {/* Right Side (Scrollable) */}
      <div className="w-[65%] p-5 overflow-y-auto h-screen">
        <div className="h-[10vh] w-full flex rounded-md justify-around items-center bg-white">
          <Link to="#education" className="relative text-normal px-4 py-2 rounded-full border-blue-500 
        transition duration-300 ease-in-out hover:shadow-blue-500 hover:shadow-md">Qualifications</Link>
          <Link to="#" className="relative text-normal px-4 py-2 rounded-full border-blue-500 
        transition duration-300 ease-in-out hover:shadow-blue-500 hover:shadow-md">Location</Link>
        <Link to="#" className="relative text-normal px-4 py-2 rounded-full border-blue-500 
        transition duration-300 ease-in-out hover:shadow-blue-500 hover:shadow-md">Work Experience</Link>
        <Link to="#" className="relative text-normal px-4 py-2 rounded-full border-blue-500 
        transition duration-300 ease-in-out hover:shadow-blue-500 hover:shadow-md">Personal Details</Link>

          

        </div>
        <div className="w-[full] h-[30vh] rounded-md bg-white mt-4 p-4">
        <h4 className="font-bold">Drop your resume</h4>
        </div>
        <div className="w-[full] h-[30vh] rounded-md bg-white mt-4 p-4 flex justify-between">
          <h4 className="font-bold">Work Experience</h4>
          <h5 className="font-bold text-xl">+</h5>
        </div>
        <div className="w-[full] h-[30vh] rounded-md bg-white mt-4 p-4 flex justify-between">
          <h4 className="font-bold">Skills</h4>
          <Pencil className="w-4 h-4 mr-4"/>
        </div>
          <div id="education" className="w-[full] h-[30vh] rounded-md bg-white mt-4 p-4 flex justify-between">
          <h4 className="font-bold">Education</h4>
          <h5 className="font-bold text-xl">+</h5>
        </div>

       <div className="w-full h-[25vh] rounded-md bg-white">
       <div className="w-[full] h-[10vh] bg-white mt-4 p-4 flex justify-between">
          <h4 className="font-bold">Job Preferences</h4>
          <Pencil className="w-4 h-4 mr-4"/>
          

          </div>
          <div className="w-full h-[15vh] ml-4">
            <h6 className="text-[#777584] text-sm">Preferred Role</h6>
            <h5>Frontend Executive</h5>
            <h6 className="text-[#777584] mt-2 text-sm">Preferred Location
            </h6>
            <h5>Banglore</h5>
        </div>
       </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
