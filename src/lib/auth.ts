import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";
import * as Sentry from "@sentry/browser"
import Google from "next-auth/providers/google";

const providers: Provider[] = [
    Credentials({
        credentials: { password: { label: 'Password', type: 'password' } },
        authorize(c) {
            if (c.password !== 'password') return null
            return {
                id: 'test',
                name: 'Test User',
                email: 'test@example.com',
            }
        }
    }),
    Kakao({
        clientId: process.env.AUTH_KAKAO_ID,
        clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
    Google,
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === 'function') {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    }).filter((provider) => provider.id !== 'credentials')


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt', // JSON Web Token 사용
        maxAge: 60 * 60 * 24 // 세션 만료 시간(sec)
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // 디버깅을 위한 로그 추가
            console.log('SignIn callback', { user, account, provider: account?.provider });
            return true;
        },
        jwt: async ({ token, user }) => {
            return token
        },
        session: async ({ session, token }) => {
            return session
        },
        redirect: async ({ url, baseUrl }) => {
            if (url.startsWith('/')) return `${baseUrl}${url}`
            if (url) {
                const { search, origin } = new URL(url)
                const callbackUrl = new URLSearchParams(search).get('callbackUrl')
                if (callbackUrl)
                    return callbackUrl.startsWith('/')
                        ? `${baseUrl}${callbackUrl}`
                        : callbackUrl
                if (origin === baseUrl) return url
            }
            return baseUrl
        }
    },

})