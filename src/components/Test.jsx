import React, { useEffect, useState } from 'react'

function Test() {
    const [flags, setFlags] = useState({});

    useEffect(()=>{
        fetch('https://flagcdn.com/pt/codes.json')
        .then(response => response.json())
        .then(data => setFlags(data));
    }, []);

  return (
    <div>
        <ul>
            {Object.entries(flags).map(([code,name])=><li key={code}>{code} - {name}</li>)}
        </ul>
    </div>
  )
}

export default Test