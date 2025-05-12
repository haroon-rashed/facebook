import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { decorativeData } from './data/Decorative_data'

const BackGroundThemes = ({setShowBg, showBg, setSelectedColor}) => {
  return (
    <>
      <div className={`xl:w-full bg-white absolute p-2 lg:w-full md:w-full -translate-y-full ${showBg ? "translate-x-0" : "translate-x-full"}  w-full shadow rounded-md`}>
  <div className='grid grid-cols-3 mb-1'>
    <div onClick={()=>setShowBg(false)} className='col-span-1 cursor-pointer h-[40px] w-[40px] rounded-full bg-gray-200 flex justify-center items-center '>
      <IoIosArrowRoundBack size={20}/>
    </div>
    <h3 className='text-xl col-span-1 whitespace-nowrap'>Choose Background</h3>
    <div className='col-span-1'></div>
  </div>
  <hr className='mb-2'/>

  <div className='space-y-4 h-[400px] overflow-y-scroll'>
    {decorativeData?.map((item, index) => (
      <div key={index}>
        <h3 className='capitalize'>{item.title}</h3>
        <div className='grid grid-cols-5 gap-3'>
          {item.list.map((item2, index2) => (
            <div onClick={()=>{
              index == 2 ? setSelectedColor({
                startColor:item2,
                endColor:item2,
                image: '',
              })  :  
              setSelectedColor({
                startColor:'',
                endColor:'',
                image: item2.image,
              })
              setShowBg(false)
            }} key={index2} style={{
              background : index == 2 ? item2 : `url(${item2.image})`,
              backgroundPosition: 'center center',
              backgroundSize: '100% 100%'  
            }} className='h-[80px] w-full bg-gray-200 cursor-pointer rounded-md'>
              {/* <img src={item2.image} alt={item2.title} className='w-full h-full object-cover rounded-md'/> */}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div> 
    </>
  )
}

export default BackGroundThemes
