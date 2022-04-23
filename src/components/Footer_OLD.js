import React from "react";
import PropTypes from 'prop-types';


const FooterOLD = ({title, isOpen}) => {
    // const {title, isOpen} = props;
  return (
    <>
      <hr />
      <p style={ { color: 'orange', backgroundColor: 'green' } }>
          &copy; {new Date().getFullYear()} {title}
          { isOpen ? " Open" : " Close" }
      </p>
      <p style={style.text}>Email: nakornthanhai@gmail.com</p>
      <p style={style.text}>Phone: +668-5086-0806</p>
    </>
  );
};

const style = {
    text : {color : 'red'}
};

FooterOLD.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool
}

export default FooterOLD;
