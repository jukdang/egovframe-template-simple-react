import Header from "./layout/header.jsx";

const Main = () => {

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div>
          <h1>Main Page</h1>
        </div>
      </div>
    </>
  );
};
export default Main;