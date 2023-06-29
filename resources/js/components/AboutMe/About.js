import React from 'react';
import Avatar from 'react-avatar';

function About({user}) {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-3'>
            <h3>About Me</h3>
            <div>
                <Avatar src={user.avatar} name={user.username} size="150" />
            </div>
        </div>
    );
}

export default About;