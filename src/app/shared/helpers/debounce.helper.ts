export function debounce(delay: number = 300): MethodDecorator {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let timeout: any = null;
    const original = descriptor.value;

    descriptor.value = function(...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
