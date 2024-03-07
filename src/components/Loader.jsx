import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="Loader-div">
      <ThreeDots visible={true} height="80" width="80" color="#3f51b5" ariaLabel="three-dots-loading" />
    </div>
  );
};

export default Loader;
