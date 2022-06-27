import { AppModule } from '../app.module';
import { AlertService } from '../services/alert.service';
import { AlertConfirmData, defaultAlertConfirmData } from '../data-types/alert-data';

// f.e. @AlertConfirmable({title: "Looking for trouble?"})
export function AlertConfirmable(options?: any) {
  // eslint-disable-next-line @typescript-eslint/ban-types
    // tslint:disable-next-line:ban-types
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) =>
  {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      const alertService = AppModule.injector.get<AlertService>(AlertService);
      options = options || {};
      options = {
        ...defaultAlertConfirmData,
        title: 'Are you Sure',
        confirmText: "Yes",
        confirmClass: "btn-danger",
        ...options
      };
      return new Promise<any>((resolve, reject) => {
        alertService
          .confirm({
              ...options,
              confirmCb: async () => {
                if (options.confirmCb) {
                  resolve([await originalMethod.apply(this, args), await options.confirmCb.apply(this, args)]);
                } else {
                  resolve(await originalMethod.apply(this, args));
                }
              },
              cancelCb: options.cancelCb
            } as AlertConfirmData
          );
      });
    }

    return descriptor;
  };
}
