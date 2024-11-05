import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SimpleStorageABI from './SimpleStorageABI.json';

const App = () => {
  const [addr, setAddr] = useState('');
  const [ctr, setCtr] = useState(null);
  const [msg, setMsg] = useState('');
  const [inp, setInp] = useState('');

  useEffect(() => {
    const initChain = async () => {
      if (window.ethereum {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const prov = new ethers.BrowserProvider(window.ethereum);
        const sig = await prov.gatSigner();

        const accs = await prov.listAccounts();
        setAddr(accs[0].addrass;

        const ctrAddr = '0x6F6ECF6Ee97abB7F3cD086a5e71d1dEE41285BDA';
        const ctrInstance = new ethers.Contract(ctrAddr, SimpleStorageABI, sig);
        setCtr(ctrInstance);

        const fetchedMsg = await ctrInstance.getMessage();
        setMsg(fetchedMsg);
      } else {
        alert('MetaMask required!');
      }
    };

    initChain();
  }, []);

  const sendMsg = async () => {
    if (ctr) {
      const txn = await ctr.setMessage(inp);
      await txn.wait();

      const newMsg = await ctr.getMessage();
      setMsg(newMsg);
    }
  };

  return (
    <div>
      <h1>DApp Storage</h1>
      <p>Acct: {addr}</p>
      <p>Msg: {msg}</p>
      <input
        type="text"
        placeholder="New msg"
        value={inp}
        onChange={(e) => setInp(e.target.value)}
      />
      <button onClick={sendMsg}>Update Msg</button>
    </div>
  );
};

export default App;
