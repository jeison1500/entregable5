import { useDispatch } from "react-redux"
import FooterHome from "../componets/home/footerHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainer(nameTrainer))
    navigate('/Pokedex')
        
  }


       // w-[280px] xxs:w-[650PX] sm:w-[1080px]

    


  return (

    <main>

    <section className='grid grid-rows-[1fr_auto] items-center justify-center  min-h-screen'>
      <section className="w-[280px]   xxs:w-[650PX] sm:w-[1080px]  mx-auto  ">
        <div>
          <img src="/images/logo.png" alt="" />
        </div>
        <h3 className='text-5xl font-bold text-red-500 text-center mt-20 '>!Hello trainer¡</h3>
        <p className='text-3xl font-bold text-gray-900 text-center mt-5 '>For start, give your name</p>

        <form onSubmit={handleSubmit} className='grid grid-cols-[1fr_28%]  mt-20 '>
          <input required id="nameTrainer" className='bg-slate-50 border-b-4 py-4 text-center text-md' type="text" placeholder='Name' />
          <button className=' bg-red-600 text-white'>Start</button>
        </form>
      </section>
    </section>

         
        <FooterHome />
        
    
    </main>
    

  )
}
export default Home