"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "./ui/form"
import Image from "next/image"
import Link from "next/link"
import FormField from "./formField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth' 
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'signup' ? z.string().min(3) : z.string().optional(),
        email: z.email(),
        password: z.string().min(3)
    })
}

export function AuthForm({type}: {type: FormType}) {
    const router = useRouter()
    const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
        if(type === 'signup') {
            const {name, email, password} = data

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const result = await signUp({
                uid: userCredentials.user.uid,
                name: name!,
                email,
                password
            })

            if(!result?.success) {
                toast.error(result?.message)
                return
            }

            toast.success('Account created successfully. Please sign in.')
            router.push('/signin')
        }
        else {
            const {email, password} = data

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            if(!idToken) {
                toast.error('Sign in failed')
                return;
            }

            await signIn({
                email, idToken
            })
            toast.success('Signed in succesfully.')
            router.push('/')
        }

    } catch(error) { 
        console.log(error)
        toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === 'signin'
  return (
    <div className="card-border lg:min-w-141.5">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src={'/logo.svg'} alt="logo" height={32} width={38}/>
                <h2 className="text-primary-100">Interview Preparation</h2>
            </div>
            <h3>Practice job interview with AI</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                {!isSignIn && <FormField control={form.control} name='name' label="Name" placeholder="Type your name" />}
                <FormField control={form.control} name='email' label="Email" placeholder="Enter your email address" type="email"/>
                <FormField control={form.control} name='password' label="Password" placeholder="Enter your password" type="password"/>
                
                <Button className="btn">{isSignIn ? 'Sign In' : 'Create an account'}</Button>
                </form>
            </Form>
            
            <Link href={!isSignIn ? '/signin' : '/signup'} className="flex justify-center">< p className="text-center">{isSignIn ? 'No account yet?' : 'Have an account already?'}</p><span className="font-bold text-user-primary ml-1">{isSignIn ? 'Sign Up' : 'Sign In'}</span></Link>
        </div>
    </div>
  )
}
