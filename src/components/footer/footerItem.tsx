import { useDispatch } from 'react-redux';
import { Increment,Decrement } from '../../redux/slices/burgerSlice';

type data={
    name:string,
    iszero:boolean
}

const FooterItem = ({name,iszero}:data) => {
  const dispatch=useDispatch();

  return (
    <div className="flex my-2">
        <div className="font-bold w-24">{name}</div>
        <button disabled={iszero} className={iszero?`border-1 border-[#7e7365] px-6 py-1 text-white bg-[#ac9980]`:`border-1 border-[#aa6817] px-6 py-1 text-white bg-[#d39952] hover:bg-[#daa972]`} onClick={()=>dispatch(Decrement({ingredient:name}))}>
          Less
        </button>
        <button className="border-1 border-[#aa6817] px-6 py-1 text-white bg-[#8f5e1e] hover:bg-[#99703f] ml-2" onClick={()=>dispatch(Increment({ingredient:name}))}>
          More
        </button>
    </div>
  )
}

export default FooterItem