"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalMikroOrmClass = TransactionalMikroOrmClass;
const core_1 = require("@mikro-orm/core");
function TransactionalMikroOrmClass() {
    return function (target) {
        const prototype = target.prototype;
        for (const key of Object.getOwnPropertyNames(prototype)) {
            if (key === 'constructor')
                continue;
            const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
            const isMethod = descriptor?.value instanceof Function;
            if (!isMethod)
                continue;
            const isAsync = descriptor.value.constructor.name === 'AsyncFunction';
            if (!isAsync)
                continue;
            const transactionalDecorator = (0, core_1.Transactional)();
            transactionalDecorator(prototype, key, descriptor);
            Object.defineProperty(prototype, key, descriptor);
        }
    };
}
//# sourceMappingURL=transactional-mikro-orm.decorator.js.map