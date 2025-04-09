import { NextFunction, Request, Response, Router } from 'express';

export function asyncHandler (fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);
}

// Automatically wrap all routes in asyncHandler
export function applyAsyncHandler(router: Router) {
  router.stack.forEach((layer) => {
    if (layer.route) {
      layer.route.stack.forEach((routeMiddleware) => {
        routeMiddleware.handle = asyncHandler(routeMiddleware.handle);
      });
    }
  });
}