import { useDispatch } from "react-redux"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"
import FooterHome from "../componets/Home.carpert/FooterHome"

const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainer(nameTrainer))
    navigate('/Pokedex')
        
  }


       

    


  return (

    <main>

    
      <section className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="p-2">
          <img src="/images/logo.png" alt="" />
        </div>
         
        <h3 className="text-3xl text-red-500 mt-20 font-bold  ">
          !Hello trainer¡
        </h3>
        <p className="text-white text-2xl font-bold mt-4">
          For start, give your name
        </p>
        

        <section className="flex flex-col items-center justify-center mt-8 ">
        <form onSubmit={handleSubmit}>          
          <input required id="nameTrainer"  className="bg-slate-50  py-4  text-md" type="text" placeholder="Name" />
          <button className="bg-red-600 text-white py-4 mt-4 px-4 text-md " >
            Start
          </button>
        </form>
        </section>
      </section>
   

         
        <FooterHome />
        
    
    </main>
    

  )
}
export default Home