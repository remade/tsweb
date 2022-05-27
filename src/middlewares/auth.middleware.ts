import { NextFunction, Request, Response } from 'express';
import oauth2Server from '@/services/oauth'
import { Request as OAuth2Request, Response as OAuth2Response } from 'oauth2-server'


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    var request = new OAuth2Request(req);
    var response = new OAuth2Response(res);

    try {
        const token = await oauth2Server.authenticate(request, response)

        res.locals.user = token.user
        next()
    } catch (err) {
        next(err)
    }
};

export default authMiddleware;
