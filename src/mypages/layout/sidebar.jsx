import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {

  const modelId = 'model2'; // Example modelId, replace with actual data as needed
  const snbTitles = [
    { modelId: 'model1', title: 'Model 1' },
    { modelId: 'model2', title: 'Model 2' },
    { modelId: 'model3', title: 'Model 3' },
  ];

  const writer = {
    name: 'John Doe',
    department: 'Engineering',
    position: 'Developer',
    description: 'Passionate about building scalable web applications.'
  };

  const [snbOpen, setSnbOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(true);

  

  return (
    <>
    <SnbStyle>
      <div className={`snb_wrap h-full overflow-hidden ${snbOpen ? 'open w-72' : 'close w-0'} transition-all duration-300 ease-in-out`}>
        <LRToggleButton open={snbOpen} onClick={() => setSnbOpen(!snbOpen)} />

        <nav className={`snb w-72 transition-all duration-300 ease-in-out ${snbOpen ? 'translate-x-0 opacity-100' : '-translate-x-72 opacity-0'}`}>
          <div className="snb_menu">
            {snbTitles.map(item => (
              <Link to={`/models/document/${item.modelId}`} key={item.modelId} className={`${item.modelId === modelId ? 'on' : ''}`}>
                <span>{item.title}</span>
                <i className="fas fa-angle-right"></i>
              </Link>
            ))}
            
          </div>

          <div className="snb_intro_wrap">
            <UDToggleButton open={profileOpen} onClick={() => setProfileOpen(!profileOpen)} />
            <span className="snb_intro_tit"><i className="fas fa-user-circle"></i>프로필 정보</span>


            <div className="snb_intro">
              <figure><img src="/assets/images/profile_basic.jpg" alt="프로필 이미지" /></figure>
              <div>
                <p>
                  <i>by</i> <b>{writer.name}</b>
                </p>
                <em>{writer.department} {writer.position}</em>
              </div>
              <p>{writer.description != null ? writer.description : 'description'}</p>

            </div>
          </div>

        </nav>
      </div>
    </SnbStyle>



    </>
  );

};

const LRToggleButton = ({ open, onClick }) => {
  return (
    <button type="button" 
      className={`absolute left-72 snb_hinged_btn flex items-center justify-center 
      border-b border-r border-[#ddd] rounded-bl-[3px] rounded-br-[3px] cursor-pointer
      transition-all duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-72'}`}
      onClick={onClick}>
      <span className={`transform transition-transform duration-200 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
        aria-hidden="true"
        >
          <path d="M8 6 l4 4 -4 4" />
        </svg>
      </span>
    </button>
  );
};

const UDToggleButton = ({ open, onClick }) => {
  return (
    <button type="button" className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 hover:text-blue-600"
      onClick={onClick}>
      <span className={`transform transition-transform duration-200 ease-in-out ${open ? "rotate-0" : "rotate-180"}`}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
        aria-hidden="true"
        >
          <path d="M6 8 l4 4 4 -4" />
        </svg>
      </span>
    </button>
  );
};


const SnbStyle = styled.div`


/* snb */
.snb { 
  position: relative;
  display: flex; 
  flex-direction: column; 
  flex-wrap: wrap; 
  justify-content: space-between; 
  gap: 10px; 
  height: 100%; 
  padding: 20px; 
  background: #fff; 
  border-right: 1px solid #ddd; 
}




.snb_wrap.in .snb_hinged_btn { transform: translateX(-280px); } */


#snb_hinged_btn { transform: translateX(0px); transition: transform 0.3s; }
.snb_hinged_btn {width: 32px; height: 32px; background: #fff; }
.snb_hinged_btn:hover { color: #387ac3; background: #f7fafc; }


.snb_hide .snb_menu { height: calc(100% - 58px); }
.snb_hide .snb_intro { display: none; }
.snb_hide .snb_intro_tit { display: block; color: #777; }
.snb_hide .snb_intro_tit i { margin-right: 5px; color: #aaa; }

.snb_menu { overflow: auto; height: calc(100% - 316px); }
.snb_menu a { display: flex; justify-content: space-between; align-items: center; gap: 5px; padding: 10px 12px; color: #555; font-size: 15px; }
.snb_menu a:hover { color: #000; }
.snb_menu a.on { color: #0852c0; background: #f0f3fa; border-radius: 5px; font-weight: 500; }
.snb_menu a i { color: #777; opacity: 0; }
.snb_menu a:hover i { color: #ccc; opacity: 1; }
.snb_menu a.on i { color: #7fa6e1; opacity: 1; }

.snb_intro_wrap {position: relative; overflow: auto; max-height: 310px; padding: 16px; background: #f7f7f7; border-radius: 5px; font-size: 14px; }
/* .snb_intro_wrap { position: relative; overflow: auto; max-height: 310px; padding: 16px; background: #f7f7f7; border-radius: 5px; font-size: 14px; } */



.snb_intro { text-align: center; }

.snb_intro_tit { display: none; }

.snb_intro figure { overflow: hidden; width: 60px; height: 60px; margin: 0 auto 10px; background: #fff; border-radius: 50%; }
.snb_intro figure img { width: 60px; height: 60px; object-fit: cover; }

.snb_intro > div { margin-bottom: 8px; font-size: 15px; }
.snb_intro > div p i { color: #777; }
.snb_intro > div p b { font-weight: 600; }
.snb_intro > div em { color: #3b67c0; font-weight: 600; }

.snb_intro > p { color: #777; }

.snb_intro > span { display: inline-block; margin-top: 16px; margin-bottom: 10px; }
.snb_intro > span em { display: inline-block; margin-bottom: 2px; color: #777; }

.snb_intro > ul { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
.snb_intro > ul li a { padding: 2px 6px; color: #777; background: #fff; border: 1px solid #ddd; border-radius: 3px; }
.snb_intro > ul li a i { margin-right: 4px; color: #aaa; font-size: 12px; }
.snb_intro > ul li a:hover,
.snb_intro > ul li a:hover i { color: #0852c0; }



/* Tablet */
@media screen and (max-width: 839px){
	/* snb */
	#snb { height: calc(100% - 54px); padding: 16px; }
	.snb_hinged_btn { top: 65px; width: 24px; height: 24px; }
	.snb_menu { height: calc(100% - 284px); }
	.snb_intro_wrap { max-height: 274px; padding: 10px 12px; }
	.snb_intro figure,
	.snb_intro figure img { width: 50px; height: 50px; }
	.snb_intro > p { margin-bottom: 10px; }
	.snb_intro > ul li a { font-size: 13px; }

}
`;
export default Sidebar;