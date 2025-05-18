'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { Provider } from "next-auth/providers"
import { redirect } from "next/navigation"


export const signInWithCredentials = async (formData: FormData) => {
    console.log(formData)

    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`/error?error=${error.type}`)
        }
        throw error
    }
}



export const signInWithCustomProvider = async (provider: Record<string, string>) => {
    try {
        console.log('성공')
        console.log(provider)
        await signIn(provider.id)
    } catch (error) {
        console.log('실패')
        if (error instanceof AuthError) {
            return redirect(`/error?error=${error.type}`)
        }
        throw error
    }

}