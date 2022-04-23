import React from "react";

// Learn React Hooks
const Header = () => {
  // let title = "PEA UBON";
  const [title, setTitle] = React.useState("PEA Ubon"); 

  // ทำงานทุกครั้งที่มีการ re render หน้า UI (parent รวมไปถึง child ของตัวมันเอง) ใหม่ 
  React.useEffect ( () => {
    console.log("use effect header component");
  });

  // ทำงานแค่รอบเดียว 
  React.useEffect ( () => {
    console.log("use effect header component แค่ครั้งเดียว");
  }, [] );

  // ทำงานเฉพาะเงื่อนไขที่เราต้องการ 
  React.useEffect ( () => {
    console.log("use effect header component ทำทุกครั้งที่ title มีการเปลี่ยนค่า");
  }, [title] );  

  // Effect with cleanup 
  React.useEffect ( () => {
    console.log("effect with cleanup");
    return () => {
      console.log("exit")
    }
  }, [] );   

  const mouseOver = () => {
    // alert("Hello World");
    // title = "PEA KTM"; <<< cannot work
    setTitle("Hello Ubon");
  }

  return (
    <>
        <h1 onMouseOver={mouseOver}>{title}</h1>
    </>
  );
};

export default Header;
