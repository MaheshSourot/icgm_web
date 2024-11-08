import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let data: any=localStorage.getItem("loginToken")
  let data1:any=JSON.parse(data)

  if (data1) {
    
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${data1.access_token}`,
      },
    });
  }
  return next(req);
  
};
