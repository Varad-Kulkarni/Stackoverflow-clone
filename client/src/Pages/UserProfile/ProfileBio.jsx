import React from 'react'
import './UsersProfile.css'

const ProfileBio = ({ currentProfile }) => {
    return (
        <div>
            <div>
                {
                    currentProfile?.tags !== [] ? (
                        <>
                            <h4>Tags watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) : (
                        <p>0 tags watched</p>
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>about</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }
            </div>

            {/* <div>
                {
                    currentProfile?.address ? (
                        <>
                           <h4>Address</h4>
                           <p>{currentProfile?.address}</p>
                           {console.log(currentProfile)}
                        </>
                    ) : (
                        <p>No {currentProfile?.address}</p>
                    )
                }
            </div> */}

            <div>
                {
                    currentProfile?.address !== null ? (
                        <>
                            <h4>Address
                                {/* {console.log(currentProfile)} */}
                            </h4>
                            <p>{currentProfile?.address}</p>
                        </>
                    ) : (
                        <p>No address found</p>
                    )
                }
            </div>

        </div>
    )
}

export default ProfileBio