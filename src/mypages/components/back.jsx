import styled from 'styled-components';

const BackBtn = ({ onClick }) => {
    return (
    <StyledWrapper>
    <div className="icons">
        <div className="icon-box" onClick={onClick}>
            <button className="left-arrow">
                <span className="line-1" />
                <span className="line-2" />
            </button>
        </div>
    </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .text {
    font-size: 5px;
    position: absolute;
    top: 3px;
    color: #2f363d;
    opacity: 0;
    }
  .icon-box:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 9;
  }
  .icon-box {
    background-color: #ffffff;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 5px;
    transition: all 0.2s ease;
    position: relative;
    cursor: pointer;
  }
  .icon-box:hover .text {
    opacity: 1;
  }
  .icon-box:hover button {
  }
  button {
    background-color: transparent;
    z-index: 0;
    margin-top: 0px;
  }
  
  .left-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 5px;
    height: 5px;
    border: none;
    position: relative;
    transform: rotate(-135deg);
    cursor: pointer;
    margin-left: -2px;
    }
    .left-arrow .line-1 {
    width: 100%;
    height: 100%;
    background-color: #fff;
    }
    .left-arrow .line-1:before {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #2f363d;
    border-radius: 50px;
    position: absolute;
    left: 0;
    top: 0;
    }
    .left-arrow .line-1:after {
    content: "";
    width: 1px;
    height: 100%;
    background-color: #2f363d;
    border-radius: 50px;
    position: absolute;
    right: 0;
    top: 0;
    }
    .left-arrow .line-2 {
    width: 7px;
    height: 1px;
    background-color: #2f363d;
    border-radius: 5px;
    position: absolute;
    transform: translate(-27%, -110%) rotate(-45deg);
    left: 0;
    bottom: 0;
    }
`;

export default BackBtn;
