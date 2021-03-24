import { useState } from 'react';
import Tabs  from 'react-bootstrap/Tabs';
import Tab  from 'react-bootstrap/Tab';
import Claimable from './Claimable'
import NonClaimable from './NonClaimable'



export default function ControlledWithdrawTabs(props)
{
    const [key,setKey]=useState('claimable')

    return (
     
        <Tabs id="controlled-tabs"
        activeKey={key}
        onSelect={(k)=>setKey(k)}
        >
        
        <Tab eventKey="claimable" title="Claimable">
        <Claimable store={props.store} key={key}/>
        </Tab>

        <Tab eventKey="nonClaimable" title="Non-Claimable">
        <NonClaimable store={props.store}/>
        </Tab>

        

        </Tabs>
        
    )
}