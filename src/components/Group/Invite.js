import React from 'react'

const Invite = ({close}) => {
  return (
    <div className='absolute'>
        <div className='absolute-content invite'>
            <button className='absolute-close' onClick={() => close(false)}>
                <i className='fa fa-times'></i>
            </button>
            <h1>Invite</h1>
            <hr/>
            <div className="account d-flex">
                <img alt='profile' src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
                <span style={{flex: 1}}>
                    <h2>amueso</h2>
                    <p>Group Admin</p>
                </span>
                <button className='btn btn-gray'>Invite</button>
            </div>
            <div className="account d-flex">
                <img alt='profile' src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
                <span style={{flex: 1}}>
                    <h2>amueso</h2>
                    <p>Group Admin</p>
                </span>
                <button className='btn btn-gray'>Invite</button>
            </div>
            <div className="account d-flex">
                <img alt='profile' src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
                <span style={{flex: 1}}>
                    <h2>amueso</h2>
                    <p>Group Admin</p>
                </span>
                <button className='btn btn-gray'>Invite</button>
            </div>
        </div>
    </div>
  )
}

export default Invite