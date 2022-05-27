import { TABLES } from '@/repository/constants'
import db from '@databases'
import { compare } from 'bcrypt'
import OAuth2Server from 'oauth2-server'
import { v4 as uuidv4 } from 'uuid'

const model = {
    getAccessToken: async (accessToken: string) => {
        const result = await db(TABLES.OAUTH_ACCESS_TOKENS)
            .where({
                token: accessToken
            })
            .first("*")
        if(!result) return false
        
        return {
            accessToken: result.token,
            accessTokenExpiresAt: result.expiry_at,
            client: {
                id: result.client_id
            },
            user: {
                id: result.user_id
            }
        }
    },
    getRefreshToken: async (refreshToken) => {
        const token = await db(TABLES.OAUTH_REFRESH_TOKENS)
            .where({
                token: refreshToken
            })
            .first("*")
    },
    getAuthorizationCode: async (authorizationCode) => {
        const findCode = await db(TABLES.OAUTH_AUTH_CODES)
            .where({
                code: authorizationCode
            })
            .first("*")
        if (!findCode) return false

        return {
            code: findCode,
            expiresAt: findCode.expiry_at,
            client: {
                id: findCode.client_id
            },
            user: {
                id: findCode.user_id
            }
        }
    },

    getClient: async (clientId, clientSecret) => {
        const where: any = {
            id: clientId,
        }
        if (clientSecret) where.secret = clientSecret

        const findClient = await db(TABLES.OAUTH_CLIENTS)
            .where(where)
            .first("*")

        if (!findClient) return false

        return {
            id: findClient.id,
            grants: [
                "password",
                "authorization_code",
                "refresh_token",
                "client_credentials"
            ],
            user_id: findClient.user_id,
            redirectUris: ["http://localhost:8000/"],
        }
    },

    getUser: async (username, password) => {
        const findUser = await db(TABLES.USERS).where('email', '=', username).first();
        if (!findUser) return false

        const passwordCorrect: boolean = await compare(password, findUser.password);
        if (!passwordCorrect) return false

        return findUser
    },

    getUserFromClient: async (client) => {
        return {
            id: client.user_id
        }
    },

    saveToken: async (token, client, user) => {
        await db(TABLES.OAUTH_ACCESS_TOKENS).insert({
            id: uuidv4(),
            token: token.accessToken,
            client_id: client.id,
            user_id: user.id,
            expiry_at: token.accessTokenExpiresAt
        })

        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: new Date(),
            client,
            user,
        }
    },

    saveAuthorizationCode: async (code, client, user) => {
        await db(TABLES.OAUTH_AUTH_CODES).insert({
            id: uuidv4(),
            code: code.authorizationCode,
            client_id: client.id,
            user_id: user.id,
            expiry_at: code.expiresAt
        })

        return {
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            user,
            client,
        }
    },

    revokeToken: (token) => {
        return db(TABLES.OAUTH_ACCESS_TOKENS).where({
            token
        }).delete()
    },

    revokeAuthorizationCode: async (code) => {
        await db(TABLES.OAUTH_AUTH_CODES).where({
            code: code.code
        }).delete()

        return true
    }
}
const oauth = new OAuth2Server({
    model
});

export default oauth;
