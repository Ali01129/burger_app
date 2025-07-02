import type { store } from "../../redux/store";
import { useSelector } from 'react-redux';
import FooterItem from "./footerItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RootState = ReturnType<typeof store.getState>;

const Footer = () => {

  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();


  const currentUser = useSelector((state: RootState) => state.user.email);
  const islogedin=currentUser?true:false;
  const total=useSelector((state:RootState)=>state.burger.total)
  const lettuce=useSelector((state:RootState)=>state.burger.lettuce)
  const bacon=useSelector((state:RootState)=>state.burger.bacon)
  const cheese=useSelector((state:RootState)=>state.burger.cheese)
  const meat=useSelector((state:RootState)=>state.burger.meat)


  const handleOrderClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate('/result');
  };


  return (
    <footer className="bottom-0 bg-[#cf8f2e] flex flex-col justify-center items-center py-6">
        <div className="flex mb-4">
            <div>Current price:</div>
            <div className="font-bold">${total}</div>
        </div>
        <FooterItem name="Lettuce" iszero={lettuce==0} />
        <FooterItem name="Bacon" iszero={bacon==0} />
        <FooterItem name="Cheese" iszero={cheese==0} />
        <FooterItem name="Meat" iszero={meat==0} />
        {islogedin?(
          <button className="py-3 px-6 border-1 border-[#966909] bg-[#dad735] text-[#966909] text-xl" onClick={handleOrderClick}>ORDER NOW</button>
        ):(
          <button className={(lettuce||bacon||cheese||meat)?"py-3 px-6 border-1 border-[#966909] bg-[#dad735] text-[#966909] text-xl":"py-3 px-6 bg-[#c7c6c6] text-[#888888] text-xl"}>SIGN UP TO ORDER</button>
        )}
        {showModal && (
        <div className="fixed inset-0 bg-opacity-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Your Order Summary:</h2>
             <ul>
              <li>lettuce: {lettuce}</li>
              <li>bacon: {bacon}</li>
              <li>cheese: {cheese}</li>
              <li>meat: {meat}</li>
            </ul>
            <h2 className="text-xl font-semibold my-4">Total Price: ${total}</h2>
            <h2 className="text-lg mb-4">Continue to Checkout?</h2>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-[#966909] font-bold rounded cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-green-500 font-bold rounded cursor-pointer"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer