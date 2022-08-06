// ===============================================================================================



import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'

import Geocoder from "react-geocode";


const EditProfileForm = ({ currentUser, setSwitch }) => {

    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [address, setAddress] = useState('')
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
            dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags, address }))
        }
        else {
            dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, address }))
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
                alert("Your latitude is " + lat + "& Your longitude is " + lng)
            }, function error(error_message) {
                // for when getting location results in an error
                alert('Error occured, Probably you turn off location', error_message)
            });
        }
    }

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

                <label htmlFor="address">
                    <h3>Address</h3>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>

                <br />
                <input type="submit" value='Save profile' className='user-submit-btn' />
                <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
            </form>
            <p><button onClick={getLocation} className='user-cancel-btn' >click here </button> to get current location
            </p>
        </div>
    )
}

export default EditProfileForm