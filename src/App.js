import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ParticlesBg from 'particles-bg';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
// import { ClarifaiStub, grpc} from 'clarifai-nodejs-grpc';

// const app = new Clarifai.App({
//   apiKey: 'c62fa43570144aad9f66ea3fb84e14dc'
// });
// const stub = ClarifaiStub.grpc();
// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key YOUR_CLARIFAI_API_KEY");


const setupClarifaiRequest = (imageUrl) => {
  const PAT = '8ddc2f45bf7d45a8aa88796d107fde22';
  const USER_ID = '3m0w5dyav745';       
  const APP_ID = 'Face-Detection';
  const MODEL_ID = 'face-detection';  
  const IMAGE_URL = imageUrl;
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  return {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  calculateFaceLocation = (data) => {
    console.log(data.results[0].region_info.bounding_box);
    const clarifaiFace = data.results[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
      } else {
        console.log("doesn't get a response");
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else if (route === 'signin' || 'register'){
      this.setState({isSignedIn: false})
    }
  }

  onClear = () => {
    this.setState({input: ""});
    this.setState({imageUrl: ""});
  }


  render() {
    const { imageUrl, route, isSignedIn, input } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <ParticlesBg type="cobweb" bg={true} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={name} entries={entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} onClear={this.onClear} input={input}/>
              <FaceRecognition imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
          }
      </div>
    );
  }
}

export default App;
