import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Title from "./styles/title/Title";

//Arrow function
const App = () => {
  const imgWidth = 100;
  const fullname = "PEA";
  let address = <h3>Ubon</h3>;
  const showMsg = () => "Hello Function";
  const isLogin = true;

  const showMe = () => {
    alert("Hello React Event Alert");
  }

  const news = [
    { id: 1, topic: "News 1"},
    { id: 2, topic: "News 2"},
    { id: 3, topic: "News 3"},
  ];

  return (
    <div className="App">
      <header className="App-header">

      <Title primary={false} size={2}>Hello PEA Styled Component 1</Title>
      <Title primary={true} size={1}>Hello PEA Styled Component 2</Title>

      <table border="1" width="300">
          <thead>
            <tr>
              <th>ID</th>
              <th>หัวข้อข่าว</th>
            </tr>
          </thead>
          <tbody>
           {
             news.map( (item, index) => {
               return (
                 <>
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.topic} [{index + 2}]</td>
                      </tr>                  
                 </>
               )
             } )
           }
          </tbody>
        </table>


        <button onClick = {showMe} >Click Me!</button>

        <button onClick = {
          () => {
            alert("Hello React Event Alert click me 2");
          }
        }>Click Me 2 !</button>

        {
        isLogin === true && <h2>ยินดีต้อนรับ คุณ{fullname} </h2>
        }
        {
          isLogin && (
            <>
              <h4>email: nakornthanhai@gmail.com</h4>
              <p>phone number: +66-0000-3434-34344</p>  
            </>
          )
        }
        {
          isLogin ? <p>True</p> : <p>False</p>
        }

        <h1>{fullname}</h1>
        {address}
        {showMsg()}
        <Header />
        <img src={logo} className="App-logo" alt="logo" width={imgWidth + 50} />
        <p>
          แก้ไข <code>src/App.js</code> และ บันทึก เพื่อโหลด.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a>
      </header>
      <Footer title="PEA" isOpen={true}/>
    </div>
  );
};

export default App;
