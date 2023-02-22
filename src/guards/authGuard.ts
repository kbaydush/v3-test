import { NextFunction, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { ContextRequest, UserRequest } from '@/contracts/request';

export const authGuard = {
  isAuth: ({ context: { user } }: ContextRequest<UserRequest>, res: Response, next: NextFunction) => {
    if (user) {
      return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    });
  },

  isGuest: ({ context: { user } }: ContextRequest<UserRequest>, res: Response, next: NextFunction) => {
    if (!user) {
      return next();
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN,
    });
  },

  isVerified: (
    {
      context: {
        user: { verified },
      },
    }: ContextRequest<UserRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    if (verified) {
      return next();
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN,
    });
  },

  isUnverfied: (
    {
      context: {
        user: { verified },
      },
    }: ContextRequest<UserRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    if (!verified) {
      return next();
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN,
    });
  },
};