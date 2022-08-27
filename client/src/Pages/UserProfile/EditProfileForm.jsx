// ===============================================================================================



import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'
// import { Map, InfoWindow, Marker, GoogleApiWrapper, mapStyles } from 'google-maps-react';

// import Geocoder from "react-geocode";


const EditProfileForm = ({ currentUser, setSwitch }) => {

    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [address, setAddress] = useState('')
    const [addr, setAddr] = useState('click here to get location'); 
    // const [address, setAddress] = useState(currentUser?.result?.address)
    const [tags, setTags] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (tags.length === 0 && address === null) {
        //     dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, address: null }))
        // }
        // else if (tags.length === 0) {
        //     dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, address }))
        // }
        // else if (address === null) {
        //     dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, address: null }))
        // }
        // else {
        //     dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, address }))
        // }

        if (tags.length === 0) {
            // address = addr;
            // setAddress(addr);
            // console.log(address + "aallaa");
            // console.log(addr);
            var str = 'click here to get location';
            if(str === addr) {
                dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, address: '' }))
            }
            else {
                dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, address: addr }))
            }
            // console.log(str === addr)
            // dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, address: addr }))
            // dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, addr }))
        }
        else {
            // address = addr;
            // setAddress(addr);
            // console.log(address + "aaa");
            // console.log(addr);
            var str = 'click here to get location';
            if(str === addr) {
                dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, address: '' }))
            }
            else {
                dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, address: addr }))
            }
            // console.log(str === addr);
            // dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, address: addr }))
            // dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, addr }))
        }
        setSwitch(false)
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Your browzer is not supporting");
        }
        else {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                // console.log("Your latitude is " + lat + "& Your longitude is " + lng)
                getCity(lat, lng);

                function getCity(lat, lng) {
                    var xhr = new XMLHttpRequest();
                  
                    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.188cbd0b98282533420003d27362f7b5&lat=" +
                    lat + "&lon=" + lng + "&format=json", true);
                    xhr.send();
                    // xhr.onreadystatechange = processRequest;
                    xhr.addEventListener("readystatechange", processRequest, false);
                  
                    function processRequest(e) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var response = JSON.parse(xhr.responseText);
                            var city = response.address.city;
                            var state = response.address.state;
                            var country = response.address.country;
                            // console.log(response.address);
                            // alert("Your current location is " + city + ", "+ state + ", " + country);
                            const addrr = city + ", " + state + ", " + country; 
                            setAddr(addrr);
                            // console.log(addrr);
                            return;
                        }
                    }
                }

            }, function error(error_message) {
                // for when getting location results in an error
                alert('Error occured, Probably you turn off location', error_message)
            });
        }
    }

    // const getLocation = () => {
    //     if (!navigator.geolocation) {
    //         alert("Your browzer is not supporting");
    //     }
    //     else {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             var lat = position.coords.latitude;
    //             var lng = position.coords.longitude;
    //             alert("Your latitude is " + lat + "& Your longitude is " + lng)
    //         }, function error(error_message) {
    //             // for when getting location results in an error
    //             alert('Error occured, Probably you turn off location', error_message)
    //         });
    //     }
    // }

    return (
        <div>
            <h1 className='edit-profile-title'>
                Edit Your Profile
            </h1>
            <h2 className="edit-profile-title-2">
                Public information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Display name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="about">
                    <h3>About me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Watched tags</h3>
                    <p>Add tags separated by 1 space</p>
                    <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(' '))} />
                </label>

                {/* <label htmlFor="address">
                    <h3>Address</h3>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label> */}

                <label htmlFor="address">
                    <h3>Your Last Location</h3>
                    {/* <p><button value={addr} onClick={getLocation} className='user-cancel-btn' >click here </button> to get current location </p> */}
                    <input type="button" value={addr} onClick={getLocation} />
                    {/* <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
                </label>

                <br />
                <input type="submit" value='Save profile' className='user-submit-btn' />
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
            </form>
            {/* <p><button onClick={getLocation} className='user-cancel-btn' >click here </button> to get current location
            </p> */}
            {/* <Map google={this.props.google}
                style={{ width: "30%", height: "30%" }} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map> */}
            {/* <Map
                google={this.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            /> */}
        </div>
    )
}

export default EditProfileForm

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyCAPJj-S7hmNRzaCYGu4iueBFq6qBQH4H8")
// })(EditProfileForm)