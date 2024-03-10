import './App.css';

function App() {
  return (
    <>
    <div className="login-form">
      <div className="user-form-container">
        <form className="user-login-form">
          <input
            type="text"
            id="password-inp"
            // value={aadhar}
            // onChange={(e) => {
            //   setAaadhar(e.target.value);
            // }}
            placeholder="User Name"
            required
          />
          <input
            type="password"
            id="password-inp"
            // value={password}
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
            placeholder="Password"
            required
          />
          <button id="user-sub-btn" type="submit">Login</button>
          {/* <input id="user-sub-btn" type="submit"/> */}
        </form>
      </div>
    </div>
  </>
  );
}

export default App;
