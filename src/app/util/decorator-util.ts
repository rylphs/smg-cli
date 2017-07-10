// a utility function to generate instances of a class

function construct(fn:Function, constructor:Function, args:any) {
    var c: any = function() {
        fn.apply(this, args);
        return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
}

export function createConstructor(baseConstructor:any, callback:(...a:any[])=>any, copyMetadata: boolean = false, ...aditionalParameters:any[]) {
    var newConstructor: any = function(...args:any[]) {
        return construct(callback, baseConstructor, args);
    }

    newConstructor.prototype = baseConstructor.prototype; // copy prototype (fix intanceof)
    if (copyMetadata) {
        let metaData = Reflect.getMetadataKeys(baseConstructor);
        for (let i in metaData) {
            let key = metaData[i];
            let value = Reflect.getMetadata(key, baseConstructor);
            Reflect.defineMetadata(key, value, newConstructor);
        }
    }

    addInjection(newConstructor, ...aditionalParameters)

    return newConstructor; // return new constructor (will override original)
}

export function getBound(descriptor, propertyKey){
    return {
        configurable: true,
        get: function(){
            const bound = descriptor.value!.bind(this);
            
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: true,
                writable: true
            });
            return bound;
        }
    };
}

export function addInjection(constructor:any, ...types){
    var paramtypes = Reflect.getMetadata('design:paramtypes', constructor);
    paramtypes = types.concat(paramtypes);
    Reflect.defineMetadata('design:paramtypes', paramtypes, constructor);
}