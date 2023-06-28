import React from 'react';
import Avatar from 'react-avatar';

function About({user}) {
    return (
        <div className='container'>
            <h3>About Me</h3>
            <div>
                <Avatar src={user.avatar} name={user.username} size="100" />
            </div>
        </div>
    );
}

export default About;