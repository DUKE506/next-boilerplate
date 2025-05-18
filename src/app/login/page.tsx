
import { providerMap, auth, signIn } from '@/lib/auth'
import React from 'react'
import { signInWithCredentials, signInWithCustomProvider } from '../../../serverActions/auth'

const SIGNIN_ERROR_URL = '/error'



const Page = async () => {



    return (
        <div className="flex flex-col gap-2">
            <form

                action={signInWithCredentials}
            >
                <label htmlFor="email">
                    Email
                    <input name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input name="password" id="password" />
                </label>
                <input type="submit" value="Sign In" />
            </form>
            {Object.values(providerMap).map((provider, idx) => (
                <form
                    key={idx}
                    action={signInWithCustomProvider.bind(null, provider)}
                >
                    <button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </button>
                </form>
            ))}
        </div>
    )
}

export default Page