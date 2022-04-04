import React, {useState} from "react";
import About from './GroupAbout'
import Discussion from './GroupDiscussion'
import Members from './GroupMembers'
import Invite from './Invite'

const Group = () => {
  const [selected, setSelected] = useState(1)
  const [invite, setInvite] = useState(false)

  return (
    <div className='group'>
      <div className='cover'>
        <button>Upload Image</button>
      </div>
      <div className='info'>
        <div className="d-flex justify-content-between">
          <h1>amueso</h1>
          <button className="btn-purple btn btn-primary" onClick={() => setInvite(true)}>Join</button>
        </div>
        <span className="d-flex">
          <p className="mx-2">Public Group</p>
          <p className="mx-2">10 Member</p>
        </span>
        <div className='nav'>
          <button className={`${selected === 1 && 'selected'}`} onClick={() => setSelected(1)}>About</button>
          <button className={`${selected === 2 && 'selected'}`} onClick={() => setSelected(2)}>Discussion</button>
          <button className={`${selected === 3 && 'selected'}`} onClick={() => setSelected(3)}>Members</button>
        </div>
      </div>
      {selected === 1 && <About/>}
      {selected === 2 && <Discussion/>}
      {selected === 3 && <Members/>}
      {invite && <Invite close={setInvite}/>}
    </div>
  );
};

export default Group;
