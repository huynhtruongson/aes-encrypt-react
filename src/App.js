import { useEffect, useState } from "react";
import "./App.scss";
import { Input, Button, Select, Spin, Modal } from "antd";
import AesCtr from "./encrypt/aes.ctr";
function App() {
  const [data, setData] = useState({
    inputText: "",
    size: "",
    secretKey: "",
    result: "",
  });
  const [SpinActive, setSpinActive] = useState(false);
  const handleError= (content,isErr)=> {
    if(isErr) {
      Modal.error({
        title: 'Error !',
        content
      });
    }
    else {
      Modal.info({
        title: 'Empty Feild !',
        content
      });
    }
  }
  const handleEncrypt = () => {
    const {inputText, size, secretKey} = data
    if(!inputText || !size || !secretKey) {
      handleError('Please input all feild',false)
      return 
    }
    else {
      setSpinActive(true);
      setTimeout(() => {
        const result = AesCtr.encrypt(inputText, secretKey, size);
        setData({ ...data, result });
        setSpinActive(false);
      }, 2000);
    }
  };
  const handleDecrypt = () => {
    const { inputText, secretKey, size } = data;
    if(!inputText || !size || !secretKey) {
      handleError('Please input all feild',false)
      return 
    }
    else {
      setSpinActive(true);
      setTimeout(() => {
        try {
          const result = AesCtr.decrypt(inputText, secretKey, size);
          setData({ ...data, result });
          setSpinActive(false);
        } catch (error) {
          setSpinActive(false)
          setData({...data,result:""})
          handleError('Please check the secret key or size in bits',true)
        }
      }, 2000);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="app">
      <h1 className="app__title">AES Encryption</h1>
      <div className="app__content">
        <div className="app__content__input">
          <label htmlFor="plaintext" className="label">
            Plaintext or Ciphertext
          </label>
          <Input.TextArea
            id="inputText"
            name="inputText"
            placeholder="Enter plaintext or ciphertext"
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={data.inputText}
            onChange={handleChange}
          />
        </div>
        <div className="app__content__input">
          <label htmlFor="secretKey"> Secret key</label>
          <Input
            id="secretKey"
            name="secretKey"
            placeholder="Enter secret key"
            value={data.secretKey}
            onChange={handleChange}
          />
        </div>
        <div className="app__content__select">
          <label htmlFor="size">Key size in bit</label>
          <Select
            showSearch
            onChange={(val) => console.log(val)}
            id="size"
            style={{ width: 100 + "%" }}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onSelect={(val) => setData({ ...data, size: parseInt(val) })}
          >
            <Select.Option value="128">128</Select.Option>
            <Select.Option value="192">192</Select.Option>
            <Select.Option value="256">256</Select.Option>
          </Select>
        </div>
        <div className="app__content__button">
          <Button type="primary" onClick={handleEncrypt}>Encrypt</Button>
          <Button type="primary" danger onClick={handleDecrypt}>
            Decrypt
          </Button>
        </div>
        {SpinActive && (
          <div className="app__content__spin">
            <Spin size="large" />
          </div>
        )}
        {(data.result && !SpinActive) &&  (
          <div className="app__content__input">
            <label htmlFor="result">Result</label>
            <Input.TextArea id="result" name="result" value={data.result} autoSize={{ minRows: 3, maxRows: 5 }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
