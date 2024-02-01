
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import { Routes,Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import { doc } from "firebase/firestore";
import { db } from "./firebase";
import { onSnapshot } from "firebase/firestore";
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "./reduxToolkit/Features/UserSlice";
import PrivateRoutes from "./components/PrivateRoutes";
import CreateAPodCast from "./pages/CreateAPodCast";
import PodcastPage from "./pages/PodcastPage";
import PodcastdetailPage from "./pages/PodcastdetailPage";
import CreateAnEpisode from "./pages/CreateAnEpisode";


function App() {

  let dispatch=useDispatch();
  let user=useSelector((data)=>data)
  useEffect(()=>{
      const unsubscribeAuth= onAuthStateChanged(auth,(user)=>{
        if(user)
        { 
          console.log(user);
          const unsubscribesnapshot=onSnapshot(
            doc(db,"users",user.uid),
            (userDoc)=>{
              if(userDoc.exists()){
                const userData=userDoc.data();
                dispatch(
                  setUser(
                    {
                      name:userData.name,
                      email:userData.email,
                      uid:user.uid,
                    }
                  )

                );
              }
            },
            (error)=>{
              console.log("Error Fecting user data:",error)
            }
          )
          
          return () => {
            unsubscribesnapshot();
          };
        }
       });
       return () => {
        unsubscribeAuth();
      };
  },[])
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route element={<PrivateRoutes/>}>
               <Route path="/profile" element={<Profile/>}/>
               <Route path="/create-a-podcast" element={<CreateAPodCast/>}/>
               <Route path="/podcast" element={<PodcastPage/>}/>
               <Route path="/podcast/:id" element={<PodcastdetailPage/>}/>
               <Route path="/podcast/:id/episodes" element={<CreateAnEpisode/>}/>
            </Route>
        </Routes>   
    </div>
  );
}

export default App;
