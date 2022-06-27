import { AppModule } from '../app.module';
import { AlertService } from '../services/alert.service';

// f.e. @AlertNotification(message: "Looking for trouble?")
export function AlertNotification(message: string, timer: number = 4000)
{
    // eslint-disable-next-line @typescript-eslint/ban-types
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) =>
    {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args)
        {
            const alertService = AppModule.injector.get<AlertService>(AlertService);
            return new Promise<any>((resolve, reject) =>
            {
                alertService.notification([message], timer)
                    .then(async () =>
                    {
                        resolve(await originalMethod.apply(this, args));
                    });
            });
        }

        return descriptor;
    };
}
