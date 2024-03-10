import { Badge, Card, CardContent, Typography } from "@mui/joy";
import "./App.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, onSnapshot, query } from "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCdFr6Cj7bVZa4VZddusiIsFw8rEt2ncDg",
  authDomain: "lilgardeno.firebaseapp.com",
  projectId: "lilgardeno",
  storageBucket: "lilgardeno.appspot.com",
  messagingSenderId: "1045527408301",
  appId: "1:1045527408301:web:e3ec536336149b76152024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




function App() {
  const [status, setStatus] = useState({
    temp:0,
    humidity:0,
    atomizerOn:false,
    fanOn:false,
    HeaterOn:false,
  });
  useEffect(() => {
    const q = query(collection(db, "status"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const status = {};
      querySnapshot.forEach((doc) => {
          status[doc.id]=doc.data().value;
      });
      setStatus(status)
    });
  
    return ()=>{
      unsubscribe()
    }
  }, [])
  console.log(status)
  return (
    <div className="App">
      <div className="row">
        <Card size="lg" variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 100 }} level="title-md">
              {status.temp} C
            </Typography>
            <Typography>Temprature</Typography>
          </CardContent>
        </Card>

        <Card size="lg" variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 100 }} level="title-md">
              {status.humidity}%
            </Typography>
            <Typography>Humidity</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="row">
      <Badge color={status.heater ? "success" : "danger"}>
          <Card size="lg" variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 40 }} level="title-md">
                {status.heater ? "On" : "Off"}
              </Typography>
              <Typography>Heater</Typography>
            </CardContent>
          </Card>
        </Badge>
        <Badge color={status.fan ? "success" : "danger"}>
          <Card size="lg" variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 40 }} level="title-md">
                {status.fan ? "On" : "Off"}
              </Typography>
              <Typography>Fan</Typography>
            </CardContent>
          </Card>
        </Badge>

        <Badge color={status.atomizer ? "success" : "danger"}>
          <Card size="lg" variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 40 }} level="title-md">
                {status.atomizer ? "On" : "Off"}
              </Typography>
              <Typography>Atomizer</Typography>
            </CardContent>
          </Card>
        </Badge>
      </div>
    </div>
  );
}

export default App;
