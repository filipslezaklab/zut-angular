import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { BaseInterceptor } from "./baseurl-interceptor";

export const httpInterceptorProviders: Provider[] = [
  {provide: HTTP_INTERCEPTORS, multi: true, useClass: BaseInterceptor},
];
