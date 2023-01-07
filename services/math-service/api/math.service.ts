interface IMathService {
    add: (operands: number[]) => number;
    subtract: (operands: number[]) => number;
    multiply: (operands: number[]) => number;
    divide: (operands: number[]) => number;
}

export const mathService: IMathService = {
    add: (operands) => operands.reduce((x, y) => x + y, 0), 
    subtract: (operands) => operands.reduce((x, y) => x - y, 0), 
    multiply: (operands) => operands.reduce((x, y) => x * y, 0), 
    divide: (operands) => operands.reduce((x, y) => x / y, 0), 
};