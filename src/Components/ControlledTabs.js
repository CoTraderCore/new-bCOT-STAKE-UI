import { useState } from 'react';
import Deposit from './Deposit'
import Tabs  from 'react-bootstrap/Tabs';
import Tab  from 'react-bootstrap/Tab';

export default function ControlledTabs(props)
{
    const [key,setKey]=useState('deposit')

    return (
        <Tabs id="controlled-tabs"
        activeKey={key}
        onSelect={(k)=>setKey(k)}
        >
        
        <Tab eventKey="deposit" title="Deposit">
        <Deposit store={props.store}/>
        </Tab>

        <Tab eventKey="withdraw" title="Withdraw">
            Withdraw...
        </Tab>

        <Tab eventKey="stats" title="Stats">
            Stats...
        </Tab>

        </Tabs>
    )
}