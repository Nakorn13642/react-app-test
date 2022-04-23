import styled from "styled-components";
import PropTypes from 'prop-types';

const Title = styled.h1`
    font-size: ${ ({size}) => size }em;
    color: ${ ({primary}) => primary ? "green" : "red" };
    text-align: center;
`;

Title.propTypes = {
    primary: PropTypes.string,
    size: PropTypes.number
}

export default Title;