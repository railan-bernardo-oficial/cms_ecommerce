
"use client"
import MaskInput from "@gruzf/mask-input";
import { useForm, Controller } from 'react-hook-form';
import api from "@/app/services/api/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


interface sendData {
    name: string;
    nick_name: string;
    gender: string;
    date_birth: string;
    document: string;
    phone: string;
    email: string;
    password: string;
}

export default function Cadastro() {
  const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<sendData>();

    const sendSubmit = async (data: sendData) => {

        try{
            // realiza o post e adiciona o alerta ao mesmo tempo
            const response = await toast.promise(
                api.post('/painel/account/create', data),
                {
                    pending: 'Processando',
                    success: 'Conta criada com sucesso 👌',
                }
            )
    
             // redireciona para tela de login
             if(response.data.succes){
                router.push('/')
             }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
          
                // Exibe vários alertas caso tenha mais de um erro
                Object.keys(errors).forEach((key) => {
                  errors[key].forEach((message) => {
                    toast.error(message);
                  });
                });
            }
        }
    }

    return (
            <main className="flex w-full py-5  items-center justify-center px-4">
                <div className="w-96">
                    <div className="w-full text-center mb-6">
                        <h2 className="flex items-center justify-center gap-2 mb-5 text-3xl font-bold text-gray-600">
                            criar seu cadastro
                        </h2>
                        <p className="text-gray-600 text-base text-center">Gerencie seu conteúdo e tenha uma experiência personalizada :)</p>
                    </div>
                    <form className="w-full" onSubmit={handleSubmit(sendSubmit)}>
                        <div className="w-full mb-4">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md">nome completo</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <input
                                {...register('name')}
                                className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md">como gostaria que a gente te chamasse?</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <input
                                {...register('nick_name')}
                                className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full"
                            />
                        </div>
                        <div className="w-full mb-4">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md w-full block leading-none">gênero</span>
                                <span className="text-gray-400 text-xs leading-none">pra gente te conhecer um pouquinho melhor :)</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <div className="w-full flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                    <input
                                        {...register('gender')}
                                        type="radio" value="F" />
                                    <span className="text-gray-600 text-md leading-none">feminino</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        {...register('gender')}
                                        type="radio" value="M" />
                                    <span className="text-gray-600 text-md leading-none">masculino</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        {...register('gender')}
                                        type="radio" value="NF" />
                                    <span className="text-gray-600 text-md leading-none">não informar</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-4 mt-5">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md w-full block leading-none">data de nascimento</span>
                                <span className="text-gray-400 text-xs leading-none">necessário pra identificar a maioridade, no formato DD/MM/AAAA</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <div className="w-full">
                                <Controller
                                    name="date_birth"
                                    control={control}
                                    render={({ field }) => (
                                        <MaskInput
                                            {...field}
                                            mask="99/99/9999"
                                            className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-full mb-4 mt-5">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md w-full block leading-none">CPF</span>
                                <span className="text-gray-400 text-xs leading-none">necessário pra emissão das Notas Fiscais</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <div className="w-full">
                                <Controller
                                    name="document"
                                    control={control}
                                    render={({ field }) => (
                                        <MaskInput
                                            mask="999.999.999-99"
                                            {...field}
                                            className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
                                    )}
                                />

                            </div>
                        </div>
                        <div className="w-full mb-4 mt-5">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md w-full block leading-none">telefone</span>
                                <span className="text-gray-400 text-xs leading-none">caso a gente precise entrar em contato sobre seus pedidos</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <div className="w-full">
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <MaskInput
                                            mask="(99) 99999-9999"
                                            {...field}
                                            className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
                                    )}
                                />

                            </div>
                        </div>
                        <div className="w-full mb-4">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md block w-full">e-mail</span>
                                <span className="text-gray-400 text-xs leading-none">informe um e-mail válido. Você vai precisar ativar sua conta depois de criar seu cadastro</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <input
                                {...register('email')}
                                className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
                        </div>
                        <div className="w-full">
                            <div className="relative pb-1">
                                <span className="pl-3 text-gray-500 text-md">senha</span>
                                <span className="text-red-600 absolute left-0 top-[2px]">*</span>
                            </div>
                            <input
                                {...register('password')}
                                type="password"
                                className="border border-gray-400 focus:outline-none rounded-lg text-base px-[15px] py-3 w-full" />
                        </div>
                        <button className="p-3 h-12 text-center font-semibold mt-7 text-white bg-blue-700 border border-blue-700 hover:opacity-95 rounded-lg w-full">criar seu cadastro</button>
                    </form>
                    <div className="w-full py-8 text-center">
                        <p className="text-xs my-2 text-gray-500 flex items-center flex-wrap justify-center">Não se preocupe, nosso site é seguro! Ao criar o seu cadastro, você concorda com a nossa <a href="/" className="underline">Política de Privacidade</a></p>
                        <p className="text-sm text-gray-500 flex items-center justify-center">já tem cadastro? <a href="/" className="pl-2 underline">Entrar</a></p>
                    </div>
                </div>
                <ToastContainer />
            </main> 
    );
}



