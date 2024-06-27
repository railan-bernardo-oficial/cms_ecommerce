"use client"
import { CiUser } from "react-icons/ci";
import { login } from "./services/auth";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

interface sendLogin {
   email: string;
   password: string;
}

export default function Home() {
   const router = useRouter();
   
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
  } = useForm<sendLogin>();

  const sendLogin = async (data: sendLogin) => {

  
       // login
       const response = await toast.promise(
           login(data),
           {
               pending: 'Processando',
               success: 'Login realizado 👌',
               error: "Erro ao tentar logar-se"
           }
       )

       setTimeout(()=>{
         router.push('/dashboard')
       }, 1300)
      
   
}

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <div className="w-80">
          <div className="w-full text-center mb-6">
              <h2 className="flex items-center justify-center gap-2 mb-5 text-2xl font-semibold text-gray-600">
                 <CiUser className="font-semibold" />
                 Login do administrador
              </h2>
              <p className="text-gray-600 text-base text-center">Gerencie seu conteúdo e tenha uma experiência personalizada :)</p>
          </div>
          <form className="w-full" onSubmit={handleSubmit(sendLogin)}>
             <div className="w-full mb-4">
                <div className="relative pb-1">
                   <span className="pl-3 text-gray-500 text-md">e-mail</span>
                   <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                </div>
                <input 
                {...register('email')}
                type="text" 
                className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
             </div>
             <div className="w-full">
                <div className="relative pb-1 flex justify-between items-center">
                   <span className="pl-3 text-gray-500 text-md">senha</span>
                   <a href="/" className="pl-3 text-gray-500 text-md pr-1">redefinir senha</a>
                   <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                </div>
                <input 
                {...register('password')}
                type="password" 
                className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
             </div>
             <button className="p-3 h-12 text-center font-semibold mt-7 text-white bg-blue-700 border border-blue-700 hover:opacity-95 rounded-lg w-full">continuar</button>
          </form>
          <div className="w-full py-8 text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center">Não tem cadastro? <a href="/conta/cadastro" className="pl-2 underline">Cadastre-se</a></p>
              <p className="text-xs mt-2 text-gray-500 flex items-center flex-wrap justify-center">Ao continuar com o acesso, você concorda com a nossa <a href="/" className="underline">Política de Privacidade</a></p>
          </div>
      </div>
      <ToastContainer />
    </main>
  );
}
